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
        title="Заказы"
        :breadbrumb="['Главная', 'Заказы']"
        lastLink="#192"
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
              ><svg
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
            ></span>
            Добавить продукт
          </div>
        </div>
      </TitleBlock>

      <div class="container_xl">
        <div class="order-edit-grid">
          <div class="card_block-form py-5">
            <div
              class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
            ></div>

            <div class="form-container">
              <FormTitle title="Информация о заказе" />
              <div class="form-block">
                <div><label for="character_group">Статус</label></div>
                <el-form-item prop="character_group">
                  <el-select
                    class="w-100"
                    v-model="ruleForm.character_group"
                    filterable
                    allow-create
                    placeholder="Статус"
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
              </div>
              <div class="form-block required">
                <div><label for="character_group">Способ доставки</label></div>
                <el-form-item prop="character_group">
                  <el-select
                    class="w-100"
                    v-model="ruleForm.character_group"
                    filterable
                    allow-create
                    placeholder="Способ доставки"
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
              </div>
              <div class="form-block required">
                <div><label for="character_group">Дата заказа</label></div>
                <el-input type="text" disabled value="#123456" />
              </div>
            </div>
          </div>
          <div class="card_block-form py-5">
            <div
              class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
            ></div>

            <div class="form-container form-container-ltr">
              <FormTitle title="Подробности доставки" />
              <div class="order_grid_3">
                <div class="form-block">
                  <div><label for="character_group">Область</label></div>
                  <el-form-item prop="character_group">
                    <el-select
                      class="w-100"
                      v-model="ruleForm.region"
                      filterable
                      allow-create
                      placeholder="Область"
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
                </div>
                <div class="form-block">
                  <div><label for="character_group">Район</label></div>
                  <el-form-item prop="character_group">
                    <el-select
                      class="w-100"
                      v-model="ruleForm.area"
                      filterable
                      allow-create
                      placeholder="Район"
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
                </div>
                <div class="form-block">
                  <div><label for="character_group">Почтовый код</label></div>
                  <el-form-item prop="character_group">
                    <el-input
                      type="text"
                      v-model="ruleForm.postNumber"
                      placeholder="Почтовый код"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="form-block">
                <div><label for="">Полный адрес </label></div>
                <el-form-item prop="character_name">
                  <el-input
                    type="textarea"
                    rows="6"
                    v-modal="ruleForm.fullAdress"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="d-flex justify-content-end">
                <div class="form-btn form-outline-transparent mx-3">Отмена</div>
                <div
                  type="submit"
                  class="form-btn form-btn-primary"
                  @click="submitForm('ruleForm')"
                >
                  Сохранить изменения
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
import AddBtn from "../../../components/form/Add-btn.vue";
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import TitleBlock from "../../../components/Title-block.vue";
import Title from "../../../components/Title.vue";

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
          value: "Успешно",
          label: "успешно",
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
        postNumber: "",
        area: "",
        region: "",
        fullAdress: "",
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
<style lang="scss">
.order_grid_3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
</style>
