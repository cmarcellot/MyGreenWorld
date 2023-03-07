<template>
    <nav class="side-nav">
      <div class="wrapper">
        <div class="three-dots-container">
          <div class="dot d1"></div>
          <div class="dot d2"></div>
          <div class="dot d3"></div>
        </div>
        <!-- Contenu du menu -->
        <div class="nav-bloc n-1" @click="toggleContent1">
          <p id="n-1" class="nom1">HABITATIONS ET COMMERCES</p>  
        </div>
        <div id="content-1" class="nav-item" v-show="showContent1">
          <p  class="nom2">{{ nom1 }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="prix">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainParSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav-item" v-show="showContent1">
          <p  class="nom2">{{ nom2 }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCityTree.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc2 }}</p>
              <hr class="separator">
              <p class="prix">{{ prix2 }}€</p>
              <hr class="separator">
              <p class="gainParSec">{{ gainParSec2 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco2 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav-item" v-show="showContent1">
          <p  class="nom2">{{ nom1 }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="prix">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainParSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav-item" v-show="showContent1">
          <p  class="nom2">{{ nom1 }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="prix">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainParSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav-item" v-show="showContent1">
          <p  class="nom2">{{ nom1 }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="prix">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainParSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div id="content-1" class="nav-item" v-show="showContent1">
          <p  class="nom2">{{ nom1 }}</p>
          <div class="container">
            <img class="image" src="../../public/images/greenCity.jpg" alt="Image de la maison">
            <div class="text-container">
              <p class="description">{{ desc1 }}</p>
              <hr class="separator">
              <p class="prix">{{ prix1 }}€</p>
              <hr class="separator">
              <p class="gainParSec">{{ gainParSec1 }}/sec</p>
              <hr class="separator">
              <p class="bonusEco">{{ bonusEco1 }}%</p>
            </div>
          </div>
        </div>
        <div class="nav-bloc n-2" @click="toggleContent2">
          <p id="n-2" class="nom1">CENTRALES ÉLECTRIQUES</p>      
        </div>
        <div id="content-1" class="nav-item" v-show="showContent2">
          <p  class="nom2">Centrale à charbon</p>  
        </div>
        <div id="content-1" class="nav-item" v-show="showContent2">
          <p  class="nom2">Centrale nucléaire</p>  
        </div>
        <div class="nav-bloc n-3" @click="toggleContent3">
          <p id="n-3" class="nom1">AMÉLIORATIONS</p>      
        </div>
        <div id="content-1" class="nav-item" v-show="showContent3">
          <p  class="nom2">Chauffage écologique</p>  
        </div>
        <div id="content-1" class="nav-item" v-show="showContent3">
          <p  class="nom2">Luminaires automotiques</p>  
        </div>
      </div>
    </nav>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
  name: 'MenuBoutique',
  data() {
    return {
      showContent1: false,
      showContent2: false,
      showContent3: false,
      // Exemple de données de le bungalow et de la maison simple
      // A récupérer par la suite via les objets (dans une liste)
      nom1: "Bungalow",
      desc1: "Un bungalow pour 4 personnes",
      prix1: 50,
      gainParSec1: 0.1,
      bonusEco1: -1,
      nom2: "Maison simple",
      desc2: "Une maison pour 4 personnes",
      prix2: 500,
      gainParSec2: 1,
      bonusEco2: -5,
      // test avec une grosse description
      desc3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nunc, eget aliquam nisl nunc",
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

/* Nouveau context de positionnement */
.side-nav {
  position: fixed;
  height: 100vh;
  width: 5;
  /* Pour que le menu soit à droite */
  right: 0;
  top: 0;
  /* Pour afficher la barre de défilement si besoin*/
  overflow-y: auto;
}

/* Pour cacher la sous-navigation */
.wrapper {
  background: #222;
  height: 100vh;
  width: 50vh;
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

/* Pour gérer les types d'éléments de la boutique */
.nav-bloc {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f21e;
  background: #333;
  transition: all 0.3s ease-in-out;
  /*Enlève la selection du texte (selection bleu pour copier) quand on clique sur les éléments de la boutique */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Standard */
}
.nav-bloc:hover {
  background: #111;
}

/* Pour gérer le nom du type d'éléments de la boutique */
.nom1 {
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  text-align: center;
  margin: 0;
}

/* Pour gérer les bâtiments et améliorations de chaque type */
.nav-item {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f21e;
  background: #555;
  transition: all 0.3s ease-in-out;
  /*Enlève la selection du texte (selection bleu pour copier) quand on clique sur les éléments de la boutique */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Standard */
}
.nav-item:hover {
  background: #444;
  transform: translateX(-2%);
}

/* Pour gérer le nom de chaque bâtiment de la boutique */
.nom2{
  color: white;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
  font-weight: bold;
}

/* Pour gérer les bâtiment de la boutique (image, desc, prix,etc) */
.container {
  display: flex;
  align-items: center;
}
/* Pour gérer l'image de chaque bâtiment de la boutique */
.image {
  width: 75px;
  height: 75px;
  margin-right: 75px;
}
/* Pour gérer le texte de chaque bâtiment de la boutique */
.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Pour gérer les séparateurs entre les bâtiments de la boutique */
.separator {
  margin: 10px 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
</style>
  