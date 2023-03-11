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
                  <div><label for="artibut_keyword">Keywords</label></div>
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
                  <div
                    class="form-block required"
                    :class="{ 'multi-select-required': multiSelectError }"
                  >
                    <div><label>Имя опции</label></div>
                    <el-form-item label-position="top" prop="options">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.options"
                        filterable
                        multiple
                        allow-create
                        placeholder="Option name"
                        no-data-text="No options"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <span class="bottom_text"
                      >Установите список ключевых слов, с которыми связана
                      категория. Разделяйте ключевые слова, добавляя запятую
                      между каждым ключевое слово.</span
                    >
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-form>
    <AddModal
      title="New group"
      name="add_atribute_group"
      btnText="Add Group"
      :callback="getData"
      :closeModal="closeModal"
    >
      <el-form
        label-position="top"
        :model="atributGroup"
        :rules="rulesModal"
        ref="atributGroup"
        label-width="120px"
        class="demo-ruleForm"
        action=""
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
        <div
          class="form-block required"
          v-for="(item, index) in modalTabData"
          :key="index"
          v-if="modalTab == item.index"
        >
          <div><label for="">Group </label></div>
          <el-form-item prop="name_ru">
            <el-input
              placeholder="Product model"
              v-model="atributGroup[`name_${item.index}`]"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </AddModal>
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
      },
      atributGroup: {
        name_ru: "",
        name_uz: "",
        name_en: "",
      },
    };
  },

  methods: {
    submitForm(ruleForm) {
      this.multiSelectError = false;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            ...this.ruleForm,
            name: {
              ru: this.ruleForm.name_ru,
              uz: this.ruleForm.name_uz,
              en: this.ruleForm.name_en,
            },
          };
          delete data["name_ru"];
          delete data["name_uz"];
          delete data["name_en"];
          this.__POST_ATRIBUTES(data);
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
