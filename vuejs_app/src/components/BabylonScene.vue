<template>
  <div>
    <p>My Green World</p>
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MainScene } from '@/babylonjs/MainScene';

export default defineComponent({
  name: 'BabylonScene',
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new MainScene(canvas);
   },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: black;
  background: none;
  margin-bottom: 1rem;
  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 2rem;
}
canvas {
  width: 70%;
  height: 70%;
  border: none;
  outline: none;
}
</style>
