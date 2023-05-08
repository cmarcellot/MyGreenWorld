<template>
    <nav class="side-nav col-lg-3">
      <div class="wrapper">

        <div class="three-dots-container">
          <div class="dot d1"></div>
          <div class="dot d2"></div>
          <div class="dot d3"></div>
        </div>

        <div class="nav nav-bloc" @click="toggleContent1">
          <p class="title-item">HABITATIONS ET COMMERCES</p>  
        </div>
        <div v-for="(living, index) in sortedLivingsCommerces()" :key="index" class="nav nav-item" v-show="showContent1">
          <p class="title-bloc">{{ living.name }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison" />
            <div class="text-container">
              <p class="description">{{ living.desc }}</p>
              <hr class="separator" />
              <p class="price"> Prix: {{ living.price }} €</p>
              <hr class="separator" />
              <p class="gainPerSec">Gains: {{ living.gainPerSec }}/sec</p>
              <hr class="separator" />
              <p class="bonusEco">Écologie: {{ living.ecoBonus }} %</p>
            </div>
          </div>
          <button class="btn"
          v-on:click="BuyLiving(city, living)" :class="{ 'disabled': city.cashQuantity < living.price }"> Acheter </button>
        </div>

        <div class="nav nav-bloc" @click="toggleContent2">
          <p class="title-item">CENTRALES ÉLECTRIQUES</p>      
        </div>
        <div v-for="(central, index) in sortedEnergies()" :key="index" class="nav nav-item" v-show="showContent2">
          <p class="title-bloc">{{ central.name }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCityTree.jpg" alt="Image de la centrale" />
            <div class="text-container">
              <p class="description">{{ central.desc }}</p>
              <hr class="separator" />
              <p class="price"> Prix: {{ central.price }} €</p>
              <hr class="separator" />
              <p class="gainPerSec">Gains: {{ central.gainPerSec }}/sec</p>
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
        <div v-for="(improvement, index) in sortedImprovements()" :key="index" class="nav nav-item" v-show="showContent3">
          <p class="title-bloc">{{ improvement.name }}</p>
          <div class="container">
            <div class="text-container">
              <p class="description">{{ improvement.desc }}</p>
              <hr class="separator" />
              <p class="price"> Prix: {{ improvement.price }} €</p>
              <hr class="separator" />
              <p class="gainPerSec">Gains: {{ improvement.gainPerSec }}/sec</p>
              <hr class="separator" />
              <p class="bonusEco">Écologie: {{ improvement.ecoBonus }} %</p>
            </div>
          </div>
          <button class="btn"
          v-on:click="BuyImprov(city, improvement)" :class="{ 'disabled': city.cashQuantity < improvement.price }"> Acheter </button>
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
import { float, int } from '@babylonjs/core';
import { Improvement } from '@/classes/Improvement';
  

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

      // Sort the list of livings and commerces by price
      sortedLivingsCommerces() {
        const liste = this.livings.concat(this.commerces);
        return liste.sort((a, b) => a.price - b.price);
      },
      sortedEnergies() {
        return this.energies.sort((a, b) => a.price - b.price);
      },
      sortedImprovements() {
        return this.improvements.sort((a, b) => a.price - b.price);
      },

 //Compare the cashQuantity and the price 
      BuyLiving(city : City, living: Living) {
      
        city.buyLiv(living);
        
      },

      BuyEnergy(city : City, energy : Energy){

        city.buyEco(energy);

      },

      BuyImprov (city : City, improvement : Improvement) {

        city.buyImprov(improvement);

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
      for (const living of jsonData.livings) {
        this.livings.push(new Living(
          0, 
          living.id.toString(), 
          living.name, 
          living.description, 
          living.price, 
          living.gainPerSec, 
          living.ecoBonus
        ));
      }

      for (const commerce of jsonData.commerces) {
        this.commerces.push(new Commerce(
          0,
          commerce.id.toString(),
          commerce.name,
          commerce.description,
          commerce.price,
          commerce.gainPerSec,
          commerce.ecoBonus
        ));
      }

      for (const energy of jsonData.energies) {
        this.energies.push(new Energy(
          energy.id.toString(),
          energy.name,
          energy.description,
          energy.price,
          energy.gainPerSec,
          energy.ecoBonus));
      }

      for (const improvement of jsonData.improvements) {
        this.improvements.push(new Improvement(
          improvement.id.toString(),
          improvement.name,
          improvement.desc,
          improvement.price,
          improvement.gainPerSec,
          improvement.ecoBonus,
          improvement.gainPerClick,
          false,
          0));
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
.d1 {background: darkgreen;}
.d2 {background: green;}
.d3 {background: lightgreen;}

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
  width: 45vh;
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
  width: 75px;
  height: 75px;
  margin-right: 75px;
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

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

</style>
  