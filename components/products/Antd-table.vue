<template lang="">
  <div class="antd_table product_table">
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: '45px',
      }"
      @change="handleTableChange"
    >
      <a slot="img" slot-scope="text"
        ><img class="table-image" src="../../assets/images/image.png" alt=""
      /></a>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="price" slot-scope="text">${{ text }}</a>
      <span slot="customTitle"></span>

      <span slot="tags" slot-scope="tags">
        <a-tag
          :color="
            tags === 'loser'
              ? 'volcano'
              : tags.length > 5
              ? 'geekblue'
              : 'green'
          "
        >
          {{ tags }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <el-button type="text" size="small" class="table-action-btn">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Actions<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit">Edit</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete">Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "PRODUCT",
    dataIndex: "img",
    key: "img",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "img" },
    width: 90,
  },
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
  },
  {
    title: "SKU",
    dataIndex: "age",
    className: "column-sky",
    key: "age",
  },
  {
    title: "QTY",
    dataIndex: "address",
    className: "column-sky",

    key: "address",
  },
  {
    title: "PRICE",
    dataIndex: "price",
    className: "column-price",

    key: "price",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "price" },
  },
  {
    title: "TAGS",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    filters: [
      { text: "Published", value: "Published" },
      { text: "loser", value: "loser" },
    ],
    onFilter: (value, record) => record.tags.indexOf(value) === 0,
    sorter: (a, b) => a.tags.length - b.tags.length,
    sortDirections: ["descend"],
    width: '30% !important',
  },
  {
    title: "RATING",
    key: "rating",
    className: "column-rating",
    dataIndex: "address",
  },
  {
    title: "ACTIONS",
    key: "action",
    className: "column-action",
    scopedSlots: { customRender: "action" },
    width: "120",
  },
];

export default {
  data() {
    return {
      data: [
        {
          key: "1",
          name: "Product 1",
          age: "02887003",
          address: "25",
          price: 1000,
          rating: "dadsa",

          tags: "Published",
          img: "Published",
        },
        {
          key: "2",
          name: "Product 10",
          age: "02887003",
          address: "23",
          price: 1000,
          rating: "dadsa",

          img: "Published",
          tags: "loser",
        },
        {
          key: "3",
          name: "Product 1",
          age: "02887003",
          address: "45",
          price: 1000,
          rating: "dadsa",

          img: "Published",
          tags: "loser",
        },
      ],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
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
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
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
