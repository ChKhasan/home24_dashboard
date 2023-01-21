<template lang="html">
  <div>
    <TitleBlock
      title="Categories"
      :breadbrumb="['Home', 'Catalog']"
      lastLink="Products"
    />
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header card_header_bottom"
        >
          <SearchBlock />
          <div class="d-flex" style="grid-gap: 1.25rem;">
            <!-- <FilterBtn name="Filter"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                  fill="currentColor"
                ></path></svg
            ></FilterBtn> -->
            <div class="max-150">
              <el-select
                v-model="value"
                placeholder="Status"
                class="select_input"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <AddBtn name="Add Product" :callback="toAddProduct" />
          </div>
        </div>
        <AntdTable />
        <!-- <Table /> -->
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import FilterBtn from "../../components/form/Filter-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import SearchBlock from "../../components/form/Search-block.vue";
import TitleBlock from "../../components/Title-block.vue";
import AntdTable from "../../components/products/Antd-table.vue";

export default {
  middleware: "auth",
  data() {
    return {
      options: [
        {
          value: "All",
          label: "All",
        },
        {
          value: "Published",
          label: "Published",
        },
        {
          value: "Scheduled",
          label: "Scheduled",
        },
        {
          value: "Inactive",
          label: "Inactive",
        },
      ],
      value: "",
    };
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_products");
      console.log("errors");
    },
  },
  components: {
    AddBtn,
    FilterBtn,
    SearchInput,
    SearchBlock,
    TitleBlock,
    AntdTable,
  },
  layout: "toolbar",
};
</script>
