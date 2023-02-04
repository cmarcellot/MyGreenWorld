<template>
  <div id="app"><BabylonScene /></div>
  <!-- Pour mettre la boutique à droite on pourait faire un un bouton qui affiche ou cache une div ici :
    <div class="store"></div> --> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BabylonScene from './components/BabylonScene.vue';

export default defineComponent({
  name: 'App',
  components: {
    BabylonScene
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
  padding: 2rem;
}

</style>
