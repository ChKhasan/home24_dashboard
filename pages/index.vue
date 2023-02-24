<template>
  <div></div>
</template>

<script>
export default {
  middleware: "auth",
  asyncData({ redirect }) {
    redirect("/admin/login");
  },
};
</script>
