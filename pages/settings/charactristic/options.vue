<template lang="html">
  <div>
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <TitleBlock
        title="Параметры"
        :breadbrumb="['эКоммерция', 'Каталог']"
        lastLink="Параметры"
      >
        <div class="d-flex">
          <span class="mx-3">
            <LayoutHeaderBtn name="Отмена" :headerbtnCallback="toBack" :light="true" />
          </span>
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-primary"
            type="submit"
            @click="submitForm('ruleForm')"
          >
            <span class="svg-icon" v-html="addIcon"></span>
            Добавить характеристику
          </div>
        </div>
      </TitleBlock>
      <div class="container_xl">
        <div class="card_block-form py-5">
          <div
            class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
          ></div>

          <div class="form-container form-container-ltr">
            <FormTitle title="Характеристика" />
            <div class="translate-header character-translate-grid">
              <span class="translate-text d-flex align-items-center">#</span>
              <h5 class="translate-text">ЗНАЧЕНИЕ(RU)</h5>
              <h5 class="translate-text">ЗНАЧЕНИЕ(EN)</h5>
              <h5 class="translate-text">ЗНАЧЕНИЕ(UZ)</h5>
            </div>
            <div class="translate-body">
              <div
                class="character-translate-grid pb-3"
                v-for="(option, index) in options"
              >
                <span class="translate-text d-flex align-items-center">{{
                  index + 1
                }}</span>
                <div class="form-block mb-0">
                  <el-form-item>
                    <el-input
                      v-model="option.name.ru"
                      placeholder="Atribut Name"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="form-block mb-0">
                  <el-form-item label-position="top" prop="options">
                    <el-input
                      v-model="option.name.en"
                      placeholder="Atribut Name"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="form-block mb-0">
                  <el-form-item label-position="top" prop="options">
                    <el-input
                      v-model="option.name.uz"
                      placeholder="Atribut Name"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="variant_btns mb-1 mt-0">
                  <div class="variant-btn variant-btn-delete mx-2 position-absolute">
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
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <div class="create-inner-variant mt-0" @click="addElement()">
                  <span v-html="addInnerValidatIcon"></span>
                  Добавить характеристику
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import TitleBlock from "../../../components/Title-block.vue";
import { Drag, DropList } from "vue-easy-dnd";
import status from "../../../mixins/status";

export default {
  layout: "toolbar",
  mixins: [status],
  data() {
    return {
      activeName: "Русский",
      multiSelectError: true,
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      addInnerValidatIcon: require("../../../assets/svg/components/add-inner-validat-icon.svg?raw"),
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
        // group: [
        //   {
        //     required: true,
        //     message: "Characteristic group is required",
        //     trigger: "change",
        //   },
        // ],
        // name: {
        //   ru: [
        //     {
        //       required: true,
        //       message: "Characteristic name is required",
        //       trigger: "change",
        //     },
        //   ],
        // },
        // options: [
        //   {
        //     required: true,
        //     message: "Characteristic name is required",
        //     trigger: "change",
        //   },
        // ],
      },
      options: [
        {
          id: 1,
          name: {
            ru: "",
            uz: "",
            en: "",
          },
        },
      ],
      ruleForm: {
        group: {
          ru: "",
          uz: "",
          en: "",
        },
        options: [],
        attributes: [
          {
            id: 1,
            name: {
              ru: "",
              uz: "",
              en: "",
            },
            options: [],
          },
        ],
      },
    };
  },
  methods: {
    deleteElement(id) {
      if (this.ruleForm.attributes.length > 1)
        this.ruleForm.attributes = this.ruleForm.attributes.filter(
          (item) => item.id != id
        );
    },
    addElement() {
      this.options.push({
        name: {
          ru: "",
          uz: "",
          en: "",
        },
        id: Math.max(...this.ruleForm.attributes.map((o) => o.id)) + 1,
      });
    },
    submitForm(ruleForm) {
      this.multiSelectError = false;
      console.log(this.ruleForm);
      this.$refs[ruleForm].validate((valid) => {
        // valid ? this.__POST_CHARACTERISTIC(this.ruleForm) : false;
      });
    },
    async __POST_CHARACTERISTIC(data) {
      try {
        await this.$store.dispatch("fetchCharacters/postCharacteristics", data);
        this.notification("Success", "Характеристика успешно добавлен", "success");
        this.$router.push("/catalog/characteristic_groups");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    toBack() {
      this.$router.push("/catalog/characteristic_groups");
    },
    onInsert(event) {
      this.ruleForm.attributes.splice(event.index, 0, event.data);
    },
  },
  components: {
    TitleBlock,
    LayoutHeaderBtn,
    Drag,
    DropList,
  },
};
</script>
<style lang="scss">
@import "../../../assets/scss/custom/page/characteristic.scss";
.character-translate-grid {
  display: grid;
  grid-template-columns: 20px auto auto auto 40px;
  grid-gap: 10px;
}
.translate-header {
  padding: 1rem;
  background: #f9fbfd;
}
.translate-body {
  padding: 1rem;
  padding-right: 0;
}
.translate-text {
  line-height: 16px;
  color: #a1a5bf;
  font-family: "TT Interfaces";
  font-size: 14.04px;
  font-weight: 500;
}
</style>
