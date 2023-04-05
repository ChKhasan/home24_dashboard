<template lang="html">
  <div>
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      action=""
    >
      <TitleBlock
        title="Атрибуты"
        :breadbrumb="['эКоммерция', 'Каталог']"
        lastLink="Атрибуты"
      >
        <div class="d-flex">
          <span class="mx-3">
            <LayoutHeaderBtn
              name="Отмена"
              :headerbtnCallback="headerbtnCallback"
              :light="true"
            />
          </span>
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-primary"
            type="submit"
            @click="submitForm('ruleForm')"
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
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
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
            Сохранить в изменении
          </div>
        </div>
      </TitleBlock>
      <div class="container_xl">
        <div class="card_block-form py-5">
          <div
            class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
          ></div>
          <el-tabs class="form_tabs" v-model="activeName">
            <el-tab-pane
              v-for="(itemLang, index) in lang"
              :label="itemLang.label"
              :name="itemLang.label"
              :key="index"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Атрибут" />
                <div class="form-block required">
                  <div><label for="">Группа</label></div>
                  <div class="group-grid1">
                    <el-form-item prop="group_id">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.group_id"
                        filterable
                        allow-create
                        no-data-text="No group"
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
                </div>
                <div class="list">
                  <drop-list
                    :items="ruleForm.characters"
                    @insert="onInsert"
                    @reorder="$event.apply(ruleForm.characters)"
                  >
                    <template v-slot:item="{ item }">
                      <drag class="item" :key="item.id">
                        <div class="character-input-grid pb-3">
                          <div class="form-block required mb-0">
                            <el-form-item>
                              <el-input
                                v-model="item[`name_${itemLang.key}`]"
                                placeholder="Atribut Name"
                              ></el-input>
                            </el-form-item>
                          </div>
                          <div
                            class="form-block mb-0"
                            :class="{ 'multi-select-required': multiSelectError }"
                          >
                            <el-form-item label-position="top" prop="options">
                              <el-select
                                class="w-100"
                                v-model="ruleForm.options"
                                popper-class="select-popper-hover"
                                filterable
                                multiple
                                allow-create
                                default-first-option
                                no-data-text="No options"
                                placeholder="Option name"
                              >
                                <el-option
                                  v-for="option in options"
                                  :key="option.value"
                                  :label="option.label"
                                  :value="option.value"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="variant_btns mb-1 mt-0">
                            <div
                              class="variant-btn variant-btn-delete mx-2"
                              @click="deleteElement(item.id)"
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
                            <div class="variant-btn variant-btn-check cursor_drag">
                              <a-icon
                                type="drag"
                                :style="{ color: '#3699FF', fontSize: '18px' }"
                              />
                            </div>
                          </div>
                        </div>
                      </drag>
                    </template>
                    <template v-slot:feedback="{ data }">
                      <div class="item feedback" :key="data">{{ data }}</div>
                    </template>
                  </drop-list>
                  <div class="d-flex justify-content-start">
                    <div class="create-inner-variant mt-0" @click="addElement()">
                      <span v-html="addInnerValidatIcon"></span>
                      Добавить характеристику
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import AddBtn from "../../../components/form/Add-btn.vue";
import Title from "../../../components/Title.vue";
import FormTitle from "../../../components/Form-title.vue";
import TitleBlock from "../../../components/Title-block.vue";
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import AddModal from "../../../components/modals/Add-modal.vue";
import { Drag, DropList } from "vue-easy-dnd";

export default {
  layout: "toolbar",
  data() {
    return {
      activeName: "Русский",
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../../assets/svg/components/add-img-icon.svg?raw"),
      addInnerValidatIcon: require("../../../assets/svg/components/add-inner-validat-icon.svg?raw"),
      multiSelectError: true,
      groups: [],
      options: [],
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
      modalTab: "ru",
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

      value: [],
      rules: {
        group_id: [
          {
            required: true,
            message: "Atribut group is required",
            trigger: "change",
          },
        ],

        name_ru: [
          {
            required: true,
            message: "Atribut name is required",
            trigger: "change",
          },
        ],
        options: [
          {
            required: true,
            message: "Atribut name is required",
            trigger: "change",
          },
        ],
      },
      rulesModal: {
        group_id: [
          {
            required: true,
            message: "Atribut group is required",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        group_id: null,
        name_ru: "",
        name_uz: "",
        name_en: "",
        options: [],
        characters: [
          {
            id: 1,
            name_ru: "",
            name_uz: "",
            name_en: "",
            options: [],
          },
        ],
      },
      group_id: null,
      characteristic_id: null,
      atributGroup: {
        name: {
          ru: "",
          uz: "",
          en: "",
        },
      },
    };
  },

  methods: {
    // async __GET_PRODUCT_BY_ID() {
    //   const data = await this.$store.dispatch(
    //     "fetchProducts/getProductsById",
    //     this.$route.params.index
    //   );
    //   this.ruleForm.name_ru = data.name.ru;
    //   this.ruleForm.name_uz = data.name.uz;
    //   this.ruleForm.name_en = data.name.en;
    //   this.ruleForm.desc = { ...data.desc };
    //   this.ruleForm.category_id = data.category.id;
    //   this.ruleForm.brand_id = data.brand_id;
    //   this.ruleForm.products = data.products.map((item, productIndex) => {
    //     let characterNames = {};
    //     data.category.characteristic_groups.forEach((element) => {
    //       characterNames[`char_${element.id}`];
    //     });
    //     return {
    //       id: productIndex + 1,
    //       images: item.images.map((itemImg) => itemImg.lg_img),
    //       imagesData: item.images.map((itemImg2, index) => {
    //         return {
    //           uid: (index + 1) * -1,
    //           name: "image.png",
    //           status: "done",
    //           oldImg: true,
    //           url: itemImg2.lg_img,
    //         };
    //       }),
    //       variations: [
    //         {
    //           id: 1,
    //           options: [],
    //           optionName: {},
    //           characteristics: [],
    //           characteristicsValues: {},
    //           price: item.price,
    //           is_default: 1,
    //           is_popular: item.is_popular,
    //           product_of_the_day: item.product_of_the_day,
    //         },
    //       ],
    //     };
    //   });
    //   this.comments = data.comments;

    // },
    deleteElement(id) {
      if (this.ruleForm.characters.length > 1)
        this.ruleForm.characters = this.ruleForm.characters.filter(
          (item) => item.id != id
        );
    },
    onInsert(event) {
      this.ruleForm.characters.splice(event.index, 0, event.data);
    },
    addElement() {
      this.ruleForm.characters.push({
        name: "",
        id: Math.max(...this.ruleForm.characters.map((o) => o.id)) + 1,
      });
    },
    submitForm(ruleForm) {
      this.multiSelectError = false;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (typeof this.ruleForm.group_id == "string") {
            this.ruleForm.group_id = this.group_id;
          }

          const newOptionsNames = this.options.map(
            (item) => (item.name = item.name.ru)
          );
          const newOptions = this.ruleForm.options.map((item) => {
            if (newOptionsNames.includes(item)) {
              return this.options.find((item2) => item2.name == item);
            } else {
              return {
                id: 0,
                name: item,
              };
            }
          });
          const data = {
            ...this.ruleForm,
            options: newOptions,
            name: {
              ru: this.ruleForm.name_ru,
              uz: this.ruleForm.name_uz,
              en: this.ruleForm.name_en,
            },
          };
          delete data["name_ru"];
          delete data["name_uz"];
          delete data["name_en"];
          this.__EDIT_ATRIBUTES(data);
        } else {
          return false;
        }
      });
    },
    headerbtnCallback() {
      this.$router.push("/catalog/characteristic");
    },
    show(name) {
      this.$modal.show(name);
    },
    async __GET_ATRIBUT_BY_ID() {
      const data = await this.$store.dispatch(
        "fetchCharacters/getCharacteristicsById",
        this.$route.params.index
      );

      this.ruleForm.name_ru = data.characteristic.name.ru;
      this.ruleForm.name_uz = data.characteristic.name.uz;
      this.ruleForm.name_en = data.characteristic.name.en;
      this.ruleForm.group_id = data.characteristic.group.name.ru;
      this.group_id = data.characteristic.group.id;
      this.characteristic_id = data.characteristic.id;
      this.options = data.characteristic.options;
      this.ruleForm.options = data.characteristic.options.map(
        (item) => item.name.ru
      );
      console.log(this.ruleForm.options);
    },
    getData() {
      this.$refs["atributGroup"].validate((valid) =>
        valid ? this.__POST_GROUPS() : false
      );
    },
    closeModal() {
      this.hide("add_atribute_group");
    },
    hide(name) {
      this.$modal.hide(name);
    },
    async __EDIT_ATRIBUTES(data) {
      try {
        await this.$store.dispatch("fetchCharacters/editCharacteristics", {
          id: this.characteristic_id,
          data: data,
        });
        await this.$notify({
          title: "Success",
          message: "Характеристика был успешно изменена",
          type: "success",
        });
        this.$router.push("/catalog/characteristic");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchCharacters/getGroups");
      this.groups = data?.groups;
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
    async __POST_GROUPS() {
      try {
        await this.$store.dispatch(
          "fetchCharacters/postGroups",
          this.atributGroup
        );
        this.$notify({
          title: "Success",
          message: "Группа был успешно добавлен",
          type: "success",
        });
        this.hide("add_atribute_group");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  mounted() {
    this.__GET_GROUPS();
    this.__GET_ATRIBUT_BY_ID();
  },
  components: {
    AddBtn,
    Title,
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    AddModal,
    Drag,
    DropList,
  },
};
</script>
