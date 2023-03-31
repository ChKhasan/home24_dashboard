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
            <span class="svg-icon" v-html="addIcon"></span>
            Add Product
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
              v-for="(item, index) in lang"
              :label="item.label"
              :name="item.label"
              :key="index"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Атрибут" />
                <div class="form-block required">
                  <div><label for="artibut_keyword">Description</label></div>
                  <div class="w-100">
                    <el-form-item prop="keywords">
                      <el-input
                        type="text"
                        id="artibut_keyword"
                        v-model="ruleForm.keywords"
                        placeholder="Keywords"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="atribut-input-grid">
                  <div class="form-block required">
                    <div><label for="">Имя атрибута</label></div>
                    <el-form-item :prop="`name_${item.key}`">
                      <el-input
                        v-model="ruleForm[`name_${item.key}`]"
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
                        <transition-group name="flip-list" tag="div">
                          <div
                            class="d-flex align-items-center"
                            v-for="(item, i) in ruleForm.optionsName"
                            :key="item.id"
                          >
                            <el-input
                              class="w-100 mb-2"
                              v-model="item.name"
                              placeholder="Option name"
                            />
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
                              <div
                                class="variant-btn variant-btn-check cursor_drag"
                                draggable="true"
                                @dragend="(e) => finishDrag(item, i, e)"
                                @dragover="(e) => onDragOver(item, i, e)"
                                @dragstart="(e) => startDrag(item, i, e)"
                              >
                                <a-icon
                                  type="drag"
                                  :style="{ color: '#3699FF', fontSize: '18px' }"
                                />
                                <!-- <a-radio :checked="item.is_default == 1"></a-radio> -->
                              </div>
                            </div>
                          </div>
                        </transition-group>
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
<script lang="js">

import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import AddModal from "../../components/modals/Add-modal.vue";

export default {
  layout: "toolbar",
  data() {
    return {

      activeName: "Русский",
      multiSelectError: true,
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../assets/svg/components/add-img-icon.svg?raw"),
      addInnerValidatIcon: require("../../assets/svg/components/add-inner-validat-icon.svg?raw"),
      groups: [],
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
      options: [],
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
        name_ru: [
          {
            required: true,
            message: "Group name is required",
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
        optionsName: [{
          name: '',
          id: 1
        }]
      },
      atributGroup: {
        name_ru: "",
        name_uz: "",
        name_en: "",
      },
    };
  },

  methods: {
    startDrag(item, i, e) {
      this.startLoc = e.clientY;
      this.dragging = true;
      this.dragFrom = item;
      console.log(this.dragFrom);
    },

    finishDrag(item, pos) {
      this.ruleForm.optionsName.splice(pos, 1);
      this.ruleForm.optionsName.splice(this.over.pos, 0, item);
      this.over = {};
    },

    onDragOver(item, pos, e) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      setTimeout(() => {
        this.over = { item, pos, dir };
      }, 50);
    },
    addElement() {
      this.ruleForm.optionsName.push({
        name: "",
        id: Math.max(...this.ruleForm.optionsName.map((o) => o.id)) + 1,
      });
    },
    deleteElement(id) {
      if (this.ruleForm.optionsName.length > 1)
        this.ruleForm.optionsName = this.ruleForm.optionsName.filter(
          (item) => item.id != id
        );
    },
    submitForm(ruleForm) {
      this.multiSelectError = false;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if(this.ruleForm.optionsName[0].name) {

            const data = {
              ...this.ruleForm,
              name: {
                ru: this.ruleForm.name_ru,
                uz: this.ruleForm.name_uz,
                en: this.ruleForm.name_en,
              },
              options: this.ruleForm.optionsName.filter(item => item.name).map(item1 => item1.name)
            };
            delete data["name_ru"];
            delete data["name_uz"];
            delete data["name_en"];
            delete data["optionsName"];
            this.__POST_ATRIBUTES(data);
          } else {
            this.$notify.error({
            title: "Error",
            message: "Нет опции",
          });
          }
        } else {
          return false;
        }
      });
    },
    headerbtnCallback() {
      this.$router.push("/catalog/atributs");
    },
    show(name) {
      this.$modal.show(name);
    },
    hide(name) {
      this.$modal.hide(name);
    },
    getData() {
      const newData = {
        name: {
          ru: this.atributGroup.name_ru,
          uz: this.atributGroup.name_uz,
          en: this.atributGroup.name_en,
        },
      };

      this.$refs["atributGroup"].validate((valid) =>
        valid ? this.__POST_GROUPS(newData) : false
      );
    },

    async __POST_ATRIBUTES(data) {
      try {
        await this.$store.dispatch("fetchAtributes/postAtributes", data);
        await this.$notify({
          title: "Success",
          message: "Атрибут успешно добавлен",
          type: "success",
        });
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
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchAtributes/getGroups");
      this.groups = data?.groups;
      console.log(this.groups);
    },

    async __POST_GROUPS(data) {
      try {
        await this.$store.dispatch("fetchAtributes/postGroups", data);
        this.$notify({
          title: "Success",
          message: "Группа успешно добавлен",
          type: "success",
        });
        this.hide("add_atribute_group");
        this.__GET_GROUPS();
        this.atributGroup.name_ru = "";
        this.atributGroup.name_uz = "";
        this.atributGroup.name_en = "";
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    closeModal() {
      this.hide("add_atribute_group");
    },
  },
  mounted() {
    this.__GET_GROUPS();
  },
  components: {
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    AddModal,
  },
};
</script>
<style lang="css">
ul[dnd-list],
ul[dnd-list] > li {
  position: relative;
}
.list > div {
  display: flex;
  flex-direction: column;
}

.flip-list-move {
  transition: transform 0.2s;
}

.over {
  opacity: 0.6;
}
</style>
