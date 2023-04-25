<template>
    <div class="container">
      <b-progress height="20px" :value="value" show-progress class="mb-2">{{ value }}</b-progress>
    </div>
  </template>
  
  <script lang="ts">
  
  export default {
    name: 'ProgCash',
    props :[
        "value"
    ]
  };
  </script>

<style lang="scss" scoped>
.container {
    position: fixed;
    right: 100%;
    top : 10%;
    left: 60%;
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

       
    }
}

@keyframes animate-stripes {
    0% {background-position: 0 0; }
    100% {background-position: 0 0; }
}

</style>