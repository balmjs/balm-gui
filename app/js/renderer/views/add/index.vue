<template>
  <transition name="zoom">
    <component :is="action" :class="[action]"></component>
  </transition>
</template>

<script>
  import program from './program';

  const actions = ['program'];

  export default {
    components: {
      program
    },
    computed: {
      action(){
        let actionParam = this.$route.params.action;

        return actions.indexOf(actionParam) > -1 ? actionParam : 'index';
      }
    }
  }
</script>
