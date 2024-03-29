import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, StandardMaterial, Texture, Color3, Mesh, NodeMaterial, Axis, Space, Viewport, CubeTexture, Sound} from '@babylonjs/core';
import { CustomLoadingScreen } from "./CustomLoadingScreen";
// We import the loaders to be able to load models
import "@babylonjs/loaders";
import { City } from '@/classes/City';
import { Living } from '@/classes/Living';

export class MainScene {

    ///////////ATTRIBUTES////////////
    scene: Scene;
    engine: Engine;
    loadingScreen: CustomLoadingScreen
    groundSize!: number
    city! : City
    living! : Living
    armRight!: Mesh;
    armLeft!: Mesh;
    handRight!: Mesh;
    handLeft!: Mesh;
    show!: boolean;
    progress!: number;

    ///////////CONSTRUCTOR////////////
    constructor(
        private canvas:HTMLCanvasElement,
        private loadingBar: HTMLElement,
        private percentLoaded: HTMLElement,
        private loader: HTMLElement,
        private p_city : City
    ) {
        const cash = document.getElementById("cash") as HTMLElement;
        const eco = document.getElementById("ecology") as HTMLElement;
        const store = document.getElementById("store") as HTMLElement;

        cash.hidden = true;
        eco.hidden = true;
        store.hidden  = true;
            
        // We create an engine for the scene rendering
        this.engine = new Engine(canvas, true);

        // We create a custom loading screen
        this.loadingScreen = new CustomLoadingScreen(this.loadingBar, this.percentLoaded, this.loader);
        this.engine.loadingScreen = this.loadingScreen;
        this.engine.displayLoadingUI();

        //Init the ground size
        this.city = p_city;
        this.groundSize = 450;
        this.progress = 0;

        //resize the scene 
        window.addEventListener('resize', () =>{
            this.engine.resize();
        });

        this.engine.resize();
        
        // We create the scene
        this.scene = this.createScene(this.city);
        
    }

    ///////////METHODS////////////

    // Scene creation


    createScene(city : City): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(40, 5, 0), this.scene);
        camera.attachControl();
        // The speed of the camera in the scene
        camera.speed = 1.5;
        // Activate collisions for the camera
        camera.checkCollisions = true;
        // Set the ellipsoid around the camera (your player's size)
        camera.ellipsoid = new Vector3(5, 1.75, 5);
        camera.rotation.y = -(Math.PI / 2);
        camera.minZ = 0.5;

        camera.keysUp.push(90); // Z key
        camera.keysLeft.push(81); // Q key
        camera.keysDown.push(83); // S key
        camera.keysRight.push(68); // D key
        camera.keysUpward.push(32); // Space bar
        camera.keysDownward.push(16); // Shift key

        camera.applyGravity = true; // Apply gravity to the camera

        // Create a light to illuminate the scene
        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
        hemiLight.intensity = 0.5;

        this.engine.resize();
        const width = this.engine.getRenderWidth();
        const height = this.engine.getRenderHeight();
        scene.activeCamera!.viewport = new Viewport(
            (1 - width / window.innerWidth) / 2,
            (1 - height / window.innerHeight) / 2,
            width / window.innerWidth,
            height / window.innerHeight
        );

        // Create a ground with collisions
        const ground = MeshBuilder.CreateGround("ground", {width: this.groundSize, height: this.groundSize}, this.scene);
        ground .checkCollisions = true;
        ground.material = this.CreateGroundMaterial();

        // Create the border
        const borderHeight = 300; // Height of the border walls

        const borderMaterial = new StandardMaterial("borderMaterial", this.scene);
        // Color of the border walls
        borderMaterial.diffuseColor = new Color3(0, 0, 0);
        // Transparency of the border walls
        borderMaterial.alpha = 0;

        const borderWidth = this.groundSize + 10; // Width of the border walls (slightly larger than the ground)
        const borderThickness = 0.1; // Thickness of the border walls

        const borderTop = MeshBuilder.CreateBox("borderTop", { width: borderWidth, height: borderHeight, depth: borderThickness }, this.scene);
        borderTop.position.y = borderHeight / 2;
        borderTop.position.z = -this.groundSize / 2 - borderThickness / 2;
        borderTop.material = borderMaterial;
        borderTop.checkCollisions = true;

        const borderBottom = MeshBuilder.CreateBox("borderBottom", { width: borderWidth, height: borderHeight, depth: borderThickness }, this.scene);
        borderBottom.position.y = borderHeight / 2;
        borderBottom.position.z = this.groundSize / 2 + borderThickness / 2;
        borderBottom.material = borderMaterial;
        borderBottom.checkCollisions = true;

        const borderLeft = MeshBuilder.CreateBox("borderLeft", { width: borderThickness, height: borderHeight, depth: this.groundSize }, this.scene);
        borderLeft.position.y = borderHeight / 2;
        borderLeft.position.x = -this.groundSize / 2 - borderThickness / 2;
        borderLeft.material = borderMaterial;
        borderLeft.checkCollisions = true;

        const borderRight = MeshBuilder.CreateBox("borderRight", { width: borderThickness, height: borderHeight, depth: this.groundSize }, this.scene);
        borderRight.position.y = borderHeight / 2;
        borderRight.position.x = this.groundSize / 2 + borderThickness / 2;
        borderRight.material = borderMaterial;
        borderRight.checkCollisions = true;
        
        // Create ceiling
        const ceiling = MeshBuilder.CreateBox("ceiling", { width: this.groundSize, height: borderThickness, depth: this.groundSize }, this.scene);
        ceiling.position.y = borderHeight;
        ceiling.material = borderMaterial;
        ceiling.checkCollisions = true;

        let supermanMode = false;
        window.addEventListener("keydown", (event) => {
            switch(event.keyCode) {
                case 82: // R key
                    // Respawn
                    camera.position = new Vector3(40, 5, 0);
                    camera.rotation.y = -(Math.PI / 2);
                    break;
                case 70: // F key
                    //Fly mode
                    if(supermanMode){
                        camera.speed = 1.5;
                        /*this.armRight.isVisible = false;
                        this.armLeft.isVisible = false;
                        this.handRight.isVisible = false;
                        this.handLeft.isVisible = false;*/
                        camera.applyGravity = true; 
                        supermanMode = false;
                    }else{
                        camera.speed = 7.5;
                        /*this.armRight.isVisible = true;
                        this.armLeft.isVisible = true;
                        this.handRight.isVisible = true;
                        this.handLeft.isVisible = true;*/
                        camera.applyGravity = false; 
                        supermanMode = true;
                    }
                    break;
            }
        });

        this.CreateGrass();

        // Import of the tree
        SceneLoader.ImportMesh("","./models/","tree.glb",this.scene,(newMeshes)=> {
            
            newMeshes.map((mesh) => {
                mesh.checkCollisions = true;
            });
            const mesh = newMeshes[0];
            mesh.position = new Vector3(0,0,0);
            mesh.isPickable = true;
            // reducing the tree size
            mesh.scaling = new Vector3(3/150, 3/150, 3/150);
            // making the tree clickable
            mesh.name  = "tree";
            scene.onPointerDown = function (evt, pickResult) {
                // We try to pick an object
                if (pickResult && pickResult.hit && pickResult.pickedMesh) {
                    if(pickResult.pickedMesh.name == "Object_4" || pickResult.pickedMesh.name == "Object_5" ){
                        city.playTreeSound();
                        city.incrementCashQuantity();
                        city.playTreeSound();
                    }
                }
            };
        });
          
        // Create a skybox
        let envTex: CubeTexture;
        if(this.city.ecoPourcentage > 50){
            envTex = CubeTexture.CreateFromPrefilteredData("./environments/blue_sky.env", scene);
        }
        else{
            envTex = CubeTexture.CreateFromPrefilteredData("./environments/grey_sky.env", scene);
        }
        
        scene.environmentTexture = envTex;
        scene.createDefaultSkybox(envTex, true);
        scene.environmentIntensity = 0.75;
        
        //this.CreateArms(camera);
        
        return scene;
    }

    updateSkybox = async (newEcoPourcentage: number, oldEcoPourcentage: number): Promise<void> => {
        // Update skybox
        let envTex: CubeTexture;
        if(newEcoPourcentage >= 50 && oldEcoPourcentage < 50) {
            envTex = CubeTexture.CreateFromPrefilteredData("./environments/blue_sky.env", this.scene);
            this.scene.environmentTexture = envTex;
            this.scene.createDefaultSkybox(envTex, true);
        }
        else if(newEcoPourcentage < 50 && oldEcoPourcentage >= 50) {
            envTex = CubeTexture.CreateFromPrefilteredData("./environments/grey_sky.env", this.scene);
            this.scene.environmentTexture = envTex;
            this.scene.createDefaultSkybox(envTex, true);
        }
    }
    
    // Base texture for a grass effect
    CreateGroundMaterial(): StandardMaterial {
        const groundMat = new StandardMaterial("groundMat", this.scene);
        const uvScale = 50;
        const texArray: Texture[] = [];
        const diffuseTex = new Texture("./textures/grass/green-grass.jpg", this.scene);
        groundMat.diffuseTexture = diffuseTex;
        texArray.push(diffuseTex);

        texArray.forEach((tex) => {
            tex.uScale = uvScale;
            tex.vScale = uvScale;
        });

        return groundMat;
    }

    // Node material for a grass effect
    CreateGrass(): void {
        // For each grass blade, we create a 1x1 plane
        const blade = MeshBuilder.CreateGround("blade", {width: 1, height: 1}, this.scene);
        // Rotate the plane to make it look like a grass blade
        blade.rotation.x = Math.PI * 0.5;
        blade.bakeCurrentTransformIntoVertices();
    
        // Create a node material to apply the grass texture
        NodeMaterial.ParseFromSnippetAsync("#8WH2KS#22", this.scene).then((nodeMaterial) => {
            blade.material = nodeMaterial;
            nodeMaterial.backFaceCulling = false;
        });

        // Define the limits of the 3D grass blades zone
        const minXZ = -this.groundSize / 2;
        const maxXZ = this.groundSize / 2;

        // Create multiple instances of the "blade" object
        const instanceCount = 5000; // Number of blades
        let instance = null;
        for (let i = 0; i < instanceCount; i++) {
            instance = blade.createInstance("bladeInstance" + i);
            // Add random position for each instance
            instance.position.x = Math.random() * (maxXZ - minXZ) + minXZ;
            instance.position.z = Math.random() * (maxXZ - minXZ) + minXZ;
            // -0.25 to 0.5 If inferior to 0.25, the blade will be below the ground and not visible and if superior to 0.5, the blade fly in the air
            instance.position.y = 0.25;
            instance.rotate(Axis.Y, Math.random() * Math.PI * 2, Space.LOCAL);
        }

        const buildings = this.city.livings.concat(this.city.commerces);
        let buildingsLength = 0;

        // calculate the number of buildings
        for(let i = 0; i < buildings.length; i++){
            if (buildings[i].boughtNumber > 0){
                buildingsLength++;
            }
        }

        if(buildingsLength > 0){
            // load the models with the loading screen
            for(let i = 0; i < buildings.length; i++){
                if (buildings[i].boughtNumber > 0){
                    this.loadLiving(buildings[i].modelName, buildingsLength);
                }
            }
        }
        else{
            // We hide the loading screen
            this.engine.hideLoadingUI() 
                
            // We launch the scene rendering in the engine render loop
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
           
            // get the progress bar
            const cash = document.getElementById("cash") as HTMLElement;
            const eco = document.getElementById("ecology") as HTMLElement;
            const store = document.getElementById("store") as HTMLElement;

            // show the bars 
            cash.hidden = false;
            eco.hidden = false;
            store.hidden = false;  
        }
    }

    // load a model based on its name
    loadLiving = async (modelName: string, length: number): Promise<void> => {
        const modelDir = "./models/";
        const result = await SceneLoader.ImportMeshAsync("", modelDir, modelName, this.scene);
        const mainMesh = result.meshes[0];
        const meshes = result.meshes;
        meshes.map((mesh) => {
            mesh.checkCollisions = true;
            mesh.isVisible = true;
            
        });
        
        switch (modelName) {
            case "CaravanBuilding.glb":
                mainMesh.position = new Vector3(25, 0.1, -40);
                mainMesh.scaling = new Vector3(0.25, 0.25, 0.25);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;

            case "CottageBuilding.glb":
                mainMesh.position = new Vector3(-80, 0.1, 125);
                mainMesh.scaling = new Vector3(2, 2, 2);
                mainMesh.rotation = new Vector3(0, Math.PI/1, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "HouseBuilding.glb":
                mainMesh.position = new Vector3(-120,0.1,-75);
                mainMesh.scaling = new Vector3(0.1,0.1,0.1);
                mainMesh.rotation = new Vector3(0, -(Math.PI/2), 0);
                mainMesh.scaling.x *= -1;
                break;
            case "ModernBuilding_1.glb":
                mainMesh.position = new Vector3(-700,-0.55,-200);
                mainMesh.scaling = new Vector3(5,5,5);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "ModernBuilding_2.glb":
                mainMesh.position = new Vector3(-675,-0.55,-225);
                mainMesh.scaling = new Vector3(5,5,5);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "ModernHouseBuilding.glb":
                mainMesh.position = new Vector3(-150,-0.1,85);
                mainMesh.scaling = new Vector3(3,3,3);
                mainMesh.rotation = new Vector3(0,0,0);
                mainMesh.scaling.x *= -1;
                break;
            case "PalaceBuilding.glb":
                mainMesh.position = new Vector3(75,0.1,150);
                mainMesh.scaling = new Vector3(1.5,1.5,1.5);
                mainMesh.rotation = new Vector3(0,0,0);
                mainMesh.scaling.x *= -1;
                break;
            case "SkyscraperBuilding.glb":
                mainMesh.position = new Vector3(100,0,-150);
                mainMesh.scaling = new Vector3(0.4,0.4,0.4);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "SmallStore.glb":
                mainMesh.position = new Vector3(80, 0.1, -30);
                mainMesh.scaling = new Vector3(0.25, 0.25, 0.25);
                mainMesh.rotation = new Vector3(0, -(Math.PI/2), 0);
                mainMesh.scaling.x *= -1;
                break;

            case "DIYStore.glb":
                mainMesh.position = new Vector3(-40, 0.1, 75);
                mainMesh.scaling = new Vector3(0.5, 0.5, 0.5);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "ClothingStore.glb":
                mainMesh.position = new Vector3(-85,0.1,-25);
                mainMesh.scaling = new Vector3(0.5,0.5,0.5);
                mainMesh.rotation = new Vector3(0, -(Math.PI/2), 0);
                mainMesh.scaling.x *= -1;
                break;
            case "FastFood.glb":
                mainMesh.position = new Vector3(-30,3,-75);
                mainMesh.scaling = new Vector3(3,3,3);
                mainMesh.rotation = new Vector3(0, Math.PI/2, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "Hotel.glb":
                mainMesh.position = new Vector3(20,0.1,-100);
                mainMesh.scaling = new Vector3(2,2,2);
                mainMesh.rotation = new Vector3(0, Math.PI/2, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "Supermarket.glb":
                mainMesh.position = new Vector3(-105,0.1,30);
                mainMesh.scaling = new Vector3(0.5,0.5,0.5);
                mainMesh.rotation = new Vector3(0,Math.PI*1.5,0);
                mainMesh.scaling.x *= -1;
                break;
            case "CarStore.glb":
                mainMesh.position = new Vector3(20,0.1,100);
                mainMesh.scaling = new Vector3(0.5,0.5,0.5);
                mainMesh.rotation = new Vector3(0,0,0);
                mainMesh.scaling.x *= -1;
                break;
            case "BigStore.glb":
                mainMesh.position = new Vector3(100,2.5,30);
                mainMesh.scaling = new Vector3(1.2,1.2,1.2);
                mainMesh.rotation = new Vector3(0, -(Math.PI/2), 0);
                mainMesh.scaling.x *= -1;
                break;
        }
        
        if(length > 0){

            const increment = 100 / length;
            increment.toFixed(1);

            // get the progress bar
            const cash = document.getElementById("cash") as HTMLElement;
            const eco = document.getElementById("ecology") as HTMLElement;
            const store = document.getElementById("store") as HTMLElement;
            const menu = document.getElementById("menu") as HTMLElement;


            // Update the progress bar
            this.progress += increment;

            const roundedProgress = Math.round(this.progress);
            
            this.loadingScreen.updateLoadStatus(roundedProgress);

            //hide the bars 
            if (roundedProgress < 100) {
                cash.hidden = true;
                eco.hidden = true;
                store.hidden  = true;
                menu.classList.add("menu");

            }
             // When all the models are loaded, we hide the loading screen
            else {
                
                 // We hide the loading screen
                 this.engine.hideLoadingUI() 
                
                 // We launch the scene rendering in the engine render loop
                 this.engine.runRenderLoop(() => {
                     this.scene.render();
                 });
                
                 // show the bars 
                 cash.hidden = false;
                 eco.hidden = false;
                 store.hidden = false;  
                 menu.classList.remove("menu");

            }
        }
    }

    CreateArms(camera : FreeCamera): void {
        // Attach arms to camera
        this.armRight = MeshBuilder.CreateBox("armRight", {width: 0.3, height: 0.3, depth: 7}, this.scene);
        this.armRight.position = new Vector3(0.5, -0.5, -1);
        this.armRight.rotation.y = Math.PI / 12;
        this.armLeft = MeshBuilder.CreateBox("armLeft", {width: 0.3, height: 0.3, depth: 7}, this.scene);
        this.armLeft.position = new Vector3(-0.5, -0.5, -1);
        this.armLeft.rotation.y = -Math.PI / 12;
        this.handRight = MeshBuilder.CreateSphere("handRight", {diameter: 0.5}, this.scene);
        this.handRight.position = new Vector3(0, 0, 4);
        this.handLeft = MeshBuilder.CreateSphere("handLeft", {diameter: 0.5}, this.scene);
        this.handLeft.position = new Vector3(0, 0, 4);

        // Parent arms and hands to camera
        const cameraArm = new Mesh("cameraArm", this.scene);
        cameraArm.parent = camera;
        this.armRight.parent = cameraArm;
        this.armLeft.parent = cameraArm;
        this.handRight.parent = this.armRight;
        this.handLeft.parent = this.armLeft;

        // Add materials
        const armMaterial = new StandardMaterial("armMaterial", this.scene);
        armMaterial.diffuseColor = Color3.FromHexString("#0C59AA"); // bleu
        this.armRight.material = armMaterial;
        this.armLeft.material = armMaterial;
        const handMaterial = new StandardMaterial("handMaterial", this.scene);
        handMaterial.diffuseColor = Color3.FromHexString("#E4E4D6") // beige
        this.handRight.material = handMaterial;
        this.handLeft.material = handMaterial;

        //hidden arms
        this.armRight.isVisible = false;
        this.armLeft.isVisible = false;
        this.handRight.isVisible = false;
        this.handLeft.isVisible = false;
   }

}