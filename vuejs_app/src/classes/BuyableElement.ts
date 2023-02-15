import { float, int } from "@babylonjs/core";
// this class represents all our buyable elements
/** 
 * Attributes
 * 
elementId : given id in the database
name : element's name
desc : the description of the element
price : the price of the element
gainPerSec : the gain the element can provide per second
ecoBonus : the ecological bonus provided by the element
*/


export class BuyableElement {

    elementId : string ;
    name : string;
    desc : string;
    price : float;
    gainPerSec : float;
    ecoBonus : int;
    

// Constructor of the class's objects with 
/**
 * Arguments
 * 
elementId : given id in the database
name : element's name
desc : the description of the element
price : the price of the element
gainPerSec : the gain the element can provide per second
ecoBonus : the ecological bonus provided by the element
 */



constructor (elementId: string, name : string ,desc : string, price : float, gainPerSec : float, ecoBonus : int ) {
    this.elementId=elementId;
    this.desc = desc;
    this.name = name,
    this.price = price;
    this.gainPerSec= gainPerSec;
    this.ecoBonus = ecoBonus

}




}