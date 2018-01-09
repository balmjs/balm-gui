<template>
  <div class="tpl-icon">
    <img :src="src">
  </div>
</template>
<script>
  const source = [
    '',
    require('../../../images/html.svg'),
    require('../../../images/vue.svg'),
    require('../../../images/vue.svg'),
    require('../../../images/vue.svg'),
    require('../../../images/angular.svg'),
    require('../../../images/react.svg'),
    require('../../../images/react.svg'),
    require('../../../images/electron.svg')
  ];

  export default {
    props: ['tpl'],
    computed: {
      styles(){
        return {backgroundImage : `url(${this.src})`};
      },
      src(){
        return source[this.tpl];
      }
    }
  }
</script>
