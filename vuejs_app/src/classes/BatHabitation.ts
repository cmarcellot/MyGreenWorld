import { float, int } from "@babylonjs/core";
import { ElementAchetable } from "./ElementAchetable";

export class BatHabitation extends ElementAchetable {

    nbAchete : int;

    constructor(nbAchete : int,idElement: string, nom : string ,desc : string, prix : float, gainParSec : float, bonusEco : int ){
        super(idElement, nom, desc, bonusEco, gainParSec,prix);
        this.nbAchete=nbAchete;
    }


    getNextPrice () :  void {

        //
    } 
}