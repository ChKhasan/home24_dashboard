<template lang="html">
  <div>
    <TitleBlock
      title="Categories"
      :breadbrumb="['Home', 'Catalog']"
      lastLink="Categories"
    />
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header card_header_bottom"
        >
          <SearchBlock />
          <div class="d-flex" style="grid-gap: 1.25rem;">
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
            <AddBtn name="Add Categories" action="/catalog/add_products" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SearchBlock from "../../components/form/Search-block.vue";
import TitleBlock from "../../components/Title-block.vue";

export default {
  layout: "toolbar",
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
  components: { TitleBlock, SearchBlock, AddBtn },
};
</script>
<style lang=""></style>
