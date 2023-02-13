import { float, int } from "@babylonjs/core";
 import {ElementAchetable} from "./ElementAchetable";
export class Amelioration extends ElementAchetable {
    gainParClick: float;
    debloque: boolean;
    achete: boolean;  
    constructor(idElement: string, 
        nom : string,
        desc : string,
        prix : float, 
        gainParSec : float,
        bonusEco : int,
        gainParClick: float,
        debloque: boolean,
        achete: boolean, 
        ){
            super(idElement,nom, desc, prix, gainParSec,bonusEco);
            this.gainParClick= gainParClick;
            this.debloque = debloque;
            this.achete= achete;

    }

}