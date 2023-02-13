<template>
    <nav class="side-nav">
      <div class="wrapper">
        <div class="three-dots-container">
          <div class="dot d1"></div>
          <div class="dot d2"></div>
          <div class="dot d3"></div>
        </div>
        <div class="nav nav-bloc" @click="toggleContent1">
          <p class="title-item">HABITATIONS ET COMMERCES</p>  
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent1">
          <p  class="title-bloc">{{ nomB }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="price">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainPerSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent1">
          <p  class="title-bloc">{{ nomM }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCityTree.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc2 }}</p>
              <hr class="separator">
              <p class="price">{{ prix2 }}€</p>
              <hr class="separator">
              <p class="gainPerSec">{{ gainParSec2 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco2 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent1">
          <p  class="title-bloc">{{ nomB }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="price">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainPerSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent1">
          <p  class="title-bloc">{{ nomB }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="price">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainPerSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent1">
          <p  class="title-bloc">{{ nomB }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="price">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainPerSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent1">
          <p  class="title-bloc">{{ nomB }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="price">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainPerSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div class="nav nav-bloc" @click="toggleContent2">
          <p class="title-item">CENTRALES ÉLECTRIQUES</p>      
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent2">
          <p  class="title-bloc">Centrale à charbon</p>  
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent2">
          <p  class="title-bloc">Centrale nucléaire</p>  
        </div>
        <div class="nav nav-bloc" @click="toggleContent3">
          <p class="title-item">AMÉLIORATIONS</p>      
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent3">
          <p  class="title-bloc">Chauffage écologique</p>  
        </div>
        <div id="content-1" class="nav nav-item" v-show="showContent3">
          <p  class="title-bloc">Luminaires automotiques</p>  
        </div>
      </div>
    </nav>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
  name: 'StoreMenu',
  data() {
    return {
      showContent1: false,
      showContent2: false,
      showContent3: false,
      // Exemple de données de le bungalow et de la maison simple
      // A récupérer par la suite via les objets dans une liste 
      // (exemple: for sur listeHabitations.nom , listeHabitations.desc, listeHabitations.prix, listeHabitations.gainParSec, listeHabitations.bonusEco)
      nomB: "Bungalow",
      desc1: "Un bungalow pour 4 personnes",
      prix1: 50,
      gainParSec1: 0.1,
      bonusEco1: -1,
      nomM: "Maison simple",
      desc2: "Une maison pour 4 personnes",
      prix2: 500,
      gainParSec2: 1,
      bonusEco2: -5,
    };
  },
  methods: {
    toggleContent1() {
      this.showContent1 = !this.showContent1;
    },
    toggleContent2() {
      this.showContent2 = !this.showContent2;
    },
    toggleContent3() {
      this.showContent3 = !this.showContent3;
    },
  },
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
</style>
  