<template>
    <nav class="side-nav col-lg-3">
      <div class="wrapper">

        <div class="three-dots-container">
          <div class="d1"> MY </div>
          <div class="d2"> GREEN </div>
          <div class="d3"> WORLD </div>
        </div>

        <div class="nav nav-bloc" @click="toggleContent1">
          <p class="title-item">HABITATIONS ET COMMERCES</p>  
        </div>
        <div v-for="(livingOrCommerce, index) in sortedLivingsCommerces(city)" :key="index" class="nav nav-item" v-show="showContent1">
          <p class="title-bloc">{{ livingOrCommerce.name }}</p>
          <div class="container">
            <img class="image" :src="require('../../public/images/' + livingOrCommerce.picture)" alt="Image habitation ou commerce" />
            <div class="text-container">
              <p class="price"> Prix: {{ Math.ceil(livingOrCommerce.price * Math.pow(1.15, livingOrCommerce.boughtNumber)) }}</p>
              <hr class="separator" />
              <p class="gainPerSec">Gain: {{ livingOrCommerce.gainPerSec }}/sec</p>
              <hr class="separator" />
              <p class="bonusEco">Écologie: {{ livingOrCommerce.ecoBonus }} %</p>
              <hr class="separator" />
              <p class="livingCount">Nombre achetés : {{ livingOrCommerce.boughtNumber }}</p>
            </div>
          </div>
          <button class="btn"
          v-on:click="BuyLivingOrCommerce(city, livingOrCommerce)" :class="{ 'disabled': city.cashQuantity < Math.ceil(livingOrCommerce.price * Math.pow(1.15, livingOrCommerce.boughtNumber)) }"> Acheter </button>
        </div>

        <div class="nav nav-bloc" @click="toggleContent2">
          <p class="title-item">CENTRALES ÉLECTRIQUES</p>      
        </div>
        <div v-for="(central, index) in sortedEnergies(city)" :key="index" class="nav nav-item" v-show="showContent2">
          <p class="title-bloc">{{ central.name }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCityTree.jpg" alt="Image de la centrale" />
            <div class="text-container">
              <p class="price"> Prix: {{ central.price }}</p>
              <hr class="separator" />
              <p class="gainPerSec">Gain: {{ central.gainPerSec }}/sec</p>
              <hr class="separator" />
              <p class="bonusEco">Écologie: {{ central.ecoBonus }} %</p>
            </div>
          </div>
          <button class="btn"
          v-on:click="BuyEnergy(city, central)" :class="{ 'disabled': city.cashQuantity < central.price }"> Acheter </button>
        </div>

        <div class="nav nav-bloc" @click="toggleContent3">
          <p class="title-item">AMÉLIORATIONS</p>      
        </div>
        <div v-for="(improvement, index) in sortedImprovements(city)" :key="index" class="nav nav-item" v-show="showContent3">
          <p class="title-bloc">{{ improvement.name }}</p>
          <div class="container">
            <div class="text-container">
              <p class="box">{{ improvement.desc }}</p>
              <hr class="separator" />
              <p class="price"> Prix: {{ improvement.price }}</p>
              <hr class="separator" />
              <p class="gainPerSec">Gain par seconde: {{ improvement.gainPerSec }}/sec</p>
              <hr class="separator" />
              <p class="gainPerClick">Gain par clique: {{ improvement.gainPerClick }}/clique</p>
              <hr class="separator" />
              <p class="bonusEco">Écologie: {{ improvement.ecoBonus }} %</p>
              <hr v-if="improvement.unlocked == true" class="separator" />
              <p v-if="improvement.unlocked == true" class="message">Amélioration déjà débloquée</p>
            </div>
          </div>
          <button v-if="improvement.unlocked == false" class="btn"
          v-on:click="BuyImprov(city, improvement)" :class="{ 'disabled': city.cashQuantity < improvement.price}"> Acheter </button>
        </div>

        <div class="nav nav-bloc" @click="toggleContent4">
          <p class="title-item">PARAMÈTRES</p>      
        </div>
        <div class="nav nav-item" v-show="showContent4">
          <button class="btn btn-red" @click="deleteSave">Supprimer sauvegarde</button>
        </div>

        <div class="nav nav-bloc" @click="toggleContent5">
          <p class="title-item">ADMINTOOLS</p>      
        </div>
        <div class="nav nav-item" v-show="showContent5">
          <p class="title-bloc">Ajouter argent</p>
          <div class="container">
            <button class="btn"
              v-on:click="Add1000(city)"> + 1.000 </button>
            <button class="btn"
              v-on:click="Add10000(city)"> +10.000 </button>
            <button class="btn"
              v-on:click="Add100000(city)"> + 100.000 </button>
          </div>
        </div>
      </div>
    </nav>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { Living } from '@/classes/Living';
import { Commerce } from '@/classes/Commerce';
import { Energy } from '@/classes/Energy';
import jsonData from '@/assets/storage.json';
import { City } from '@/classes/City';
import { float } from '@babylonjs/core/types';
import { Improvement } from '@/classes/Improvement';
import { BuyableElement } from '@/classes/BuyableElement';

export default defineComponent({
    name: 'StoreMenu',
    props :[
    "city"
  ],
    data() {
      return {
        showContent1: false,
        showContent2: false,
        showContent3: false,
        showContent4: false,
        showContent5: false,

        livings: [] as Living[],
        commerces: [] as Commerce[],
        energies: [] as Energy[],
        improvements: [] as Improvement[],   

      };
    },
    methods: {
      // Toggle the display of the content
      toggleContent1() {
        this.showContent1 = !this.showContent1;
      },
      toggleContent2() {
        this.showContent2 = !this.showContent2;
      },
      toggleContent3() {
        console.log(this.improvements);
        this.showContent3 = !this.showContent3;
      },
      toggleContent4() {
        this.showContent4 = !this.showContent4;
      },
      toggleContent5() {
        this.showContent5 = !this.showContent5;
      },

      // Sort the list of livings and commerces by price
      sortedLivingsCommerces(city : City) {
        const liste = this.livings.concat(this.commerces);
        city.livings = this.livings;
        city.commerces = this.commerces;
        return liste.sort((a, b) => a.price - b.price);
      },
      sortedEnergies(city : City) {
        city.energies = this.energies;
        return this.energies.sort((a, b) => a.price - b.price);
      },
      sortedImprovements(city : City) {
        city.improvements = this.improvements;
        return this.improvements.sort((a, b) => a.price - b.price);
      },

      //Compare the cashQuantity and the price 
      BuyLivingOrCommerce(city : City, livingOrCommerce: any) {
        this.playClickSound();
        city.buyLivingOrCommerce(livingOrCommerce);
      },

      BuyEnergy(city : City, energy : Energy){
        this.playClickSound();
        city.buyEco(energy);
      },

      BuyImprov (city : City, improvement : Improvement) {
        this.playClickSound();
        city.buyImprov(improvement);
      },

      Add1000(city : City) {
        this.playClickSound();
        city.cashQuantity += 1000;
      },

      Add10000(city : City) {
        this.playClickSound();
        city.cashQuantity += 10000;
      },

      Add100000(city : City) {
        this.playClickSound();
        city.cashQuantity += 100000;
      },

      playClickSound() {
        const audio = new Audio('/sounds/SonAchat.mp3');
        audio.play();
      },

      deleteSave() {
        //Request for confirmation of deletion
        if (confirm("Voulez-vous vraiment supprimer la sauvegarde ?")) {
          console.log("Suppression de la sauvegarde");
          localStorage.removeItem('cityData');
          //Refresh the page
          window.location.reload();
        } else {
          console.log("Annulation de la suppression");
        }
      },

      getSavedElement(elementId: string, type: string) {
        const savedCity = localStorage.getItem("cityData");
        if (savedCity) {
          const cityData = JSON.parse(savedCity);
          const { livings, commerces, energies, improvements } = cityData;

          switch (type) {
            case "living":
              for (const living of livings) {
                if (living.elementId === elementId) {
                  return living;
                }
              }
              break;

            case "commerce":
              for (const commerce of commerces) {
                if (commerce.elementId === elementId) {
                  return commerce;
                }
              }
              break;

            case "energy":
              for (const energy of energies) {
                if (energy.elementId === elementId) {
                  return energy;
                }
              }
              break;

            case "improvement":
              for (const improvement of improvements) {
                if (improvement.elementId === elementId) {
                  return improvement;
                }
              }
              break;

            default:
              break;
          }
        }
        return null;
      }

      // buyEnergy(price : float, gainPerSec : number, ecoBonus : number) {
      // if (this.City.cashQuantity > price) {
      //   console.log('initial' + this.City.cashQuantity);
      //   this.City.cashQuantity -= price;
      //   console.log('Produit acheté avec succès !');
      //   console.log('modif' + this.City.cashQuantity);
      //   console.log('initial' + this.City.ecoPourcentage+ ' et ' + this.City.gainPerSec)
      //   console.log(this.City.ecoPourcentage += ecoBonus);
      //   console.log(this.City.gainPerSec += gainPerSec);
        
      // } 
      
      // else {
      //   console.log("Vous n'avez pas assez d'argent pour acheter le produit.");
      //   }
      // },

    },
    created(){
      // Create objects from json data
      for (const livingData of jsonData.livings) {
        console.log(livingData);
        const savedLiving = this.getSavedElement(livingData.id.toString(), 'living');
        const living = savedLiving ? savedLiving : new Living(
          0,
          livingData.id.toString(),
          livingData.name,
          livingData.description,
          livingData.price,
          livingData.gainPerSec,
          livingData.ecoBonus,
          livingData.picture
        );
        this.livings.push(living);
      }

      for (const commerceData of jsonData.commerces) {
        console.log(commerceData);
        const savedCommerce = this.getSavedElement(commerceData.id.toString(), 'commerce');
        const commerce = savedCommerce ? savedCommerce : new Commerce(
          0,
          commerceData.id.toString(),
          commerceData.name,
          commerceData.description,
          commerceData.price,
          commerceData.gainPerSec,
          commerceData.ecoBonus,
          commerceData.picture
        );
        this.commerces.push(commerce);
      }

      for (const energyData of jsonData.energies) {
        const savedEnergy = this.getSavedElement(energyData.id.toString(), 'energy');
        const energy = savedEnergy ? savedEnergy : new Energy(
          energyData.id.toString(),
          energyData.name,
          energyData.description,
          energyData.price,
          energyData.gainPerSec,
          energyData.ecoBonus
        );
        this.energies.push(energy);
      }

      for (const improvementData of jsonData.improvements) {
        const savedImprovement = this.getSavedElement(improvementData.id.toString(), 'improvement');
        const improvement = savedImprovement ? savedImprovement : new Improvement(
          improvementData.id.toString(),
          improvementData.name,
          improvementData.desc,
          improvementData.price,
          improvementData.gainPerSec,
          improvementData.ecoBonus,
          improvementData.gainPerClick,
          false,
          0
        );
        this.improvements.push(improvement);
      }
    }
  });
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.three-dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.dot {
  flex-shrink: 0;
  margin: 10px 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
}
.d1 {
  color : darkgreen;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;


}
.d2 {
  color: green;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;


}
.d3 {
  color: lightgreen;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;


}

/* New positioning context */
.side-nav {
  position: fixed;
  height: 100vh;
  /* For right side */
  right: 0;
  top: 0;
  /* For showing the scroll bar */
  overflow-y: auto;
}

/* For hiding the sub-navigation */
.wrapper {
  background: #222;
  height: 100vh;
  width: 50vh;
}

/* For showing the different elements of the store */
.nav {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f21e;
  transition: all 0.3s ease-in-out;
  /* Remove text selection (blue selection) when clicking on shop items */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Standard */
}

/* For managing the types of elements of the store */
.nav-bloc {
  background: #333;
}
.nav-bloc:hover {
  background: #111;
}

/* For managing the name/title of the type of elements of the store */
.title-item {
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  text-align: center;
  margin: 0;
}

/* For managing the buildings and improvements of each type */
.nav-item {
  background: #555;
  text-align: center;  
  align-items: center;
  flex-direction: column;
}
.nav-item:hover {
  background: #444;
  transform: translateX(-2%);
}

/* For managing the name/title of each building of the store */
.title-bloc{
  color: white;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
  font-weight: bold;
}

/* For managing the buildings of the store (image, desc, price, etc) */
.container {
  display: flex;
  align-items: center;
}
/* For managing the image of each building of the store */
.image {
  width: 100px;
  height: 100px;
  margin-right: 100px;
}
/* For managing the text of each building of the store */
.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* For managing the separators between each building of the store */
.separator {
  margin: 10px 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.btn {
  border-radius: 20px;
  padding: 10px 15px;
  background-color: white;
  color: #444;
  border:rgb(250, 250, 250);
  cursor: pointer;
  position: relative;
  top: 10px;
  font-weight:400;
}

.message {
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.box {
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  padding: 10px;
  background-color: #6e6e6e;
  border-bottom: #000;
  overflow: auto;
}

.btn-red {
  text-align: center;
  background-color: red;
  color: white;
}

</style>
  