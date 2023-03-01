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
                  <div><label for="">Группа</label></div>
                  <div class="group-grid">
                    <el-form-item prop="atribut_group">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.atribut_group"
                        filterable
                        allow-create
                        placeholder="Choose tags for your article"
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
                    <div
                      class="outline-btn outline-light-blue-btn mt-2"
                      @click="show('add_atribute_group')"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6V18M18 12L6 12"
                          stroke="#5899FF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
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
                    <el-form-item label-position="top" prop="options_option">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.options_option"
                        filterable
                        multiple
                        allow-create
                        placeholder="Option name"
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
                <!-- <div class="d-flex justify-content-end">
                  <div class="form-btn form-outline-transparent mx-3">
                    Отмена
                  </div>
                  <div
                    type="submit"
                    class="form-btn form-btn-primary"
                    @click="submitForm('ruleForm')"
                  >
                  Сохранить изменения {{ item.key }}
                  </div>
                </div> -->
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
        <div class="form-block required">
          <div><label for="">Group </label></div>
          <el-form-item prop="character_name">
            <el-input placeholder="Product model"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </AddModal>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import Title from "../../components/Title.vue";
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import FormBlock from "../../components/form/FormBlock.vue";
import AddModal from "../../components/modals/Add-modal.vue";

export default {
  layout: "toolbar",
  data() {
    return {
      activeName: "Русский",
      multiSelectError: true,
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
      value: [],
      rules: {
        atribut_group: [
          {
            required: true,
            message: "Atribut group is required",
            trigger: "change",
          },
        ],
        name_en: [
          {
            required: true,
            message: "Atribut name is required",
            trigger: "change",
          },
        ],
        name_uz: [
          {
            required: true,
            message: "Atribut name is required",
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
      ruleForm: {
        atribut_group: "",
        name_ru: "",
        name_uz: "",
        name_en: "",
        options_option: "",
      },
    };
  },

  methods: {
    submitForm(ruleForm) {
      this.multiSelectError = false;
      this.$refs[ruleForm].validate((valid) =>
        valid ? console.log(this.ruleForm) : false
      );
    },
    headerbtnCallback() {
      console.log("fsfsdf");
    },
    show(name) {
      this.$modal.show(name);
    },
    getData() {
      console.log("dadasdaadas");
    },
    hide(name) {
      this.$modal.hide(name);
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
    },
    async __POST_ATRIBUTES() {
      const atributeRes = this.$store.dispatch("fetchAtributes/postAtributes");
      console.log(atributeRes);
    },
  },

  components: {
    AddBtn,
    Title,
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    FormBlock,
    AddModal,
  },
};
</script>
