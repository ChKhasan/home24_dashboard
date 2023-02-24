<template lang="html">
  <div class="orders">
    <TitleBlock
      title="Orders"
      :breadbrumb="['eCommerce', 'Catalog']"
      lastLink="Orders"
    >
      <!-- <div class="add-btn add-btn-padding btn-light-primary">
        Cancel
      </div> -->
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <!-- <Title title="Orders" /> -->
          <div class="d-flex align-items-between justify-content-between w-100">
            <!-- <SearchBlock /> -->
            <SearchInput />
            <div class="d-flex align-items-center">
              <!-- <AddBtn name="Addition" :icon="true" :callback="toAddProduct" /> -->
            </div>
          </div>
        </div>
        <SelectAntTable :data="data" />
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import AntdTable from "../../components/products/Antd-table.vue";
import SelectAntTable from "../../components/products/SelectAnt-table.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";

export default {
  layout: "toolbar",
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
      data: [
        {
          key: "1",
          name: {
            name:
              "HONOR MagicBook X 15BBR-WAI9885 WAI9885 5BBR-WAI9885 WAI9885",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          options: [
            "Техника",
            "Компьютеры и оргтехника",
            "Ноутбуки",
            "Ноутбуки",
            "OPTIONS",
            "OPTIONS",
            "OPTIONS",
          ],
          btns: "id",
        },
        {
          key: "2",
          name: {
            name: "Iphone 14 pro max",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          options: [
            "Техника",
            "Компьютеры и оргтехника",
            "Ноутбуки",
            "Ноутбуки",
            "OPTIONS",
            "OPTIONS",
            "OPTIONS",
          ],

          btns: "id",
        },
        {
          key: "3",
          name: {
            name: "Iphone 14 pro max",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          options: [
            "Техника",
            "Компьютеры и оргтехника",
            "Ноутбуки",
            "Ноутбуки",
            "OPTIONS",
            "OPTIONS",
            "OPTIONS",
          ],

          btns: "id",
        },
        {
          key: "4",
          name: {
            name: "Iphone 14 pro max",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          options: [
            "Техника",
            "Компьютеры и оргтехника",
            "Ноутбуки",
            "Ноутбуки",
            "OPTIONS",
            "OPTIONS",
            "OPTIONS",
          ],
          btns: "id",
        },
      ],
    };
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_products");
      console.log("errors");
    },
  },
  components: { AntdTable, AddBtn, Title, SelectAntTable, TitleBlock, SearchInput },
};
</script>
<style lang=""></style>
