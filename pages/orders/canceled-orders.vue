<template lang="html">
  <div class="all-orders">
    <TitleBlock
      title="Отмененные"
      :breadbrumb="['Заказы']"
      lastLink="Отмененные"
    >
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="order-links-grid">
          <nuxt-link
            class="order-links"
            :class="{ 'active-orders': $route.path == '/orders/new-orders' }"
            to="/orders/new-orders"
          >
            <span class="order-light-blue"></span> Новые (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/accepted-orders',
            }"
            to="/orders/accepted-orders"
          >
            <span class="order-black"></span> Принятые (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{ 'active-orders': $route.path == '/orders/ready-orders' }"
            to="/orders/ready-orders"
          >
            <span class="order-blue"></span> Готовые в отправке (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/delivery-orders',
            }"
            to="/orders/delivery-orders"
          >
            <span class="order-yellow"></span> В доставке (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{ 'active-orders': $route.path == '/orders/return-orders' }"
            to="/orders/return-orders"
          >
            <span class="order-purple"></span> Возврат (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/delivered-orders',
            }"
            to="/orders/delivered-orders"
          >
            <span class="order-green"></span> Доставленные (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/canceled-orders',
            }"
            to="/orders/canceled-orders"
          >
            <span class="order-red"></span> Отмененные (0)
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container_xl app-container mb-5">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <div class="d-flex align-items-between justify-content-between w-100">
            <SearchInput placeholder="Поиск заказа" />
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
              src="../../assets/images/image.png"
              alt=""
          /></a>
          <nuxt-link
            to="/orders/1232/details"
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
            <span class="action-btn" @click="$router.push('/orders/1232/edit')">
              <img :src="editIcon" alt="" />
            </span>
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
  layout: "toolbar",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
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
      columns: [
        {
          title: "Заказ ID",
          dataIndex: "orderId",
          key: "orderId",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "orderId" },
          className: "column-name",
        },
        {
          title: "ПРОДУКТ",
          dataIndex: "img",
          key: "img",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          // width: "8%",
          align: "right",
          className: "column-img",
          colSpan: 0,
        },
        {
          title: "Клиент",
          dataIndex: "client",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "client" },
          className: "column-name",
          key: "client",
          colSpan: 2,
          align: "left",
          width: "20%",
        },
        {
          title: "дата добавления",
          dataIndex: "dataAdd",
          scopedSlots: { customRender: "dataAdd" },
          className: "column-name",
          key: "dataAdd",
        },
        {
          title: "дата изменения",
          dataIndex: "dataEdit",
          scopedSlots: { customRender: "dataEdit" },
          className: "column-name",
          key: "dataEdit",
        },
        {
          title: "общая сумма",
          dataIndex: "price",
          scopedSlots: { customRender: "price" },
          className: "column-name",
          key: "price",
        },
        {
          title: "статус оплаты",
          dataIndex: "statusSum",
          scopedSlots: { customRender: "statusSum" },
          className: "column-options",
          key: "statusSum",
        },
        {
          title: "статус",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          className: "column-tags",
          key: "tags",
        },
        {
          title: "ДЕЙСТВИЯ",
          key: "btns",
          dataIndex: "btns",
          scopedSlots: { customRender: "btns" },
          className: "column-btns",
          width: "80px",
          align: "center",
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
  components: { TitleBlock, SearchInput, AddBtn },
};
</script>
<style lang="scss"></style>
