<template>
  <footer>
    <div class="text-center">
      <!-- <p>Copyright © <a href='' target="_blank"></a></p>-->
      <p>
        {{new Date().getFullYear()}}
        {{appInfo.copyrightMessage | langtext}}
      </p>
    </div>
  </footer>
</template>

<script>
import store from "src/services/store";

export default {
  data() {
    return {
      appInfo: store.state.appInfo
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
