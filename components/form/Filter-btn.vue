<template lang="html">
  <div
    class="add-btn btn-primary-hover btn btn-light-primary add-btn-padding mr-3"
  >
    <slot></slot>
    {{ name }}
  </div>
</template>
<script>
export default {
  props: ["name"],
};
</script>
<style lang=""></style>
