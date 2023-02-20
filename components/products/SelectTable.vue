<template lang="html">
  <div class="antd_table select-table">
    <a-table
      :columns="columns"
      :data-source="data"
      :expanded-row-keys.sync="expandedRowKeys"
      :pagination="false"
    >
      <div
        slot="category"
        slot-scope="text"
        align="center"
        class="table_product_row select-table-child"
      >
        <img
          class="table-image select-img"
          src="../../assets/images/image.png"
          alt=""
        />
        <h6>{{ text }}</h6>
      </div>
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
      <span slot="popular" slot-scope="text">
        <a-checkbox
          @change="onChangeCheckbox(text)"
          :checked="allCheckbox.includes(text)"
        />
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    className: "column-name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "category" },
    align: "left",
  },
  {
    title: "ICON",
    dataIndex: "icon",
    key: "icon",
    width: "12%",
  },
  {
    title: "POPULAR",
    dataIndex: "popular",
    key: "popular",
    align: "center",
    scopedSlots: { customRender: "popular" },
    width: "30%",
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

const data = [
  {
    key: 1,
    category: "Мебель",
    icon: 60,
    popular: "1",
    tags: "Approved",
    children: [
      {
        key: 11,
        category: "Офисная мебель",
        icon: 42,
        tags: "in progress",
        popular: "2",
      },
      {
        key: 12,
        category: "Офисная мебель.",
        icon: 30,
        tags: "in progress",
        popular: "3",
        children: [
          {
            key: 121,
            category: "Jimmy Brown",
            icon: 16,
            tags: "in progress",
            popular: "2",
          },
          {
            key: 14321,
            category: "Jimmy Brown",
            icon: 16,
            tags: "in progress",
            popular: "2",
          },
        ],
      },
      {
        key: 13,
        category: "Jim Green sr.",
        icon: 72,
        tags: "in progress",
        popular: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            category: "Jim Green",
            icon: 42,
            tags: "in progress",
            popular: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                category: "Jim Green.",
                icon: 25,
                tags: "in progress",
                popular: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                category: "Jimmy Green sr.",
                icon: 18,
                tags: "in progress",
                popular: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    category: "Joe Black",
    icon: 32,
    tags: "in progress",
    popular: "2",
    children: [
      {
        key: 11,
        category: "Офисная мебель",
        icon: 42,
        tags: "in progress",
        popular: "2",
      },
      {
        key: 12,
        category: "Офисная мебель.",
        icon: 30,
        tags: "in progress",
        popular: "2",
        children: [
          {
            key: 121,
            category: "Jimmy Brown",
            icon: 16,
            tags: "in progress",
            popular: "2",
          },
        ],
      },
      {
        key: 13,
        category: "Jim Green sr.",
        icon: 72,
        tags: "in progress",
        popular: "London No. 1 Lake Park",
        children: [
          {
            key: 13112,
            category: "Jim Green",
            icon: 42,
            tags: "in progress",
            popular: "London No. 2 Lake Park",
            children: [
              {
                key: 131112,
                category: "Jim Green.",
                icon: 25,
                tags: "in progress",
                popular: "London No. 3 Lake Park",
              },
              {
                key: 1313212,
                category: "Jimmy Green sr.",
                icon: 18,
                tags: "in progress",
                popular: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
export default {
  data() {
    return {
      data,
      columns,
      rowSelection,
      expandedRowKeys: [],
      selectedRowKeys: [],
      allCheckbox: [],
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onChangeCheckbox(id) {
      this.allCheckbox.includes(id)
        ? (this.allCheckbox = this.allCheckbox.filter((item) => item != id))
        : this.allCheckbox.push(id);

      console.log(this.allCheckbox);
    },
  },
};
</script>
<style lang=""></style>
