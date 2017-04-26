<template>
  <div :class="className">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    computed: {
      className(){
        return this.$route.meta.className || [];
      }
    },
    created(){

    }
  }
</script>
