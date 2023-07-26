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
        title="Пользователи"
        :breadbrumb="['настройки']"
        lastLink="Пользователи"
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
            Добавить
          </div>
        </div>
      </TitleBlock>
      <div class="container_xl">
        <div class="card_block-form py-5">
          <div
            class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
          ></div>

          <div class="form-container">
            <FormTitle title="Создать пользователя" />
            <el-form-item class="form-block align-items-start" prop="name" label="Имя">
              <el-input
                type="text"
                v-model="ruleForm.name"
                placeholder="Введите техт"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-block align-items-start" prop="name" label="Роль">
              <el-input
                type="text"
                v-model="ruleForm.role_id"
                placeholder="Введите техт"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="form-block align-items-start"
              prop="name"
              label="Имя пользователя"
            >
              <el-select
                class="w-100"
                placeholder="Status"
                default-first-option
                v-model="ruleForm.user_id"
              >
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-block align-items-start" prop="name" label="Пароль">
              <el-input
                type="text"
                v-model="ruleForm.password"
                placeholder="Введите техт"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import TitleBlock from "../../../components/Title-block.vue";
import Title from "../../../components/Title.vue";

export default {
  layout: "toolbar",
  data() {
    return {
      activeName: "Русский",

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
      status: [
        {
          value: 1,
          label: "Активный",
        },
        {
          value: 0,
          label: "Неактивный",
        },
      ],
      value: [],
      rules: {
        name: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        role_id: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
        user_id: [
          {
            required: true,
            message: "This field is required",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        name: "",
        password: "",
        user_id: "",
        role_id: "",
      },
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
      this.$router.push("/settings/users");
    },
  },
  components: {
    Title,
    TitleBlock,
    LayoutHeaderBtn,
  },
};
</script>
<style lang=""></style>
