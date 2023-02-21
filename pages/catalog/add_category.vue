<template lang="html">
  <div class="container_xl">
    <div class="card_block py-5">
      <div
        class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
      >
        <Title title="Category edit" />
        <AddBtn name="Save" :icon="false" :callback="toAddProduct" />
      </div>
      <div class="category-from-grid">
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
                <el-form
                  label-position="top"
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                  action=""
                >
                  <div class="category-input-grid">
                    <div class="form-block required">
                      <div><label for="">Category name</label></div>
                      <el-form-item prop="nbm">
                        <el-input
                          v-model="ruleForm.nbm"
                          placeholder="Product model"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-block required">
                      <div><label for="">Choose category</label></div>
                      <el-form-item prop="nbm">
                        <el-input
                          v-model="ruleForm.nbm"
                          placeholder="Product model"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="form-block">
                    <div><label for="">Product info</label></div>
                    <Editor />
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="form-container">
            <div class="form-block required">
              <div><label>Group atributs</label></div>
              <el-select
                v-model="value"
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
            </div>
            <div class="form-block required">
              <div><label>Group Characteristic</label></div>
              <el-select
                v-model="value"
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
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%;" :src="previewImage" />
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
                  :file-list="fileList"
                  @preview="handlePreview"
                  @change="handleChange"
                >
                  <div v-if="fileList.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%;" :src="previewImage" />
                </a-modal>
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
        nbm: [
          {
            required: true,
            message: "incorrect email",
            trigger: "change",
          },
          {
            min: 10,
            max: 10,
            message: "Length should be 10",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        nbm: "",
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
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
  }
  @media (max-width: 1440px) {
    .ant-upload.ant-upload-select-picture-card {
      height: 160px;
    }
  }
}
</style>
