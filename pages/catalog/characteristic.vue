<template lang="html">
  <div>
    <TitleBlock
      title="Characteristic"
      :breadbrumb="['eCommerce', 'Catalog']"
      lastLink="Characteristic"
    >
    <div class="add-btn add-header-btn add-header-btn-padding btn-primary">
        <span class="svg-icon"
          ><!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Files/File-plus.svg--><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <polygon points="0 0 24 0 24 24 0 24"></polygon>
              <path
                d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                fill="#000000"
                fill-rule="nonzero"
                opacity="0.3"
              ></path>
              <path
                d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                fill="#000000"
              ></path>
            </g></svg
          ><!--end::Svg Icon--></span
        >
        Add Product
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <!-- <Title title="Characteristic" /> -->
          <div class="d-flex align-items-between justify-content-between w-100">
            <!-- <SearchBlock /> -->
            <SearchInput />
            <div class="d-flex align-items-center">
              <AddBtn name="Addition" :icon="true" :callback="toAddProduct" />
            </div>
          </div>
        </div>
        <SelectAntTable :data="data" />
        <!-- <Table /> -->
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import SelectAntTable from "../../components/products/SelectAnt-table.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";

export default {
  layout: "toolbar",
  data() {
    return {
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
      this.$router.push("/catalog/add_characteristic");
      console.log("errors");
    },
  },
  components: { SelectAntTable, AddBtn, Title, TitleBlock, SearchInput },
};
</script>
<style lang=""></style>
