<template lang="html">
  <div>
    <TitleBlock
      title="Категории"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Категории"
    >
  
      <LayoutHeaderBtn
        name=" Добавить категорию"
        :headerbtnCallback="headerbtnCallback"
        :light="false"
      />
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <!-- <Title title="Categories panel" /> -->
          <div class="d-flex align-items-between justify-content-between w-100">
            <!-- <SearchBlock /> -->
            <SearchInput placeholder="Категория поиска" />
            <div class="d-flex align-items-center">
              <AddBtn
                name="Добавить категорию"
                :icon="true"
                :callback="toAddProduct"
              />
            </div>
          </div>
        </div>
        <SelectTable />
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SelectAntTable from "../../components/products/SelectAnt-table.vue";
import Title from "../../components/Title.vue";
import SelectTable from "../../components/products/SelectTable.vue";
import SearchBlock from "../../components/form/Search-block.vue";
import TitleBlock from "../../components/Title-block.vue";
import SearchInput from "../../components/form/Search-input.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";

export default {
  layout: "toolbar",
  middleware: "auth",
  data() {
    return {
      data: [],
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
      activeName: "English",
      lang: [
        {
          key: "English",
        },
        {
          key: "Russinan",
        },
        {
          key: "Uzb",
        },
        {
          key: "Kores",
        },
      ],
      formVal: "",
    };
  },
  components: {
    AddBtn,
    Title,
    SelectAntTable,
    SelectTable,
    SearchBlock,
    TitleBlock,
    SearchInput,
    LayoutHeaderBtn,
  },
  methods: {
    handleClick(tab, event) {
      console.log("handlchange", tab, event);
      this.formVal = "";
    },
    toAddProduct() {
      this.$router.push("/catalog/add_category");
      console.log("errors");
    },
    sendForm() {
      console.log(this.formVal);
    },
    headerbtnCallback() {
      console.log("fsfsdf");
    },
  },
};
</script>
<style lang=""></style>
