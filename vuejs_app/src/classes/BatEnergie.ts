import { float, int } from "@babylonjs/core";
import {ElementAchetable} from "./ElementAchetable";
export class BatEnergie extends ElementAchetable {
    
    constructor(idElement: string, 
        nom : string,
        desc : string,
        prix : float, 
        gainParSec : float,
        bonusEco : int){
        super(idElement,nom, desc, prix, gainParSec,bonusEco);

    }
}