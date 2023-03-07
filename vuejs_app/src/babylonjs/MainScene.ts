import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, 
    MeshBuilder, SceneLoader, Viewport} from '@babylonjs/core';
import { CustomLoadingScreen } from "./CustomLoadingScreen";
// On importe les loaders pour pouvoir charger des modèles
//import "@babylonjs/loaders";

export class MainScene {

    scene: Scene;
    engine: Engine;
    loadingScreen: CustomLoadingScreen

    constructor(
        private canvas:HTMLCanvasElement,
        private loadingBar: HTMLElement,
        private percentLoaded: HTMLElement,
        private loader: HTMLElement
    ) {
        // On crée un engine pour le rendu de la scène
        this.engine = new Engine(canvas, true);

        // On crée une barre de chargement personnalisée
        this.loadingScreen = new CustomLoadingScreen(this.loadingBar, this.percentLoaded, this.loader);
        this.engine.loadingScreen = this.loadingScreen;
        this.engine.displayLoadingUI();

        // On crée la scène
        this.scene = this.createScene();

        // On cache la barre de chargement
        this.engine.hideLoadingUI();
        // Si on a un modèle à charger, on peut lancer le chargement ici
        //this.CreateEnvironment();

        // On lance le rendu de la scène dans la boucle de rendu de l'engine
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    // Exemple de méthode pour créer une scène
    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", 
        new Vector3(0, 1, -5), this.scene);
        camera.attachControl();

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);

        hemiLight.intensity = 0.5;

        MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene);

        const ball = MeshBuilder.CreateSphere("ball",{diameter: 1}, this.scene);

        ball.position = new Vector3(0,1,0); 

        this.engine.resize();
        const width = this.engine.getRenderWidth();
        const height = this.engine.getRenderHeight();
        scene.activeCamera!.viewport = new Viewport(
            (1 - width / window.innerWidth) / 2,
            (1 - height / window.innerHeight) / 2,
            width / window.innerWidth,
            height / window.innerHeight
        );

        
        return scene;
    }

    // Pas utilisé car pas encore de modèle à charger
    // Exemple de méthode pour charger un modèle
    async CreateEnvironment(): Promise<void> {
        // ajout de meshes si on veut récupérer les objets chargés
        //const { meshes } = await SceneLoader.ImportMeshAsync(
        await SceneLoader.ImportMeshAsync(
          "",
          "./models/",
          "map.glb",
          this.scene,
          // On peut passer une fonction de callback pour suivre le chargement
          (evt) => {
              let loadedPercent = 0;
              if (evt.lengthComputable) {
                  loadedPercent = Math.ceil(evt.loaded * 100 / evt.total);
              } else {
                  loadedPercent = Math.ceil((evt.loaded / (1024 * 1024)));
              }
              // On met à jour la barre de chargement
              this.loadingScreen.updateLoadStatus(loadedPercent);
          }
        );
        // On cache la barre de chargement
        this.engine.hideLoadingUI();
    }

    
}