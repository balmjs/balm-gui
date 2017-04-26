<template>
  <div>
    <div class="add-form-item">
      <label>Name</label>
      <ui-textfield :model="formData.name"></ui-textfield>
    </div>
    <div class="add-form-item">
      <label>Path</label>
      <ui-textfield :model="formData.path"></ui-textfield>
      <ui-button raised effect>...</ui-button>
    </div>
    <div class="add-form-item">
      <label>boilerplate</label>
      <ui-select
        :model="formData.boilerplate"
        :options="templates"
        @change="onChange('formData.boilerplate', $event.key)"></ui-select>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    data(){
      return {
        formData: {
          name: '',
          path: '',
          boilerplate: 1
        }
      }
    },
    computed: {
      ...mapState(['templates'])
    }
  };
</script>
