<template>
  <div>
    <div class="add-form-item">
      <label>项目名称</label>
      <ui-textfield
        :model="formData.name"
        @input="balmUi.onChange('formData.name', $event)"></ui-textfield>
    </div>
    <div class="add-form-item">
      <label>框架模板</label>
      <ui-textfield readonly :model="formData.path"></ui-textfield>
      <ui-button title="Select a folder" @click.native="openFileDialog">...</ui-button>
    </div>
    <div class="add-form-item">
      <label>boilerplate</label>
      <ui-select
        :model="formData.tpl"
        :options="templates"
        @change="balmUi.onChange('formData.tpl', $event.key)"></ui-select>
    </div>
    <div class="add-form-item btn-group">
      <ui-button raised colored @click.native="createProgram">创建项目</ui-button>
      <ui-button raised @click.native="$router.replace('/')">返回</ui-button>
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
        'updatePrograms'
      ]),
      createProgram(){
        let list = Object.assign([], this.programs);
        let item = Object.assign({}, this.formData);
        let now = Date.now();

        list.push({
          id: this.$_uuid(8, 16),
          name: item.name,
          path: item.path,
          tpl: item.tpl,
          installed: false,
          createTime: now,
          lastModifyTime: now
        });

        this.updatePrograms(list);
        this.$router.replace('/');
      },
      openFileDialog(){
        this.$dialog.showOpenDialog({
          title: '选择项目文件夹',
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
