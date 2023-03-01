<template lang="">
  <div class="antd_table product_table">
    <!-- :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: '45px',
      }" -->
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      align="center"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: '40px',
        align: 'right',
      }"
    >
      <a slot="img" slot-scope="text"
        ><img class="table-image" src="../../assets/images/image.png" alt=""
      /></a>
      <a slot="name" slot-scope="text" align="center" class="table_product_row">
        <h6>{{ text.name }}</h6>
        <span>{{ text.subtitle }}</span>
      </a>
      <h4 slot="code" slot-scope="text">${{ text }}</h4>
      <a slot="price" slot-scope="text">${{ text }}</a>
      <span slot="customTitle"></span>

      <span
        slot="tags"
        slot-scope="tags"
        class="tags-style"
        :class="{
          tag_success: tags == 'Success',
          tag_inProgress: tags == 'in progress',
          tag_approved: tags == 'Approved',
          tag_rejected: tags == 'rejected',
        }"
      >
        {{ tags }}
      </span>
      <span slot="btns" slot-scope="text">
        <!-- <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            Actions<svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <el-dropdown-menu slot="dropdown" class="table_actions">
            <el-dropdown-item>Edit</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
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
  name: "antTable",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      tableData: [],
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
  mounted() {
    if (this.data) {
      this.tableData = this.data;
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(filters);
      this.tableData = this.data.map((item) => {
        filters.tags.forEach((element) => {
          if (item.tags == element);
          return item;
        });
      });
      console.log(this.tableData);
    },

    start() {
      this.loading = true;
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
.ant-table-thead {
  .column-img {
    text-align: left !important;
    // padding-left: 32px !important;
  }
}
.ant-table-filter-dropdown-btns {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
</style>
