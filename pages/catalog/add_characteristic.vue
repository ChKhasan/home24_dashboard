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
        title="Характеристика"
        :breadbrumb="['эКоммерция', 'Каталог']"
        lastLink="Характеристика"
      >
        <div class="d-flex">
          <span class="mx-3">
            <LayoutHeaderBtn
              name="Отмена"
              :headerbtnCallback="toBack"
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
          <el-tabs
            class="form_tabs"
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="item in lang"
              :label="item.key"
              :name="item.key"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Характеристика" />

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
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-form>
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
      this.$refs[ruleForm].validate((valid) => {
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
    toBack() {
      this.$router.push("/catalog/characteristic");
    },
  },
  components: {
    AddBtn,
    Title,
    TitleBlock,
    LayoutHeaderBtn,
  },
};
</script>
<style lang=""></style>
