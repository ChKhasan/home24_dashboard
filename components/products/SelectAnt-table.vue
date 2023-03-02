<template lang="">
  <div class="antd_table product_table">
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      align="center"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: '40px',
        align: 'right',
      }"
    >
      <a slot="name" slot-scope="text" align="center" class="table_product_row">
        <h6>{{ text.name }}</h6>
        <span>{{ text.subtitle }}</span>
      </a>
      <div
        slot="options"
        slot-scope="text"
        align="center"
        class="option-container"
      >
        <span v-for="item in text" class="option-items">{{ item }}</span>
      </div>
      <span slot="customTitle"></span>

      <span slot="btns" slot-scope="text">

        <span class="action-btn" @click="tableActions(text)">
          <img :src="editIcon" alt="" />
        </span>
        <span class="action-btn" @click="tableActions(text)">
          <img :src="deleteIcon" alt="" />
        </span>
      </span>
    </a-table>
  </div>
</template>
<script>
export default {
  props: ["data", "columns"],
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
    classObject(tag) {
      return {
        tag_success: tag == "Success",
        tag_inProgress: tag == "in progress",
      };
    },
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    tableActions(id) {
      console.log(id);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    handleCommand(command) {
      this.pageSize = command;
    },
  },
};
</script>
<style lang="scss">
.antd-table {
  background-color: #fff !important;
}
th.column-action,
td.column-action {
  text-align: right !important;
}
th.column-rating,
td.column-rating {
  text-align: right !important;
  .ant-table-header-column {
    width: 100%;
  }
}

th.column-action {
  display: flex !important;
  justify-content: flex-end;
}
</style>
