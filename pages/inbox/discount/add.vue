<template lang="html">
  <div>
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormDiscount"
      label-width="120px"
      class="demo-ruleForm"
      action=""
    >
      <TitleBlock title="Скидка" :breadbrumb="['Маркетинг']" lastLink="Скидка">
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
            @click="submitForm('ruleFormDiscount')"
          >
            <span class="svg-icon" v-html="addIcon"></span>
            Добавить
          </div>
        </div>
      </TitleBlock>
      <div class="container_xl">
        <div class="card_block-form py-5">
          <div
            class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
          ></div>
          <div class="category-from-grid">
            <div class="category-select-grid">
              <el-tabs class="form_tabs" v-model="activeName">
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-between">
                      <FormTitle title="Добавить скидку" />
                    </div>
                    <el-form-item
                      label="Заголовок"
                      prop="title.ru"
                      class="form-block required d-flex align-items-start"
                    >
                      <el-input
                        v-model="ruleForm.title[item.key]"
                        placeholder="Заголовок..."
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="Описание" class="form-block">
                      <el-input
                        type="textarea"
                        rows="5"
                        v-model="ruleForm.desc[item.key]"
                        placeholder="Описание..."
                      ></el-input>
                    </el-form-item>
                    <div class="discount-grid-input">
                      <div class="form-block required mb-0">
                        <el-form-item label="Процент">
                          <el-input
                            v-model="ruleForm.percent"
                            placeholder="Процент..."
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block required mb-0">
                        <el-form-item label="Количество">
                          <el-input
                            v-model="ruleForm.amount"
                            placeholder="Количество..."
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div
                        class="add-btn add-header-btn add-header-btn-padding btn-primary mb-1"
                        type="submit"
                        @click="submitForm('ruleFormDiscount')"
                      >
                        Save
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>

              <div class="form-container">
                <div class="d-flex justify-content-between">
                  <FormTitle title="Продукты" />
                </div>

                <div
                  style="
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr auto;
                    grid-gap: 10px;
                  "
                  class="mb-3"
                  v-for="product in products"
                  :key="product.id"
                >
                  <el-form-item
                    class="form-block mb-0"
                    :label="ruleForm.type == 'product' ? 'Продукты' : 'Бренды'"
                    prop="ids"
                  >
                    <a-select
                      mode="multiple"
                      label-in-value
                      :value="value"
                      :placeholder="
                        ruleForm.type == 'product' ? 'Продукты...' : 'Бренды...'
                      "
                      style="width: 100%"
                      :filter-option="false"
                      :not-found-content="fetching ? undefined : null"
                      @search="fetchUser"
                      @change="handleChange"
                    >
                      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                      <a-select-option v-for="d in data" :key="d.id">
                        {{ d.name.ru }}
                      </a-select-option>
                    </a-select>
                  </el-form-item>
                  <el-form-item label="price" class="form-block mb-0">
                    <el-input placeholder="Price..." />
                  </el-form-item>
                  <el-form-item label="price" class="form-block mb-0">
                    <el-input placeholder="Price..." />
                  </el-form-item>
                  <div class="variant_btns mb-1 mt-0">
                    <div
                      class="variant-btn variant-btn-delete mx-2"
                      @click="deleteElement(product.id)"
                    >
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
                <div class="add-variant create-inner-variant" @click="addProduct">
                  <span v-html="addInnerValidatIcon"></span>
                  Добавит варизаци
                </div>
              </div>

              <div class="category-character-grid"></div>
            </div>

            <div class="category-img-grid">
              <div class="form-container">
                <FormTitle title="Параметры" />
                <div
                  class="form-block status-style"
                  :class="[ruleForm.status == 1 ? 'status-active' : 'status-inactive']"
                >
                  <div><label>Статус</label></div>
                  <el-select
                    class="w-100"
                    placeholder="Status"
                    default-first-option
                    v-model="ruleForm.status"
                  >
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="form-block mb-0">
                  <el-form-item label="Дата" prop="start">
                    <a-range-picker @change="onChange" />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script lang="js">

import FormTitle from "../../../components/Form-title.vue";
import TitleBlock from "../../../components/Title-block.vue";
import LayoutHeaderBtn from "../../../components/form/Layout-header-btn.vue";
import { Drag, DropList } from "vue-easy-dnd";
import status from "../../../mixins/status";
import debounce from "lodash/debounce";
export default {
  layout: "toolbar",
  mixins: [status],
  data() {
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    return {
      value: [],
      data: [],
      fetching: false,
      activeName: "Русский",
      addIcon: require("../../../assets/svg/components/add-icon.svg?raw"),
      addInnerValidatIcon: require("../../../assets/svg/components/add-inner-validat-icon.svg?raw"),
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
      discountType: [
        {
          value: 'product',
          label: "Product",
        },
        {
          value: 'brand',
          label: "Brand",
        },
      ],
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
      rules: {
        name: [
          {
            required: true,
            message: "Это поле обязательна",
            trigger: "change",
          },
        ],
        title: {
          ru: [
          {
            required: true,
            message: "Это поле обязательна",
            trigger: "change",
          },
        ]
        },
        start: [
          {
            required: true,
            message: "Это поле обязательна",
            trigger: "change",
          },
        ],
        ids:  [
          {
            required: true,
            message: "Это поле обязательна",
            trigger: "change",
          },
        ],
        desc: {
          ru: [
          {
            required: true,
            message: "Это поле обязательна",
            trigger: "change",
          },
        ],
        }
      },
      ruleForm: {
        title: {
          ru: "",
          uz: "",
          en: ""
      },
      desc: {
        ru: "",
        uz: "",
        en: ""
    },
    percent: null,
    amount: null,
    type: "product",
    ids: [],
    start: "",
    end: "",
    status: 1
      },
      products: [
        {
          id: 1
        }
      ]
    };
  },

  methods: {
    addProduct() {
      this.products.push({
        id: Math.max(...this.products.map((o) => o.id)) + 1,
      });
    },
    deleteElement(id) {
      if (this.products.length > 1)
        this.products = this.products.filter(
          (item) => item.id != id
        );
    },
     onChange(date, dateString) {
      if(dateString[0] == dateString[1]) {
        this.ruleForm.start = dateString[0]
        this.ruleForm.end = null
      } else {
        this.ruleForm.start = dateString[0]
        this.ruleForm.end = dateString[1]
      }
    },
    submitForm(ruleForm) {
      console.log(this.ruleForm);
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.__POST_Discount(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    headerbtnCallback() {
      this.$router.push("/inbox/discount");
    },
    async __POST_Discount(data) {
      try {
        await this.$store.dispatch("fetchDiscount/postDiscount", data);
        this.notification("Success","Успешно добавлен","success")
        this.$router.push("/inbox/discount");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async fetchUser(value) {
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      if(this.ruleForm.type == "product") {
        const data = await this.$store.dispatch("fetchProducts/getProducts", {
          search: value,
        });
      this.data = data?.products?.data;

      } else {
        const data = await this.$store.dispatch("fetchBrands/getBrands", {
          search: value,
        });
      this.data = data?.products?.data;

      }
      this.fetching = false;
    },
    handleChange(value) {
      this.ruleForm.ids = value.map((item) => item.key);
      Object.assign(this, {
        value,
        data: [],
        fetching: false,
      });
    },
  },
watch: {
  'ruleForm.percent'(val) {
    if(val)
    this.ruleForm.amount = null
  },
  'ruleForm.amount'(val) {
    if(val)
    this.ruleForm.percent = null
  },
  'ruleForm.type'() {
    this.ruleForm.ids = []
    this.value = []
  }
},
  components: {
    FormTitle,
    TitleBlock,
    LayoutHeaderBtn,
    Drag,
    DropList
  },
};
</script>
<style lang="css">
.discount-grid-input {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  grid-gap: 20px;
  align-items: flex-end;
}
</style>
