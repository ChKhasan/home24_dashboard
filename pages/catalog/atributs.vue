<template lang="html">
  <div>
    <TitleBlock
      title="Атрибуты"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Атрибуты"
    >
      <div
        class="add-btn add-header-btn add-header-btn-padding btn-primary"
        @click="$router.push('/catalog/add_atributs')"
      >
        <span class="svg-icon" v-html="addIcon"></span>
        Добавить атрибуты
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="d-flex justify-content-between w-100" style="grid-gap: 1.25rem">
            <div>
              <SearchInput placeholder="Атрибуты поиска" />
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
            <a slot="info" slot-scope="text" align="center" class="table_product_row">
              <h6>{{ text?.name.ru }}</h6>
              <span>{{ text.keywords }}</span>
            </a>
            <div
              slot="options"
              slot-scope="text"
              align="center"
              class="option-container"
            >
              <span class="option-items" v-for="(item, index) in text" :key="index">{{
                item.name.ru ? item.name.ru : "-----"
              }}</span>
            </div>
            <div
              slot="categories"
              slot-scope="text"
              align="center"
              class="option-container"
            >
              <span class="option-items" v-for="(item, index) in text" :key="index">{{
                item.name.ru ? item.name.ru : "-----"
              }}</span>
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
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      selectedRowKeys: [],
      atributes: [],
      columns: [
        {
          title: "АТРИБУТЫ",
          dataIndex: "info",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "info" },
          className: "column-name",
          key: "info",
          width: "30%",
        },
        {
          title: "Параметры",
          dataIndex: "options",
          scopedSlots: { customRender: "options" },
          className: "column-options",
          key: "options",
        },
        {
          title: "Категории",
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
    deleteAtribut(id) {
      this.__DELETE_ATRIBUT(id);
    },
    async __DELETE_ATRIBUT(id) {
      try {
        const data = await this.$store.dispatch("fetchAtributes/deleteAtributes", id);
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
    notificationError(title, message) {
      this.$notify.error({
        title: title,
        message: message,
      });
    },
    async __GET_ATRIBUTES() {
      const data = await this.$store.dispatch("fetchAtributes/getAtributes", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.attributes?.total;
      this.atributes = data.attributes?.data.map((item) => {
        return {
          ...item,
          key: item.id,
          info: {
            name: item.name,
            keywords: item.keywords
          }
        };
      });
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
// 246
</script>
