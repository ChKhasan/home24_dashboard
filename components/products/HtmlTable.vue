<template lang="html">
  <div class="html-table-block antd_table product_table">
    <a-table
      :columns="columns"
      :data-source="data"
      class="components-table-demo-nested"

    >
      <span slot="img" slot-scope="text"
        ><img class="table-image" src="../../assets/images/image.png" alt=""
      /></span>
      <a
        slot="category"
        slot-scope="text"
        align="center"
        class="table_product_row"
      >
        <h6>{{ text }}</h6>
      </a>
      <a-table
        slot="children"
        slot-scope="text"
        :columns="columns"
        :data-source="text.children"
        :pagination="false"
        class="child-table"
      >
        <span slot="img" slot-scope="text"
          ><img class="table-image" src="../../assets/images/image.png" alt=""
        /></span>
        <a
          slot="category"
          slot-scope="text"
          align="center"
          class="table_product_row"
        >
          <h6>{{ text }}</h6>
        </a>

        <a-table
          slot="children"
          slot-scope="text"
          :columns="columns"
          :data-source="text.children"
          :pagination="false"
          class="child-table"
        >
          <span slot="img" slot-scope="text"
            ><img
              class="table-image"
              src="../../assets/images/image.png"
              alt=""
          /></span>
          <a
            slot="category"
            slot-scope="text"
            align="center"
            class="table_product_row"
          >
            <h6>{{ text }}</h6>
          </a>
        </a-table>
      </a-table>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "Img",
    dataIndex: "img",
    key: "img",
    colSpan: 0,
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "img" },
    width: "8%",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    className: "column-name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "category" },
    colSpan: 2,
    align: "left",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "12%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
];

const data = [
  {
    key: 1,
    category: "Мебель",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        category: "Офисная мебель",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        category: "Офисная мебель.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            category: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        category: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            category: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                category: "Jim Green.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                category: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
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
    age: 32,
    address: "Sidney No. 1 Lake Park",
    children: [
      {
        key: 11,
        category: "Офисная мебель",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        category: "Офисная мебель.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            category: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        category: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 13112,
            category: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 131112,
                category: "Jim Green.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1313212,
                category: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
];
// const columns = [
//   {
//     title: "PRODUCT",
//     dataIndex: "img",
//     colSpan: 2,
//     key: "img",
//     slots: { title: "customTitle" },
//     scopedSlots: { customRender: "img" },
//     align: "left",
//   },
//   {
//     dataIndex: "name",
//     key: "name",
//     colSpan: 0,
//     slots: { title: "customTitle" },
//     scopedSlots: { customRender: "name" },
//     className: "column-name",
//   },

//   {
//     title: "PRICE",
//     dataIndex: "price",
//     className: "column-price",

//     key: "price",
//     slots: { title: "customTitle" },
//     scopedSlots: { customRender: "price" },
//   },
//   {
//     title: "STATUS",
//     key: "tags",
//     dataIndex: "tags",
//     scopedSlots: { customRender: "tags" },
//     className: "column-tags",
//   },
//   {
//     title: "ACTIONS",
//     key: "btns",
//     dataIndex: "btns",
//     scopedSlots: { customRender: "btns" },
//     className: "column-btns",
//   },
// ];

// const data = [
//   {
//     key: "1",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     subtitle: "subtitle",
//     code: "02887003",
//     qty: "25",
//     price: "6 700 000 sum",
//     tags: "in progress",
//     img: "Published",

//     btns: "id",
//   },
//   {
//     key: "2",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     code: "02887003",
//     qty: "23",
//     price: "6 700 000 sum",

//     img: "Published",
//     tags: "Success",

//     btns: "id",
//   },
//   {
//     key: "3",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     code: "02887003",
//     qty: "45",
//     price: "6 700 000 sum",

//     img: "Published",
//     tags: "rejected",

//     btns: "id",
//   },
//   {
//     key: "4",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     code: "02887003",
//     qty: "45",
//     price: "6 700 000 sum",

//     img: "Published",
//     tags: "Approved",

//     btns: "id",
//   },
// ];

// const innerColumns = [
//   { title: "Date", dataIndex: "date", key: "date" },
//   { title: "Name", dataIndex: "name", key: "name" },
//   { title: "Status", key: "state", scopedSlots: { customRender: "status" } },
//   { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
//   {
//     title: "Action",
//     dataIndex: "operation",
//     key: "operation",
//     scopedSlots: { customRender: "operation" },
//   },
// ];

// const innerData = [
//   {
//     key: "1",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     subtitle: "subtitle",
//     code: "02887003",
//     qty: "25",
//     price: "6 700 000 sum",
//     tags: "in progress",
//     img: "Published",

//     btns: "id",
//   },
//   {
//     key: "2",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     code: "02887003",
//     qty: "23",
//     price: "6 700 000 sum",

//     img: "Published",
//     tags: "Success",

//     btns: "id",
//   },
//   {
//     key: "3",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     code: "02887003",
//     qty: "45",
//     price: "6 700 000 sum",

//     img: "Published",
//     tags: "rejected",

//     btns: "id",
//   },
//   {
//     key: "4",
//     name: {
//       name: "HONOR MagicBook X 15BBR-WAI9885 BR-WAI9885 BR-WAI9885",
//       subtitle: "Техника / Техника / Техника / Техника",
//     },
//     code: "02887003",
//     qty: "45",
//     price: "6 700 000 sum",

//     img: "Published",
//     tags: "Approved",

//     btns: "id",
//   },
// ];

export default {
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
      selectedRowKeys: [],
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>
<style lang=""></style>
