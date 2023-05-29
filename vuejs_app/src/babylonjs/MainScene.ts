import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, StandardMaterial, Texture, Color3, Mesh, NodeMaterial, Axis, Space, Viewport, CubeTexture} from '@babylonjs/core';
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

    ///////////CONSTRUCTOR////////////

    constructor(
        private canvas:HTMLCanvasElement,
        private loadingBar: HTMLElement,
        private percentLoaded: HTMLElement,
        private loader: HTMLElement,
        private p_city : City,
        private p_living : Living

    ) {
        // We create an engine for the scene rendering
        this.engine = new Engine(canvas, true);

        // We create a custom loading screen
        this.loadingScreen = new CustomLoadingScreen(this.loadingBar, this.percentLoaded, this.loader);
        this.engine.loadingScreen = this.loadingScreen;
        this.engine.displayLoadingUI();

        //Init the ground size
        this.city = p_city;
        this.living = p_living;
        this.groundSize = 450;

        //resize the scene 
        window.addEventListener('resize', () =>{
            this.engine.resize();
        });

        this.engine.resize();
        
        // We create the scene
        this.scene = this.createScene(this.city,this.living);
        
    }

    ///////////METHODS////////////

    // Scene creation


    createScene(city : City): Scene {
        // get the progress bar
        const cash = document.getElementById("cash") as HTMLElement;
        const eco = document.getElementById("ecology") as HTMLElement;
        const store = document.getElementById("store") as HTMLElement;

        cash.hidden = true;
        eco.hidden = true;
        store.hidden  = true;

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

                    }
                }
            };
        });
          
        // Create a skybox
        const envTex = CubeTexture.CreateFromPrefilteredData("./environments/blue_sky.env", scene);
        scene.environmentTexture = envTex;
        scene.createDefaultSkybox(envTex, true);
        scene.environmentIntensity = 0.75;
        this.LoadModels();

        //this.CreateArms(camera);
        
        return scene;
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
    }

    // Add environment
    AddEnvironment(): void {
        // Create a skybox
        const envTex = CubeTexture.CreateFromPrefilteredData("./environments/blue_sky.env", this.scene);
        this.scene.environmentTexture = envTex;
        this.scene.createDefaultSkybox(envTex, true);
        this.scene.environmentIntensity = 0.75;
    }
    // load a model based on its name
    loadLiving = async (modelName: string): Promise<void> => {
        const modelNames = [
            "CaravanBuilding.glb",
            "CottageBuilding.glb",
            "HouseBuilding.glb",
            "ModernBuilding_1.glb",
            "ModernBuilding_2.glb",
            "ModernHouseBuilding.glb",
            "PalaceBuilding.glb",
            "SkyscraperBuilding.glb",
            "SmallStore.glb",
            "DIYStore.glb",
            "ClothingStore.glb",
            "FastFood.glb",
            "Hotel.glb",
            "Supermarket.glb",
            "CarStore.glb",
            "BigStore.glb",
        ];
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
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "HouseBuilding.glb":
                mainMesh.position = new Vector3(-120,0.1,-75);
                mainMesh.scaling = new Vector3(0.1,0.1,0.1);
                mainMesh.rotation = new Vector3(0, 0, 0);
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
                mainMesh.rotation = new Vector3(0, 0, 0);
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
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "FastFood.glb":
                mainMesh.position = new Vector3(-30,3,-75);
                mainMesh.scaling = new Vector3(3,3,3);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
            case "Hotel.glb":
                mainMesh.position = new Vector3(20,0.1,-100);
                mainMesh.scaling = new Vector3(2,2,2);
                mainMesh.rotation = new Vector3(0, 0, 0);
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
                mainMesh.rotation = new Vector3(0,Math.PI/2,0);
                mainMesh.scaling.x *= -1;
                break;
            case "BigStore.glb":
                mainMesh.position = new Vector3(100,2.5,30);
                mainMesh.scaling = new Vector3(1.2,1.2,1.2);
                mainMesh.rotation = new Vector3(0, 0, 0);
                mainMesh.scaling.x *= -1;
                break;
        }
        
    }

    // Load all the models
    LoadModels(): void {
        // List of all the models to load
        const modelNames = [
            "CaravanBuilding.glb",
            "CottageBuilding.glb",
            "HouseBuilding.glb",
            "ModernBuilding_1.glb",
            "ModernBuilding_2.glb",
            "ModernHouseBuilding.glb",
            "PalaceBuilding.glb",
            "SkyscraperBuilding.glb",
            "SmallStore.glb",
            "DIYStore.glb",
            "ClothingStore.glb",
            "FastFood.glb",
            "Hotel.glb",
            "Supermarket.glb",
            "CarStore.glb",
            "BigStore.glb",
        ];
    
        // Path to the models
        const modelDir = "./models/";
    
        // Progress bar
        let progress = 0;
        const increment = 100 / modelNames.length;
    
        // create a function to load a model
        const loadModel = async (modelName: string): Promise<void> => {
            const result = await SceneLoader.ImportMeshAsync("", modelDir, modelName, this.scene);
            const mainMesh = result.meshes[0];
            const meshes = result.meshes;
            meshes.map((mesh) => {
                mesh.checkCollisions = false;
                mesh.isVisible = false;
                
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
                    mainMesh.rotation = new Vector3(0, 0, 0);
                    mainMesh.scaling.x *= -1;
                    break;
                case "HouseBuilding.glb":
                    mainMesh.position = new Vector3(-120,0.1,-75);
                    mainMesh.scaling = new Vector3(0.1,0.1,0.1);
                    mainMesh.rotation = new Vector3(0, 0, 0);
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
                    mainMesh.rotation = new Vector3(0, 0, 0);
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
                    mainMesh.rotation = new Vector3(0, 0, 0);
                    mainMesh.scaling.x *= -1;
                    break;
                case "FastFood.glb":
                    mainMesh.position = new Vector3(-30,3,-75);
                    mainMesh.scaling = new Vector3(3,3,3);
                    mainMesh.rotation = new Vector3(0, 0, 0);
                    mainMesh.scaling.x *= -1;
                    break;
                case "Hotel.glb":
                    mainMesh.position = new Vector3(20,0.1,-100);
                    mainMesh.scaling = new Vector3(2,2,2);
                    mainMesh.rotation = new Vector3(0, 0, 0);
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
                    mainMesh.rotation = new Vector3(0,Math.PI/2,0);
                    mainMesh.scaling.x *= -1;
                    break;
                case "BigStore.glb":
                    mainMesh.position = new Vector3(100,2.5,30);
                    mainMesh.scaling = new Vector3(1.2,1.2,1.2);
                    mainMesh.rotation = new Vector3(0, 0, 0);
                    mainMesh.scaling.x *= -1;
                    break;
            }

            // get the progress bar
            const cash = document.getElementById("cash") as HTMLElement;
            const eco = document.getElementById("ecology") as HTMLElement;
            const store = document.getElementById("store") as HTMLElement;


            // Update the progress bar
            progress += increment;
            this.loadingScreen.updateLoadStatus(progress);
         
            //hide the bars 
            if (progress !== 100) {
                cash.hidden = true;
                eco.hidden = true;
                store.hidden  = true;
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
            }
           
            
        };
    
        // We load all the models
        modelNames.forEach((modelName) => {
            loadModel(modelName);
        });
        
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