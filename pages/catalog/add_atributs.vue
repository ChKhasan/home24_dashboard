<template lang="html">
  <div>
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
        <LayoutHeaderBtn
          name="Сохранить изменения"
          :headerbtnCallback="headerbtnCallback"
          :light="false"
        />
      </div>
    </TitleBlock>
    <div class="container_xl">
      <div class="card_block-form py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
        ></div>
        <el-tabs class="form_tabs" v-model="activeName">
          <el-tab-pane v-for="item in lang" :label="item.key" :name="item.key">
            <div class="form-container form-container-ltr">
              <FormTitle title="Атрибут" />
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
                  <!-- <FormBlock
                    label="Atribut Name"
                    placeholder="Atribut Name"
                    text="A atribut name is required and recommended to be
                      unique."
                    :value="ruleForm.atribut_name"
                    prop="atribut_name"
                  /> -->
                  <div class="form-block required">
                    <div><label for="">Имя атрибута</label></div>
                    <el-form-item prop="atribut_name">
                      <el-input
                        v-model="ruleForm.atribut_name"
                        placeholder="Atribut Name"
                      ></el-input>
                    </el-form-item>
                    <span class="bottom_text"
                      >Имя атрибута является обязательным и рекомендуется
                      уникальный.</span
                    >
                  </div>
                  <div class="form-block required">
                    <div><label>Имя опции</label></div>
                    <el-form-item label-position="top">
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
                      >Установите список ключевых слов, с которыми связана категория.
                      Разделяйте ключевые слова, добавляя запятую между каждым
                      ключевое слово.</span
                    >
                  </div>
                </div>
                <div class="d-flex justify-content-end">
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
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import Title from "../../components/Title.vue";
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import FormBlock from "../../components/form/FormBlock.vue";

export default {
  layout: "toolbar",
  data() {
    return {
      activeName: "Русский",
      lang: [
        {
          key: "Русский",
        },
        {
          key: "Uzbek",
        },
        {
          key: "English",
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
            // message: "incorrec",
            trigger: "change",
          },
        ],
        atribut_name: [
          {
            required: true,
            // message: "incorrec",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        atribut_group: "",
        atribut_name: "",
        options_option: "",
      },
    };
  },

  methods: {
    submitForm(ruleForm) {
      console.log(this.ruleForm);
      // this.$refs[ruleForm][0].validate((valid) => {
      //   if (valid) {
      //   } else {
      //     return false;
      //   }
      // });
    },
    headerbtnCallback() {
      console.log("fsfsdf");
    },
    show(name) {
      this.$modal.show(name);
    },
    hide(name) {
      this.$modal.hide(name);
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
    },
  },

  components: {
    AddBtn,
    Title,
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    FormBlock,
  },
};
</script>
