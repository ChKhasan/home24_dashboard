<template lang="html">
  <div>
    <TitleBlock
      title="Баннеры"
      :breadbrumb="['Контент сайта']"
      lastLink="Баннеры"
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
            <FormTitle title="Баннеры" />
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="banners"
            :pagination="false"
            align="center"
          >
            <a slot="img" slot-scope="text">
              <img v-if="text?.ru" class="table-image" :src="text?.ru" alt="" />
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
            <div slot="link" slot-scope="text" v-html="text?.ru"></div>
            <span slot="numberId" slot-scope="text">#{{ text }}</span>
            <a slot="price" slot-scope="text">${{ text }}</a>
            <span slot="customTitle"></span>

            <span
              slot="tags"
              slot-scope="tags"
              class="tags-style"
              :class="{
                tag_success: tags == 'Success',
                tag_inProgress: tags == 'in progress',
                tag_approved: tags == 'Approved',
                tag_rejected: tags == 'rejected',
              }"
            >
              {{ tags }}
            </span>
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
    <AddModal
      :title="editId ? 'Изменить баннера' : 'Добавить баннера'"
      name="add_banners"
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
              <label for="">Link</label>
            </div>
            <el-form-item prop="link_ru">
              <el-input
                type="text"
                placeholder="Link"
                v-model="ruleForm[`link_${item.index}`]"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-block required">
            <div>
              <label for="">Type</label>
            </div>
            <el-form-item prop="type">
              <el-input
                type="text"
                placeholder="Link"
                v-model="ruleForm.type"
              ></el-input>
            </el-form-item>
          </div>

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
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
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
          dataIndex: "md_img",
          key: "md_img",
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
          //   width: "10%",
          align: "right",
        },
      ],

      value: "",
      editId: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      banners: [],
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
          this.editId != ""
            ? this.__EDIT_BANNERS(newData)
            : this.__POST_BANNERS(newData);
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
      this.fileList = [];
      this.editId = "";
      this.ruleForm.type = "";
      this.show("add_banners");
    },
    editPost(id) {
      this.editId = id;
      const data = this.banners.find((item) => item.id == id);
      this.ruleForm = {
        img: data.md_img,
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
      this.show("add_banners");

      // this.__GET_BANNERS_BY_ID(id);
    },
    closeModal() {
      this.hide("add_banners");

      this.ruleForm.img = {
        ru: "",
        uz: "",
        en: "",
      };
      this.ruleForm.link_ru = "";
      this.ruleForm.link_uz = "";
      this.ruleForm.link_en = "";

      this.editId = "";
      this.__GET_BANNERS();
    },
    deletePost(id) {
      this.__DELETE_BANNERS(id);
    },
    async __DELETE_BANNERS(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchBanners/deleteBanners",
          id
        );
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
    start() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    tableActions(id) {
      console.log(id);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    handleCommand(command) {
      this.pageSize = command;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.loadingBtn = true;

      this.fileList = fileList;
      let formData = new FormData();
      const newImg = fileList;
      if (newImg.length > 0) {
        formData.append("file", newImg[0].originFileObj);
        this.__UPLOAD_FILE(formData);
      }
    },
    async __UPLOAD_FILE(formData) {
      console.log(formData);
      try {
        const data = await this.$store.dispatch(
          "uploadFile/uploadFile",
          formData
        );
        this.ruleForm.img.ru = data.path;
        this.loadingBtn = false;
      } catch (e) {
        console.log(e);
        this.statusFunc(e.response);
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async __GET_BANNERS() {
      const data = await this.$store.dispatch("fetchBanners/getBanners");
      console.log(data);
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
        this.hide("add_banners");
        this.__GET_BANNERS();
        this.ruleForm.img = {
          ru: "",
          uz: "",
          en: "",
        };

        this.ruleForm.link_ru = "";
        this.ruleForm.link_uz = "";
        this.ruleForm.link_en = "";
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
        const data = await this.$store.dispatch("fetchBanners/editBanners", {
          id: this.editId,
          data: res,
        });
        this.$notify({
          title: "Success",
          message: "Пост успешно добавлен",
          type: "success",
        });
        this.hide("add_banners");
        this.__GET_BANNERS();
        this.ruleForm.img = {
          ru: "",
          uz: "",
          en: "",
        };

        this.ruleForm.link_ru = "";
        this.ruleForm.link_uz = "";
        this.ruleForm.link_en = "";
        this.ruleForm.type = "";
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_BANNERS_BY_ID(id) {
      const data = await this.$store.dispatch("fetchPosts/getPostsById", id);
      console.log(data);
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
    this.__GET_BANNERS();
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
