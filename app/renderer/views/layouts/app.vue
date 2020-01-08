<template>
  <div :class="className">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    className() {
      return ['container'].concat(this.$route.meta.className || []);
    }
  }
};
</script>
