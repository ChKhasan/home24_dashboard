<template lang="html">
  <div>
    <TitleBlock title="Aкции" :breadbrumb="['Маркетинг']" lastLink="Aкции">
      <div class="d-flex">
        <span class="mx-3">
          <LayoutHeaderBtn
            name="Отмена"
            :headerbtnCallback="toBack"
            :light="true"
          /> </span
        ><a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="uploadLoading"
        >
          <span class="svg-icon" v-if="!uploadLoading" v-html="addIcon"></span>
          Добавить акцию
        </a-button>
      </div>
    </TitleBlock>
    <div class="container_xl">
      <div class="card_block-form py-5">
        <el-form
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          action=""
        >
          <div class="category-from-grid">
            <div class="category-select-grid">
              <el-tabs class="form_tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Добавить акцию" />
                    </div>

                    <div class="category-input-grid">
                      <div class="form-block required mb-0">
                        <el-form-item :prop="`name.ru`" label="Полное название">
                          <el-input
                            v-model="ruleForm.name[item.key]"
                            placeholder="Полное название..."
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block required">
                        <el-form-item prop="choose_category" label="Короткое название">
                          <el-input
                            v-model="ruleForm.name[item.key]"
                            placeholder="Короткое название..."
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="form-block">
                      <div><label for="">Информация</label></div>
                      <quill-editor
                        style="min-height: 250px"
                        :options="editorOption"
                        :value="ruleForm.desc[item.key]"
                        v-model="ruleForm.desc[item.key]"
                      />
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="category-img-grid">
              <div class="form-container">
                <FormTitle title="Параметры" />
                <div
                  class="form-block status-style"
                  :class="[ruleForm.is_active == 1 ? 'status-active' : 'status-inactive']"
                >
                  <div><label>Статус</label></div>
                  <el-select
                    class="w-100"
                    popper-class="select-popper-hover"
                    placeholder="Status"
                    default-first-option
                    v-model="ruleForm.is_active"
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

                <div class="d-flex">
                  <el-form-item class="mb-0 form-block mr-3" label="color start">
                    <el-color-picker
                      popper-class="badges-color-picker"
                      v-model="ruleForm.position"
                    ></el-color-picker>
                  </el-form-item>
                  <el-form-item class="mb-0 form-block" label="color end">
                    <el-color-picker
                      popper-class="badges-color-picker"
                      v-model="ruleForm.position"
                    ></el-color-picker>
                  </el-form-item>
                </div>
                <el-form-item class="form-block" label="Дата" prop="start">
                  <a-range-picker @change="onChangeDate" />
                </el-form-item>
                <div class="form-block">
                  <div><label for="">Добавить изображения</label></div>
                  <div class="clearfix">
                    <a-upload
                      list-type="picture-card"
                      action="https://api.e-shop.ndc.uz/api/admin/files/upload"
                      :file-list="fileList.img"
                      @preview="handlePreview"
                      @change="($event) => handleChange($event, 'img')"
                    >
                      <div v-if="fileList.img.length < 1">
                        <span v-html="addImgIcon"></span>
                        <div class="ant-upload-text">Добавить изображение</div>
                        <span class="upload-resize">(678 x 784)</span>
                      </div>
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </div>
                <div class="form-block">
                  <div><label>Svg</label></div>
                  <el-input v-model="ruleForm.icon_svg" placeholder="Svg"></el-input>
                </div>
                <div class="form-block mb-0">
                  <div><label>Добавить значок</label></div>
                  <div class="clearfix">
                    <a-upload
                      action="https://api.e-shop.ndc.uz/api/admin/files/upload"
                      list-type="picture-card"
                      :file-list="fileList.icon"
                      @preview="handlePreview"
                      @change="($event) => handleChange($event, 'icon')"
                    >
                      <div v-if="fileList.icon.length < 1">
                        <span v-html="addImgIcon"></span>
                        <div class="ant-upload-text">Добавить изображение</div>
                        <span class="upload-resize">(678 x 784)</span>
                      </div>
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import FormTitle from "../../../components/Form-title.vue";
import TitleBlock from "../../../components/Title-block.vue";
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import InputBlock from "../../../components/form/Input-block.vue";
import { Drag, DropList } from "vue-easy-dnd";
import status from "../../../mixins/status";

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
  mixins: [status],
  data() {
    return {
      activeName: "Русский",
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../../assets/svg/components/add-img-icon.svg?raw"),
      addInnerValidatIcon: require("../../../assets/svg/components/add-inner-validat-icon.svg?raw"),
      categories: [
        {
          name: {
            ru: "Главная категория ",
          },
          id: null,
        },
      ],
      fileList: {
        img: [],
        icon: [],
      },
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
      status: [
        {
          value: 1,
          label: "Активный",
        },
        {
          value: 0,
          label: "Неактивный",
        },
      ],
      rules: {
        name: {
          ru: [
            {
              required: true,
              message: "Название категории обязательна",
              trigger: "change",
            },
          ],
        },
        attributes: [
          {
            required: true,
            message: "Атрибуты обязательны",
            trigger: "change",
          },
        ],
        group_characteristics: [
          {
            required: true,
            message: "Группа характеристик обязательна",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        parent_id: null,
        is_popular: 0,
        status: "active",
        desc: {
          ru: "",
          uz: "",
          en: "",
        },
        name: {
          ru: "",
          uz: "",
          en: "",
        },
        start: "",
        end: "",
        icon: "",
        img: "",
        attributes: [],
        group_characteristics: [],
        position: null,
        is_active: 1,
        icon_svg: "",
      },
      previewVisible: false,
      previewImage: "",
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
      uploadLoading: false,
    };
  },
  methods: {
    submitForm(ruleForm) {
      const data = {
        ...this.ruleForm,
        attributes: this.attributes.map((item) => item.name),
        group_characteristics: this.group_characteristics.map((item) => item.name),
      };

      delete data["status"];
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (!this.attributes[0].name || !this.group_characteristics[0].name) {
            !this.attributes[0].name
              ? this.notificationError("Error", "Вы не добавили атрибут")
              : this.notificationError("Error", "Вы не добавили группу");
          } else {
            this.__POST_CATEGORIES(data);
          }
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    async handleChange({ fileList }, type) {
      this.fileList[type] = fileList;
      if (fileList[0]?.response?.path) this.ruleForm[type] = fileList[0]?.response?.path;
    },
    handleClick(tab, event) {
      this.formVal = "";
    },
    onChangeDate(date, dateString) {
      if (dateString[0] == dateString[1]) {
        this.ruleForm.start = dateString[0];
        this.ruleForm.end = null;
      } else {
        this.ruleForm.start = dateString[0];
        this.ruleForm.end = dateString[1];
      }
    },
    toBack() {
      this.$router.push("/inbox/promotions");
    },
    async __GET_CATEGORIES() {
      const data = await this.$store.dispatch("fetchCategories/getCategories");
      data.categories?.data.forEach((item) => {
        if (item.children.length > 0) {
          this.categories = [...this.categories, item, ...item.children];
        } else {
          this.categories = [...this.categories, item];
        }
      });
    },
    async __GET_ATRIBUTES() {
      const data = await this.$store.dispatch("fetchAtributes/getAtributes");
      this.atributes = data.attributes?.data;
      this.allAtributes = data.attributes?.data;
    },
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchCharacters/getGroups");
      this.groups = data?.groups;
      this.allGroups = data?.groups;
    },
    async __POST_CATEGORIES(res) {
      try {
        await this.$store.dispatch("fetchCategories/postCategories", res);
        this.notification("Success", "Категория успешно добавлен", "success");
        this.$router.push("/catalog/categories");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  mounted() {
    this.__GET_CATEGORIES();
    this.__GET_ATRIBUTES();
    this.__GET_GROUPS();
  },
  components: {
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    InputBlock,
    Drag,
    DropList,
  },
};
</script>
<style lang="scss">
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
  @media (max-width: 1440px) {
    .ant-upload.ant-upload-select-picture-card {
      height: 160px;
    }
  }
}

.list > div {
  display: flex;
  flex-direction: column;
}

.flip-list {
  transition: all 0.4s;
  display: grid;
  grid-gap: 24px;
}
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.flip-list-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.flip-list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.item {
  transition: transform 0.2s;
}

.over {
  opacity: 0.6;
}
// 820
</style>
