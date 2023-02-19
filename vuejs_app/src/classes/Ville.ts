import { float, int } from "@babylonjs/core";
import {Amelioration } from "./Amelioration";
import {BatHabitation } from "./BatHabitation";
import {BatCommerce } from "./BatCommerce";
import {BatEnergie } from "./BatEnergie";

export class Ville {
    nom : string;
    qteCash: float;
    pourcentEco:float;
    gainParClique:float;
    gainParSeconde:float;
    ameliorations : Array <Amelioration>;
    habitations: Array<BatHabitation>;
    commerces: Array<BatCommerce>;
    energies :Array<BatEnergie>;
    constructor(
        nom : string,
        qteCash: float,
        pourcentEco:float,
        gainParClique:float,
        gainParSeconde:float){
        this.nom = nom;
        this.qteCash=qteCash;
        this.pourcentEco=pourcentEco;
        this.gainParClique= gainParClique;
        this.gainParSeconde= gainParSeconde;
        this.ameliorations=[];
        this.habitations= [];
        this.commerces=[];
        this.energies =[];
    }
}