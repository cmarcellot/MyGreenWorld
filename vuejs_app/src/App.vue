<template>
  <div id="app"><BabylonScene /></div>
  <!-- Pour mettre la boutique à droite on pourait faire un un bouton qui affiche ou cache une div ici : --> 
  <div id="store"><MenuBoutique /></div>
  <div id="cash" >
    <ProgCash/>
  </div>
  <div id="ecology ">
    <ProgEcology/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BabylonScene from './components/BabylonScene.vue';
import MenuBoutique from './components/MenuBoutique.vue';
import ProgEcology from './components/ProgEcology.vue';
import ProgCash from './components/ProgCash.vue';

export default defineComponent({
  name: 'App',
  components: {
    BabylonScene,
    MenuBoutique,
    ProgEcology,
    ProgCash
}
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: white;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  

}

#store {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #111;
  position: left;
  
}

#barre {

  position: fixed;
  right: 0;
  top : 50%;
  width: 20%;

}

#cash {

  position: fixed;
    right: 50%;
    top : 10%;
    left: 57%;
    color: aliceblue;

}

#ecology {
  
  position: relative;
    right: 100%;
    top : 10%;
    left: 50%;
    color: blueviolet;

}

</style>
