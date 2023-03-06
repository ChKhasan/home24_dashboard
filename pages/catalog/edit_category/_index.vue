<template lang="html">
  <div>
    <TitleBlock
      title="Категории"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Категории"
    >
      <div class="d-flex">
        <span class="mx-3">
          <LayoutHeaderBtn
            name="Отмена"
            :headerbtnCallback="toBack"
            :light="true"
          />
        </span>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="headerbtnCallback('ruleForm')"
          :loading="uploadLoading"
        >
          <span class="svg-icon" v-if="!uploadLoading"
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
          ></span>
          Добавить категорию
        </a-button>
      </div>
    </TitleBlock>
    <div class="container_xl">
      <div class="card_block-form py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
        >
          <!-- <Title title="Category edit" />
          <AddBtn name="Save" :icon="false" :callback="toAddProduct" /> -->
        </div>
        <div class="category-from-grid">
          <el-form
            label-position="top"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
            action=""
          >
            <div class="category-select-grid">
              <el-tabs
                class="form_tabs"
                v-model="activeName"
                @tab-click="handleClick"
              >
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Добавить категорию" />
                    </div>

                    <div class="category-input-grid">
                      <div class="form-block required mb-0">
                        <div><label for="">Название категории</label></div>
                        <el-form-item prop="name_ru">
                          <el-input
                            v-model="ruleForm[`name_${item.key}`]"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block">
                        <div><label for="">Выберите категорию</label></div>
                        <el-form-item>
                          <el-select
                            v-model="ruleForm.parent_id"
                            class="w-100"
                            placeholder="Choose tags for your article"
                            filterable
                            no-match-text="No Category"
                            no-data-text="No Category"
                          >
                            <el-option
                              v-for="item in categories"
                              :key="item.id"
                              :label="item.name?.ru"
                              :value="item.name?.ru"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="form-block">
                      <div><label for="">Информация о категории</label></div>
                      <quill-editor
                        style="min-height: 250px;"
                        :options="editorOption"
                        :value="ruleForm.desc[item.key]"
                        v-model="ruleForm.desc[item.key]"
                      />
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="form-container">
                <div class="form-block required">
                  <div><label>Атрибуты группы</label></div>
                  <el-form-item prop="attributes">
                    <el-select
                      v-model="ruleForm.attributes"
                      multiple
                      class="w-100"
                      allow-create
                      default-first-option
                      placeholder="Choose tags for your article"
                    >
                      <el-option
                        v-for="item in atributes"
                        :key="item.id"
                        :label="item.name.ru"
                        :value="item.name.ru"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-block required">
                  <div><label>Групповая характеристика</label></div>
                  <el-form-item prop="group_characteristics">
                    <el-select
                      v-model="ruleForm.group_characteristics"
                      class="w-100"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="Choose tags for your article"
                    >
                      <el-option
                        v-for="item in groups"
                        :key="item.id"
                        :label="item.name.ru"
                        :value="item.name.ru"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="d-flex justify-content-end">
                  <div class="form-btn form-outline-transparent mx-3">
                    Cancel
                  </div>
                  <div
                    type="submit"
                    class="form-btn form-btn-primary"
                    @click="submitForm('ruleForm')"
                  >
                    Save changes
                  </div>
                </div>
              </div>
            </div>
          </el-form>
          <div class="category-img-grid">
            <div class="form-container">
              <FormTitle title="Параметры" />
              <div class="form-block status-style">
                <div><label>Статус</label></div>
                <el-select
                  class="w-100"
                  placeholder="Status"
                  default-first-option
                  v-model="ruleForm.status"
                >
                  <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="form-block">
                <div><label>Порядок</label></div>
                <el-input
                  v-model="ruleForm.order"
                  placeholder="Order"
                ></el-input>
              </div>
              <div
                class="switch-text form-block d-flex flex-row align-items-center"
              >
                <a-switch
                  @change="onChange"
                  :checked="ruleForm.is_popular == 1"
                />
                <label class="mx-3 mb-0">Популярный</label>
              </div>
              <div class="form-block">
                <div><label for="">Добавить изображения категории</label></div>

                <div class="clearfix">
                  <a-upload
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="handlePreview"
                    @change="($event) => handleChange($event, fileList)"
                  >
                    <div v-if="fileList.length < 1">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.0264 19.999L20.0125 24.999M20.0125 24.999L24.9987 19.999M20.0125 24.999L20.0125 4.99902"
                          stroke="#3699FF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.5334 15V15C8.40276 15 5.0542 18.3486 5.0542 22.4792L5.0542 26.3333C5.0542 31.1198 8.9344 35 13.7209 35L26.3044 35C31.0909 35 34.9711 31.1198 34.9711 26.3333L34.9711 22.4792C34.9711 18.3486 31.6225 15 27.4919 15V15"
                          stroke="#3699FF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div class="ant-upload-text">
                        Upload image
                      </div>
                      <span class="upload-resize">(678 x 784)</span>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%;"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
              </div>
              <div class="form-block">
                <div><label>Svg</label></div>
                <el-input v-model="ruleForm.order" placeholder="Svg"></el-input>
              </div>
              <div class="form-block">
                <div><label for="">Добавить значок продукта</label></div>

                <div class="clearfix">
                  <a-upload
                    list-type="picture-card"
                    :file-list="fileList1"
                    @preview="handlePreview"
                    @change="handleChange1"
                  >
                    <div v-if="fileList1.length < 1">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.0264 19.999L20.0125 24.999M20.0125 24.999L24.9987 19.999M20.0125 24.999L20.0125 4.99902"
                          stroke="#3699FF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.5334 15V15C8.40276 15 5.0542 18.3486 5.0542 22.4792L5.0542 26.3333C5.0542 31.1198 8.9344 35 13.7209 35L26.3044 35C31.0909 35 34.9711 31.1198 34.9711 26.3333L34.9711 22.4792C34.9711 18.3486 31.6225 15 27.4919 15V15"
                          stroke="#3699FF"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div class="ant-upload-text">
                        Upload image
                      </div>
                      <span class="upload-resize">(678 x 784)</span>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%;"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../../components/form/Add-btn.vue";
import Title from "../../../components/Title.vue";
import FormTitle from "../../../components/Form-title.vue";
import Editor from "../../../components/form/editor.vue";
import TitleBlock from "../../../components/Title-block.vue";
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  layout: "toolbar",
  data() {
    return {
      activeName: "Русский",
      atributes: [],
      categories: [],
      groups: [],
      lang: [
        {
          key: "ru",
          label: "Русский",
        },
        {
          key: "uz",
          label: "Uzbek",
        },
        {
          key: "en",
          label: "English",
        },
      ],
      options: [
        {
          value: "HTML",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      status: [
        {
          value: "active",
          label: "Active",
        },
        {
          value: "disactive",
          label: "Disactive",
        },
      ],
      value: [],
      rules: {
        name_ru: [
          {
            required: true,
            message: "Category name is required",
            trigger: "change",
          },
        ],

        attributes: [
          {
            required: true,
            message: "Atribut is required",
            trigger: "change",
          },
        ],
        group_characteristics: [
          {
            required: true,
            message: "Group characters is required",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        parent_id: null,
        is_popular: 0,
        desc: {
          ru: "",
          uz: "",
          en: "",
        },

        name_ru: "",
        name_uz: "",
        name_en: "",
        icon: null,
        img: null,
        attributes: [],
        group_characteristics: [],
        position: null,
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
      fileList1: [],
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
      title: "Quill Editor",
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Quill Editor",
          active: true,
        },
      ],
      slug: "",
      uploadLoading: false,
    };
  },
  methods: {
    submitForm(ruleForm) {
      console.log(this.fileList, this.fileList1);

      const data = {
        ...this.ruleForm,
        name: {
          ru: this.ruleForm.name_ru,
          uz: this.ruleForm.name_uz,
          en: this.ruleForm.name_en,
        },
      };
      delete data["name_ru"];
      delete data["name_uz"];
      delete data["name_en"];
      data.attributes = this.atributes.map((item) => {
        if (data.attributes.includes(item.name.ru)) return item.id;
      });
      data.group_characteristics = this.groups.map((item) => {
        if (data.group_characteristics.includes(item.name.ru)) return item.id;
      });
      data.attributes = data.attributes.filter((elem) => elem);
      data.group_characteristics = data.group_characteristics.filter(
        (elem) => elem
      );
      if (data.parent_id) {
        data.parent_id = this.categories.filter(
          (item) => item.name.ru == data.parent_id
        )[0].id;
      }
      if (this.fileList[0].oldImg) {
        data.img = this.fileList[0].url;
      }
      if (this.fileList1[0].oldImg) {
        data.icon = this.fileList1[0].url;
      }
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.__EDIT_CATEGORIES(data);
        } else {
          return false;
        }
      });
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
      console.log("errors");
    },
    handleCancel() {
      this.previewVisible = false;
    },
    headerbtnCallback() {
      console.log("fsfsdf");
    },

    deleteIcon() {
      this.ruleForm.oldIcon = "";
      this.ruleForm = this.ruleForm;
      console.log("asdsad", this.ruleForm);
    },
    async handlePreview(file) {
      console.log("delete1", file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }, img) {
      this.fileList = fileList;
      let formData = new FormData();
      if (this.fileList.length > 0) {
        formData.append("file", fileList[0].originFileObj);
        this.uploadLoading = true;
        this.__UPLOAD_FILE("img", formData);
      } else {
        this.ruleForm["img"] = null;
      }
    },
    handleChange1({ fileList }) {
      this.fileList1 = fileList;
      let formData = new FormData();
      if (this.fileList1.length > 0) {
        formData.append("file", fileList[0].originFileObj);
        this.uploadLoading = true;
        this.__UPLOAD_FILE("icon", formData);
      } else {
        this.ruleForm["icon"] = null;
      }
    },

    async __UPLOAD_FILE(item, formData) {
      try {
        const data = await this.$store.dispatch(
          "uploadFile/uploadFile",
          formData
        );
        this.ruleForm[item] = data.path;
        this.uploadLoading = false;
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    handleClick(tab, event) {
      console.log("handlchange", tab, event);
      this.formVal = "";
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`);
      checked ? (this.ruleForm.is_popular = 1) : (this.ruleForm.is_popular = 0);
    },
    toBack() {
      this.$router.push("/catalog/categories");
    },

    async __GET_CATEGORY_BY_ID() {
      const data = await this.$store.dispatch(
        "fetchCategories/getCategoriesById",
        this.$route.params.index
      );
      const dataCat = await this.$store.dispatch(
        "fetchCategories/getCategories"
      );
      dataCat.categories?.data.forEach((item) => {
        if (item.children.length > 0) {
          this.categories = [item, ...item.children, ...this.categories];
        } else {
          this.categories = [item, ...this.categories];
        }
      });
      this.slug = data.category.slug;

      this.categories = this.categories
        .filter((elem) => elem.id != this.$route.params.index)
        .filter(
          (item) =>
            !data.category.children.find((childId) => childId.id == item.id)
        );
      console.log();
      this.ruleForm.name_ru = data.category.name.ru;
      this.ruleForm.name_uz = data.category.name.uz;
      this.ruleForm.name_en = data.category.name.en;
      this.ruleForm.desc.ru = data.category.desc.ru;
      this.ruleForm.desc.uz = data.category.desc.uz;
      this.ruleForm.desc.en = data.category.desc.en;
      this.ruleForm.attributes = data.category.attributes.map(
        (item) => item.name.ru
      );
      this.ruleForm.group_characteristics = data.category.characteristic_groups.map(
        (item) => item.name.ru
      );
      this.fileList = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          oldImg: true,
          url: data.category.md_img,
        },
      ];
      this.fileList1 = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          oldImg: true,
          url: data.category.md_icon,
        },
      ];
      this.ruleForm.is_popular = data.category.is_popular;
      if (data.category.parent_id) {
        this.ruleForm.parent_id = this.categories.filter(
          (item) => item.id == data.category.parent_id
        )[0].name.ru;
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
      const data = await this.$store.dispatch("fetchAtributes/getAtributes");
      this.atributes = data.attributes?.data;
    },
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchCharacters/getGroups");
      this.groups = data?.groups;
    },
    async __EDIT_CATEGORIES(res) {
      try {
        const data = await this.$store.dispatch(
          "fetchCategories/editCategories",
          { id: this.$route.params.index, data: { ...res, slug: this.slug } }
        );
        this.$notify({
          title: "Success",
          message: "Категория успешно добавлен",
          type: "success",
        });
        this.$router.push("/catalog/categories");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  mounted() {
    this.__GET_ATRIBUTES();
    this.__GET_GROUPS();
    this.__GET_CATEGORY_BY_ID();
  },
  components: {
    AddBtn,
    Title,
    FormTitle,
    Editor,
    TitleBlock,
    LayoutHeaderBtn,
    quillEditor,
  },
};
</script>
<style lang="scss">
/* you can make up upload button and sample style by using stylesheets */
.category-img-grid {
  .ant-upload.ant-upload-select-picture-card {
    background: #f3f6f9;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-info::before {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-eye-o,
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-download,
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-delete {
    color: #000;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 100% !important;
    height: 100%;
  }
  .ant-upload-list-picture-card-container {
    width: 100% !important;
    height: 218px;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 100% !important;
    height: 218px;
    background-color: #fff;
  }
  .upload-resize,
  .ant-upload-text {
    font-family: "TT Interfaces";
    font-style: normal;
  }
  .ant-upload-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #181c32;
  }
  .upload-resize {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-transform: uppercase;
    margin-top: 4px;
    color: #a1a5bf;
  }
  .last_img {
    width: 100%;
    height: 100%;
    height: 218px;
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
  @media (max-width: 1440px) {
    .ant-upload.ant-upload-select-picture-card {
      height: 160px;
    }
  }
}
</style>
