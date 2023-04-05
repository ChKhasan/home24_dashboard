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
            <SearchInput placeholder="Поиск товара по бренду" @changeSearch="changeSearch" />
            <StatusFilter />
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          align="center"
          @change="handleTableChange"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            columnWidth: '40px',
            align: 'right',
          }"
        >
          <span slot="img" slot-scope="text">
            <img v-if="text != null" class="table-image" :src="text" />
            <img
              v-else
              class="table-image"
              src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
            />
          </span>
          <div slot="name" slot-scope="text" align="center" class="table_product_row">
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
            <span class="action-btn" @click="editProduct(text)">
              <img :src="editIcon" alt="" />
            </span>
            <a-popconfirm
              title="Are you sure delete this product?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deletePoduct(text)"
              @cancel="cancel"
            >
              <span class="action-btn">
                <img :src="deleteIcon" alt="" />
              </span>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInput from "../../components/form/Search-input.vue";
import StatusFilter from "../../components/form/Status-filter.vue";
import TitleBlock from "../../components/Title-block.vue";

export default {
  // middleware: "auth",
  data() {
    return {
      page: 1,
      params: {
        page: 1,
      },
      pagination: {
        pageSize: 16,
      },
      loading: true,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),

      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      columns: [
        {
          title: "ПРОДУКТ",
          dataIndex: "img",
          key: "img",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          // width: "8%",
          align: "left",
          className: "column-img",
          colSpan: 2,
        },
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          width: "30%",
          colSpan: 0,
        },
        {
          title: "Код",
          dataIndex: "model",
          scopedSlots: { customRender: "model" },
          className: "column-code",
          key: "model",
          width: "10%",
        },
        {
          title: "КОЛ-ВО",
          dataIndex: "qty",
          className: "column-qty",
          scopedSlots: { customRender: "qty" },
          key: "qty",
          align: "center",
          width: "10%",
          sorter: (a, b) => a.qty - b.qty,
        },
        {
          title: "ЦЕНА",
          dataIndex: "price",
          className: "column-price",
          key: "price",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "price" },
          width: "16%",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: "Статус",
          key: "status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          className: "column-tags",
          filters: [
            { text: "Active", value: "active" },
            { text: "Inactive", value: "inactive" },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
          width: "16%",
        },
        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "10%",
          align: "right",
        },
      ],

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
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = this.products.products?.total;
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
    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      console.log(pagination.current);
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/catalog/products`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.__GET_PRODUCTS();
    },
    editProduct(id) {
      this.$router.push(`/catalog/edit_products/${id}`);
    },

    cancel(e) {
      this.$message.error("Click on No");
    },

    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },

    deletePoduct(id) {
      this.__DELETE_PRODUCTS(id);
    },
    async __DELETE_PRODUCTS(id) {
      try {
        await this.$store.dispatch("fetchProducts/deleteProducts", id);
        await this.$notify({
          title: "Success",
          message: "Продукт был успешно удален",
          type: "success",
        });
        this.__GET_PRODUCTS();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    notification(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
      });
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.notificationError("Error", "Указанные данные недействительны.");
          break;
        case 500:
          this.notificationError("Error", "Cервер не работает");
          break;
        case 404:
          this.notificationError("Error", res.data.errors);
          break;
      }
    },
    changeSearch(val) {
      this.searchProduct = val.target.value;
    },
  },
  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/catalog/products`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_PRODUCTS();
  },
  watch: {
    "pagination.current"() {
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
