<template lang="html">
  <div>
    <TitleBlock
      title="Комментарии"
      :breadbrumb="['Контент сайта']"
      lastLink="Комментарии"
    >
      <!-- <div
        class="add-btn add-header-btn add-header-btn-padding btn-primary"
        @click="show('edit_comment')"
      >
        <span class="svg-icon"
          ><svg
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
          ></span
        >
        Добавить
      </div> -->
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center pt-4">
          <div class="d-flex justify-content-between w-100">
            <FormTitle title="Блог" />
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="comments"
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
              align="center"
              class="table_product_row"
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
            <span slot="editId" slot-scope="text">
              <span class="action-btn" @click="commnetAnswer(text)">
                <img :src="editIcon" alt="" />
              </span>
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
    <AddModal
      title="Ответ к комментарию"
      name="edit_comment"
      btnText="Save"
      :callback="getData"
      :closeModal="closeModal"
    >
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        action=""
      >
        <div class="form-block">
          <div><label for="">Комментарию </label></div>
          <el-form-item>
            <el-input
              type="textarea"
              disabled
              rows="6"
              placeholder="Зоговолок"
              v-model="ruleForm.comment"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-block">
          <div><label for="">Ответ </label></div>
          <el-form-item>
            <el-input
              type="textarea"
              rows="6"
              placeholder="Зоговолок"
              v-model="ruleForm.answer"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </AddModal>
  </div>
</template>
<script>
import Editor from "../../components/form/editor.vue";

import AddBtn from "../../components/form/Add-btn.vue";
import FilterBtn from "../../components/form/Filter-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import SearchBlock from "../../components/form/Search-block.vue";
import AntdTable from "../../components/products/Antd-table.vue";
import Title from "../../components/Title.vue";
import TitleBlock from "../../components/Title-block.vue";
import FormTitle from "../../components/Form-title.vue";
import AddModal from "../../components/modals/Add-modal.vue";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  middleware: "auth",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      ruleForm: {
        product_id: null,
        comment: "desc",
        answer: "",
      },
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
          label: "Inactive",
        },
      ],
      value: "",
      data: [],
      previewVisible: false,
      previewImage: "",
      fileList: [],
      comments: [],
      rules: {
        group_id: [
          {
            required: true,
            message: "Characteristic group is required",
            trigger: "change",
          },
        ],

        name_ru: [
          {
            required: true,
            message: "Characteristic name is required",
            trigger: "change",
          },
        ],
        options: [
          {
            required: true,
            message: "Characteristic name is required",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    show(name) {
      this.$modal.show(name);
    },
    hide(name) {
      this.$modal.hide(name);
    },
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
    getData() {
      console.log("dadasdaadas");
    },
    closeModal() {
      this.hide("edit_comment");
    },
    start() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    commnetAnswer(id) {
      this.show("edit_comment");
      console.log(this.ruleForm);
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
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async __GET_COMMENTS() {
      const data = await this.$store.dispatch("fetchComments/getComments");
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
        const data = await this.$store.dispatch(
          "fetchComments/deleteComments",
          id
        );
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
    this.__GET_COMMENTS();
    if (this.data) {
      this.tableData = this.data;
    }
  },
  components: {
    AddBtn,
    FilterBtn,
    SearchInput,
    SearchBlock,
    AntdTable,
    Title,
    TitleBlock,
    FormTitle,
    AddModal,
    Editor,
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
