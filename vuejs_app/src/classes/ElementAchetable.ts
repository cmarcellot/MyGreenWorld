import { float, int } from "@babylonjs/core";

export class ElementAchetable {

    idElement : string ;
    nom : string;
    desc : string;
    prix : float;
    gainParSec : float;
    bonusEco : int;


constructor (idElement: string, nom : string ,desc : string, prix : float, gainParSec : float, bonusEco : int ) {
    this.idElement=idElement;
    this.desc = desc;
    this.nom = nom,
    this.prix = prix;
    this.gainParSec= gainParSec;
    this.bonusEco = bonusEco

}




}