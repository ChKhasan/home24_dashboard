<template lang="html">
  <div>
    <TitleBlock title="Бренды" :breadbrumb="['Контент сайта']" lastLink="Бренды">
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
          <div class="d-flex justify-content-between w-100">
            <FormTitle title="Бренды" />
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="brands"
            :pagination="pagination"
            align="center"
            :loading="loading"
            @change="handleTableChange"
          >
            <a slot="img" slot-scope="text">
              <img v-if="text" class="table-image" :src="text" alt="" />
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
            <div slot="desc" slot-scope="text" v-html="text?.ru"></div>
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
                title="Are you sure delete this brand?"
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
      :title="editId ? 'Изменения бренда' : 'Добавить бренда'"
      name="add_brand"
      btnText="Save"
      :callback="getData"
      :closeModal="closeModal"
      :loadingBtn="loadingBtn"
    >
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        action=""
      >
        <div>
          <div class="form-block required">
            <div>
              <label for="">Бренд </label>
            </div>
            <el-form-item prop="name">
              <el-input
                type="text"
                placeholder="Зоговолок"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
          </div>
          <div class="clearfix variant-img mt-0">
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
    </AddModal>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import Title from "../../components/Title.vue";
import TitleBlock from "../../components/Title-block.vue";
import FormTitle from "../../components/Form-title.vue";
import AddModal from "../../components/modals/Add-modal.vue";
import AddBrandModal from "../../components/products/Add-brand-modal.vue";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    console.log("sdfsdfsdfsdf");
  });
}
export default {
  // middleware: "auth",
  data() {
    return {
      page: 1,
      params: {
        page: 1,
      },
      pagination: {
        pageSize: 16,
      },
      modalTab: "ru",
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
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      addImgIcon: require("../../assets/svg/components/add-img-icon.svg?raw"),
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      selectedRowKeys: [], // Check here to configure the default column
      loading: true,
      loadingBtn: false,
      ruleForm: {
        name: "",
        logo: "",
      },
      editImage: "",
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
          title: "Бренд",
          dataIndex: "lg_logo",
          key: "lg_logo",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          align: "left",
          className: "column-img",
          colSpan: 2,
          width: "45px",
        },
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          width: "30%",
          colSpan: 0,
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
      editId: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      brands: [],
      formData: {},
      rules: {
        title_ru: [
          {
            required: true,
            message: "Blog title is required",
            trigger: "change",
          },
        ],

        desc_ru: [
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
          path: `/catalog/brands`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_BRANDS();
    },
    getData() {
      if (this.fileList.length > 0) {
        if (this.fileList[0].oldImg) {
          this.ruleForm.logo = this.fileList[0].url;
        }
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.editId != ""
            ? this.__EDIT_BRANDS(this.ruleForm)
            : this.__POST_BRANDS(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },
    deleteImg() {
      this.editImage = "";
    },
    openAddModal() {
      this.show("add_brand");
      this.editId = "";
      this.fileList = [];
    },
    editPost(id) {
      this.editId = id;
      const data = this.brands.find((item) => item.id == id);
      this.slug = data.slug;
      this.ruleForm = {
        ...data,
        log: data.lg_logo,
      };
      this.show("add_brand");
      this.fileList = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          oldImg: true,
          url: this.ruleForm.lg_logo,
        },
      ];
    },
    closeModal() {
      this.hide("add_brand");
      this.ruleForm.logo = "";
      this.ruleForm.name = "";
      this.editId = "";
      this.__GET_BRANDS();
    },
    deletePost(id) {
      this.__DELETE_BRANDS(id);
    },
    async __DELETE_BRANDS(id) {
      try {
        const data = await this.$store.dispatch("fetchBrands/deleteBrands", id);
        await this.$notify({
          title: "Success",
          message: "Бранд был успешно удален",
          type: "success",
        });
        this.__GET_BRANDS();
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
      console.log("sdfsdfsdfsdf");
    },

    handleChange({ fileList }) {
      this.fileList = fileList;
      this.ruleForm.logo = fileList[0]?.response?.path;
    },

    handleCancel() {
      this.previewVisible = false;
    },
    async __GET_BRANDS() {
      const data = await this.$store.dispatch("fetchBrands/getBrands", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.brands?.total;
      this.brands = data.brands?.data;
      this.brands = this.brands.map((item) => {
        return {
          ...item,
          numberId: item.id,
        };
      });
    },

    async __POST_BRANDS(res) {
      try {
        await this.$store.dispatch("fetchBrands/postBrands", res);
        await this.$notify({
          title: "Success",
          message: "Бранд успешно добавлен",
          type: "success",
        });
        this.hide("add_brand");
        this.__GET_BRANDS();
        this.ruleForm.logo = "";
        this.ruleForm.name = "";
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
    async __EDIT_BRANDS(res) {
      try {
        await this.$store.dispatch("fetchBrands/editBrands", {
          id: this.editId,
          data: { ...res, slug: this.slug },
        });
        this.$notify({
          title: "Success",
          message: "Пост успешно добавлен",
          type: "success",
        });
        this.hide("add_brand");
        this.__GET_BRANDS();
        this.ruleForm.logo = "";
        this.ruleForm.name = "";
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },

  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/catalog/brands`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_BRANDS();
  },
  watch: {
    "pagination.current"() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  components: {
    AddBtn,
    SearchInput,
    Title,
    TitleBlock,
    FormTitle,
    AddModal,
    AddBrandModal,
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
