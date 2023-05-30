<template>
    <div id="soundIcon" @click="toggleSound">
      <font-awesome-icon :icon="soundOn ? 'volume-up' : 'volume-mute'"></font-awesome-icon>
    </div>
    <div class="container">
       
       <b-progress height="20px" :value="value" show-progress class="mb-2"> 
           {{ value % 1 === 0 ? value : value.toFixed(1) }}  % </b-progress>

   </div>
</template>

<script>
import { soundManager } from '@/babylonjs/SoundManager';
import Bootstrap from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    
    name: 'ProgEcology',
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            // We initialize the soundOn property to true
            soundOn: true,
            audioContext: null
        };
    },
    props :[
        "value"
    ],
    computed : {
        percent() {

            return this.percentage.toFixed();
        }
    },
    mounted() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },
    methods: {
        toggleSound() {
            if (this.soundOn) {
                soundManager.disableSound();
            } else {
                soundManager.enableSound();
            }
            
            this.soundOn = !this.soundOn;
        }
    },

    created () {
        var intval = setInterval(() => {
            if(this.percentage < 100)
                this.percentage += .1;
            else
                clearInterval(intval);

            
        }, 10);
    }

}
</script>

<style lang="scss" scoped>

.container {
    position: fixed;
    right: 100%;
    top : 5%;
    left: 10%;
    width : 100px;
    height: 20px;
    border-radius: 15px;
    overflow: hidden;
    border-bottom:1px solid #000000;
    box-shadow: inset 0 1px 2px rgba($color: (#000), $alpha: .4),
    0 -1px 1px #000000, 0 1px 0 #000000;
    
    .mb-2 {
        position: absolute;
        top: 1px; left:1px ; right: 1px;
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 15px;
        background-color: #764b0b ;
        background-size: 30px 30px;
        background-image: linear-gradient(135deg,rgba($color: (#000000), $alpha: .15)25%, transparent 50%, 
        rgba($color: (#000000), $alpha: .15) 75%, transparent 75%, transparent );
        animation: animate-stripes 3s linear infinite ;
        text-align: center;
        color: aliceblue;
       
    }
}

@keyframes animate-stripes {
    0% {background-position: 0 0; }
    100% {background-position: 0 0; }
}

#soundIcon {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 9999;
  cursor: pointer;
  color: white;
  font-size: 24px;
}

</style>