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
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <el-tabs class="mt-5" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="item in lang" :label="item.key" :name="item.key">
            <input type="text" class="input input-control form-control py-3" v-model="formVal"/>
            <div class="add-btn btn btn-primary add-btn-padding" @click="sendForm">Send</div>
          </el-tab-pane>
        </el-tabs>
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
      formVal: ""
    };
  },
  components: { TitleBlock, SearchBlock, AddBtn },
  methods: {
    handleClick(tab, event) {
      console.log("handlchange",tab, event);
      this.formVal = ""
    },
    sendForm() {
      console.log(this.formVal);
    }
  },
};
</script>
<style lang=""></style>
