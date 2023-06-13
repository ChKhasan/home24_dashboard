<template lang="html">
  <div>
    <TitleBlock title="Регионы" :breadbrumb="['Контент сайта']" lastLink="Регионы">
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
        <div class="d-flex justify-content-between align-items-center card_header">
          <div
            class="prodduct-list-header-grid w-100 align-items-center"
            style="grid-gap: 1.25rem"
          >
            <!-- <div> -->
            <SearchInput
              placeholder="Поиск"
              @changeSearch="changeSearch($event, '/settings/regions', '__GET_LOCATIONS')"
            />
            <!-- </div> -->
            <span></span>
            <span></span>
            <a-button
              @click="clearQuery('/settings/regions', '__GET_LOCATIONS')"
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              ><a-icon type="reload"
            /></a-button>
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columnRegions"
            :data-source="regions"
            :pagination="false"
            align="center"
            :loading="loading"
          >
            <span slot="name" slot-scope="text" align="center">
              <h6>{{ text?.ru }}</h6>
            </span>
            <span slot="key" slot-scope="text">#{{ text }}</span>

            <span slot="id" slot-scope="text">
              <span
                class="action-btn"
                @click="$router.push(`/settings/edit/${text}`)"
              >
                <img :src="editIcon" alt="" />
              </span>
              <a-popconfirm
                title="Are you sure delete this row?"
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
          <div class="d-flex justify-content-between mt-4">
            <el-select
              v-model="params.pageSize"
              class="table-page-size"
              placeholder="Select"
              @change="changePageSizeGlobal(e, '/settings/regions', '__GET_LOCATIONS')"
            >
              <el-option
                v-for="item in pageSizes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <a-pagination
              class="table-pagination"
              :simple="false"
              v-model.number="current"
              :total="totalPage"
              :page-size.sync="params.pageSize"
            />
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model="visible"
      :title="editId ? 'Изменения Область' : 'Добавить Область'"
      :closable="false"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="form_tab mb-4 bottom_hr">
          <span
            style="border-right: 0"
            v-for="(item, index) in modalTabData"
            :key="index"
            @click="modalTab = item.index"
            :class="{ 'avtive-formTabModal': modalTab == item.index }"
          >
            {{ item.label }}
          </span>
        </div>
        <div
          class="flex-column d-flex"
          v-for="(item, index) in modalTabData"
          :key="index"
          v-if="modalTab == item.index"
        >
          <el-form
            label-position="top"
            :model="ruleForm"
            :rules="rules"
            ref="ruleFormRegion"
            label-width="120px"
            class="demo-ruleForm"
            action=""
          >
            <div>
              <div class="form-block required">
                <div>
                  <label for="">Область </label>
                </div>
                <el-form-item prop="name.ru">
                  <el-input
                    type="text"
                    placeholder="Область..."
                    v-model="ruleForm.name[item.index]"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="handleOk"
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
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import Title from "../../components/Title.vue";
import TitleBlock from "../../components/Title-block.vue";
import FormTitle from "../../components/Form-title.vue";
import global from "../../mixins/global";
import status from "../../mixins/status";
import columns from "../../mixins/columns";

export default {
  // middleware: "auth",
  mixins: [global, status, columns],
  data() {
    return {
      visible: false,
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
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      loading: true,
      loadingBtn: false,
      ruleForm: {
        name: {
          ru: "",
          uz: "",
          en: "",
        },
      },
      editId: "",
      regions: [],
      formData: {},
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
    getData() {
      this.$refs["ruleFormRegion"][0].validate((valid) => {
        if (valid) {
          this.__POST_BRANDS(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    openAddModal() {
      this.showModal();
    },

    deletePost(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchRegions/deleteRegions",
        "Успешно удален",
        "__GET_LOCATIONS"
      );
    },

    async __GET_LOCATIONS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchRegions/getRegions", {
        ...this.$route.query,
      });
      this.regions = data.regions?.data;
      this.loading = false;
      this.totalPage = data.regions?.total;
      const pageIndex = this.indexPage(
        data?.regions?.current_page,
        data?.regions?.per_page
      );
      this.regions = this.regions.map((item, index) => {
        return {
          key: pageIndex + index,
          ...item,
        };
      });
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
    async __POST_BRANDS(res) {
      try {
        await this.$store.dispatch("fetchRegions/postRegions", res);
        this.notification("Success", "Успешно добавлен", "success");
        this.handleOk();
        this.__GET_LOCATIONS();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },

  async mounted() {
    this.getFirstData("/settings/regions", "__GET_LOCATIONS");
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/settings/regions", "__GET_LOCATIONS");
    },
  },
  components: {
    AddBtn,
    SearchInput,
    Title,
    TitleBlock,
    FormTitle,
    SearchInput,
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
