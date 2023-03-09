<template lang="html">
  <div>
    <TitleBlock
      title="Продукты"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Продукты"
    >
      <div class="d-flex">
        <div class="add-btn add-header-btn add-header-btn-padding btn-primary">
          <span class="svg-icon"
            ><!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Files/File-plus.svg--><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"></polygon>
                <path
                  d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                ></path>
                <path
                  d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                  fill="#000000"
                ></path>
              </g></svg
            ><!--end::Svg Icon--></span
          >
          Добавить продукт
        </div>
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <div class="d-flex justify-content-between w-100">
            <SearchInput placeholder="Поиск продукта" />
            <div class="d-flex align-items-center">
              <AddBtn name="Добавить продукт" :callback="toAddProduct" />
            </div>
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          align="center"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            columnWidth: '40px',
            align: 'right',
          }"
        >
          <span slot="img" slot-scope="text">
            <img v-if="text" class="table-image" :src="text" alt="" />
            <img
              v-else
              class="table-image"
              src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
              alt=""
            />
          </span>
          <div
            slot="name"
            slot-scope="text"
            align="center"
            class="table_product_row"
          >
            <h6>{{ text.ru }}</h6>
          </div>
          <h4 slot="model" slot-scope="text">{{ text ? text : "------" }}</h4>
          <h4 slot="qty" slot-scope="text">{{ text ? text : "------" }}</h4>
          <a slot="price" slot-scope="text">{{
            text ? `${text}` : "------"
          }}</a>
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
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";

export default {
  middleware: "auth",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
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
          align: "right",
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
    };
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_products");
    },
    async __GET_PRODUCTS() {
      this.products = await this.$store.dispatch("fetchProducts/getProducts");
      this.data = this.products.products.data.map((item) => {
        console.log(item.products);
        if (item.products[0].images.length > 0) {
          return {
            ...item,
            key: item.id,
            price: item.products[0].price,
            model: item.products[0].model,
            img: item.products[0].images[0].lg_img
              ? item.products[0].images[0].lg_img
              : null,
            status: item.products[0].status,
          };
        } else {
          return {
            ...item,
            key: item.id,
            price: item.products[0].price,
            model: item.products[0].model,
            img: null,
          };
        }
      });
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(filters);
      this.tableData = this.data.map((item) => {
        filters.tags.forEach((element) => {
          if (item.tags == element);
          return item;
        });
      });
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
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.$notify.error({
            title: res.data.message,
            message: res.data.errors,
          });
          break;
        case 500:
          this.$notify.error({
            title: res.data.message,
            message: res.data.errors,
          });
          break;
        case 404:
          this.$notify.error({
            title: res.data.message,
            message: res.data.errors,
          });
          break;
      }
    },
  },
  mounted() {
    this.__GET_PRODUCTS();
  },
  components: {
    AddBtn,
    SearchInput,
    TitleBlock,
  },
  layout: "toolbar",
};
</script>
