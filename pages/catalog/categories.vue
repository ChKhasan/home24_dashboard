<template lang="html">
  <div>
    <TitleBlock
      title="Категории"
      :breadbrumb="['Каталог']"
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
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Категория поиска" />
            <div></div>
            <StatusFilter />
          </div>
        </div>
        <div class="antd_table select-table">
          <a-table
            :columns="columnCatgory"
            :data-source="categories"
            :expanded-row-keys.sync="expandedRowKeys"
            :pagination="false"
            :current="2"
            :loading="loading"
          >
            <div
              slot="dataName"
              slot-scope="text"
              align="center"
              class="select-table-child"
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

              <h6>
                {{ text?.name?.ru ? text?.name?.ru : "----" }}
                <span v-if="text?.child">({{ text?.child }})</span>
              </h6>
            </div>
            <div
              slot="lg_icon"
              slot-scope="text"
              align="center"
              class="select-table-child"
            >
              <img class="table-image select-img" v-if="text" :src="text" alt="" />
              <img
                class="table-image select-img"
                v-else
                src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
                alt=""
              />
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
              <a-checkbox @change="onChangeCheckbox(text)" :checked="text == 1" />
            </span>
          </a-table>
          <div class="d-flex justify-content-between mt-4">
            <el-select
              v-model="params.pageSize"
              class="table-page-size"
              placeholder="Select"
              @change="changePageSizeGlobal(e, '/catalog/categories', '__GET_CATEGORIES')"
            >
              <el-option
                v-for="item in pageSizes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <a-pagination
              class="table-pagination"
              :simple="false"
              v-model.number="current"
              :total="totalPage"
              :page-size.sync="params.pageSize"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import Title from "../../components/Title.vue";
import TitleBlock from "../../components/Title-block.vue";
import SearchInput from "../../components/form/Search-input.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import StatusFilter from "../../components/form/Status-filter.vue";
import global from "../../mixins/global";
import status from "../../mixins/status";
import columns from "../../mixins/columns";

export default {
  layout: "toolbar",
  // middleware: "auth",
  mixins: [global, status, columns],
  data() {
    return {
      loading: true,
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
    TitleBlock,
    SearchInput,
    LayoutHeaderBtn,
    StatusFilter,
  },
  methods: {
    async __GET_CATEGORIES() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchCategories/getCategories", {
        ...this.$route.query,
      });
      this.loading = false;
      this.totalPage = data.categories?.total;
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
                    img: lastChild.sm_img,
                  },
                };
              });
              return {
                key: (index1 + 1) * 1 + (index + 1) * 10,
                ...childItem,
                dataName: {
                  name: childItem.name,
                  img: childItem.sm_img,
                  child: childItem.children.length,
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
                  img: childItem.sm_img,
                },
              };
            }
          });
          return {
            key: index * 1 + 1,
            ...item,
            dataName: {
              name: item.name,
              img: item.sm_img,
              child: item.children.length,
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
              img: item.sm_img,
            },
          };
        }
      });
    },
    deleteCategory(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchCategories/deleteCategories",
        "Категория был успешно удален",
        "__GET_CATEGORIES"
      );
    },
    headerbtnCallback() {
      this.$router.push("/catalog/add_category");
    },
    onChangeCheckbox(id) {
      this.allCheckbox.includes(id)
        ? (this.allCheckbox = this.allCheckbox.filter((item) => item != id))
        : this.allCheckbox.push(id);
    },
  },
  async mounted() {
    this.getFirstData("/catalog/categories", "__GET_CATEGORIES");
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/catalog/categories", "__GET_CATEGORIES");
    },
  },
};
</script>
<style lang="scss"></style>
