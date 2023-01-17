<template>
  <div class="container_xl app-container">
    <Table />
  </div>
</template>

<script>
import Table from "../components/products/table.vue";

export default {
  name: "IndexPage",
  layout: "toolbar",
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  components: { Table },
};
</script>
