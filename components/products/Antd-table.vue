<template lang="">
  <div class="antd_table product_table">
    <!-- :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: '45px',
      }" -->
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      align="center"
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
const columns = [
  {
    title: "PRODUCT",
    dataIndex: "img",
    key: "img",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "img" },
    width: "8%",
    align: "right",
  },
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    width: "30%",
  },
  {
    title: "Code",
    dataIndex: "code",
    scopedSlots: { customRender: "code" },
    className: "column-code",
    key: "code",
    width: "10%",
  },
  {
    title: "QTY",
    dataIndex: "qty",
    className: "column-qty",
    key: "qty",
    align: "center",
    width: "10%",
  },
  {
    title: "PRICE",
    dataIndex: "price",
    className: "column-price",

    key: "price",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "price" },
    width: "16%",
  },
  {
    title: "STATUS",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    className: "column-tags",
    width: "16%",
  },
  {
    title: "ACTIONS",
    key: "btns",
    dataIndex: "btns",
    scopedSlots: { customRender: "btns" },
    className: "column-btns",
    width: "10%",
  },
];

export default {
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      data: [
        {
          key: "1",
          name: {
            name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          subtitle: "subtitle",
          code: "02887003",
          qty: "25",
          price: "6 700 000 sum",
          tags: "in progress",
          img: "Published",

          btns: "id",
        },
        {
          key: "2",
          name: {
            name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          code: "02887003",
          qty: "23",
          price: "6 700 000 sum",

          img: "Published",
          tags: "Success",

          btns: "id",
        },
        {
          key: "3",
          name: {
            name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          code: "02887003",
          qty: "45",
          price: "6 700 000 sum",

          img: "Published",
          tags: "rejected",

          btns: "id",
        },
        {
          key: "4",
          name: {
            name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
            subtitle: "Техника / Техника / Техника / Техника",
          },
          code: "02887003",
          qty: "45",
          price: "6 700 000 sum",

          img: "Published",
          tags: "Approved",

          btns: "id",
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
