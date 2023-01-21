<template lang="html">
  <div class="add-btn btn btn-primary add-btn-padding" @click="execute">
    {{ name }}
  </div>
</template>
<script>
export default {
  props: {
    callback: {
      type: Function,
    },
    name: {
      type: String,
    },
  },
  methods: {
    execute() {
      if (this.callback) {
        this.callback();
      }
    },
  },
};
</script>
