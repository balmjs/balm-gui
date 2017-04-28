<template>
  <div class="content">
    <div class="navigator">
      <ui-button raised effect title="New Program" @click.native="goToAdd">
        <i class="material-icons">add</i>
      </ui-button>
    </div>
    <div class="program-list">
      <div class="item" v-for="item in list" @click="downloadTpl(item)">
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
    </div>
  </div>
</template>
<script>
  import fs from 'fs';
  import tplIcon from './components/tpl-icon';
  import {mapState} from 'vuex';

  export default {
    components: {
      tplIcon
    },
    computed: {
      ...mapState([
        'templates'
      ]),
      list(){
        return this.$store.state.programs.list;
      }
    },
    methods: {
      goToAdd(){
        this.$router.push('/add/program');
      },
      downloadTpl(item){
        //console.log(this.templates[tpl]);
        if(!item.tplInstalled){

          fs.readdir(item.path,  (err, files)=> {

            if(files.length){

              this.$dialog.showMessageBox({
                type: 'warning',
                buttons: ['Sure', 'Cancel'],
                message: 'This folder is not empty, the existing files to be covered by installing template.\nDo you want to overwrite?',
                cancelId: 1
              }, (response) => {
                response === 0 && this.$ipc.send('exec', `balm init ${this.templates[item.tpl].value} ${item.path}`);
              });

            } else {
              this.$ipc.send('exec', `balm init ${this.templates[item.tpl].value} ${item.path}`);
            }

          });

        }
      }
    },
    created(){
      this.$_event.$on('execOnData', (data)=>{
        console.log(data);
      });

      this.$_event.$on('execOnClose', (command)=>{
        console.log(command);
      });
    }
  };
</script>
