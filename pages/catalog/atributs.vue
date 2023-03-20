<template lang="html">
  <div>
    <TitleBlock
      title="Атрибуты"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Атрибуты"
    >
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
        Добавить атрибуты
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <!-- <Title title="Atributs" /> -->

          <div
            class="d-flex justify-content-between w-100"
            style="grid-gap: 1.25rem;"
          >
            <div>
              <!-- <SearchBlock /> -->
              <SearchInput placeholder="Атрибуты поиска" />
            </div>
            <div class="d-flex align-items-center">
              <AddBtn
                name="Добавить атрибуты"
                :icon="true"
                :callback="toAddProduct"
              />
            </div>
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="atributes"
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
            <a
              slot="name"
              slot-scope="text"
              align="center"
              class="table_product_row"
            >
              <h6>{{ text?.ru }}</h6>
              <span>{{ text.subtitle }}</span>
            </a>
            <div
              slot="categories"
              slot-scope="text"
              align="center"
              class="option-container"
            >
              <!-- <span v-for="item in text" class="option-items">{{ item }}</span> -->
              <span
                class="option-items"
                v-for="(item, index) in text"
                :key="index"
                >{{ item.name.ru ? item.name.ru : "-----" }}</span
              >
            </div>
            <span slot="customTitle"></span>

            <span slot="id" slot-scope="text">
              <span
                class="action-btn"
                @click="$router.push(`/catalog/edit_atributs/${text}`)"
              >
                <img :src="editIcon" alt="" />
              </span>

              <a-popconfirm
                title="Are you sure delete this atribut?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteAtribut(text)"
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
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import HeaderBtn from "../../components/form/Header-btn.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";
import SearchInput from "../../components/form/Search-input.vue";
export default {
  layout: "toolbar",
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
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      selectedRowKeys: [],
      atributes: [],
      columns: [
        {
          title: "АТРИБУТЫ",
          dataIndex: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          key: "name",
          width: "30%",
        },
        {
          title: "ПАРАМЕТРЫ",
          dataIndex: "categories",
          scopedSlots: { customRender: "categories" },
          className: "column-options",
          key: "categories",
        },

        {
          title: "ДЕЙСТВИЯ",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "100px",
          key: "id",
          align: "right",
        },
      ],
      data: [],
    };
  },
  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/catalog/atributs`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_ATRIBUTES();
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_atributs");
      console.log("errors");
    },
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    tableActions(id) {
      console.log(id);
    },
    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/catalog/atributs`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_ATRIBUTES();
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
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
    deleteAtribut(id) {
      this.__DELETE_ATRIBUT(id);
    },
    async __DELETE_ATRIBUT(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchAtributes/deleteAtributes",
          id
        );
        await this.$notify({
          title: "Success",
          message: "Атрибут был успешно удален",
          type: "success",
        });
        this.__GET_ATRIBUTES();
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
    async __GET_ATRIBUTES() {
      const data = await this.$store.dispatch("fetchAtributes/getAtributes", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.attributes?.total;
      this.atributes = data.attributes?.data;
    },
  },
  watch: {
    "pagination.current"() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  components: {
    AddBtn,
    Title,
    SearchInput,
    HeaderBtn,
    TitleBlock,
  },
};
</script>
<style lang=""></style>
