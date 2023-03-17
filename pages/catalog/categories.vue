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
            :pagination="pagination"
            :current="2"
            :loading="loading"
            @change="handleTableChange"
          >
            <div
              slot="dataName"
              slot-scope="text"
              align="center"
              class="table_product_row select-table-child"
            >
              <div>
                <img
                  class="table-image select-img"
                  v-if="text?.img"
                  :src="text?.img"
                  alt=""
                />
                <img
                  class="table-image select-img"
                  v-else
                  src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
                  alt=""
                />
              </div>

              <h6>{{ text?.name?.ru ? text?.name?.ru : "----" }}</h6>
            </div>
            <div
              slot="lg_icon"
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
              slot="is_active"
              slot-scope="is_active"
              class="tags-style"
              :class="{
                tag_success: is_active == 1,
                tag_inProgress: is_active == 'in progress',
                tag_approved: is_active == 'Approved',
                tag_rejected: is_active == 0,
              }"
            >
              {{ is_active ? "Active" : "Inactive" }}
            </span>

            <span slot="id" slot-scope="text">
              <span
                class="action-btn"
                @click="$router.push(`/catalog/edit_category/${text}`)"
              >
                <img :src="editIcon" alt="" />
              </span>
              <a-popconfirm
                title="Are you sure delete this category?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteCategory(text)"
                @cancel="cancel"
              >
                <span class="action-btn">
                  <img :src="deleteIcon" alt="" />
                </span>
              </a-popconfirm>
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
    dataIndex: "dataName",
    key: "dataName",
    className: "column-name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "dataName" },
    align: "left",
  },
  {
    title: "Икона",
    dataIndex: "lg_icon",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "lg_icon" },
    key: "lg_icon",
    width: "12%",
    align: "right",
  },
  {
    title: "Key",
    dataIndex: "key",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "key" },
    key: "key",
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
    key: "is_active",
    dataIndex: "is_active",
    scopedSlots: { customRender: "is_active" },
    className: "column-tags",
    width: "16%",
  },
  {
    title: "действия",
    key: "id",
    dataIndex: "id",
    scopedSlots: { customRender: "id" },
    className: "column-btns",
    width: "10%",
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
  layout: "toolbar",
  middleware: "auth",
  data() {
    return {
      page: 1,
      params: {
        page: 1,
      },
      pagination: {
        pageSize: 16,
      },
      loading: false,
      categories: [],
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
    confirm(e) {
      console.log(e);
      this.$message.success("Click on Yes");
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },
    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/catalog/categories`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_CATEGORIES();
    },
    async __GET_CATEGORIES() {
      this.categories = await [];
      const data = await this.$store.dispatch("fetchCategories/getCategories", {
        ...this.$route.query,
      });
      this.loading = false;

      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.categories?.total;

      this.categories = data.categories?.data.map((item, index) => {
        let newChild = [];
        let newChild2 = [];
        if (item.children) {
          newChild = item.children.map((childItem, index1) => {
            if (childItem.children.length > 0) {
              newChild2 = childItem.children.map((lastChild, index2) => {
                return {
                  ...lastChild,
                  key: (index + 1) * 100 + (index1 + 1) * 10 + (index2 + 1),
                  dataName: {
                    name: lastChild.name,
                    img: lastChild.lg_img,
                  },
                };
              });
              return {
                key: (index1 + 1) * 1 + (index + 1) * 10,
                ...childItem,
                dataName: {
                  name: childItem.name,
                  img: childItem.lg_img,
                },
                children: [...newChild2],
              };
            } else {
              newChild2 = [];
              return {
                key: (index1 + 1) * 1 + (index + 1) * 10,
                ...childItem,
                dataName: {
                  name: childItem.name,
                  img: childItem.lg_img,
                },
              };
            }
          });
          return {
            key: index * 1 + 1,
            ...item,
            dataName: {
              name: item.name,
              img: item.lg_img,
            },
            children: [...newChild],
          };
        } else {
          newChild = [];
          return {
            key: index * 1 + 1,
            ...item,
            dataName: {
              name: item.name,
              img: item.lg_img,
            },
          };
        }
      });
    },
    deleteCategory(id) {
      this.__DELETE_CATEGORY(id);
    },
    async __DELETE_CATEGORY(id) {
      try {
        await this.$store.dispatch("fetchCategories/deleteCategories", id);
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
    onChangeCheckbox(id) {
      this.allCheckbox.includes(id)
        ? (this.allCheckbox = this.allCheckbox.filter((item) => item != id))
        : this.allCheckbox.push(id);

      console.log(this.allCheckbox);
    },
  },
  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/catalog/categories`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    await this.__GET_CATEGORIES();
  },
  watch: {
    "pagination.current"() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style lang="scss"></style>
