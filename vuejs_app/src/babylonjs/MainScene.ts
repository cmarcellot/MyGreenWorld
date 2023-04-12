import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, StandardMaterial, Texture, NodeMaterial, Axis, Space,Viewport} from '@babylonjs/core';
import { CustomLoadingScreen } from "./CustomLoadingScreen";
// We import the loaders to be able to load models
//import "@babylonjs/loaders";

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
        this.groundSize = 150;

        // We create the scene
        this.scene = this.createScene();

        // We hide the loading screen
        this.engine.hideLoadingUI();
        // If we have a model to load, we can launch the loading here
        //this.CreateEnvironment();

        
        // We launch the scene rendering in the engine render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        
    }

    ///////////METHODS////////////

    // Scene creation
    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(5, 10, -5), this.scene);
        camera.attachControl();
        // The speed of the camera in the scene
        camera.speed = 0.5;
        // Activate collisions for the camera
        camera.checkCollisions = true;
        // Set the ellipsoid around the camera (your player's size)
        camera.ellipsoid = new Vector3(1, 1.5, 1);

        // Create a light to illuminate the scene
        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
        hemiLight.intensity = 0.5;

        // Create a ball
        const ball = MeshBuilder.CreateSphere("ball",{diameter: 1}, this.scene);

        this.engine.resize();
        const width = this.engine.getRenderWidth();
        const height = this.engine.getRenderHeight();
        scene.activeCamera!.viewport = new Viewport(
            (1 - width / window.innerWidth) / 2,
            (1 - height / window.innerHeight) / 2,
            width / window.innerWidth,
            height / window.innerHeight
        );

        ball.position = new Vector3(0,1,0);
        ball.checkCollisions = true;

        // Create a ground with collisions
        const ground = MeshBuilder.CreateGround("ground", {width: this.groundSize, height: this.groundSize}, this.scene);
        ground .checkCollisions = true;
        ground.material = this.CreateGroundMaterial();

        this.CreateGrass();
        
        return scene;
    }

    // Not used because no model to load yet
    // Exemple of method to load a model
    async CreateEnvironment(): Promise<void> {
        // Add meshes if we want to retrieve the loaded objects
        //const { meshes } = await SceneLoader.ImportMeshAsync(
        await SceneLoader.ImportMeshAsync(
          "",
          "./models/",
          "map.glb",
          this.scene,
          // We can pass a callback function to follow the loading
          (evt) => {
              let loadedPercent = 0;
              if (evt.lengthComputable) {
                  loadedPercent = Math.ceil(evt.loaded * 100 / evt.total);
              } else {
                  loadedPercent = Math.ceil((evt.loaded / (1024 * 1024)));
              }
              // We update the loading bar
              this.loadingScreen.updateLoadStatus(loadedPercent);
          }
        );
        // We hide the loading screen
        this.engine.hideLoadingUI();
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
}