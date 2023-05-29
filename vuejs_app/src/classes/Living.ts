import { float, int } from "@babylonjs/core";
import { BuyableElement } from "./BuyableElement";
/**  this class represents all our buildings provinding living, it extends the class BuyableElement 
 * Attributes
 * 
boughtNumber: number of commerces bought by the player
*/

export class Living extends BuyableElement {

    boughtNumber : int;
    modelName : string;
    picture : string;

     /** the constructor method calls the super() method : constructor of the parent class BuyableElement
     * Arguments
     * 
    elementId : given id in the database
    name : element's name
    desc : the description of the element
    price : the price of the element
    gainPerSec : the gain the element can provide per second
    ecoBonus : the ecological bonus provided by the element
    boughtNumber: number of livings bought by the player
    */


    constructor(boughtNumber : int, elementId: string, name : string, desc : string, price : float, gainPerSec : float, ecoBonus : int, picture : string, modelName : string){
        super(elementId, name, desc, price, gainPerSec, ecoBonus);
        this.boughtNumber=boughtNumber;
        this.picture = picture;
        this.modelName=modelName;

    }


    getNextPrice () :  void {

        //
    } 
}
