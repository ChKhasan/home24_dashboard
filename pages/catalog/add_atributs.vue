<template lang="html">
  <div>
    <TitleBlock
      title="Atributs"
      :breadbrumb="['eCommerce', 'Catalog']"
      lastLink="Atributs"
    >
      <div class="d-flex">
        <div class="add-btn add-header-btn add-header-btn-padding btn-primary">
          <span class="svg-icon"
            ><svg
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
          ></span>
          Add Atributs
        </div>
      </div>
    </TitleBlock>
  <div class="container_xl">
    <div class="card_block-form py-5">
      <div
        class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
      >
        <!-- <Title title="Atributs" />
        <AddBtn name="Add Atributs" :icon="true" :callback="toAddProduct" /> -->
      </div>
      <el-tabs class="form_tabs" v-model="activeName">
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
                    class="outline-btn outline-light-blue-btn"
                    @click="show('add_atribute')"
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
                  <div><label for="">Atribut Name </label></div>
                  <el-form-item prop="atribut_name">
                    <el-input
                      v-model="ruleForm.atribut_name"
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
                  <el-form-item prop="options_option" label-position="top">
                    <el-input
                      v-model="ruleForm.options_option"
                      placeholder="Product model"
                    ></el-input>
                  </el-form-item>
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
    <modal :adaptive="true" name="add_atribute" width="546px" height="auto">
      <h1 @click="hide('add_atribute')">Atribute</h1>
    </modal>
  </div>
</div>

</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import Title from "../../components/Title.vue";
import FormTitle from "../../components/Form-title.vue";
import TitleBlock from "../../components/Title-block.vue";

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
        options_option: [
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
      this.$refs[ruleForm][0].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
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
    TitleBlock
},
};
</script>
<style lang=""></style>
