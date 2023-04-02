<template lang="html">
  <div>
    <TitleBlock
      title="Категории"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Категории"
    >
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
          <span class="svg-icon" v-if="!uploadLoading" v-html="addIcon"></span>
          Добавить категорию
        </a-button>
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
              <el-tabs class="form_tabs" v-model="activeName">
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Добавить категорию" />
                    </div>

                    <div class="category-input-grid">
                      <div class="form-block required mb-0">
                        <div><label for="">Название категории</label></div>
                        <el-form-item prop="name_ru">
                          <el-input
                            v-model="ruleForm[`name_${item.key}`]"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block">
                        <div><label for="">Выберите категорию</label></div>
                        <el-form-item>
                          <el-select
                            v-model="ruleForm.parent_id"
                            class="w-100"
                            placeholder="Choose tags for your article"
                            filterable
                            no-match-text="No Category"
                            no-data-text="No Category"
                          >
                            <el-option
                              v-for="(item, index) in categories"
                              :key="item.id"
                              :label="item.name?.ru"
                              :value="item?.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="form-block">
                      <div><label for="">Информация о категории</label></div>
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
              <div class="category-character-grid">
                <div class="form-container">
                  <div>
                    <div class="form-block required">
                      <div><label>Атрибуты</label></div>
                    </div>
                    <drop-list
                      :items="attributes"
                      @insert="($event) => onInsert($event, 'attributes')"
                      @reorder="$event.apply(attributes)"
                    >
                      <template v-slot:item="{ item }">
                        <drag class="item d-flex mb-3" :key="item.id">
                          <div class="form-block required w-100 mb-0">
                            <el-form-item>
                              <el-select
                                v-model="item.name"
                                class="w-100"
                                @change="filterElement('attributes')"
                                popper-class="select-popper-hover"
                                default-first-option
                                no-data-text="No atribut"
                                placeholder="Choose tags for your article"
                              >
                                <el-option
                                  v-for="item in atributes"
                                  :key="item.id"
                                  :label="item.name.ru"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="variant_btns mb-1 mt-0">
                            <div
                              class="variant-btn variant-btn-delete mx-2"
                              @click="deleteElement('attributes', item.id)"
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.3029 9.69684L9.69629 20.3034M20.3029 20.3034L9.69629 9.69678"
                                  stroke="#F65160"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              class="variant-btn variant-btn-check cursor_drag"
                              draggable="true"
                            >
                              <a-icon
                                type="drag"
                                :style="{ color: '#3699FF', fontSize: '18px' }"
                              />
                              <!-- <a-radio :checked="item.is_default == 1"></a-radio> -->
                            </div>
                          </div>
                        </drag>
                      </template>
                      <template v-slot:feedback="{ data }">
                        <div class="item feedback" :key="data">{{ data }}</div>
                      </template>
                    </drop-list>
                    <div class="d-flex justify-content-start">
                      <div
                        class="create-inner-variant mt-0"
                        @click="addElement('attributes')"
                      >
                        <span v-html="addInnerValidatIcon"></span>
                        Добавить атрибут
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-container">
                  <div>
                    <div class="form-block required">
                      <div><label>Характеристическая группа</label></div>
                    </div>
                    <drop-list
                      :items="group_characteristics"
                      @insert="($event) => onInsert($event, 'group_characteristics')"
                      @reorder="$event.apply(group_characteristics)"
                    >
                      <template v-slot:item="{ item }">
                        <drag class="item d-flex mb-3" :key="item.id">
                          <div class="form-block required mb-0 w-100">
                            <el-form-item>
                              <el-select
                                v-model="item.name"
                                class="w-100"
                                filterable
                                popper-class="select-popper-hover"
                                @change="filterElement('group_characteristics')"
                                default-first-option
                                no-data-text="No characteristics"
                                placeholder="Choose tags for your article"
                              >
                                <el-option
                                  v-for="item in groups"
                                  :key="item.id"
                                  :label="item.name.ru"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="variant_btns mb-1 mt-0">
                            <div
                              class="variant-btn variant-btn-delete mx-2"
                              @click="deleteElement('group_characteristics', item.id)"
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.3029 9.69684L9.69629 20.3034M20.3029 20.3034L9.69629 9.69678"
                                  stroke="#F65160"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              class="variant-btn variant-btn-check cursor_drag"
                              draggable="true"
                            >
                              <a-icon
                                type="drag"
                                :style="{ color: '#3699FF', fontSize: '18px' }"
                              />
                            </div>
                          </div>
                        </drag>
                      </template>
                      <template v-slot:feedback="{ data }">
                        <div class="item feedback" :key="data">{{ data }}</div>
                      </template>
                    </drop-list>
                    <div class="d-flex justify-content-start">
                      <div
                        class="create-inner-variant mt-0"
                        @click="addElement('group_characteristics')"
                      >
                        <span v-html="addInnerValidatIcon"></span>
                        Добавить группа
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
          <div class="category-img-grid">
            <div class="form-container">
              <FormTitle title="Параметры" />
              <div class="form-block status-style">
                <div><label>Статус</label></div>
                <el-select
                  class="w-100"
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
              <div class="form-block">
                <div><label>Порядок</label></div>
                <el-input
                  v-model="ruleForm.position"
                  placeholder="Position"
                  type="number"
                ></el-input>
              </div>
              <div class="switch-text form-block d-flex flex-row align-items-center">
                <a-switch @change="onChange" :checked="ruleForm.is_popular == 1" />
                <label class="mx-3 mb-0">Популярный</label>
              </div>
              <div class="form-block">
                <div><label for="">Добавить изображения категории</label></div>

                <div class="clearfix">
                  <a-upload
                    list-type="picture-card"
                    action="https://test.loftcity.uz/api/admin/files/upload"
                    :file-list="fileList.img"
                    @preview="handlePreview"
                    @change="($event) => handleChange($event, 'img')"
                  >
                    <div v-if="fileList.img.length < 1">
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
                      <div class="ant-upload-text">Upload image</div>
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
              <div class="form-block">
                <div><label>Svg</label></div>
                <el-input v-model="ruleForm.order" placeholder="Svg"></el-input>
              </div>
              <div class="form-block">
                <div><label for="">Добавить значок продукта</label></div>

                <div class="clearfix">
                  <a-upload
                    list-type="picture-card"
                    action="https://test.loftcity.uz/api/admin/files/upload"
                    :file-list="fileList.icon"
                    @preview="handlePreview"
                    @change="($event) => handleChange($event, 'icon')"
                  >
                    <div v-if="fileList.icon.length < 1">
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
                      <div class="ant-upload-text">Upload image</div>
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
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../../components/form/Add-btn.vue";
import Title from "../../../components/Title.vue";
import FormTitle from "../../../components/Form-title.vue";
import TitleBlock from "../../../components/Title-block.vue";
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Drag, DropList } from "vue-easy-dnd";

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
      over: {},
      startLoc: 0,
      dragging: false,
      dragFrom: {},
      activeName: "Русский",
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../../assets/svg/components/add-img-icon.svg?raw"),
      addInnerValidatIcon: require("../../../assets/svg/components/add-inner-validat-icon.svg?raw"),
      atributes: [],
      categories: [
        {
          name: {
            ru: "Главная категория ",
          },
          id: null,
        },
      ],
      groups: [],
      allAtributes: [],
      allGroups: [],
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
      status: [
        {
          value: 1,
          label: "Active",
        },
        {
          value: 0,
          label: "Inactive",
        },
      ],
      rules: {
        name_ru: [
          {
            required: true,
            message: "Category name is required",
            trigger: ["change","blur"],
          },
        ],

        attributes: [
          {
            required: true,
            message: "Atribut is required",
            trigger: "change",
          },
        ],
        group_characteristics: [
          {
            required: true,
            message: "Group characters is required",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        parent_id: null,
        is_popular: 0,
        desc: {
          ru: "",
          uz: "",
          en: "",
        },
        is_active: 1,
        name_ru: "",
        name_uz: "",
        name_en: "",
        icon: null,
        img: null,
        attributes: [],
        group_characteristics: [],
        position: null,
      },
      attributes: [{ name: "", id: 1 }],
      group_characteristics: [{ name: "", id: 1 }],
      categoryChild: [],
      previewVisible: false,
      previewImage: "",
      fileList: {
        img: [],
        icon: [],
      },
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
      title: "Quill Editor",
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Quill Editor",
          active: true,
        },
      ],
      slug: "",
      uploadLoading: false,
    };
  },
  methods: {
    onInsert(event, elem) {
      this[elem].splice(event.index, 0, event.data);
    },
    addElement(type) {
      this[type].push({
        name: "",
        id: Math.max(...this[type].map((o) => o.id)) + 1,
      });
    },

    filterElement(typeName) {
      let allArt = this.allAtributes;
      let allGr = this.allGroups;
      this[typeName].forEach((elem) => {
        if (typeName == "attributes") {
          allArt = allArt.filter((item) => item.id != elem.name);
        } else {
          allGr = allGr.filter((item) => item.id != elem.name);
        }
      });
      this.atributes = allArt;
      this.groups = allGr;
    },
    deleteElement(type, id) {
      if (this[type].length > 1) this[type] = this[type].filter((item) => item.id != id);
    },
    submitForm(ruleForm) {
      const data = {
        ...this.ruleForm,
        name: {
          ru: this.ruleForm.name_ru,
          uz: this.ruleForm.name_uz,
          en: this.ruleForm.name_en,
        },
        attributes: this.attributes.map((item) => item.name),
        group_characteristics: this.group_characteristics.map((item) => item.name),
      };
      delete data["name_ru"];
      delete data["name_uz"];
      delete data["name_en"];

      if (this.fileList.img[0]?.oldImg) {
        data.img = this.fileList.img[0]?.url;
      }
      if (this.fileList.icon[0]?.oldImg) {
        data.icon = this.fileList.icon[0]?.url;
      }
      this.$refs[ruleForm].validate((valid) => {
        if (!valid) return false;
        this.__EDIT_CATEGORIES(data);
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    deleteIcon() {
      this.ruleForm.oldIcon = "";
      this.ruleForm = this.ruleForm;
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
    onChange(checked) {
      checked ? (this.ruleForm.is_popular = 1) : (this.ruleForm.is_popular = 0);
    },
    toBack() {
      this.$router.push("/catalog/categories");
    },

    async __GET_CATEGORY_BY_ID() {
      const data = await this.$store.dispatch(
        "fetchCategories/getCategoriesById",
        this.$route.params.index
      );
      this.slug = data.category.slug;
      this.categoryChild = data.category.children;
      this.ruleForm.name_ru = data.category.name.ru;
      this.ruleForm.name_uz = data.category.name.uz;
      this.ruleForm.name_en = data.category.name.en;
      this.ruleForm.desc.ru = data.category.desc.ru;
      this.ruleForm.desc.uz = data.category.desc.uz;
      this.ruleForm.desc.en = data.category.desc.en;
      this.ruleForm.is_active = data.category.is_active;
      this.attributes = data.category.attributes.map((item, index) => {
        return {
          name: item.id,
          id: index + 1,
        };
      });
      if (this.groups.length == 0) {
        this.groups = data.category.characteristic_groups;
      }
      if (this.atributes == 0) {
        this.atributes = data.category.attributes;
      }
      this.group_characteristics = data.category.characteristic_groups.map(
        (item, index) => {
          return {
            name: item.id,
            id: index + 1,
          };
        }
      );
      if (data.category.lg_img) {
        this.fileList.img = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            oldImg: true,
            url: data.category.lg_img,
          },
        ];
      }
      if (data.category.lg_icon) {
        this.fileList.icon = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            oldImg: true,
            url: data.category.lg_icon,
          },
        ];
      }
      this.ruleForm.is_popular = data.category.is_popular;
      if (data.category.parent_id) {
        this.ruleForm.parent_id = data.category.parent_id;
      } else {
        this.ruleForm.parent_id = null;
      }
    },
    notificationError(title, message) {
      this.$notify.error({
        title: title,
        message: message,
      });
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.notificationError("Error", "Указанные данные недействительны.");
          break;
        case 500:
          this.notificationError("Error", "Cервер не работает");
          break;
        case 404:
          this.notificationError("Error", res.data.errors);
          break;
      }
    },
    async __GET_ATRIBUTES() {
      const data = await this.$store.dispatch("fetchAtributes/getAllAtributes");
      this.atributes = data.attributes;
      this.allAtributes = data.attributes;
      console.log(data.attributes);
      this.filterElement("attributes");
    },
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchCharacters/getGroups");
      this.groups = data?.groups;
      this.allGroups = data?.groups;
      this.filterElement("group_characteristics");
    },

    async __GET_CATEGORIES() {
      const dataCat = await this.$store.dispatch("fetchCategories/getCategories");
      dataCat.categories?.data.forEach((item) => {
        if (item.children.length > 0) {
          this.categories = [item, ...item.children, ...this.categories];
        } else {
          this.categories = [item, ...this.categories];
        }
      });

      this.categories = this.categories
        .filter((elem) => elem.id != this.$route.params.index)
        .filter((item) => !this.categoryChild.find((childId) => childId.id == item.id));
    },
    async __EDIT_CATEGORIES(res) {
      try {
        await this.$store.dispatch("fetchCategories/editCategories", {
          id: this.$route.params.index,
          data: { ...res, slug: this.slug },
        });
        this.$notify({
          title: "Success",
          message: "Категория успешно добавлен",
          type: "success",
        });
        this.$router.push("/catalog/categories");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  mounted() {
    this.__GET_CATEGORIES();
    this.__GET_ATRIBUTES();
    this.__GET_GROUPS();
    this.__GET_CATEGORY_BY_ID();
  },
  components: {
    AddBtn,
    Title,
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    Drag,
    DropList,
  },
};
</script>
<style lang="scss">
/* you can make up upload button and sample style by using stylesheets */
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
  .last_img {
    width: 100%;
    height: 100%;
    height: 218px;
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
  @media (max-width: 1440px) {
    .ant-upload.ant-upload-select-picture-card {
      height: 160px;
    }
  }
}

.list > div {
  display: flex;
  flex-direction: column;
}

.flip-list {
  transition: all 0.4s;
  display: grid;
  grid-gap: 24px;
}
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.flip-list-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.flip-list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.item {
  transition: transform 0.2s;
}
</style>
