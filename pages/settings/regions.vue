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
    <div class="container_xl app-container mt-5">
      <el-tabs
        class="order_tabs"
        v-model="activeName"
        @tab-click="($event) => handleClickatab($event)"
      >
        <el-tab-pane label="Регионы" name="regions">
          <div class="card_block py-5">
            <div class="d-flex justify-content-between align-items-center card_header">
              <div
                class="prodduct-list-header-grid w-100 align-items-center"
                style="grid-gap: 1.25rem"
              >
                <!-- <div> -->
                <SearchInput
                  placeholder="Поиск"
                  @changeSearch="
                    changeSearch($event, '/settings/regions', '__GET_LOCATIONS')
                  "
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
                    title="Вы действительно хотите удалить?"
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
                  @change="
                    changePageSizeGlobal(e, '/settings/regions', '__GET_LOCATIONS')
                  "
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
        </el-tab-pane>
        <el-tab-pane label="Группы" name="groups">
          <el-tabs class="form_tabs" v-model="activeLang" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, index) in lang"
              :label="item.label"
              :name="item.label"
              :key="index"
            >
              <div class="card_block py-5">
                <div class="d-flex pt-4 justify-content-between align-items-center">
                  <FormTitle title="Группы" />
                </div>
                <div class="antd_table product_table">
                  <a-table
                    :columns="columns1"
                    :data-source="groups"
                    :pagination="false"
                    align="center"
                    :loading="loading"
                  >
                    <template
                      v-for="col in ['name', 'age', 'address']"
                      :slot="col"
                      slot-scope="text, record, index"
                    >
                      <div class="form-block mb-0">
                        <a-input
                          v-if="record.editable"
                          style="margin: -5px 0"
                          :value="text[item.key]"
                          @change="(e) => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>
                          {{ text[item.key] }}
                        </template>
                      </div>
                    </template>
                    <template slot="regions" slot-scope="text, record, index">
                      <div class="form-block mb-0">
                        <a-select
                          v-if="record.editable"
                          mode="multiple"
                          placeholder="Inserted are removed"
                          :value="text"
                          style="width: 100%"
                          v-model="text"
                          @change="handleChange1"
                        >
                          <a-select-option
                            v-for="item in options"
                            :key="item"
                            :value="item"
                          >
                            {{ item }}
                          </a-select-option>
                        </a-select>
                        <template v-else>
                          <span v-for="val in text">{{ val }}</span>
                        </template>
                      </div>
                    </template>
                    <template slot="status" slot-scope="text, record, index">
                      <div class="form-block mb-0">
                        <a-select
                          v-if="record.editable"
                          placeholder="Inserted are removed"
                          :value="text"
                          style="width: 100%"
                          v-model="text"
                          @change="handleChange1"
                        >
                          <a-select-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :value="item.label"
                          >
                            {{ item.label }}
                          </a-select-option>
                        </a-select>
                        <template v-else>
                          <span>
                            <span
                              class="tags-style"
                              :class="{
                                tag_new: text == 'active',
                                tag_canceled: text == 'inactive',
                              }"
                            >
                              {{ text == "active" ? "Активный " : "Неактивный" }}
                            </span></span
                          >
                        </template>
                      </div>
                    </template>

                    <template slot="id" slot-scope="text, record, index">
                      <div class="editable-row-operations">
                        <span v-if="record.editable">
                          <a-button-group>
                            <a-button
                              shape="round"
                              class="d-flex align-items-center"
                              icon="save"
                              type="primary"
                              @click="() => save(record.key)"
                            >
                            </a-button>
                            <a-popconfirm
                              title="Sure to cancel?"
                              @confirm="() => cancel(record.key)"
                            >
                              <a-button
                                icon="close"
                                class="d-flex align-items-center"
                                shape="round"
                              ></a-button>
                            </a-popconfirm>
                          </a-button-group>
                          <!-- <a-button type="primary" @click="() => save(record.key)"
                        >Save</a-button
                      > -->
                        </span>
                        <span v-else>
                          <span
                            class="action-btn"
                            :disabled="editingKey !== ''"
                            @click="() => edit(record.key)"
                          >
                            <img :src="editIcon" alt="" />
                          </span>
                          <a-popconfirm
                            title="Вы действительно хотите удалить?"
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
                      </div>
                    </template>
                    <!-- <span slot="id" slot-scope="text">
                  <span
                    class="action-btn"
                    @click="$router.push(`/settings/edit/${text}`)"
                  >
                    <img :src="editIcon" alt="" />
                  </span>
                  <a-popconfirm
                    title="Вы действительно хотите удалить?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deletePost(text)"
                    @cancel="cancel"
                  >
                    <span class="action-btn">
                      <img :src="deleteIcon" alt="" />
                    </span>
                  </a-popconfirm>
                </span> -->
                  </a-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
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
            Отмена
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            @click="getData"
            type="primary"
            :loading="loadingBtn"
          >
            <span v-if="!loadingBtn" class="svg-icon" v-html="addIcon"></span>
            Сохранить
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
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const columns1 = [
  {
    title: "Название",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
    width: "30%",
    className: "column-name",
  },
  {
    title: "Группы",
    dataIndex: "regions",
    scopedSlots: { customRender: "regions" },
    className: "column-name",
  },
  {
    title: "Статус",
    key: "status",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    className: "column-tags",
    filters: [
      { text: "Активный", value: "active" },
      { text: "Неактивный", value: "inactive" },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    width: "16%",
  },
  {
    title: "действия",
    dataIndex: "id",
    scopedSlots: { customRender: "id" },
    className: "column-btns",
    width: "100px",
  },
];
const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    regions: ["Apples"],
    status: "active",
  });
}
export default {
  // middleware: "auth",
  mixins: [global, status, columns],
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      statusOptions: [
        {
          value: 1,
          label: "Активный",
        },
        {
          value: 0,
          label: "Неактивный",
        },
      ],
      activeLang: "Русский",

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
      visible: false,
      options: OPTIONS,
      selectedItems: [],
      groups: [],
      modalTab: "ru",
      activeName: "regions",
      data,
      columns1,
      editingKey: "",
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
      groupForm: {
        name: {
          ru: "",
          uz: "",
          en: "",
        },
        is_active: 1,
        regions: [],
      },
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
              message: "Это поле обязательна",
              trigger: "change",
            },
          ],
        },
      },
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    handleClick(tab, event) {
      this.formVal = "";
    },
    handleChange1(selectedItems) {
      const target = this.data.find((item) => item.key == this.editingKey);
      target.regions = [...selectedItems];
    },
    edit(key) {
      console.log(key);
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.key);
      const targetCache = newCacheData.find((item) => key === item.key);
      console.log(target);
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.find((item) => key === item.key)
        );
        delete target.editable;
        this.data = newData;
      }
    },
    handleClickatab(e) {
      console.log(e.name);
    },
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
    async __GET_REGION_GROUPS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchRegions/getRegionsGroups", {
        ...this.$route.query,
      });
      this.groups = data.groups?.data;
      this.loading = false;
      console.log(this.groups);
      this.totalPage = data.groups?.total;
      const pageIndex = this.indexPage(
        data?.groups?.current_page,
        data?.groups?.per_page
      );
      this.groups = this.groups.map((item, index) => {
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
    this.getFirstData("/settings/regions", "__GET_REGION_GROUPS");
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
