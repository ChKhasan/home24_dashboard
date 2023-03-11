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
        <span class="svg-icon" v-html="addIcon"></span>
        Добавить
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center pt-4">
          <FormTitle title="Вопрос и ответы" />
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="faqs"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <div slot="img" slot-scope="text">
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
            </div>
            <span
              @click="$router.push('/home/customer-info/123')"
              slot="question"
              slot-scope="text"
              align="center"
              class="table_product_row"
            >
              <h6>{{ text?.ru }}</h6>
            </span>
            <div slot="answer" slot-scope="text" v-html="text?.ru"></div>
            <span slot="numberId" slot-scope="text">#{{ text }}</span>
            <a slot="category" slot-scope="text">{{
              text?.title ? text.title.ru : "-----"
            }}</a>
            <span slot="customTitle"></span>

            <span slot="id" slot-scope="text">
              <span class="action-btn" @click="editPost(text)">
                <img :src="editIcon" alt="" />
              </span>
              <a-popconfirm
                title="Are you sure delete this faq?"
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
      :title="editId ? 'Изменить' : 'Добавить'"
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
              <label for="fad_category_select">Categories</label>
            </div>
            <el-form-item prop="category_id">
              <el-select
                id="fad_category_select"
                class="w-100"
                v-model="ruleForm.category_id"
                placeholder="faq category"
                no-data-text="No category"
              >
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.title.ru"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-block required">
            <div>
              <label for="faq_question">Question</label>
            </div>
            <el-form-item prop="question_ru">
              <el-input
                id="faq_question"
                type="text"
                placeholder="Зоговолок"
                v-model="ruleForm[`question_${item.index}`]"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-block required">
            <div>
              <label for="faq_answar">Answer</label>
            </div>
            <el-form-item prop="answer_ru">
              <el-input
                id="faq_answar"
                type="text"
                placeholder="Answer"
                v-model="ruleForm[`answer_${item.index}`]"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </AddModal>
  </div>
</template>
<script>
import TitleBlock from "../../components/Title-block.vue";
import FormTitle from "../../components/Form-title.vue";
import AddModal from "../../components/modals/Add-modal.vue";
export default {
  middleware: "auth",
  data() {
    return {
      params: {
        page: 1,
      },
      pagination: {
        pageSize: 16,
      },
      loading: false,
      modalTab: "ru",
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../assets/svg/components/add-img-icon.svg?raw"),
      loadingBtn: false,

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
        category_id: "",
        question_ru: "",
        question_uz: "",
        question_en: "",
        answer_ru: "",
        answer_uz: "",
        answer_en: "",
      },
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
          title: "question",
          dataIndex: "question",
          key: "question",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "question" },
          align: "left",
          className: "column-name",
        },
        {
          title: "answer",

          dataIndex: "answer",
          key: "answer",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "answer" },
          className: "column-name",
          //   width: "30%",
        },
        {
          title: "category",
          dataIndex: "category",
          scopedSlots: { customRender: "category" },
          className: "column-code",
          key: "category",
          //   width: "30%",
        },

        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "90px",
          align: "right",
        },
      ],

      editId: "",
      faqs: [],
      categories: [],
      rules: {
        category_id: [
          {
            required: true,
            message: "Blog title is required",
            trigger: "change",
          },
        ],

        question_ru: [
          {
            required: true,
            message: "Blog desc is required",
            trigger: "change",
          },
        ],
        answer_ru: [
          {
            required: true,
            message: "Blog desc is required",
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

    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/contents/faq`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_FAQS();
    },
    getData() {
      const newData = {
        category_id: this.ruleForm.category_id,
        question: {
          ru: this.ruleForm.question_ru,
          uz: this.ruleForm.question_uz,
          en: this.ruleForm.question_en,
        },
        answer: {
          ru: this.ruleForm.answer_ru,
          uz: this.ruleForm.answer_uz,
          en: this.ruleForm.answer_en,
        },
      };
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.editId != ""
            ? this.__EDIT_FAQS(newData)
            : this.__POST_FAQS(newData);
        } else {
          return false;
        }
      });
    },
    cancel(e) {
      this.$message.error("Click on No");
    },

    openAddModal() {
      this.show("add_faqs");
      this.editId = "";
    },
    editPost(id) {
      this.editId = id;
      const data = this.faqs.find((item) => item.id == id);
      this.ruleForm = {
        ...data,
        question_ru: data.question.ru,
        question_uz: data.question.uz,
        question_en: data.question.en,
        answer_ru: data.answer.ru,
        answer_uz: data.answer.uz,
        answer_en: data.answer.en,
        category_id: data.category_id,
      };

      this.show("add_faqs");
    },
    closeModal() {
      this.hide("add_faqs");
      this.ruleFormEmpty();
      this.editId = "";
      this.__GET_FAQS();
    },
    ruleFormEmpty() {
      this.ruleForm.question_ru = "";
      this.ruleForm.question_uz = "";
      this.ruleForm.question_en = "";
      this.ruleForm.answer_ru = "";
      this.ruleForm.answer_uz = "";
      this.ruleForm.answer_en = "";
      this.ruleForm.category_id = "";
    },
    deletePost(id) {
      this.__DELETE_FAQS(id);
    },
    async __DELETE_FAQS(id) {
      try {
        await this.$store.dispatch("fetchFaqs/deleteFaqs", id);
        await this.$notify({
          title: "Success",
          message: "Успешно удален",
          type: "success",
        });
        this.__GET_FAQS();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_FAQS() {
      const data = await this.$store.dispatch("fetchFaqs/getFaqs", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.faqs?.total;
      this.faqs = data.faqs?.data;
      this.faqs = this.faqs.map((item) => {
        return {
          ...item,
          numberId: item.id,
        };
      });
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
    async __POST_FAQS(res) {
      try {
        await this.$store.dispatch("fetchFaqs/postFaqs", res);
        await this.$notify({
          title: "Success",
          message: "Успешно добавлен",
          type: "success",
        });
        this.hide("add_faqs");
        this.__GET_FAQS();
        this.ruleFormEmpty();
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
    async __EDIT_FAQS(res) {
      try {
        await this.$store.dispatch("fetchFaqs/editFaqs", {
          id: this.editId,
          data: res,
        });
        this.$notify({
          title: "Success",
          message: "Успешно добавлен",
          type: "success",
        });
        this.hide("add_faqs");
        this.__GET_FAQS();
        this.ruleFormEmpty();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },

  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/contents/faq`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_FAQS();
    this.__GET_FAQ_CATEGORIES();
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
    AddModal,
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
