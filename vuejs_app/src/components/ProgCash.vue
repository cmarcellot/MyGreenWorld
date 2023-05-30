<template>
    <div class="container">
       
        <b-progress height="20px" :value="value" show-progress class="mb-2"> 
            {{ getFormatFloat(value) }} </b-progress>

    </div>
</template>

<script>
import Bootstrap from 'bootstrap-vue';

export default {
  name: 'ProgCash',
  props: ["value"],
  methods: {
    getFormatFloat(number) {
      const roundedNumber = number.toFixed(1);
      let formattedNumber = parseFloat(roundedNumber).toLocaleString(undefined, { useGrouping: true });

      formattedNumber = this.formatNumber(number, 'short');

      return formattedNumber;
    },

    formatNumber(number, abbrevType) {
      const abbreviationsShort = ['', '', 'M', 'B', 'T', 'Q', 'Qu', 'Sx', 'Sp', 'O', 'N'];
      const abbreviationsLong = ['', '', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillions', 'septillion', 'octillion', 'nonillion'];
      const base = 1000;
      const decimals = 1;

      if (number < base) {
        return number.toFixed(decimals);
      }

      const abbreviations = abbrevType === 'long' ? abbreviationsLong : abbreviationsShort;
      const exponent = Math.min(Math.floor(Math.log10(number) / 3), abbreviations.length - 1);
      const scaledNumber = number / Math.pow(base, exponent);
      const formattedNumber = scaledNumber.toFixed(decimals);

      return formattedNumber + " " + abbreviations[exponent];
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    position: fixed;
    right: 100%;
    top : 5%;
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
        text-align: center;
       
    }
}


@keyframes animate-stripes {
    0% {background-position: 0 0; }
    100% {background-position: 0 0; }
}

</style>