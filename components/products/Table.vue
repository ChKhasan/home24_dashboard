<template lang="html">
  <div class="product_table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="img" label="PRODUCT" width="70">
        <template slot-scope="scope"
          ><img class="table-image" src="../../assets/images/image.png" alt="" />
        </template>
      </el-table-column>
      <el-table-column  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="SKU" width="100">
      </el-table-column>
      <el-table-column
        property="address"
        label="QTY"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column property="price" label="PRICE" width="100">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Tag"
        width="100"
        :filters="[
          { text: 'Home', value: 'Home' },
          { text: 'Office', value: 'Office' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === 'Home' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="ACTIONS" width="110">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="table-action-btn">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                Actions<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >Edit</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete"
                  >Delete</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >Toggle selection tag of second and third rows</el-button
      >
      <el-button @click="toggleSelection()">Clear selection</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          img: "../../assets/images/image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          img: "../../assets/images/image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          img: ".image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          img: "../image.png",
          price: 100,
          tag: "Office",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          img: "./image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          img: "../../image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          img: "../../images/image.png",
          price: 100,
          tag: "Office",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-03",
          name: "Tom",
          img: "../images/image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          img: "./images/image.png",
          price: 100,
          tag: "Office",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          img: "./../assets/images/image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          img: "../images/image.png",
          price: 100,
          tag: "Office",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          img: "./images/image.png",
          price: 100,
          tag: "Home",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          img: "../assets/images/image.png",
          price: 100,
          tag: "Office",
          actions: "actions",
          address: "75",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          img: "./assets/images/image.png",
          price: 100,
          tag: "Office",
          actions: "actions",
          address: "75",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>
