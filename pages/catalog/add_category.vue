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
        <LayoutHeaderBtn
          name=" Добавить категорию"
          :headerbtnCallback="headerbtnCallback"
          :light="false"
        />
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
                  :label="item.key"
                  :name="item.key"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Добавить категорию" />
                    </div>

                    <div class="category-input-grid">
                      <div class="form-block required">
                        <div><label for="">Название категории</label></div>
                        <el-form-item prop="category_name">
                          <el-input
                            v-model="ruleForm.category_name"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block required">
                        <div><label for="">Выберите категорию</label></div>
                        <el-form-item prop="choose_category">
                          <el-input
                            v-model="ruleForm.choose_category"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="form-block">
                      <div><label for="">Информация о категории</label></div>
                      <Editor />
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="form-container">
                <div class="form-block required">
                  <div><label>Атрибуты группы</label></div>
                  <el-form-item prop="group_atribut">
                    <el-select
                      v-model="ruleForm.group_atribut"
                      multiple
                      filterable
                      class="w-100"
                      allow-create
                      default-first-option
                      placeholder="Choose tags for your article"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-block required">
                  <div><label>Групповая характеристика</label></div>
                  <el-form-item prop="group_characters">
                    <el-select
                      v-model="ruleForm.group_characters"
                      class="w-100"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="Choose tags for your article"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
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
                <a-switch @change="onChange" />
                <label class="mx-3 mb-0">Популярный</label>
              </div>
              <div class="form-block">
                <div><label for="">Добавить изображения категории</label></div>
                <div class="clearfix">
                  <a-upload
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="handlePreview"
                    @change="handleChange"
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
import AddBtn from "../../components/form/Add-btn.vue";
import Title from "../../components/Title.vue";
import FormTitle from "../../components/Form-title.vue";
import Editor from "../../components/form/editor.vue";
import TitleBlock from "../../components/Title-block.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
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
      lang: [
        {
          key: "Русский",
        },
        {
          key: "Uzbek",
        },
        {
          key: "English",
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
        category_name: [
          {
            required: true,
            message: "Category name is required",
            trigger: "change",
          },
        ],
        choose_category: [
          {
            required: true,
            message: "Choose category is required",

            trigger: "change",
          },
        ],
        group_atribut: [
          {
            required: true,
            message: "Group atribut is required",
            trigger: "blur",
          },
        ],
        group_characters: [
          {
            required: true,
            message: "Group characters is required",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {
        category_name: "",
        choose_category: "",
        status: "active",
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
      fileList1: [],
    };
  },
  methods: {
    submitForm(ruleForm) {
      console.log(this.fileList, this.fileList1);
      // this.$refs[ruleForm].validate((valid) => {
      //   if (valid) {
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
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
    handleChange1({ fileList }) {
      this.fileList1 = fileList;
    },
    handleClick(tab, event) {
      console.log("handlchange", tab, event);
      this.formVal = "";
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`);
    },
    toBack() {
      this.$router.push("/catalog/categories");
    },
  },
  components: {
    AddBtn,
    Title,
    FormTitle,
    Editor,
    TitleBlock,
    LayoutHeaderBtn,
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
  @media (max-width: 1440px) {
    .ant-upload.ant-upload-select-picture-card {
      height: 160px;
    }
  }
}
</style>
