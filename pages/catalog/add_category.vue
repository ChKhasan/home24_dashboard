<template lang="html">
  <div>
    <TitleBlock
      title="Products"
      :breadbrumb="['eCommerce', 'Catalog']"
      lastLink="Products"
    >
      <div class="d-flex">
        <div class="add-btn add-header-btn add-header-btn-padding btn-primary">
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
          ></span>
          Add Category
        </div>
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
                  v-for="item in lang"
                  :label="item.key"
                  :name="item.key"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Category edit" />
                      <div class="switch-text">
                        <span>Popluar</span> <a-switch @change="onChange" />
                      </div>
                    </div>

                    <div class="category-input-grid">
                      <div class="form-block required">
                        <div><label for="">Category name</label></div>
                        <el-form-item prop="category_name">
                          <el-input
                            v-model="ruleForm.category_name"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block required">
                        <div><label for="">Choose category</label></div>
                        <el-form-item prop="choose_category">
                          <el-input
                            v-model="ruleForm.choose_category"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="form-block">
                      <div><label for="">Product info</label></div>
                      <Editor />
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="form-container">
                <div class="form-block required">
                  <div><label>Group atributs</label></div>
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
                  <div><label>Group Characteristic</label></div>
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
              <div class="form-block">
                <div><label for="">Add product pictures </label></div>
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
            </div>
            <div class="form-container">
              <div class="form-block">
                <div><label for="">Add product icon</label></div>
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
  },
  components: {
    AddBtn,
    Title,
    FormTitle,
    Editor,
    TitleBlock,
  },
};
</script>
<style lang="scss">
/* you can make up upload button and sample style by using stylesheets */
.category-img-grid {
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
