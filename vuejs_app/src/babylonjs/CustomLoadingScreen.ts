import { ILoadingScreen } from "@babylonjs/core";

export class CustomLoadingScreen implements ILoadingScreen {

    loadingUIBackgroundColor!: string;
    loadingUIText!: string;

    constructor
    (
        private loadingBar: HTMLElement,
        private percentLoaded: HTMLElement,
        private loader: HTMLElement
    ){}

    // On cache la barre de chargement
    hideLoadingUI(): void {
        this.loader.id = "loaded";
        this.loader.style.display = "none";
    }

    // On affiche la barre de chargement
    displayLoadingUI(): void {
        this.loadingBar.style.width = "0%";
        this.percentLoaded.innerText = "0%";
    }

    // On peut récupérer le pourcentage de chargement et l'afficher
    updateLoadStatus(status: number): void {
        this.loadingBar.style.width = `${status}%`;
        this.percentLoaded.innerText = `${status}%`;
    }
}