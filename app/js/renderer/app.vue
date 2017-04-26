<template>
  <div :class="className">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    methods: {
      ...mapActions([
        'updatePrograms'
      ])
    },
    computed: {
      className(){
        return this.$route.meta.className || [];
      }
    },
    created(){
      // TODO: 获取项目列表和配置数据，存于store中
      this.$_event.$on('getProgramsDone', (data)=>{
        this.updatePrograms(data || []);
      });

      this.$db.getPrograms();
    }
  }
</script>
