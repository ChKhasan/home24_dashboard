<template lang="html">
  <div>
    <TitleBlock
      title="Характеристика"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Характеристика"
    >
      <div class="d-flex">
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
        >
          <!-- <Title title="Characteristic" />
          <AddBtn name="Add Atributs" :icon="true" :callback="toAddProduct" /> -->
        </div>
        <el-tabs
          class="form_tabs"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane v-for="item in lang" :label="item.key" :name="item.key">
            <div class="form-container form-container-ltr">
              <FormTitle title="Характеристика" />
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
                  <div><label for="character_group">Группа</label></div>
                  <div class="group-grid" id="character_group">
                    <el-form-item prop="character_group">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.character_group"
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
                    <div class="outline-btn outline-light-blue-btn mt-1">
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
                    <div><label for="">Имя характеристики </label></div>
                    <el-form-item prop="character_name">
                      <el-input
                        v-model="ruleForm.character_name"
                        placeholder="Product model"
                      ></el-input>
                    </el-form-item>
                    <span class="bottom_text"
                      >Установите список ключевых слов, с которыми связана
                      категория. Разделите ключевые слова, добавив запятую между
                      каждым ключевым словом.</span
                    >
                  </div>
                  <div class="form-block">
                    <div><label>Имя опции</label></div>
                    <el-form-item label-position="top">
                      <el-input
                        v-model="ruleForm.character_option"
                        placeholder="Product model"
                      ></el-input>
                    </el-form-item>

                    <span class="bottom_text"
                      >Установите список ключевых слов, с которыми связана
                      категория. Разделите ключевые слова, добавив запятую между
                      каждым ключевым словом.</span
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
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";

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
        character_group: [
          {
            required: true,
            // message: "incorrec",
            trigger: "change",
          },
        ],
        character_name: [
          {
            required: true,
            // message: "incorrec",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        character_group: "",
        character_name: "",
        character_option: "",
      },
      count: 10,
      rows: [
        {
          total_price_with_nds: 123.213,
        },
        {
          total_price_with_nds: 123.123,
        },
        {
          total_price_with_nds: 1232.1321,
        },
        {
          total_price_with_nds: 21.3213,
        },
        {
          total_price_with_nds: 21.3213,
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm][0].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toAddProduct(val) {
      // this.$router.push("/catalog/add_products");
    },
  },
  components: {
    AddBtn,
    Title,
    TitleBlock,
    LayoutHeaderBtn
},
};
</script>
<style lang=""></style>
