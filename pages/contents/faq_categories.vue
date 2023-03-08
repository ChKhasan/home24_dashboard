<template lang="html">
  <div>
    <TitleBlock
      title="Вопрос и ответы"
      :breadbrumb="['Контент сайта']"
      lastLink="Вопрос и ответы"
    >
      <div
        class="add-btn add-header-btn add-header-btn-padding btn-primary"
        @click="openAddModal"
      >
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
        Добавить
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center pt-4">
          <div class="d-flex justify-content-between w-100">
            <FormTitle title="Вопрос и ответы" />
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="categories"
            :pagination="false"
            align="center"
          >
            <a slot="img" slot-scope="text">
              <img
                v-if="typeof text == 'string'"
                class="table-image"
                :src="text"
                alt=""
              />
              <img
                v-else
                class="table-image"
                src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
                alt=""
              />
            </a>
            <span
              @click="$router.push('/home/customer-info/123')"
              slot="title"
              slot-scope="text"
              align="center"
              class="table_product_row"
            >
              <h6>{{ text?.ru }}</h6>
            </span>
            <div slot="faqs" slot-scope="text" v-html="text?.ru"></div>
            <div
              slot="faqs"
              slot-scope="text"
              align="center"
              class="option-container"
            >
              <!-- <span v-for="item in text" class="option-items">{{ item }}</span> -->
              <span
                class="option-items"
                v-for="(item, index) in text"
                :key="index"
                >{{ item.question.ru ? item.question.ru : "-----" }}</span
              >
            </div>
            <span slot="numberId" slot-scope="text">#{{ text }}</span>
            <span slot="customTitle"></span>

            <span slot="id" slot-scope="text">
              <span class="action-btn" @click="editPost(text)">
                <img :src="editIcon" alt="" />
              </span>
              <a-popconfirm
                title="Are you sure delete this blog?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deletePost(text)"
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
      :title="editId ? 'Изменить категорию':'Добавить категорию'"
      name="add_faqs"
      btnText="Save"
      :callback="getData"
      :closeModal="closeModal"
      :loadingBtn="loadingBtn"
    >
      <div class="modal_tab mb-4">
        <span
          v-for="(item, index) in modalTabData"
          :key="index"
          @click="modalTab = item.index"
          :class="{ 'avtive-modalTab': modalTab == item.index }"
        >
          {{ item.label }}
        </span>
      </div>

      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        action=""
      >
        <div
          v-for="(item, index) in modalTabData"
          :key="index"
          v-if="modalTab == item.index"
        >
          <div class="form-block required">
            <div>
              <label for="">Category name</label>
            </div>
            <el-form-item prop="title_ru">
              <el-input
                type="text"
                placeholder="Category"
                v-model="ruleForm[`title_${item.index}`]"
              ></el-input>
            </el-form-item>
          </div>
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

export default {
  middleware: "auth",
  data() {
    return {
      pageSize: 10,
      modalTab: "ru",
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      loadingBtn: false,
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],

            ["image"],
            ["code-block"],
          ],
        },
      },
      option: {
        theme: "bubble",
        modules: {
          toolbar: [
            ["bold", "italic", "link"],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
              "blockquote",
            ],
          ],
        },
      },
      modalTabData: [
        {
          label: "Русский",
          index: "ru",
        },
        {
          label: "O'zbek",
          index: "uz",
        },
        {
          label: "English",
          index: "en",
        },
      ],
      ruleForm: {
        title_ru: "",
        title_uz: "",
        title_en: "",
      },
      editImage: "",
      columns: [
        {
          title: "ID",
          dataIndex: "numberId",
          key: "numberId",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "numberId" },
          align: "left",
          className: "column-name",
          width: "60px",
        },
        {
          title: "title",
          dataIndex: "title",
          key: "title",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "title" },
          align: "left",
          className: "column-name",
        },
        {
          title: "faqs",
          dataIndex: "faqs",
          key: "faqs",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "faqs" },
          className: "column-options",
          //   width: "30%",
        },
        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
            width: "100px",
          align: "right",
        },
      ],

      value: "",
      editId: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      faqs: [],
      categories: [],
      rules: {
        title_ru: [
          {
            required: true,
            message: "category nameis required",
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
      const newData = {
        title: {
          ru: this.ruleForm.title_ru,
          uz: this.ruleForm.title_uz,
          en: this.ruleForm.title_en,
        },
      };
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.editId != ""
            ? this.__EDIT_FAQ_CATEGORIES(newData)
            : this.__POST_FAQ_CATEGORIES(newData);
        } else {
          return false;
        }
      });
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },

    openAddModal() {
      this.show("add_faqs");
      this.editId = "";
    },
    editPost(id) {
      this.editId = id;
      const data = this.categories.find((item) => item.id == id);
      this.ruleForm = {
        ...data,
        title_ru: data.title.ru,
        title_uz: data.title.uz,
        title_en: data.title.en,
      };
      this.show("add_faqs");

      // this.__GET_FAQ_CATEGORIES_BY_ID(id);
    },
    closeModal() {
      this.hide("add_faqs");
      this.ruleForm.title_ru = "";
      this.ruleForm.title_uz = "";
      this.ruleForm.title_en = "";

      this.editId = "";
      this.__GET_FAQ_CATEGORIES();
    },
    deletePost(id) {
      this.__DELETE_FAQ_CATEGORIES(id);
    },
    async __DELETE_FAQ_CATEGORIES(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchFaqCategories/deleteFaqsCategories",
          id
        );
        await this.$notify({
          title: "Success",
          message: "Пост был успешно удален",
          type: "success",
        });
        this.__GET_FAQ_CATEGORIES();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },

    async __GET_FAQ_CATEGORIES() {
      const data = await this.$store.dispatch(
        "fetchFaqCategories/getFaqsCategories"
      );
      this.categories = data.categories?.data;
      this.categories = this.categories.map((item) => {
        return {
          ...item,
          numberId: item.id,
        };
      });
    },
    async __POST_FAQ_CATEGORIES(res) {
      try {
        await this.$store.dispatch(
          "fetchFaqCategories/postFaqsCategories",
          res
        );
        await this.$notify({
          title: "Success",
          message: "Атрибут успешно добавлен",
          type: "success",
        });
        this.hide("add_faqs");
        this.__GET_FAQ_CATEGORIES();
        this.ruleForm.title_ru = "";
        this.ruleForm.title_uz = "";
        this.ruleForm.title_en = "";
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
    async __EDIT_FAQ_CATEGORIES(res) {
      try {
        const data = await this.$store.dispatch(
          "fetchFaqCategories/editFaqsCategories",
          {
            id: this.editId,
            data: res,
          }
        );
        this.$notify({
          title: "Success",
          message: "Пост успешно добавлен",
          type: "success",
        });
        this.hide("add_faqs");
        this.__GET_FAQ_CATEGORIES();
        this.ruleForm.title_ru = "";
        this.ruleForm.title_uz = "";
        this.ruleForm.title_en = "";
        this.ruleForm.desc_ru = "";
        this.ruleForm.desc_uz = "";
        this.ruleForm.desc_en = "";
      } catch (e) {
        this.statusFunc(e.response);
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
    this.__GET_FAQ_CATEGORIES();
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
.post_img {
  width: 101px;
  height: 101px;
  border: 1px dashed #d9d9d9;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: none;
      cursor: pointer;
      i {
        font-size: 32px;
        height: 40px;
        width: 40px;
      }
    }
  }
  &:hover {
    div {
      z-index: 100;
      background: rgba(255, 255, 255, 0.5);
      span {
        display: block;
      }
    }
  }
}
</style>
