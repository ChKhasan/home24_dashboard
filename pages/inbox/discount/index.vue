<template lang="html">
  <div>
    <TitleBlock title="Скидки" :breadbrumb="['Маркетинг']" lastLink="Скидки">
      <div
        v-if="checkAccess('discount', 'POST')"
        class="add-btn add-header-btn add-header-btn-padding btn-primary"
        @click="$router.push('/inbox/discount/add')"
      >
        <span class="svg-icon" v-html="addIcon"></span>
        Добавить
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div
            class="prodduct-list-header-grid w-100 align-items-center"
            style="grid-gap: 1.25rem"
          >
            <SearchInput
              placeholder="Поиск"
              @changeSearch="changeSearch($event, '/inbox/discount', '__GET_DISCOUNT')"
            />
            <span></span>
            <span></span>
            <a-button
              @click="clearQuery('/inbox/discount', '__GET_DISCOUNT')"
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              ><a-icon type="reload"
            /></a-button>
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columnDiscount"
            :data-source="discounts"
            :pagination="false"
            :loading="loading"
            align="center"
          >
            <span slot="key" slot-scope="text">#{{ text }}</span>
            <span slot="name" slot-scope="text">
              <h6>{{ text?.ru }}</h6>
            </span>
            <span slot="desc" slot-scope="text">
              {{ text?.ru }}
            </span>
            <span slot="id" slot-scope="text">
              <span
                class="action-btn"
                v-if="checkAccess('discount', 'PUT')"
                @click="$router.push(`/inbox/discount/${text}`)"
              >
                <img :src="editIcon" alt="" />
              </span>
              <a-popconfirm
                v-if="checkAccess('discount', 'DELETE')"
                title="Are you sure delete this row?"
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
            <!-- <el-select
              v-model="params.pageSize"
              class="table-page-size"
              placeholder="Select"
              @change="
                ($event) =>
                  changePageSizeGlobal($event, '/inbox/discount', '__GET_DISCOUNT')
              "
            >
              <el-option
                v-for="item in pageSizes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <span></span>
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
import TitleBlock from "../../../components/Title-block.vue";
import SearchInput from "../../../components/form/Search-input.vue";
import global from "../../../mixins/global";
import status from "@/mixins/status";
import authAccess from "@/mixins/authAccess";
import columns from "../../../mixins/columns";

export default {
  layout: "toolbar",
  mixins: [global, status, columns, authAccess],
  data() {
    return {
      loading: true,
      editIcon: require("../../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../../assets/svg/components/delete-icon.svg"),
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      selectedRowKeys: [],
      discounts: [],
      data: [],
    };
  },
  async mounted() {
    this.getFirstData("/inbox/discount", "__GET_DISCOUNT");
  },
  methods: {
    deleteAtribut(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchDiscount/deleteDiscount",
        "Успешно удален",
        "__GET_DISCOUNT"
      );
    },
    async __GET_DISCOUNT() {
      try {
        this.loading = true;
        const data = await this.$store.dispatch("fetchDiscount/getDiscount", {
          ...this.$route.query,
        });
        this.loading = false;
        this.totalPage = data.discounts?.total;
        const pageIndex = this.indexPage(
          data?.discounts?.current_page,
          data?.discounts?.per_page
        );
        this.discounts = data.discounts?.data.map((item, index) => {
          return {
            ...item,
            key: index + pageIndex,
          };
        });
        console.log(this.discounts);
      } catch (e) {
        this.statusFunc(e);
      }
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
  },

  watch: {
    async current(val) {
      this.changePagination(val, "/inbox/discount", "__GET_DISCOUNT");
    },
  },
  components: {
    SearchInput,
    TitleBlock,
  },
};
// 246
</script>
