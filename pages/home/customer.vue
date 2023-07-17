<template lang="html">
  <div>
    <TitleBlock title="Клиенты" :breadbrumb="['Главная']" lastLink="Клиенты">
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center pt-4">
          <div class="d-flex justify-content-between w-100">
            <FormTitle title="Клиенты" />
          </div>
        </div>
        <div class="antd_table product_table">
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
            <span
              @click="$router.push('/home/customer-info/123')"
              slot="name"
              slot-scope="text"
            >
              <h6>{{ text }}</h6>
            </span>
            <h4 slot="number" slot-scope="text">{{ text }}</h4>
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
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import Title from "../../components/Title.vue";
import TitleBlock from "../../components/Title-block.vue";
import FormTitle from "../../components/Form-title.vue";

export default {
  // middleware: "auth",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      columns: [
        {
          title: "ФИО",
          dataIndex: "img",
          key: "img",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          align: "left",
          className: "column-img",
          colSpan: 2,
          width: "45px",
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
          title: "Номер телефона",
          dataIndex: "number",
          scopedSlots: { customRender: "number" },
          className: "column-code",
          key: "number",
          //   width: "10%",
        },
        {
          title: "email",
          dataIndex: "email",
          className: "column-qty",
          key: "email",
          align: "center",
          //   width: "10%",
        },
        {
          title: "username",
          dataIndex: "username",
          className: "column-name",

          key: "username",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "username" },
          //   width: "16%",
        },

        {
          title: "действия",
          key: "btns",
          dataIndex: "btns",
          scopedSlots: { customRender: "btns" },
          className: "column-btns",
          //   width: "10%",
          align: "right",
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
          label: "Неактивен",
        },
      ],
      value: "",
      data: [
        {
          key: "1",
          name: "HONOR MagicBook X 15BBR",

          number: "02887003",
          email: "example@gmail.com",
          username: "6 700 000 sum",

          img: "Published",

          btns: "id",
        },
        {
          key: "2",
          name: "HONOR MagicBook X 15BBR",
          number: "02887003",
          email: "example@gmail.com",
          username: "6 700 000 sum",

          img: "Published",

          btns: "id",
        },
        {
          key: "3",
          name: "HONOR MagicBook X 15BBR",
          number: "02887003",
          email: "example@gmail.com",
          username: "6 700 000 sum",

          img: "Published",

          btns: "id",
        },
        {
          key: "4",
          name: "HONOR MagicBook X 15BBR",
          number: "02887003",
          email: "example@gmail.com",
          username: "6 700 000 sum",

          img: "Published",

          btns: "id",
        },
      ],
    };
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_products");
      console.log("errors");
    },
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
  components: {
    AddBtn,
    SearchInput,
    Title,
    TitleBlock,
    FormTitle,
  },
  layout: "toolbar",
};
</script>
