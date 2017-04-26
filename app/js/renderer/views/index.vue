<template>
  <div class="content">
    <div class="navigator">
      <ui-button effect colored fab class="primary" title="New Program" @click.native="goToAdd">
        <i class="material-icons">add</i>
      </ui-button>
    </div>
  </div>
</template>
<script>
  import {exec} from 'child_process';

  export default {
    methods: {
      goToAdd(){
        this.$router.push('/add/program');
      }
    }
  };
</script>
