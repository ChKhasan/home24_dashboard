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
          <div class="prodduct-list-header-grid w-100" style="grid-gap: 1.25rem">
            <div>
              <SearchInput placeholder="Атрибуты поиска" />
            </div>
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="atributes"
            :pagination="false"
            :loading="loading"
            align="center"
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
            <div slot="options" slot-scope="text" align="center" class="option-container">
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
          <div class="d-flex justify-content-between mt-4">
            <el-select
              v-model="params.pageSize"
              class="table-page-size"
              placeholder="Select"
              @change="changePageSize"
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
import HeaderBtn from "../../components/form/Header-btn.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";
import SearchInput from "../../components/form/Search-input.vue";
export default {
  layout: "toolbar",
  data() {
    return {
      page: 1,
      current: 1,
      pageSizes: [
        {
          value: 10,
          label: "10",
        },
        {
          value: 25,
          label: "25",
        },
        {
          value: 50,
          label: "50",
        },
        {
          value: 100,
          label: "100",
        },
      ],
      totalPage: 1,
      params: {
        page: 1,
        pageSize: 10,
      },
      loading: true,
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
    if (
      !Object.keys(this.$route.query).includes("page") ||
      !Object.keys(this.$route.query).includes("per_page")
    ) {
      await this.$router.replace({
        path: `/catalog/atributs`,
        query: { page: this.params.page, per_page: this.params.pageSize },
      });
    }
    this.__GET_ATRIBUTES();
    this.current = Number(this.$route.query.page);
    this.params.pageSize = Number(this.$route.query.per_page);
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_atributs");
    },
    async changePageSize(e) {
      this.current = 1;
      if (this.$route.query.per_page != e) {
        await this.$router.replace({
          path: `/catalog/atributs`,
          query: {
            page: this.current,
            per_page: e,
          },
        });
        this.__GET_ATRIBUTES();
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchAtributes/getAtributes", {
          ...this.$route.query,
        });
        this.loading = false;
        this.totalPage = data.attributes?.total;
        this.atributes = data.attributes?.data.map((item) => {
          return {
            ...item,
            key: item.id,
            info: {
              name: item.name,
              keywords: item.keywords,
            },
          };
        });
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    async current(val) {
      if (this.$route.query.page != val) {
        await this.$router.replace({
          path: `/catalog/atributs`,
          query: {
            page: val,
            per_page: this.params.pageSize,
          },
        });
        this.__GET_ATRIBUTES();
      }
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
