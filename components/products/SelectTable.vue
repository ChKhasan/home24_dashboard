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
    title: "Категория",
    dataIndex: "category",
    key: "category",
    className: "column-name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "category" },
    align: "left",
  },
  {
    title: "Икона",
    dataIndex: "icon",
    key: "icon",
    width: "12%",
  },
  {
    title: "ПОПУЛЯРНЫЙ",
    dataIndex: "popular",
    key: "popular",
    align: "center",
    scopedSlots: { customRender: "popular" },
    width: "30%",
  },
  {
    title: "Статус",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    className: "column-tags",
    width: "16%",
  },
  {
    title: "действия",
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
