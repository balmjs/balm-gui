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
          <template v-if="!item.installed">
            <i class="material-icons"
               title="Init Program"
               @click="$installer.initProgram(item)">vertical_align_bottom</i>
          </template>
          <template v-else>
            <i class="material-icons"
               title="Start Dev Server"
               v-if="!item.onRunDev"
               @click="runDev(item)">play_arrow</i>

            <i class="material-icons"
               title="Stop Dev Server"
               v-else
               @click="$devManager.stopDev(item)">pause</i>

            <i class="material-icons"
               title="Build Program"
               @click="$devManager.build(item)">pages</i>

            <i class="material-icons"
               title="Open Terminal"
               @click="$terminal.open">indeterminate_check_box</i>
          </template>
          <i class="material-icons remove"
             title="Open Terminal"
             v-if="!item.onRunDev"
             @click="$installer.remove(item)">close</i>
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
      },
      runDev(item){
        this.$terminal.open();
        this.$devManager.runDev(item);
      },
      initList (list){
        this.list = this.$_copy(list).map((item)=> {
          return {
            ...item,
            progress: 0,
            onInit: false,
            onRunDev: false,
            onRunProd: false
          }
        });
      }
    },
    created(){
      this.initList(this.$store.state.programs.list);

      this.$_event.$on('programsUpdated', (list)=>{
        this.initList(list);
      });

      this.$_event.$on('initProgram', ({id})=>{
        let item = this.list.find((n) => n.id = id);
        item.onInit = true;
      });
    }
  };
</script>
