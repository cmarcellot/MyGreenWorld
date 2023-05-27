<template>
  <div id="app"><BabylonScene :city ="city" /></div>
  <!-- To put the store in the right side we can make a button that shows or hides a div here :
    <div class="store"></div> --> 
  <div id="store"><StoreMenu :city ="city"  /></div>
  <!-- prog means progressiv -->
  <div id="cash">
    <ProgCash :value = "city.cashQuantity" />
  </div>
  <div id="ecology">
    <ProgEcology :value = "city.ecoPourcentage"> </ProgEcology>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BabylonScene from './components/BabylonScene.vue';
import ProgEcology from './components/ProgEcology.vue';
import ProgCash from './components/ProgCash.vue';
import StoreMenu from './components/StoreMenu.vue';
import {City} from './classes/City';
import {MainScene} from '@/babylonjs/MainScene';

export default defineComponent({
  name: 'App',

  components: {
    BabylonScene,
    ProgEcology,
    ProgCash,
    StoreMenu
  },
  data() {
    return {
      city: new City("MyGreenWorld",0, 100, 1, 0),
    }
  },
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
