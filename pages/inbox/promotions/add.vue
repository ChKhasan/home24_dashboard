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
                      <FormTitle title="Этикетка" />
                      <div
                        class="test_label"
                        v-if="ruleForm.short_name[item.key].length > 0"
                      >
                        <div
                          :style="`background: linear-gradient(250deg, ${ruleForm.color_end} 0%, ${ruleForm.color_start} 100%);color: ${ruleForm.color_text}`"
                        >
                          <span v-html="ruleForm.icon_svg"></span
                          >{{ ruleForm.short_name[item.key] }}
                        </div>
                      </div>
                    </div>

                    <div class="category-input-grid">
                      <div class="d-flex" style="gap: 10px">
                        <el-form-item
                          class="form-block w-100"
                          prop="short_name.ru"
                          style="max-width: 400px"
                          label="Короткое название"
                        >
                          <el-input
                            v-model="ruleForm.short_name[item.key]"
                            placeholder="Короткое название..."
                          ></el-input>
                        </el-form-item>
                        <div class="form-block mb-2" style="min-width: 300px">
                          <div><label>Svg</label></div>
                          <el-input
                            v-model="ruleForm.icon_svg"
                            placeholder="Svg"
                          ></el-input>
                        </div>
                        <div class="d-flex">
                          <el-form-item class="mb-0 form-block" label="Цвет 1">
                            <el-color-picker
                              popper-class="badges-color-picker"
                              v-model="ruleForm.color_start"
                            ></el-color-picker>
                          </el-form-item>
                          <el-form-item class="mb-0 form-block mx-3" label="Цвет 2">
                            <el-color-picker
                              popper-class="badges-color-picker"
                              v-model="ruleForm.color_end"
                            ></el-color-picker>
                          </el-form-item>
                          <el-form-item class="mb-0 form-block" label="Цвет для текста">
                            <el-color-picker
                              popper-class="badges-color-picker"
                              v-model="ruleForm.color_text"
                            ></el-color-picker>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Этикетка для продуктов" />
                    </div>

                    <div class="category-input-grid">
                      <el-tabs class="desc_tab" v-model="activeDesc">
                        <el-tab-pane label="С текстом" name="input">
                          <div class="d-flex">
                            <el-form-item
                              class="form-block w-100"
                              prop="short_name.ru"
                              style="max-width: 400px"
                              label="Короткое название"
                            >
                              <el-input
                                v-model="ruleForm.short_name[item.key]"
                                placeholder="Короткое название..."
                              ></el-input>
                            </el-form-item>
                            <div class="d-flex">
                              <el-form-item
                                class="mb-0 form-block mx-3"
                                label="Цвет для фона"
                              >
                                <el-color-picker
                                  popper-class="badges-color-picker"
                                  v-model="ruleForm.position"
                                ></el-color-picker>
                              </el-form-item>
                              <el-form-item
                                class="mb-0 form-block"
                                label="Цвет для текста"
                              >
                                <el-color-picker
                                  popper-class="badges-color-picker"
                                  v-model="ruleForm.position"
                                ></el-color-picker>
                              </el-form-item>
                            </div></div
                        ></el-tab-pane>
                        <el-tab-pane label="С значком" name="upload">
                          <div class="d-flex">
                            <div
                              class="form-block mb-2"
                              style="min-width: 300px"
                              v-if="iconType"
                            >
                              <div><label>Svg</label></div>
                              <el-input
                                v-model="ruleForm.icon_svg"
                                placeholder="Svg"
                              ></el-input>
                            </div>
                            <div class="form-block mb-0" v-else>
                              <div><label>Добавить значок</label></div>
                              <div class="clearfix mb-0">
                                <a-upload
                                  class="icon_upload"
                                  action="https://api.e-shop.ndc.uz/api/admin/files/upload"
                                  list-type="picture-card"
                                  :file-list="fileList.icon"
                                  @preview="handlePreview"
                                  @change="($event) => handleChange($event, 'icon')"
                                >
                                  <div
                                    v-if="fileList.icon.length < 1"
                                    class="d-flex align-items-center"
                                  >
                                    <span v-html="addImgIcon"></span>
                                    <div class="ant-upload-text mx-2 mt-0">Icon</div>
                                  </div>
                                </a-upload>
                                <a-modal
                                  :visible="previewVisible"
                                  :footer="null"
                                  @cancel="handleCancel"
                                >
                                  <img
                                    alt="example"
                                    style="width: 100%"
                                    :src="previewImage"
                                  />
                                </a-modal>
                              </div>
                            </div>
                          </div>
                          <a-switch
                            checked-children="Svg"
                            un-checked-children="Icon"
                            @change="($event) => (iconType = $event)"
                            v-model="iconType"
                          />
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <el-tabs class="form_tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Полная информация" />
                    </div>

                    <div class="category-input-grid">
                      <div class="form-block required">
                        <el-form-item :prop="`name.ru`" label="Полное название">
                          <el-input
                            v-model="ruleForm.name[item.key]"
                            placeholder="Полное название..."
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
      iconType: false,
      activeDesc: "input",
      activeName: "Русский",
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../../assets/svg/components/add-img-icon.svg?raw"),
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
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
        short_name: {
          ru: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
      },
      ruleForm: {
        color_start: "",
        color_end: "",
        color_text: "",
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
        short_name: {
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
      console.log(this.ruleForm);
      this.$refs[ruleForm].validate((valid) => {
        valid ? this.__POST_PROMOTIONS(data) : false;
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

    async __POST_PROMOTIONS(res) {
      try {
        await this.$store.dispatch("fetchCategories/postCategories", res);
        this.notification("Success", "Категория успешно добавлен", "success");
        this.$router.push("/catalog/categories");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },

  components: {
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
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

.icon_upload .ant-upload-select-picture-card {
  height: 30px;
}
.test_label div {
  display: flex;
  border-radius: 5px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  clip-path: polygon(10% 0, 100% 1%, 90% 100%, 0% 100%);
  padding: 1px 20px;
  line-height: 17.089px; /* 142.407% */
  align-items: center;
}
.test_label span svg {
  margin-right: 6px;
}

// 820
</style>
