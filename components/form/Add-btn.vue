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
  methods: {
    // toast() {
    //   this.$toast.open({
    //     message: "add-btn btn btn-primary add-btn-padding",
    //     type: "success",
    //     duration: 2000,
    //     dismissible: true,
    //     position: "top-right",
    //   });
    // },
  },
};
</script>
