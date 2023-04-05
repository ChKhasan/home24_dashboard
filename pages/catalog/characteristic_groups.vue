<template lang="html">
  <div>
    <TitleBlock
      title="Группа характеристика"
      :breadbrumb="['Каталог']"
      lastLink="Группа характеристика"
    >
      <div
        class="add-btn add-header-btn add-header-btn-padding btn-primary"
        @click="$router.push('/catalog/add_characteristic')"
      >
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
        Добавить
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div class="d-flex justify-content-between align-items-center pt-4">
          <div class="d-flex justify-content-between w-100">
            <FormTitle title="Группа характеристика" />
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="groups"
            :pagination="pagination"
            align="center"
            :loading="loading"
            @change="handleTableChange"
          >
            <span
              @click="$router.push('/home/customer-info/123')"
              slot="name"
              slot-scope="text"
              align="center"
              class="table_product_row"
            >
              <h6>{{ text?.ru }}</h6>
            </span>

            <span slot="numberId" slot-scope="text">#{{ text }}</span>
            <span slot="customTitle"></span>

            <span slot="id" slot-scope="text">
              <!-- <span class="action-btn" @click="editPost(text)">
                <img :src="editIcon" alt="" />
              </span> -->
              <!-- <a-popconfirm
                title="Are you sure delete this group?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deletePost(text)"
                @cancel="cancel"
              >
                <span class="action-btn">
                  <img :src="deleteIcon" alt="" />
                </span>
              </a-popconfirm> -->
            </span>
          </a-table>
        </div>
      </div>
    </div>

    <a-modal
      v-model="visible"
      :title="editId ? 'Изменить категорию' : 'Добавить категорию'"
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
        action=""
      >
        <div
          v-for="(item, index) in modalTabData"
          :key="index"
          v-if="modalTab == item.index"
        >
          <div class="form-block required">
            <div>
              <label for="">Group name</label>
            </div>
            <el-form-item prop="name_ru">
              <el-input
                type="text"
                placeholder="Group name"
                v-model="ruleForm[`name_${item.index}`]"
              ></el-input>
            </el-form-item>
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

export default {
  // middleware: "auth",
  data() {
    return {
      modalTab: "ru",
      visible: false,
      page: 1,
      params: {
        page: 1,
      },
      pagination: {
        pageSize: 16,
      },
      loading: true,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      tableData: [],
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
        name_ru: "",
        name_uz: "",
        name_en: "",
      },
      groups: [],
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
          title: "Name",
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          align: "left",
          className: "column-name",
        },

        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "100px",
          align: "right",
        },
      ],
      editId: "",
      rules: {
        name_ru: [
          {
            required: true,
            message: "category nameis required",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
      console.log("errors");
    },
    async handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      if (this.$route.query.page != pagination.current) {
        await this.$router.replace({
          path: `/catalog/characteristic_groups`,
          query: {
            page: pagination.current,
          },
        });
      }
      this.loading = true;
      this.__GET_GROUPS();
    },
    getData() {
      const newData = {
        name: {
          ru: this.ruleForm.name_ru,
          uz: this.ruleForm.name_uz,
          en: this.ruleForm.name_en,
        },
      };
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.editId != ""
            ? this.__EDIT_FAQ_CATEGORIES(newData)
            : this.__POST_CHARACTER_GROUP(newData);
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
      this.showModal();
      this.editId = "";
    },
    editPost(id) {
      this.editId = id;
      const data = this.groups.find((item) => item.id == id);
      this.ruleForm = {
        ...data,
        name_ru: data.name.ru,
        name_uz: data.name.uz,
        name_en: data.name.en,
      };
      this.showModal();

      // this.__GET_GROUPS_BY_ID(id);
    },
    closeModal() {
      this.visible = false;
      this.ruleForm.name_ru = "";
      this.ruleForm.name_uz = "";
      this.ruleForm.name_en = "";
      this.editId = "";
      this.__GET_GROUPS();
    },
    deletePost(id) {
      this.__DELETE_CHARACTER_GROUP(id);
    },
    async __DELETE_CHARACTER_GROUP(id) {
      try {
        const data = await this.$store.dispatch("fetchCharacters/deleteGroups", id);
        await this.$notify({
          title: "Success",
          message: "Группа был успешно удален",
          type: "success",
        });
        this.__GET_GROUPS();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },

    async __POST_CHARACTER_GROUP(res) {
      try {
        await this.$store.dispatch("fetchCharacters/postGroups", res);
        await this.$notify({
          title: "Success",
          message: "Атрибут успешно добавлен",
          type: "success",
        });
        this.handleOk();
        this.__GET_GROUPS();
        this.ruleForm.name_ru = "";
        this.ruleForm.name_uz = "";
        this.ruleForm.name_en = "";
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
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchCharacters/getGroups", {
        ...this.$route.query,
      });
      this.loading = false;
      const pagination = { ...this.pagination };
      this.pagination = pagination;
      pagination.total = data.groups?.total;
      this.groups = data?.groups.map((item) => {
        return {
          ...item,
          numberId: item.id,
          key: item.id,
        };
      });
    },
  },

  async mounted() {
    if (!Object.keys(this.$route.query).includes("page")) {
      await this.$router.replace({
        path: `/catalog/characteristic_groups`,
        query: { page: this.params.page },
      });
    }
    this.pagination.current = this.$route.query.page * 1;
    this.__GET_GROUPS();
  },
  components: {
    TitleBlock,
    FormTitle,
    AddModal,
  },
  layout: "toolbar",
};
</script>
