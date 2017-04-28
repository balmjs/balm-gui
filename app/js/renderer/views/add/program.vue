<template>
  <div>
    <div class="add-form-item">
      <label>Name</label>
      <ui-textfield
        :model="formData.name"
        @input="onChange('formData.name', $event)"></ui-textfield>
    </div>
    <div class="add-form-item">
      <label>Path</label>
      <ui-textfield readonly :model="formData.path"></ui-textfield>
      <ui-button effect title="Select a folder" @click.native="openFileDialog">...</ui-button>
    </div>
    <div class="add-form-item">
      <label>boilerplate</label>
      <ui-select
        :model="formData.tpl"
        :options="templates"
        @change="onChange('formData.tpl', $event.key)"></ui-select>
    </div>
    <div class="add-form-item btn-group">
      <ui-button raised effect colored @click.native="createProgram">Ok</ui-button>
      <ui-button raised effect @click.native="$router.replace('/')">Cancel</ui-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data(){
      return {
        formData: {
          name: '',
          path: '',
          tpl: 1
        }
      }
    },
    methods: {
      ...mapActions([
        'setPrograms'
      ]),
      createProgram(){
        let list = this.$_copy(this.programs), item = this.$_copy(this.formData), now = Date.now();
        console.log(item);
        list.push({
          id: this.$_uuid(8, 16),
          name: item.name,
          path: item.path,
          tpl: item.tpl,
          installed: false,
          createTime: now,
          lastModifyTime: now
        });
        this.setPrograms(list);
        this.$router.replace('/');
      },
      openFileDialog(){
        this.$dialog.showOpenDialog({
          title: 'Select a folder',
          properties: ['openDirectory', 'createDirectory']
        }, (path)=>{
          path && (this.formData.path = path[0]);
        });
      }
    },
    computed: {
      ...mapState(['templates']),
      programs(){
        return this.$store.state.programs.list;
      }
    }
  };
</script>
