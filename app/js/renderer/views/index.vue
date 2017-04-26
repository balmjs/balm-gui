<template>
  <div class="content">
    <div class="navigator">
      <ui-button effect colored fab class="primary" title="New Program" @click.native="goToAdd">
        <i class="material-icons">add</i>
      </ui-button>
    </div>
    <div class="program-list">
      <div class="item" v-for="item in list">
        <div class="name">{{item.name}}</div>
        <div class="path">{{item.path}}</div>
        <div class="createTime">{{$moment(item.createTime).format('YYYY-MM-DD, hh:mm:ss')}}</div>
        <div class="modifyTime">{{$moment(item.lastModifyTime).format('YYYY-MM-DD, hh:mm:ss')}}</div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    computed: {
      list(){
        return this.$store.state.programs.list;
      }
    },
    methods: {
      goToAdd(){
        this.$router.push('/add/program');
      }
    },
    created(){

    }
  };
</script>
