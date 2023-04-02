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
                  <div><label for="">Description</label></div>

                  <el-form-item prop="keywords">
                    <el-input
                      type="text"
                      v-model="ruleForm.keywords"
                      placeholder="Keywords"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="atribut-input-grid">
                  <div class="form-block required">
                    <div><label for="">Имя атрибута</label></div>
                    <el-form-item :prop="`name_${itemLang.key}`">
                      <el-input
                        v-model="ruleForm[`name_${itemLang.key}`]"
                        placeholder="Atribut Name"
                      ></el-input>
                    </el-form-item>
                    <span class="bottom_text"
                      >Имя атрибута является обязательным и рекомендуется
                      уникальный.</span
                    >
                  </div>
                  <div class="d-flex flex-column">
                    <div
                      class="form-block required"
                      :class="{ 'multi-select-required': multiSelectError }"
                    >
                      <div><label>Имя опции</label></div>
                      <el-form-item label-position="top">
                        <drop-list
                          :items="ruleForm.optionsName"
                          @insert="onInsert"
                          @reorder="$event.apply(ruleForm.optionsName)"
                        >
                          <template v-slot:item="{ item }">
                            <drag class="item" :key="item.elemId">
                              <div class="d-flex align-items-center">
                                <el-input
                                  class="w-100 mb-2"
                                  v-model="item.name"
                                  placeholder="Option name"
                                />
                                <div class="variant_btns mb-1 mt-0">
                                  <div
                                    class="variant-btn variant-btn-delete mx-2"
                                    @click="deleteElement(item.elemId)"
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
                      </el-form-item>
                      <div class="d-flex justify-content-start">
                        <div class="create-inner-variant mt-0" @click="addElement()">
                          <span v-html="addInnerValidatIcon"></span>
                          Добавить опции
                        </div>
                      </div>
                      <span class="bottom_text"
                        >Установите список ключевых слов, с которыми связана категория.
                        Разделяйте ключевые слова, добавляя запятую между каждым ключевое
                        слово.</span
                      >
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
      multiSelectError: true,
      addInnerValidatIcon: require("../../../assets/svg/components/add-inner-validat-icon.svg?raw"),
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
        options_option: [
          {
            required: true,
            message: "Atribut name is required",
            trigger: "change",
          },
        ],
      },
      rulesModal: {
        keywords: [
          {
            required: true,
            message: "Atribut group is required",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        keywords: "",
        name_ru: "",
        name_uz: "",
        name_en: "",
        options: [],
        optionsName: [
          {
            name: "",
            elemId: 1,
          },
        ],
      },
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
    onInsert(event) {
      this.ruleForm.optionsName.splice(event.index, 0, event.data);
    },
    addElement() {
      this.ruleForm.optionsName.push({
        name: "",
        elemId: Math.max(...this.ruleForm.optionsName.map((o) => o.elemId)) + 1,
      });
    },
    deleteElement(id) {
      if (this.ruleForm.optionsName.length > 1)
        this.ruleForm.optionsName = this.ruleForm.optionsName.filter(
          (item) => item.elemId != id
        );
    },
    submitForm(ruleForm) {
      this.multiSelectError = false;
      this.$refs[ruleForm].validate((valid) => {
        valid ? this.dataEditEnd() : false;
      });
    },

    dataEditEnd() {
      if (typeof this.ruleForm.group_id == "string") {
        this.ruleForm.group_id = this.group_id;
      }
      const newOptionsNames = this.options.map((item) => (item.name = item.name.ru));
      console.log(newOptionsNames);
      const newOptions = this.ruleForm.optionsName.map((item) => {
        console.log(item);
        if (newOptionsNames.includes(item.name)) {
          return this.options.find((item2) => item2.name == item.name);
        } else {
          return {
            id: 0,
            name: item.name,
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
      delete data["optionsName"];
      this.__EDIT_ATRIBUTES(data);
    },
    headerbtnCallback() {
      this.$router.push("/catalog/atributs");
    },
    show(name) {
      this.$modal.show(name);
    },
    async __GET_ATRIBUT_BY_ID() {
      const data = await this.$store.dispatch(
        "fetchAtributes/getAtributesById",
        this.$route.params.index
      );
      this.dataEditStart(data);
    },
    dataEditStart(data) {
      this.ruleForm.name_ru = data.attribute.name.ru;
      this.ruleForm.name_uz = data.attribute.name.uz;
      this.ruleForm.name_en = data.attribute.name.en;
      this.ruleForm.keywords = data.attribute.keywords;
      this.atribut_id = data.attribute.id;
      this.options = data.attribute.options;
      this.ruleForm.options = data.attribute.options.map((item) => item.name.ru);
      this.ruleForm.optionsName = data.attribute.options.map((item, index) => {
        return {
          name: item.name.ru,
          elemId: index + 1,
        };
      });
    },
    getData() {
      this.$refs["atributGroup"].validate((valid) =>
        valid ? this.__POST_GROUPS() : false
      );
    },
    hide(name) {
      this.$modal.hide(name);
    },

    async __EDIT_ATRIBUTES(data) {
      try {
        await this.$store.dispatch("fetchAtributes/editAtributes", {
          id: this.atribut_id,
          data: data,
        });
        await this.successNotify("Атрибут успешно изменена");
        this.$router.push("/catalog/atributs");
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

    successNotify(message) {
      this.$notify({
        title: "Success",
        message: message,
        type: "success",
      });
    },
  },
  mounted() {
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
    DropList
  },
};
</script>
<style>
.el-select-dropdown__empty {
  display: none;
}
</style>
