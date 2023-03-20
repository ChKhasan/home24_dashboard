<template lang="html">
  <div class="all-orders">
    <TitleBlock
      title="Клиенты"
      :breadbrumb="['Главная']"
      lastLink="Клиенты"
    ></TitleBlock>
    <div class="container_xl app-container mt-5">
      <div class="mt-4 mb-5">
        <div class="custom_block customer_card_padding">
          <div class="customer_card">
            <div class="customer_img">
              <div>
                <img src="../../../assets/images/image.png" alt="" />
              </div>
            </div>
            <div class="customer_details">
              <h1>Max Smith</h1>
              <div class="customer_sub-info">
                <span
                  ><svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                      fill="currentColor"
                    ></path></svg
                  >max@kt.com</span
                >
                <span
                  ><svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z"
                      fill="currentColor"
                    ></path></svg
                  >SF, Bay Area
                </span>
              </div>
              <div class="customer_info-header">
                <div class="customer_number-card">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.5"
                        x="13"
                        y="6"
                        width="13"
                        height="2"
                        rx="1"
                        transform="rotate(90 13 6)"
                        fill="currentColor"
                      ></rect>
                      <path
                        d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h5>$4,500</h5>
                  </div>
                  <span>Earnings</span>
                </div>
                <div class="customer_number-card">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.5"
                        x="13"
                        y="6"
                        width="13"
                        height="2"
                        rx="1"
                        transform="rotate(90 13 6)"
                        fill="currentColor"
                      ></rect>
                      <path
                        d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <h5>$4,500</h5>
                  </div>
                  <span>Earnings</span>
                </div>
              </div>
            </div>
          </div>
          <div class="customer_tab">
            <span
              @click="customerTab = 1"
              :class="{ 'avtive-customerTab': customerTab == 1 }"
            >
              Настройки
            </span>
            <span
              @click="customerTab = 2"
              :class="{ 'avtive-customerTab': customerTab == 2 }"
            >
              Заказы
            </span>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-5" v-if="customerTab == 1">
        <div class="custom_block">
          <div class="hr_header px-4 pt-4">
            <FormTitle title="Детали профиля" />
          </div>
          <div class="customer_info px-4 pb-4">
            <div class="order-details-items bb_none">
              <span> Date Added</span>
              <p>27/02/2023</p>
            </div>
            <div class="order-details-items bb_none">
              <span> Payment Method</span>
              <p>Online</p>
            </div>
            <div class="order-details-items bb_none">
              <span> Shipping Method</span>
              <p>Flat Shipping Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5" v-if="customerTab == 2">
        <div class="card_block py-5">
          <div
            class="d-flex justify-content-between align-items-center card_header"
          >
            <div
              class="d-flex align-items-between justify-content-between w-100 pt-4"
            >
              <FormTitle title="Заказы" />

              <div class="d-flex align-items-center"></div>
            </div>
          </div>
          <a-table
            :columns="columns"
            :data-source="tableData"
            :pagination="false"
            align="center"
          >
            <a slot="img" slot-scope="text"
              ><img
                class="table-image"
                src="../../../assets/images/image.png"
                alt=""
            /></a>
            <nuxt-link
              to="/catalog/products"
              slot="client"
              slot-scope="text"
              align="center"
            >
              {{ text }}
            </nuxt-link>
            <a slot="price" slot-scope="text">${{ text }}</a>
            <span slot="customTitle"></span>

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
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../../components/form/Add-btn.vue";
import SearchInput from "../../../components/form/Search-input.vue";
import TitleBlock from "../../../components/Title-block.vue";
import FormTitle from "../../../components/Form-title.vue";

export default {
  layout: "toolbar",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../../assets/svg/components/delete-icon.svg"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      activeName: "summa",
      customerTab: 1,
      lang: [
        {
          key: "Русский",
        },
        {
          key: "Uzbek",
        },
        {
          key: "English",
        },
      ],
      data: [
        {
          key: "1",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "2",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "3",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "4",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "5",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
      ],
      data2: [
        {
          key: "1",
          dateAdd: "22.22.2022",
          comment: "lorem ipsum ssdf dsfsdf",
          customer: "No",
          tags: "Completed",
        },
        {
          key: "2",
          dateAdd: "22.22.2022",
          comment: "lorem ipsum ssdf dsfsdf",
          customer: "No",
          tags: "Failed",
        },
        {
          key: "3",
          dateAdd: "22.22.2022",
          comment: "lorem ipsum ssdf dsfsdf",
          customer: "No",
          tags: "Pending",
        },
        {
          key: "4",
          dateAdd: "22.22.2022",
          comment: "lorem ipsum ssdf dsfsdf",
          customer: "No",
          tags: "Processing",
        },
        {
          key: "5",
          dateAdd: "22.22.2022",
          comment: "lorem ipsum ssdf dsfsdf",
          customer: "No",
          tags: "Delivered",
        },
        {
          key: "6",
          dateAdd: "22.22.2022",
          comment: "lorem ipsum ssdf dsfsdf",
          customer: "No",
          tags: "Delivering",
        },
      ],
      dataOrder: [
        {
          key: "1",
          orderId: "#123",
          product: "A nam .column-name .column-name",
          sku: "123234352",
          qty: "2",
          price: "$120.00",
          totalSum: "$240.00",
        },
        {
          key: "2",
          orderId: "#123",
          product: "A nam .column-name .column-name",
          sku: "123234352",
          qty: "2",
          price: "$120.00",
          totalSum: "$240.00",
        },
        {
          key: "3",
          orderId: "#123",
          product: "A nam .column-name .column-name",
          sku: "123234352",
          qty: "2",
          price: "$120.00",
          totalSum: "$240.00",
        },
      ],
      columnsOrder: [
        {
          title: "ПРОДУКТ",
          dataIndex: "img",
          key: "img",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          width: "50px",
          align: "left",
          className: "column-img",
          colSpan: 0,
        },
        {
          title: "ПРОДУКТ",
          dataIndex: "product",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "product" },
          className: "column-code",
          key: "product",
          colSpan: 2,
          align: "left",
          //   width: "20%",
        },
        {
          title: "Артикул",
          dataIndex: "sku",
          scopedSlots: { customRender: "sku" },
          className: "column-code",
          key: "sku",
        },
        {
          title: "КОЛ-ВО",
          dataIndex: "qty",
          scopedSlots: { customRender: "qty" },
          className: "column-code",
          key: "qty",
        },
        {
          title: "ЦЕНА ЗА ЕДИНИЦУ ТОВАРА",
          dataIndex: "price",
          scopedSlots: { customRender: "price" },
          className: "column-code",
          key: "price",
        },
        {
          title: "ОБЩИЙ",
          dataIndex: "totalSum",
          scopedSlots: { customRender: "totalSum" },
          className: "column-code",
          key: "totalSum",
        },
      ],
      columns: [
        {
          title: "Номер заказ",
          dataIndex: "orderId",
          key: "orderId",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "orderId" },
          className: "column-code",
        },

        {
          title: "Номер клиента",
          dataIndex: "dataAdd",
          scopedSlots: { customRender: "dataAdd" },
          className: "column-code",
          key: "dataAdd",
        },

        {
          title: "статус",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          className: "column-tags",
          key: "tags",
        },
        {
          title: "дата",
          dataIndex: "dataEdit",
          scopedSlots: { customRender: "dataEdit" },
          className: "column-code",
          key: "dataEdit",
        },
      ],
      columns2: [
        {
          title: "ДАТА ДОБАВЛЕНА",
          dataIndex: "dateAdd",
          key: "dateAdd",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "dateAdd" },
          className: "column-code",
        },

        {
          title: "КОММЕНТАРИЙ",
          dataIndex: "comment",
          scopedSlots: { customRender: "comment" },
          className: "column-code",
          key: "comment",
        },

        {
          title: "СТАТУС ЗАКАЗА",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          className: "column-tags",
          key: "tags",
        },
        {
          title: "КЛИЕНТ УВЕДОМЛЕН",
          dataIndex: "customer",
          scopedSlots: { customRender: "customer" },
          className: "column-code",
          key: "customer",
        },
      ],
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },

    classObject(tag) {
      return {
        tag_success: tag == "Success",
        tag_inProgress: tag == "in progress",
      };
    },
  },
  mounted() {
    if (this.data) {
      this.tableData = this.data;
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(filters);
      this.tableData = this.data.map((item) => {
        filters.tags.forEach((element) => {
          if (item.tags == element);
          return item;
        });
      });
      console.log(this.tableData);
    },

    start() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    tableActions(id) {
      console.log(id);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    handleCommand(command) {
      this.pageSize = command;
    },
  },
  components: {
    TitleBlock,
    SearchInput,
    AddBtn,
    FormTitle,
    FormTitle,
  },
};
</script>
<style lang="scss"></style>
