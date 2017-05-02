<template>
  <div class="content">
    <div class="navigator">
      <ui-button raised effect title="New Program" @click.native="goToAdd">
        <i class="material-icons">add</i>
      </ui-button>
    </div>
    <div class="program-list">
      <div class="item" v-for="item in list">

        <div class="top">
          <tpl-icon :tpl="item.tpl"></tpl-icon>
          <div class="content">
            <div class="name">{{item.name}}</div>
            <div class="path">{{item.path}}</div>
            <div class="time">
              created at {{$moment(item.createTime).format('YYYY-MM-DD, hh:mm:ss')}},
              last modified at {{$moment(item.lastModifyTime).format('YYYY-MM-DD, hh:mm:ss')}}
            </div>
          </div>
        </div>

        <div class="btn-area">
          <a class="btn install-btn" @click="$installer.initProgram(item)">
            <i class="material-icons">vertical_align_bottom</i>
          </a>
          <a class="btn dev-btn" @click="$devManager.runDev(item)">
            <i class="material-icons">play_arrow</i>
          </a>
          <a class="btn dev-btn" @click="$devManager.stopDev(item)">
            <i class="material-icons">pause</i>
          </a>
          <a class="btn dev-btn" @click="$devManager.build(item)">
            <i class="material-icons">pages</i>
          </a>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import fs from 'fs';
  import tplIcon from './components/tpl-icon';
  import {mapState, mapActions} from 'vuex';

  export default {
    components: {
      tplIcon
    },
    data(){
      return {
        list: [],
      }
    },
    computed: {
      ...mapState([
        'templates'
      ])
    },
    methods: {
      ...mapActions([
        'updateProgram'
      ]),
      goToAdd(){
        this.$router.push('/add/program');
      }
    },
    created(){

      this.$_event.$on('programsUpdated', (list)=>{
        this.list = this.$_copy(list).map((item)=> {
            return {
              ...item,
              progress: 0,
              onInit: false,
              onRunDev: false,
              onRunProd: false
            }
        });
      });
    }
  };
</script>
