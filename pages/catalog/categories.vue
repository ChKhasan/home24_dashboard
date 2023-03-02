<template lang="html">
  <div>
    <TitleBlock
      title="Категории"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Категории"
    >
      <LayoutHeaderBtn
        name=" Добавить категорию"
        :headerbtnCallback="headerbtnCallback"
        :light="false"
      />
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <!-- <Title title="Categories panel" /> -->
          <div class="d-flex align-items-between justify-content-between w-100">
            <!-- <SearchBlock /> -->
            <SearchInput placeholder="Категория поиска" />
            <div class="d-flex align-items-center">
              <AddBtn
                name="Добавить категорию"
                :icon="true"
                :callback="toAddProduct"
              />
            </div>
          </div>
        </div>
        <div class="antd_table select-table">
          <a-table
            :columns="columns"
            :data-source="categories"
            :expanded-row-keys.sync="expandedRowKeys"
            :pagination="false"
          >
            <div
              slot="name"
              slot-scope="text"
              align="center"
              class="table_product_row select-table-child"
            >
              <img
                class="table-image select-img"
                v-if="text?.img"
                :src="text?.img"
                alt=""
              />
              <img
                class="table-image select-img"
                v-else
                src="../../assets/images/image.png"
                alt=""
              />

              <h6>{{ text?.name?.ru ? text?.name?.ru : "------" }}</h6>
            </div>
            <div
              slot="md_icon"
              slot-scope="text"
              align="center"
              class="table_product_row select-table-child"
            >
              <img
                class="table-image select-img"
                v-if="text"
                :src="text"
                alt=""
              />
              <p v-else>-----</p>
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
              <span
                class="action-btn"
                @click="$router.push(`/catalog/edit_category/${text}`)"
              >
                <img :src="editIcon" alt="" />
              </span>
              <span class="action-btn" @click="deleteCategory(text)">
                <img :src="deleteIcon" alt="" />
              </span>
            </span>
            <span slot="is_popular" slot-scope="text">
              <a-checkbox
                @change="onChangeCheckbox(text)"
                :checked="text == 1"
              />
            </span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SelectAntTable from "../../components/products/SelectAnt-table.vue";
import Title from "../../components/Title.vue";
import SelectTable from "../../components/products/SelectTable.vue";
import SearchBlock from "../../components/form/Search-block.vue";
import TitleBlock from "../../components/Title-block.vue";
import SearchInput from "../../components/form/Search-input.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
const columns = [
  {
    title: "Категория",
    dataIndex: "nameInfo",
    key: "nameInfo",
    className: "column-name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    align: "left",
  },
  {
    title: "Икона",
    dataIndex: "md_icon",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "md_icon" },
    key: "md_icon",
    width: "12%",
    align: "right",
  },
  {
    title: "ПОПУЛЯРНЫЙ",
    dataIndex: "is_popular",
    key: "is_popular",
    align: "center",
    scopedSlots: { customRender: "is_popular" },
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
    key: "id",
    dataIndex: "id",
    scopedSlots: { customRender: "btns" },
    className: "column-btns",
    width: "10%",
  },
];
// const columns = [
//   {
//     title: "Категория",
//     dataIndex: "category",
//     key: "category",
//     className: "column-name",
//     slots: { title: "customTitle" },
//     scopedSlots: { customRender: "category" },
//     align: "left",
//   },
//   {
//     title: "Икона",
//     dataIndex: "icon",
//     key: "icon",
//     width: "12%",
//   },
//   {
//     title: "ПОПУЛЯРНЫЙ",
//     dataIndex: "popular",
//     key: "popular",
//     align: "center",
//     scopedSlots: { customRender: "popular" },
//     width: "30%",
//   },
//   {
//     title: "Статус",
//     key: "tags",
//     dataIndex: "tags",
//     scopedSlots: { customRender: "tags" },
//     className: "column-tags",
//     width: "16%",
//   },
//   {
//     title: "действия",
//     key: "btns",
//     dataIndex: "btns",
//     scopedSlots: { customRender: "btns" },
//     className: "column-btns",
//     width: "10%",
//   },
// ];
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
  layout: "toolbar",
  middleware: "auth",
  data() {
    return {
      categories: [
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
          children: [{}],
        },
      ],
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
      formVal: "",

      columns,
      rowSelection,
      expandedRowKeys: [],
      selectedRowKeys: [],
      allCheckbox: [],
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
    };
  },
  components: {
    AddBtn,
    Title,
    SelectAntTable,
    SelectTable,
    SearchBlock,
    TitleBlock,
    SearchInput,
    LayoutHeaderBtn,
  },
  methods: {
    async __GET_CATEGORIES() {
      const data = await this.$store.dispatch("fetchCategories/getCategories");

      this.categories = data.categories?.data.map((item) => {
        return {
          ...item,
          nameInfo: { name: item.name, img: item.md_img },
          children: [{ nameInfo: { name: item.name, img: item.md_img } }],
        };
      });
      console.log(this.categories);
    },
    deleteCategory(id) {
      this.__DELETE_CATEGORY(id);
    },
    async __DELETE_CATEGORY(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchCategories/deleteCategories",
          id
        );
        await this.$notify({
          title: "Success",
          message: "Категория был успешно удален",
          type: "success",
        });
        this.__GET_CATEGORIES();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.$notify.error({
            title: "Error",
            message: "Указанные данные недействительны.",
          });
          break;
        case 500:
          this.$notify.error({
            title: "Error",
            message: "Cервер не работает",
          });
          break;
        case 404:
          this.$notify.error({
            title: "Error",
            message: res.data.errors,
          });
          break;
      }
    },
    handleClick(tab, event) {
      console.log("handlchange", tab, event);
      this.formVal = "";
    },
    toAddProduct() {
      this.$router.push("/catalog/add_category");
      console.log("errors");
    },
    sendForm() {
      console.log(this.formVal);
    },

    headerbtnCallback() {
      console.log("fsfsdf");
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    deleteCategory(id) {
      this.__DELETE_CATEGORY(id);
    },
    async __DELETE_CATEGORY(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchCategories/deleteCategories",
          id
        );
        await this.$notify({
          title: "Success",
          message: "Категория был успешно удален",
          type: "success",
        });
        this.__GET_CATEGORIES();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    onChangeCheckbox(id) {
      this.allCheckbox.includes(id)
        ? (this.allCheckbox = this.allCheckbox.filter((item) => item != id))
        : this.allCheckbox.push(id);

      console.log(this.allCheckbox);
    },
  },
  mounted() {
    this.__GET_CATEGORIES();
  },
};
</script>
<style lang="scss"></style>
