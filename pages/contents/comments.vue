<template lang="html">
  <div>
    <TitleBlock
      title="Комментарии"
      :breadbrumb="['Контент сайта']"
      lastLink="Комментарии"
    >
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center pt-4">
          <FormTitle title="Комментарии" />
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="comments"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <div slot="img" slot-scope="text">
              <img
                class="table-image"
                src="../../assets/images/image.png"
                alt=""
              />
            </div>
            <span
              @click="$router.push('/home/customer-info/123')"
              slot="name"
              slot-scope="text"
              align="center"
              class="table_product_row"
            >
              <h6>{{ text }}</h6>
            </span>
            <span slot="customTitle"></span>
            <span slot="editId" slot-scope="text">
         
              <a-popconfirm
                title="Are you sure delete this comment?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteComment(text)"
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
import TitleBlock from "../../components/Title-block.vue";
import FormTitle from "../../components/Form-title.vue";
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
      columns: [
        {
          title: "ID",
          dataIndex: "user_id",
          key: "user_id",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "id" },
          align: "left",
          className: "column-name",
          width: "60px",
        },
        {
          title: "Пользователь",
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
          dataIndex: "Пользователь",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          width: "30%",
          colSpan: 0,
        },
        {
          dataIndex: "Продукт",
          key: "product",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "product" },
          className: "column-name",
        },
        {
          title: "Коммент",
          dataIndex: "comment",
          scopedSlots: { customRender: "comment" },
          className: "column-code",
          key: "comment",
          //   width: "10%",
        },
        {
          title: "Ответ",
          dataIndex: "slug",
          className: "column-qty",
          key: "slug",
          align: "center",
          //   width: "10%",
        },

        {
          title: "действия",
          key: "editId",
          dataIndex: "editId",
          scopedSlots: { customRender: "editId" },
          className: "column-btns",
            width: "100px",
          align: "right",
        },
      ],
      previewVisible: false,
      comments: [],
    };
  },
  methods: {
    show(name) {
      this.$modal.show(name);
    },
    hide(name) {
      this.$modal.hide(name);
    },
    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/contents/comments`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_COMMENTS();
    },
    async __GET_COMMENTS() {
      const data = await this.$store.dispatch("fetchComments/getComments", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.comments?.total;
      this.comments = data.comments?.data.map((item) => {
        return {
          ...item,
          editId: item.id,
        };
      });
    },
    deleteComment(id) {
      this.__DELETE_COMMENT(id);
    },
    async __DELETE_COMMENT(id) {
      try {
        await this.$store.dispatch("fetchComments/deleteComments", id);
        await this.$notify({
          title: "Success",
          message: "Пост был успешно удален",
          type: "success",
        });
        this.__GET_COMMENTS();
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
  },
  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/contents/comments`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_COMMENTS();
  },
  watch: {
    "pagination.current"() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  components: {
    TitleBlock,
    FormTitle,
  },
  layout: "toolbar",
};
</script>
<style lang="scss">
.ant-modal-mask,
.ant-modal-wrap {
  z-index: 1002 !important;
}
</style>
