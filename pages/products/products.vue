<template lang="html">
  <div class="container_xl app-container">
    <div class="card_block py-5">
      <div class="d-flex justify-content-between align-items-center card_header card_header_bottom">
        <SearchBlock />
        <div><FilterBtn /> <AddBtn name="Add Product" /></div>
      </div>
      <Table />
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import FilterBtn from "../../components/form/Filter-btn.vue";
import Table from "../../components/products/table.vue";
import SearchInput from "../../components/form/Search-input.vue";
import SearchBlock from "../../components/form/Search-block.vue";

export default {
  components: { Table, AddBtn, FilterBtn, SearchInput, SearchBlock },
  layout: "toolbar",
};
</script>
