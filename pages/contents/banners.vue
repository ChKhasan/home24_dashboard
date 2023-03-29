<template lang="html">
  <div>
    <TitleBlock title="Баннеры" :breadbrumb="['Контент сайта']" lastLink="Баннеры">
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
          <FormTitle title="Баннеры" />
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="banners"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <div slot="img" slot-scope="text">
              <img v-if="text?.ru" class="table-image" :src="text?.ru" alt="" />
              <img
                v-else
                class="table-image"
                src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
                alt=""
              />
            </div>

            <div slot="link" slot-scope="text" v-html="text?.ru"></div>
            <span slot="numberId" slot-scope="text">#{{ text }}</span>
            <span slot="customTitle"></span>

            <span slot="id" slot-scope="text">
              <span class="action-btn" @click="editPost(text)">
                <img :src="editIcon" alt="" />
              </span>
              <a-popconfirm
                title="Are you sure delete this banner?"
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
    <a-modal
      v-model="visible"
      :title="editId ? 'Изменить баннера' : 'Добавить баннера'"
      :closable="false"
      @ok="handleOk"
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
      >
        <div
          v-for="(item, index) in modalTabData"
          :key="index"
          v-if="modalTab == item.index"
        >
          <div class="form-block required">
            <div>
              <label for="banner_link">Link</label>
            </div>
            <el-form-item prop="link_ru">
              <el-input
                id="banner_link"
                type="text"
                placeholder="Link"
                v-model="ruleForm[`link_${item.index}`]"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-block required mb-0">
            <div>
              <label for="banner_type">Type</label>
            </div>
            <el-form-item prop="type">
              <el-select
                v-model="ruleForm.type"
                class="w-100"
                filterable
                placeholder="Banner type"
                loading-text="Loading..."
                no-match-text="no category"
                no-data-text="No Category"
                default-first-option
              >
                <el-option v-for="item in types" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="clearfix variant-img">
            <a-upload
              action="https://test.loftcity.uz/api/admin/files/upload"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 1">
                <span v-html="addImgIcon"></span>
                <div class="ant-upload-text">Добавить изображение</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </div>
      </el-form>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="closeModal"
          >
            Cancel
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            @click="getData"
            type="primary"
            :loading="loadingBtn"
          >
            <span v-if="!loadingBtn" class="svg-icon" v-html="addIcon"></span>
            Save
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
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
  // middleware: "auth",
  data() {
    return {
      params: {
        page: 1,
      },
      pagination: {
        pageSize: 16,
      },
      loading: true,
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
        img: {
          ru: "",
          en: "",
          uz: "",
        },
        type: "",
        link_ru: "",
        link_uz: "",
        link_en: "",
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
          title: "Image",
          dataIndex: "sm_img",
          key: "sm_img",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          align: "left",
          className: "column-img",
        },
        {
          title: "Link",
          dataIndex: "link",
          key: "link",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "link" },
          className: "column-name",
          width: "30%",
          align: "center",
        },

        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          // width: "100px",
          align: "right",
        },
      ],

      editId: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      banners: [],
      types: {},
      rules: {
        link_ru: [
          {
            required: true,
            message: "Banner link is required",
            trigger: "change",
          },
        ],

        type: [
          {
            required: true,
            message: "Banner type desc is required",
            trigger: "change",
          },
        ],
      },
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },

    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/contents/banners`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_BANNERS();
    },
    getData() {
      const newData = {
        ...this.ruleForm,
        link: {
          ru: this.ruleForm.link_ru,
          uz: this.ruleForm.link_uz,
          en: this.ruleForm.link_en,
        },
      };
      delete newData["link_ru"];
      delete newData["link_uz"];
      delete newData["link_en"];
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.editId != "" ? this.__EDIT_BANNERS(newData) : this.__POST_BANNERS(newData);
        } else {
          return false;
        }
      });
    },
    cancel(e) {
      this.$message.error("Click on No");
    },
    openAddModal() {
      this.fileList = [];
      this.editId = "";
      this.ruleForm.type = "";
      this.showModal();
    },
    editPost(id) {
      this.editId = id;
      const data = this.banners.find((item) => item.id == id);
      this.ruleForm = {
        img: data.sm_img,
        link_ru: data.link.ru,
        link_uz: data.link.uz,
        link_en: data.link.en,
        type: "main",
      };
      this.fileList = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: this.ruleForm.img.ru,
        },
      ];
      this.showModal();
    },
    closeModal() {
      this.handleOk();
      this.ruleFormEmpty();
      this.editId = "";
      this.__GET_BANNERS();
    },
    ruleFormEmpty() {
      this.ruleForm.img = {
        ru: "",
        uz: "",
        en: "",
      };
      this.ruleForm.link_ru = "";
      this.ruleForm.link_uz = "";
      this.ruleForm.link_en = "";
    },
    deletePost(id) {
      this.__DELETE_BANNERS(id);
    },
    async __GET_BANNERS_TYPES() {
      const types = await this.$store.dispatch("fetchBanners/getBannerType");
      this.types = Object.values(types.types);
    },
    async __DELETE_BANNERS(id) {
      try {
        await this.$store.dispatch("fetchBanners/deleteBanners", id);
        await this.$notify({
          title: "Success",
          message: "Баннер был успешно удален",
          type: "success",
        });
        this.__GET_BANNERS();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    async handleChange({ fileList }) {
      this.loadingBtn = true;
      this.fileList = fileList;
      if (fileList[0]?.response?.path) {
        this.ruleForm.img.ru = fileList[0]?.response?.path;
        this.loadingBtn = false;
      } else if (fileList.length == 0) {
        this.loadingBtn = false;
      }
    },

    handleCancel() {
      this.previewVisible = false;
    },
    async __GET_BANNERS() {
      const data = await this.$store.dispatch("fetchBanners/getBanners", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.banners?.total;
      this.banners = data.banners?.data;
      this.banners = this.banners.map((item) => {
        return {
          ...item,
          numberId: item.id,
        };
      });
    },
    async __POST_BANNERS(res) {
      try {
        await this.$store.dispatch("fetchBanners/postBanners", res);
        await this.$notify({
          title: "Success",
          message: "Атрибут успешно добавлен",
          type: "success",
        });
        this.handleOk();
        this.__GET_BANNERS();
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
    async __EDIT_BANNERS(res) {
      try {
        await this.$store.dispatch("fetchBanners/editBanners", {
          id: this.editId,
          data: res,
        });
        this.$notify({
          title: "Success",
          message: "Пост успешно добавлен",
          type: "success",
        });
        this.handleOk();
        this.__GET_BANNERS();
        this.ruleFormEmpty();
        this.ruleForm.type = "";
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },

  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/contents/banners`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_BANNERS();
    this.__GET_BANNERS_TYPES();
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
