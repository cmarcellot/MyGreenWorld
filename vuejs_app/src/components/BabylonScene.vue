<template>
  <main>
      <div id="loader">
        <p class="loadingText">Chargement du jeu...</p>
        <div id="loadingContainer">
          <div id="loadingBar"></div>
        </div>
        <p class="loadingText" id="percentLoaded">25%</p>
      </div>
      <p>My Green World</p>
      <canvas></canvas>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MainScene } from '@/babylonjs/MainScene';


export default defineComponent({
  name: 'BabylonScene',
  data() {
    return {
      // On initialise la propriété loaded à false
      loaded: false,
    };
  },
  props :[
    "city"
  ],
  mounted() {
    // On récupère le canvas et les éléments de chargement
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const loadingBar = document.getElementById("loadingBar") as HTMLElement;
    const percentLoaded = document.getElementById("percentLoaded") as HTMLElement;
    const loader = document.getElementById("loader") as HTMLElement;
    new MainScene(canvas, loadingBar, percentLoaded, loader, this.city);
   },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  width: 100%;
  right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position:fixed;
  
  
}
#loader {
  width: 100%;
  height: 100%;
  /*On peut choisir l'image de chargement. Par exemple avec greenCity.jpg*/
  background-image: url("../../public/images/greenCityTree.jpg");
  background-size: cover;
  background-position: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#loaded {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease;
}
#loadingContainer {
  width: 600px;
  height: 40px;
  background: rgba(0,0,0,1);
  border: 3px solid rgba(255,255,255,1);
  border-radius: 6px;
  box-shadow: 0px 0px 10px 5px rgba(255,255,255,0.2);
}
#loadingBar {
  height: 100%;
  background: #1DCD55;
  border-radius: 3px;
}

.loadingText {
  color: white;
  background: none;
  margin-bottom: 1rem;
  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 2rem;
}

p {
  color: black;
  background: none;
  margin-bottom: 1rem;
  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 2rem;
}
canvas {
  width: 90%;
  height: 90%;
  border: none;
  outline: none;
}
</style>
