import { float, int } from "@babylonjs/core";
import { BuyableElement } from "./BuyableElement";

/**  this class represents all our buildings provinding energy, it extends the class BuyableElement 
 * Attributes
 * 
boughtNumber: number of commerces bought by the player
*/

export class Commerce extends BuyableElement {

    boughtNumber : int;
    
    /** the constructor method calls the super() method : constructor of the parent class BuyableElement
     * Arguments
     * 
    elementId : given id in the database
    name : element's name
    desc : the description of the element
    price : the price of the element
    gainPerSec : the gain the element can provide per second
    ecoBonus : the ecological bonus provided by the element
    boughtNumber: number of commerces bought by the player
    */

    constructor(elementId: string, name : string ,desc : string, price : float, gainPerSec : float, ecoBonus : int,boughtNumber : int ){
        super(elementId,name, desc, price, gainPerSec,ecoBonus);
        this.boughtNumber=boughtNumber;
    }

getNextPrice () :  void {

    //
}

    

}


