<template lang="html">
  <div
    class="add-btn btn btn-primary add-btn-padding"
    @click="$router.push(action)"
  >
    {{ name }}
  </div>
</template>
<script>
export default {
  props: ["name", "action"],
};
</script>
