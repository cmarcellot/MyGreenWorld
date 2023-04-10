import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, StandardMaterial, Texture, NodeMaterial, Axis, Space,Viewport} from '@babylonjs/core';
import { CustomLoadingScreen } from "./CustomLoadingScreen";
// We import the loaders to be able to load models
import "@babylonjs/loaders";

export class MainScene {

    ///////////ATTRIBUTES////////////

    scene: Scene;
    engine: Engine;
    loadingScreen: CustomLoadingScreen
    groundSize!: number

    ///////////CONSTRUCTOR////////////

    constructor(
        private canvas:HTMLCanvasElement,
        private loadingBar: HTMLElement,
        private percentLoaded: HTMLElement,
        private loader: HTMLElement
    ) {
        // We create an engine for the scene rendering
        this.engine = new Engine(canvas, true);

        // We create a custom loading screen
        this.loadingScreen = new CustomLoadingScreen(this.loadingBar, this.percentLoaded, this.loader);
        this.engine.loadingScreen = this.loadingScreen;
        this.engine.displayLoadingUI();

        //Init the ground size
        this.groundSize = 300;

        // We create the scene
        this.scene = this.createScene();
    }

    ///////////METHODS////////////

    // Scene creation
    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(5, 10, -5), this.scene);
        camera.attachControl();
        // The speed of the camera in the scene
        camera.speed = 1.5;
        // Activate collisions for the camera
        camera.checkCollisions = true;
        // Set the ellipsoid around the camera (your player's size)
        camera.ellipsoid = new Vector3(1, 1.5, 1);

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

        this.CreateGrass();

        this.LoadModels();
        
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

    // Load all the models
    LoadModels(): void {
        // List of all the models to load
        const modelNames = [
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
        const modelDir = "./models/store/";
    
        // Progress bar
        let progress = 0;
        const increment = 100 / modelNames.length;
    
        // create a function to load a model
        const loadModel = async (modelName: string): Promise<void> => {
            const result = await SceneLoader.ImportMeshAsync("", modelDir, modelName, this.scene);
            const mainMesh = result.meshes[0];
    
            switch (modelName) {
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
    
            // Update the progress bar
            progress += increment;
            this.loadingScreen.updateLoadStatus(progress);
    
            // When all the models are loaded, we hide the loading screen
            if (progress === 100) {
                // We hide the loading screen
                this.engine.hideLoadingUI();
    
                // We launch the scene rendering in the engine render loop
                this.engine.runRenderLoop(() => {
                    this.scene.render();
                });
            }
        };
    
        // We load all the models
        modelNames.forEach((modelName) => {
            loadModel(modelName);
        });
    }

}