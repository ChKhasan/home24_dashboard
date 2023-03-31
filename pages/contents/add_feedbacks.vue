<template lang="html">
  <div>
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <TitleBlock title="Feedback" :breadbrumb="['Контент сайта']" lastLink="Feedback">
        <div class="d-flex">
          <span class="mx-3">
            <LayoutHeaderBtn name="Отмена" :headerbtnCallback="toBack" :light="true" />
          </span>
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            type="primary"
            @click="submitForm('ruleForm')"
            :loading="uploadLoading"
          >
            <span class="svg-icon" v-html="addIcon" v-if="!uploadLoading"></span>
            Добавить
          </a-button>
        </div>
      </TitleBlock>
      <div class="container_xl">
        <div class="card_block-form py-5">
          <div
            class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
          ></div>

          <div class="form-container form-container-ltr">
            <FormTitle title="Feedback" />

            <div class="form-block required">
              <div><label for="character_group">company</label></div>
              <el-form-item prop="company">
                <el-input type="text" v-model="ruleForm.company" />
              </el-form-item>
            </div>
            <div class="form-block required">
              <div><label for="">feedback</label></div>
              <el-form-item prop="feedback">
                <el-input
                  v-model="ruleForm.feedback"
                  placeholder="Atribut Name"
                  type="textarea"
                  rows="5"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form-block required">
              <div><label for="">Logo</label></div>
              <div class="clearfix variant-img">
                <a-upload
                action="https://test.loftcity.uz/api/admin/files/upload"
                  list-type="picture-card"
                  :file-list="fileList1"
                  @preview="handlePreview"
                  @change="($event) => handleChange($event, false)"
                >
                  <div v-if="fileList1.length < 1">
                    <span v-html="addImgIcon"></span>
                    <div class="ant-upload-text">Добавить изображение</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </div>
            <div class="form-block required">
              <div><label for="">Изображение</label></div>
              <div class="clearfix variant-img">
                <a-upload
                  list-type="picture-card"
                  :file-list="fileList"
                  :multiple="true"
                  @preview="handlePreview"
                  @change="($event) => handleChange($event, true)"
                >
                  <div v-if="fileList.length < 50">
                    <span v-html="addImgIcon"></span>
                    <div class="ant-upload-text">Добавить изображение</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import AddModal from "../../components/modals/Add-modal.vue";
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
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../assets/svg/components/add-img-icon.svg?raw"),
      fileList1: [],
      fileList: [],
      uploadLoading: false,
      rules: {
        company: [
          {
            required: true,
            message: "company name is required",
            trigger: "change",
          },
        ],

        feedback: [
          {
            required: true,
            message: "feedback is required",
            trigger: "change",
          },
        ],
      },
      previewVisible: false,
      previewImage: "",
      ruleForm: {
        feedback: null,
        company: "",
        logo: "",
        images: [],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        valid ? this.__POST_FEEDBACK(this.ruleForm) : false;
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
    handleChange({ fileList }, type) {
      if (fileList[0]?.response?.path && type == "fileList") {
        this.ruleForm.images = fileList.map((item) => item.response.path);
      } else if (fileList[0]?.response?.path && type == "fileList1") {
        this.ruleForm.logo = fileList[0]?.response?.path;
      }
      this[type ? `fileList` : `fileList1`] = fileList;
    },
    show(name) {
      this.$modal.show(name);
    },

    hide(name) {
      this.$modal.hide(name);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async __POST_FEEDBACK(data) {
      try {
        await this.$store.dispatch("fetchFeedbacks/postFeedbacks", data);
        await this.$notify({
          title: "Success",
          message: "Упешно добавлен",
          type: "success",
        });
        this.$router.push("/contents/feedbacks");
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

    toBack() {
      this.$router.push("/contents/feedbacks");
    },
    async __UPLOAD_FILE(formData) {
      try {
        const data = await this.$store.dispatch("uploadFile/uploadFile", formData);
        return data.path;
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  watch: {
    // async fileList1(val) {
    //   if (val.length > 0) {
    //     let images = "";
    //     let formData = new FormData();
    //     formData.append("file", this.fileList1[0].originFileObj);
    //     images = formData;
    //     this.uploadLoading = true;
    //     this.ruleForm.logo = await this.__UPLOAD_FILE(images);
    //     this.uploadLoading = false;
    //   }
    // },
    // async fileList(val) {
    //   if (val.length > 0) {
    //     let images = [];
    //     this.fileList.forEach((element, index) => {
    //       let formData = new FormData();
    //       formData.append("file", element.originFileObj);
    //       images[index] = formData;
    //     });
    //     this.uploadLoading = true;
    //     images.forEach(async (element, index) => {
    //       this.ruleForm.images[index] = await this.__UPLOAD_FILE(element);
    //       this.uploadLoading = false;
    //     });
    //   }
    // },
  },
  components: {
    TitleBlock,
    LayoutHeaderBtn,
    AddModal,
  },
};
</script>
