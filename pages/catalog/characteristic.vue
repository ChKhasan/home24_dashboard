<template lang="html">
  <div>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <Title title="Characteristic" />
          <div class="d-flex" style="grid-gap: 1.25rem;">
            <div class="max-150"></div>
            <AddBtn name="Add Atributs" :icon="true" :callback="toAddProduct" />
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
import SelectAntTable from "../../components/products/SelectAnt-table.vue";
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
  components: { SelectAntTable, AddBtn, Title },
};
</script>
<style lang=""></style>
