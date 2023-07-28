<template lang="html">
  <div class="all-orders">
    <TitleBlock title="Все заказы" :breadbrumb="['Заказы']" lastLink="Все заказы">
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
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="d-flex align-items-between justify-content-between w-100">
            <SearchInput placeholder="Поиск заказа" />
            <div class="d-flex align-items-center"></div>
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="orders"
          :pagination="false"
          align="center"
        >
          <!-- <a slot="img" slot-scope="text"
            ><img class="table-image" src="../../assets/images/image.png" alt=""
          /></a> -->
          <span slot="orderId" slot-scope="text">#{{ text }}</span>
          <!-- <span slot="count" slot-scope="text">{{ text }}</span> -->
          <nuxt-link
            :to="`/orders/${text?.id}/details`"
            slot="name"
            slot-scope="text"
            align="center"
          >
            {{ text?.name }}
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
import moment from "moment";
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
      orders: [],
      data: [
        {
          key: "1",
          orderId: "#123",
          client: "Джеймс Кэмерон",
          number: "+998 99 730 14 99",
          dataEdit: "22.22.2022 12:30",
          operator: "Khasan",
          region: "Tashkent",
          count: 23,
          tags: "Success",
          btns: "id",
        },
        {
          key: "2",
          orderId: "#123",
          client: "Джеймс Кэмерон",
          number: "+998 99 730 14 99",
          dataEdit: "22.22.2022 12:30",
          operator: "Khasan",
          region: "status",
          count: 23,
          tags: "Success",
          btns: "id",
        },
        {
          key: "3",
          orderId: "#123",
          client: "Джеймс Кэмерон",
          number: "+998 99 730 14 99",
          dataEdit: "22.22.2022 12:30",
          operator: "Khasan",
          region: "Tashkent",
          count: 23,
          tags: "Success",
          btns: "id",
        },
        {
          key: "4",
          orderId: "#123",
          client: "Джеймс Кэмерон",
          number: "+998 99 730 14 99",
          dataEdit: "22.22.2022 12:30",
          operator: "Khasan",
          region: "Tashkent",
          count: 23,
          tags: "Success",
          btns: "id",
        },
        {
          key: "5",
          orderId: "#123",
          client: "Джеймс Кэмерон",
          number: "+998 99 730 14 99",
          dataEdit: "22.22.2022 12:30",
          operator: "Khasan",
          region: "Tashkent",
          count: 23,
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
          width: "100px",
        },
        // {
        //   title: "ПРОДУКТ",
        //   dataIndex: "img",
        //   key: "img",
        //   slots: { title: "customTitle" },
        //   scopedSlots: { customRender: "img" },
        //   width: "55px",
        //   align: "right",
        //   className: "column-img",
        //   colSpan: 0,
        // },
        {
          title: "Клиент",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          align: "left",
          width: "20%",
        },
        {
          title: "Номер телефона",
          dataIndex: "phone_number",
          scopedSlots: { customRender: "phone_number" },
          className: "column-name",
          key: "phone_number",
        },
        {
          title: "дата",
          dataIndex: "dateAdd",
          scopedSlots: { customRender: "dateAdd" },
          className: "column-date",
          key: "dateAdd",
        },
        {
          title: "Оператор",
          dataIndex: "operator",
          scopedSlots: { customRender: "operator" },
          className: "column-name",
          key: "operator",
        },
        {
          title: "Область",
          dataIndex: "region",
          scopedSlots: { customRender: "region" },
          className: "column-price",
          key: "region",
        },
        {
          title: "кол-во",
          dataIndex: "count",
          scopedSlots: { customRender: "count" },
          className: "column-qty",
          key: "count",
        },
        // {
        //   title: "статус",
        //   dataIndex: "tags",
        //   scopedSlots: { customRender: "tags" },
        //   className: "column-tags",
        //   key: "tags",
        // },
        {
          title: "ДЕЙСТВИЯ",
          key: "btns",
          dataIndex: "btns",
          scopedSlots: { customRender: "btns" },
          className: "column-btns",
          width: "100px",
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
    this.__GET_ORDERS();
  },
  methods: {
    moment,
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
    async __GET_ORDERS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchOrders/getOrders", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(
        data?.orders?.current_page,
        data?.orders?.per_page
      );
      this.orders = data?.orders?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
          orderId: item.id,
          phone_number: `+${item.phone_number}`,
          dateAdd: moment(item?.created_at).format("DD/MM/YYYY"),
          count: item?.products.length,
        };
      });
      this.totalPage = data?.orders?.total;
      this.orders.dataAdd = moment(data?.orders?.created_at).format("DD/MM/YYYY");
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
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
