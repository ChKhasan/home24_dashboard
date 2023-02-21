<template lang="html">
  <div class="container_xl">
    <div class="card_block py-5">
      <div
        class="d-flex justify-content-between align-items-center card_header card_tabs_padding "
      >
        <Title title="Atributs" />
        <AddBtn name="Add Atributs" :icon="true" :callback="toAddProduct" />
      </div>
      <el-tabs  class="form_tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in lang" :label="item.key" :name="item.key">
          <div class="form-container form-container-ltr">
            <FormTitle title="Atribut" />
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
                <div><label for="">Group</label></div>
                <div class="group-grid">
                  <el-form-item prop="nbm">
                    <el-input
                      v-model="ruleForm.nbm"
                      placeholder="Product model"
                    ></el-input>
                  </el-form-item>
                  <div class="outline-btn outline-light-blue-btn">
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
                  <div><label for="">Atribut Name </label></div>
                  <el-form-item prop="nbm">
                    <el-input
                      v-model="ruleForm.nbm"
                      placeholder="Product model"
                    ></el-input>
                  </el-form-item>
                  <span class="bottom_text"
                    >A atribut name is required and recommended to be
                    unique.</span
                  >
                </div>
                <div class="form-block required">
                  <div><label>Options name</label></div>
                  <el-select
                    v-model="value"
                    multiple
                    filterable
                    allow-create
                    default-first-option
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
                  <span class="bottom_text"
                    >Set a list of keywords that the category is related to.
                    Separate the keywords by adding a comma between each
                    keyword.</span
                  >
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <div class="form-btn form-outline-transparent mx-3">
                  Cancel
                </div>
                <div
                  type="submit"
                  class="form-btn form-btn-primary"
                  @click="submitForm('ruleForm')"
                >
                  Save changes {{ item.key }}
                </div>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import Title from "../../components/Title.vue";
import FormTitle from "../../components/Form-title.vue";

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
        nbm: [
          {
            required: true,
            message: "incorrect email",
            trigger: "change",
          },
          {
            min: 10,
            max: 10,
            message: "Length should be 10",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        nbm: "",
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      console.log(this.$refs[ruleForm][0]);
      this.$refs[ruleForm][0].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
      console.log("errors");
    },
  },
  components: {
    AddBtn,
    Title,
    FormTitle,
  },
};
</script>
<style lang=""></style>
