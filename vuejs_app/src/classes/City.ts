import { float, int } from "@babylonjs/core";
import {Improvement } from "./Improvement";
import {Living } from "./Living";
import {Commerce } from "./Commerce";
import {Energy } from "./Energy";
/**  this class represents the player's city 
 * Attributes
 * name : the city's name given by the player
 * cashQuantity : the cash possessed 
 * ecoPourcentage : pourcentage representing the ecological situation of the city
 * gainPerClick : the gain per click  provided by the city's buyable elements
 * gainPerSec : the gain per second provided by the city's buyable elements
 * improvements : a list of improvements bought by the player
 * livings : a list of livings bought by the player
 * commerces : a list of commerces bought by the player
 * energies : a list of commerces bought by the player
*/

export class City {
    name : string;
    cashQuantity: float;
    ecoPourcentage:float;
    gainPerClick:float;
    gainPerSec:float;
    improvements : Array <Improvement>;
    livings: Array<Living>;
    commerces: Array<Commerce>;
    energies :Array<Energy>;
    // Constructor of the class's objects with 
/**
 * Arguments
 * name : the city's name given by the player
 * cashQuantity : the cash possessed 
 * ecoPourcentage : pourcentage representing the ecological situation of the city
 * gainPerClick : the gain per click  provided by the city's buyable elements
 * gainPerSec : the gain per second provided by the city's buyable elements
 * livings : a list of livings bought by the player
 * improvements : a list of improvements bought by the player
 * commerces : a list of commerces bought by the player
 * energies : a list of commerces bought by the player
 */
    constructor(
        name : string,
        cashQuantity: float,
        ecoPourcentage:float,
        gainPerClick:float,
        gainPerSec:float){
        this.name = name;
        this.cashQuantity=cashQuantity;
        this.ecoPourcentage=ecoPourcentage;
        this.gainPerClick= gainPerClick;
        this.gainPerSec= gainPerSec;
        this.improvements=[];
        this.livings= [];
        this.commerces=[];
        this.energies =[];
    }
    
    
    incrementCashQuantity() {
        this.cashQuantity = this.cashQuantity + this.gainPerClick;
    }

}
