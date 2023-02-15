import { float, int } from "@babylonjs/core";
 import {BuyableElement} from "././BuyableElement";
 /**  this class represents all our improvements, it exdents the class BuyableElement 
 * Attributes
 * 
elementId : given id in the database
name : element's name
desc : the description of the element
price : the price of the element
gainPerSec : the gain the element can provide per second
ecoBonus : the ecological bonus provided by the element
gainPerClick : the provided gain per click
unlocked : a boolean that expresses if the element is locked or not
boughtNumber: number of improvements bought by the player
*/
export class Improvement extends BuyableElement {
    gainPerClick: float;
    unlocked: boolean;
    boughtNumber: boolean;  
    /** the constructor method calls the super() method : constructor of the parent class BuyableElement
     * Arguments
     * 
    elementId : given id in the database
    name : element's name
    desc : the description of the element
    price : the price of the element
    gainPerSec : the gain the element can provide per second
    ecoBonus : the ecological bonus provided by the element
    gainPerClick : the provided gain per click
    unlocked : a boolean that expresses if the element is locked or not
    boughtNumber: number of improvements bought by the player
    */
    constructor(elementId: string, 
        name : string,
        desc : string,
        price : float, 
        gainPerSec : float,
        ecoBonus : int,
        gainPerClick: float,
        unlocked: boolean,
        boughtNumber: boolean, 
        ){
            super(elementId,name, desc, price, gainPerSec,ecoBonus);
            this.gainPerClick= gainPerClick;
            this.unlocked = unlocked;
            this.boughtNumber= boughtNumber;

    }

}