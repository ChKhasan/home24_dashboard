<template lang="html">
  <div>
    <TitleBlock
      title="Продукты"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Продукты"
    >
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-primary"
          @click="$router.push('/catalog/add_products')"
        >
          <span class="svg-icon" v-html="addIcon"></span>
          Добавить продукт
        </div>
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Поиск продукта" @changeSearch="changeSearch" />
            <div class="input status-select w-100">
              <el-select v-model="brandSearch" placeholder="Сортировать" class="w-100">
                <el-option
                  class="w-100"
                  v-for="item in brandSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <StatusFilter @changeStatus="changeStatus" />
            <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              ><a-icon type="reload"
            /></a-button>
          </div>
        </div>
        <a-table
          :columns="columnProduct"
          :data-source="data"
          :loading="loading"
          :pagination="false"
          :page-size="params.pageSize"
          align="center"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            columnWidth: '40px',
            align: 'right',
          }"
        >
          <span slot="img" slot-scope="text">
            <nuxt-img
              format="webp"
              v-if="text != null"
              class="table-image"
              :src="text"
              alt="text"
            />
            <nuxt-img
              format="webp"
              v-else
              class="table-image"
              src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
              alt="text"
            />
            <!-- <img v-if="text != null" class="table-image" :src="text" /> -->
            <!-- <img
              v-else
              class="table-image"
              src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
            /> -->
          </span>
          <div slot="name" slot-scope="text">
            <h6>{{ text?.name?.ru }}</h6>
            <span>{{
              text?.category?.parent?.parent &&
              text?.category?.parent?.parent?.name?.ru +
                "/" +
                text?.category?.parent?.name?.ru +
                "/" +
                text?.category?.name?.ru
            }}</span>
          </div>
          <h4 slot="model" slot-scope="text">{{ text ? text : "------" }}</h4>
          <h4 slot="qty" slot-scope="text">{{ text ? text : "------" }}</h4>
          <a slot="price" slot-scope="text">{{ text ? `${text}` : "------" }}</a>
          <span slot="customTitle"></span>

          <span
            slot="status"
            slot-scope="text"
            class="tags-style"
            :class="{
              tag_success: text == 'active',
              tag_rejected: text == 'inactive',
            }"
          >
            {{ text }}
          </span>

          <span slot="id" slot-scope="text">
            <span
              class="action-btn"
              @click="$router.push(`/catalog/edit_products/${text}`)"
              v-html="editIcon"
            >
            </span>
            <a-popconfirm
              title="Are you sure delete this product?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deletePoduct(text)"
              @cancel="cancel"
            >
              <span class="action-btn" v-html="deleteIcon"> </span>
            </a-popconfirm>
          </span>
        </a-table>
        <div class="d-flex justify-content-between mt-4">
          <el-select
            v-model="params.pageSize"
            class="table-page-size"
            placeholder="Select"
            @change="changePageSizeGlobal(e, '/catalog/products', '__GET_PRODUCTS')"
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
</template>
<script>
import SearchInput from "../../components/form/Search-input.vue";
import StatusFilter from "../../components/form/Status-filter.vue";
import TitleBlock from "../../components/Title-block.vue";
import global from "../../mixins/global";
import status from "../../mixins/status";
import columns from "../../mixins/columns";

export default {
  // middleware: "auth",
  mixins: [global, status, columns],
  data() {
    return {
      brandSelect: [
        {
          value: 2,
          label: "Samsung",
        },
        {
          value: 3,
          label: "Apple",
        },
        {
          value: 0,
          label: "HP",
        },
      ],
      options: [
        {
          value: 2,
          label: "All",
        },
        {
          value: 1,
          label: "Active",
        },
        {
          value: 0,
          label: "Inactive",
        },
      ],
      brandSearch: "",
      status: "",
      loading: true,
      editIcon: require("../../assets/svg/components/edit-icon.svg?raw"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg?raw"),
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      products: [],
      data: [],
      searchProduct: "",
    };
  },
  methods: {
    async __GET_PRODUCTS() {
      this.loading = true;
      this.products = await this.$store.dispatch("fetchProducts/getProducts", {
        ...this.$route.query,
      });
      this.totalPage = this.products.products?.total;
      this.loading = false;
      this.data = this.products.products.data.map((item) => {
        if (item.products[0].images.length > 0) {
          return {
            ...item,
            key: item.id,
            price: item.products[0].price,
            model: item.products[0].model,
            name: {
              name: item.name,
              category: item.category,
            },
            img: item.products[0].images[0].sm_img,
            status: item.products[0].status,
          };
        } else {
          return {
            ...item,
            name: {
              name: item.name,
              category: item.category,
            },
            key: item.id,
            price: item.products[0].price,
            model: item.products[0].model,
            img: null,
            status: item.products[0].status,
          };
        }
      });
    },
    deletePoduct(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchProducts/deleteProducts",
        "Продукт был успешно удален",
        "__GET_PRODUCTS"
      );
    },

    changeSearch(val) {
      this.searchProduct = val.target.value;
    },
    changeStatus(val) {
      // this.status = val;
      console.log(val);
    },
  },
  async mounted() {
    if (
      !Object.keys(this.$route.query).includes("page") ||
      !Object.keys(this.$route.query).includes("per_page")
    ) {
      await this.$router.replace({
        path: `/catalog/products`,
        query: { page: this.params.page, per_page: this.params.pageSize },
      });
    }
    this.__GET_PRODUCTS();
    this.current = Number(this.$route.query.page);
    this.params.pageSize = Number(this.$route.query.per_page);
  },
  watch: {
    async current(val) {
      if (this.$route.query.page != val) {
        await this.$router.replace({
          path: `/catalog/products`,
          query: {
            page: val,
            per_page: this.params.pageSize,
          },
        });
        this.__GET_PRODUCTS();
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  components: {
    SearchInput,
    TitleBlock,
    StatusFilter,
  },
  layout: "toolbar",
};
</script>
<style lang="scss"></style>
