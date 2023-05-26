import { float, int } from "@babylonjs/core";
import {Improvement } from "./Improvement";
import {Living } from "./Living";
import {Commerce } from "./Commerce";
import {Energy } from "./Energy";
import { BuyableElement } from "./BuyableElement";

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
    constructor(name : string, cashQuantity: float, ecoPourcentage:float, gainPerClick:float, gainPerSec:float){
      this.name = name;
      this.cashQuantity=cashQuantity;
      this.ecoPourcentage=ecoPourcentage;
      this.gainPerClick= gainPerClick;
      this.gainPerSec= gainPerSec;
      this.improvements=[];
      this.livings= [];
      this.commerces=[];
      this.energies =[];
      this.loadCity();
      this.saveCity();
    }
    
    
    incrementCashQuantity() {
      this.cashQuantity = this.cashQuantity + this.gainPerClick;
    }

    buyLivingOrCommerce(livingOrCommerce: any) {
      if (this.cashQuantity >= livingOrCommerce.price) {
        this.cashQuantity -= livingOrCommerce.price;
        console.log('Produit acheté avec succès !');
        console.log('modif' + this.cashQuantity);
        this.ecoPourcentage += livingOrCommerce.ecoBonus;
        this.gainPerSec += livingOrCommerce.gainPerSec;
        livingOrCommerce.boughtNumber++;
      } else {
        console.log("Vous n'avez pas assez d'argent pour acheter le produit.");
      }
    }

    buyEco(energy : Energy) {
      if (this.cashQuantity >= energy.price) {
        this.cashQuantity -= energy.price;
        console.log('Produit acheté avec succès !');
        console.log('modif' + this.cashQuantity);
        this.ecoPourcentage += energy.ecoBonus;
        this.gainPerSec += energy.gainPerSec;
      } 
      else {
        console.log("Vous n'avez pas assez d'argent pour acheter le produit.");
      }
    }

    updateCash() {
      setInterval(() => {
        this.cashQuantity += this.gainPerSec * (this.ecoPourcentage / 100);
      }, 1000);
    }

    buyImprov(improvement : Improvement) {
      if (this.cashQuantity >= improvement.price) {
        this.cashQuantity -= improvement.price;
        console.log('Produit acheté avec succès !');
        console.log('modif' + this.cashQuantity);
        this.ecoPourcentage += improvement.ecoBonus;
        this.gainPerSec += improvement.gainPerSec;
        this.gainPerClick += improvement.gainPerClick;
        improvement.unlocked = true;
      } 
      else {
        console.log("Vous n'avez pas assez d'argent pour acheter le produit.");
      }
    }

    playTreeSound() {
      const audio = new Audio('/sounds/SonArbre.mp3');
      audio.play();
    }

    saveCity() {
      setInterval(() => {
        if(this.gainPerSec > 0 || this.cashQuantity > 0){
          localStorage.removeItem("cityData");
          localStorage.setItem("cityData", JSON.stringify(this));
          console.log("Ville sauvegardée avec succès !");
        }
      }, 60000);
    }
  
    loadCity() {
      const savedCity = localStorage.getItem("cityData");
      if (savedCity) {
        const parsedCity = JSON.parse(savedCity);
        Object.assign(this, parsedCity);
        console.log("Ville chargée avec succès !");
      } else {
        console.log("Aucune ville sauvegardée.");
      }
    }

}
