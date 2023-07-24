<template lang="html">
  <div>
    <el-form
      label-position="top"
      :model="ruleForm1"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <TitleBlock title="Топ меню" :breadbrumb="['Контент сайта']" lastLink="Топ меню">
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
            Сохранять
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
              v-for="(itemLang, index) in lang"
              :label="itemLang.label"
              :name="itemLang.label"
              :key="index"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Верхняя панель" />
                <div class="list">
                  <drop-list
                    :items="ruleForm"
                    @insert="onInsert"
                    @reorder="$event.apply(ruleForm)"
                  >
                    <template v-slot:item="{ item }">
                      <drag :key="item.indexId">
                        <div class="top-menu-input-grid pb-3">
                          <el-form-item
                            class="form-block required mb-0 w-100 align-items-start"
                            label="Категория или акция"
                          >
                            <a-select
                              show-search
                              v-model="item.category_id"
                              placeholder="input search text"
                              style="width: 100%"
                              :default-active-first-option="false"
                              :show-arrow="false"
                              :filter-option="false"
                              :not-found-content="fetching ? undefined : null"
                              @search="handleSearch"
                              @change="($event) => handleChange($event, item.indexId)"
                            >
                              <a-spin
                                v-if="fetching"
                                slot="notFoundContent"
                                size="small"
                              />
                              <a-select-option v-for="d in categories" :key="d.id">
                                {{ d.name.ru }}
                              </a-select-option>
                            </a-select>
                          </el-form-item>
                          <el-form-item
                            label="Короткое имя"
                            class="mb-0 form-block required w-100 align-items-start"
                          >
                            <el-input
                              v-model="item.name[itemLang.key]"
                              placeholder="Короткое имя..."
                            ></el-input>
                          </el-form-item>
                          <el-form-item
                            label="icon"
                            class="form-block required mb-0 w-100 align-items-start"
                          >
                            <el-input
                              v-model="item.icon_svg"
                              placeholder="Svg..."
                            ></el-input>
                          </el-form-item>
                          <div class="mb-0 form-block" style="line-height: 40px">
                            <label for="">Цвет 1</label>
                            <el-color-picker
                              popper-class="badges-color-picker"
                              v-model="item.color1"
                            ></el-color-picker>
                          </div>
                          <div class="mb-0 form-block" style="line-height: 40px">
                            <label for="">Цвет 2</label>
                            <el-color-picker
                              popper-class="badges-color-picker"
                              v-model="item.color2"
                            ></el-color-picker>
                          </div>
                          <div class="mb-0 form-block" style="line-height: 40px">
                            <label for="">Цвет текста</label>
                            <el-color-picker
                              popper-class="badges-color-picker"
                              v-model="item.text_color"
                            ></el-color-picker>
                          </div>

                          <div class="variant_btns mb-1 mt-0">
                            <div
                              class="variant-btn variant-btn-delete mx-2"
                              @click="deleteElement(item.indexId)"
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
                            <div
                              class="variant-btn variant-btn-check cursor_drag item dnd-drag drag-no-handle"
                            >
                              <a-icon
                                type="drag"
                                :style="{ color: '#3699FF', fontSize: '18px' }"
                              />
                            </div>
                          </div>
                        </div>
                      </drag>
                    </template>
                    <template v-slot:feedback="{ data }">
                      <div class="item feedback" :key="data">{{ data }}</div>
                    </template>
                  </drop-list>
                  <div class="d-flex justify-content-start">
                    <div class="create-inner-variant mt-0" @click="addElement()">
                      <span v-html="addInnerValidatIcon"></span>
                      Добавить
                    </div>
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
      fetching: false,
      categories: [],
      data: [],
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
      ruleForm1: {},
      ruleForm: [
        {
          indexId: 1,
          name: {
            ru: "",
            uz: "",
            en: "",
          },
          promotion_id: null,
          category_id: null,
          icon: null,
          icon_svg: "",
          text_color: "",
          color1: "",
          color2: "",
        },
      ],
    };
  },
  mounted() {
    this.__GET_TOP_MENU();
  },
  methods: {
    deleteElement(id) {
      if (this.ruleForm.length > 1)
        this.ruleForm = this.ruleForm.filter((item) => item.indexId != id);
    },
    addElement() {
      this.ruleForm.push({
        name: {
          ru: "",
          uz: "",
          en: "",
        },
        promotion_id: null,
        category_id: "",
        icon: null,
        icon_svg: "",
        text_color: "",
        color1: "",
        color2: "",
        indexId: Math.max(...this.ruleForm.map((o) => o.indexId)) + 1,
      });
    },
    submitForm(ruleForm) {
      const data = {
        bars: this.ruleForm.map((item) => {
          const { indexId, ...rest } = item;
          return rest;
        }),
      };
      this.$refs[ruleForm].validate((valid) => {
        valid ? this.__POST_TOP_MENU(data) : false;
      });
    },
    async handleSearch(value) {
      console.log(value);
      this.fetching = true;
      const categoriesData = await this.$store.dispatch("fetchCategories/getCategories", {
        search: value,
      });
      this.categories = categoriesData?.categories.data;
      this.fetching = false;

      console.log(this.categories);
    },
    handleChange(value, id) {
      console.log(value);
      let obj = this.ruleForm.find((item) => item.indexId == id);
      obj.category_id = value;
      console.log(obj);
    },
    async __POST_TOP_MENU(data) {
      try {
        await this.$store.dispatch("fetchTopBars/postTopBars", data);
        this.notification("Success", "Успешно добавлен", "success");
        this.$router.push("/contents/top-menu");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_TOP_MENU() {
      try {
        const data = await this.$store.dispatch("fetchTopBars/getTopBars");
        console.log(data);
        this.ruleForm = data?.bars?.data.map((item, index) => {
          return {
            ...item,
            indexId: index + 1,
          };
        });
        this.categories = data?.bars?.data
          .map((item, index) => item.category)
          .filter((elem) => elem);
        console.log(this.categories);
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    toBack() {
      this.$router.push("/contents/top-menu");
    },
    onInsert(event) {
      this.ruleForm.splice(event.index, 0, event.data);
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
.top-menu-input-grid {
  display: flex;
  gap: 8px;
}
.item {
  pointer-events: painted;
}
</style>
