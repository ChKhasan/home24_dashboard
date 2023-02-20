<template lang="html">
  <div
    class="add-btn btn-primary-hover btn btn-light-primary add-btn-padding mr-3"
    @click="modal"
  >
    <slot></slot>
    {{ name }}
  </div>
</template>
<script>
export default {
  props: ["name", "action"],
  methods: {
    modal() {
      this.$modal.show("example");
    },
  },
};
</script>
<style lang="scss"></style>
