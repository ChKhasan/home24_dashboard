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
          <el-tabs class="form_tabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="(itemLang, index) in lang"
              :label="itemLang.label"
              :name="itemLang.label"
              :key="index"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Характеристика" />

                <div class="form-block required">
                  <div><label for="character_group">Группа</label></div>
                  <div class="group-grid1" id="character_group">
                    <el-form-item prop="group_id">
                      <el-input placeholder="group" v-model="ruleForm.group_id" />
                    </el-form-item>
                  </div>
                </div>
                <div class="list">
                  <drop-list
                    :items="ruleForm.characters"
                    @insert="onInsert"
                    @reorder="$event.apply(ruleForm.characters)"
                  >
                    <template v-slot:item="{ item }">
                      <drag class="item" :key="item.id">
                        <div class="character-input-grid pb-3">
                          <div class="form-block required mb-0">
                            <el-form-item>
                              <el-input
                                v-model="item[`name_${itemLang.key}`]"
                                placeholder="Atribut Name"
                              ></el-input>
                            </el-form-item>
                          </div>
                          <div
                            class="form-block mb-0"
                            :class="{ 'multi-select-required': multiSelectError }"
                          >
                            <el-form-item label-position="top" prop="options">
                              <el-select
                                class="w-100"
                                v-model="ruleForm.options"
                                popper-class="select-popper-hover"
                                filterable
                                multiple
                                allow-create
                                default-first-option
                                no-data-text="No options"
                                placeholder="Option name"
                              >
                                <el-option
                                  v-for="option in options"
                                  :key="option.value"
                                  :label="option.label"
                                  :value="option.value"
                                >
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="variant_btns mb-1 mt-0">
                            <div
                              class="variant-btn variant-btn-delete mx-2"
                              @click="deleteElement(item.id)"
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
                            <div class="variant-btn variant-btn-check cursor_drag">
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
                      Добавить характеристику
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
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import AddModal from "../../components/modals/Add-modal.vue";
import TitleBlock from "../../components/Title-block.vue";
import { Drag, DropList } from "vue-easy-dnd";
export default {
  layout: "toolbar",
  data() {
    return {
      items: ["one", "two", "three", "four"],
      over: {},
      startLoc: 0,
      dragging: false,
      dragFrom: {},
      activeName: "Русский",
      multiSelectError: true,
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      addImgIcon: require("../../assets/svg/components/add-img-icon.svg?raw"),
      addInnerValidatIcon: require("../../assets/svg/components/add-inner-validat-icon.svg?raw"),
      groups: [],
      modalTabData: [
        {
          label: "Русский",
          index: "ru",
        },
        {
          label: "O'zbek",
          index: "uz",
        },
        {
          label: "English",
          index: "en",
        },
      ],
      modalTab: "ru",
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
        group_id: [
          {
            required: true,
            message: "Characteristic group is required",
            trigger: "change",
          },
        ],

        name_ru: [
          {
            required: true,
            message: "Characteristic name is required",
            trigger: "change",
          },
        ],
        options: [
          {
            required: true,
            message: "Characteristic name is required",
            trigger: "change",
          },
        ],
      },
      rulesModal: {
        name_ru: [
          {
            required: true,
            message: "Characteristic group is required",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        group_id: null,
        name_ru: "",
        name_uz: "",
        name_en: "",
        options: [],
        characters: [
          {
            id: 1,
            name_ru: "",
            name_uz: "",
            name_en: "",
            options: [],
          },
        ],
      },
      characteristic: {
        name_ru: "",
        name_uz: "",
        name_en: "",
      },
    };
  },
  methods: {
    deleteElement(id) {
      if (this.ruleForm.characters.length > 1)
        this.ruleForm.characters = this.ruleForm.characters.filter(
          (item) => item.id != id
        );
    },
    addElement() {
      this.ruleForm.characters.push({
        name: "",
        id: Math.max(...this.ruleForm.characters.map((o) => o.id)) + 1,
      });
    },
    submitForm(ruleForm) {
      this.multiSelectError = false;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            ...this.ruleForm,
            name: {
              ru: this.ruleForm.name_ru,
              uz: this.ruleForm.name_uz,
              en: this.ruleForm.name_en,
            },
          };
          delete data["name_ru"];
          delete data["name_uz"];
          delete data["name_en"];
          this.__POST_CHARACTERISTIC(data);
        } else {
          return false;
        }
      });
    },
    closeModal() {
      this.hide("add_atribute_group");
    },
    show(name) {
      this.$modal.show(name);
    },
    getData() {
      const newData = {
        name: {
          ru: this.characteristic.name_ru,
          uz: this.characteristic.name_uz,
          en: this.characteristic.name_en,
        },
      };
      this.$refs["characteristic"].validate((valid) =>
        valid ? this.__POST_GROUPS(newData) : false
      );
    },
    hide(name) {
      this.$modal.hide(name);
    },
    async __POST_CHARACTERISTIC(data) {
      try {
        await this.$store.dispatch("fetchCharacters/postCharacteristics", data);
        await this.$notify({
          title: "Success",
          message: "Характеристика успешно добавлен",
          type: "success",
        });
        this.$router.push("/catalog/characteristic");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_GROUPS() {
      const data = await this.$store.dispatch("fetchCharacters/getGroups");
      this.groups = data?.groups;
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.$notify.error({
            title: "Error",
            message: "Указанные данные недействительны.",
          });
          break;
        case 500:
          this.$notify.error({
            title: "Error",
            message: "Cервер не работает",
          });
          break;
        case 404:
          this.$notify.error({
            title: "Error",
            message: res.data.errors,
          });
          break;
      }
    },
    async __POST_GROUPS(data) {
      try {
        await this.$store.dispatch("fetchCharacters/postGroups", data);
        this.$notify({
          title: "Success",
          message: "Группа успешно добавлен",
          type: "success",
        });
        this.hide("add_atribute_group");
        this.__GET_GROUPS();
        this.characteristic.name_ru = "";
        this.characteristic.name_uz = "";
        this.characteristic.name_en = "";
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    toBack() {
      this.$router.push("/catalog/characteristic");
    },
    onInsert(event) {
      this.ruleForm.characters.splice(event.index, 0, event.data);
    },
  },
  mounted() {
    this.__GET_GROUPS();
  },
  components: {
    TitleBlock,
    LayoutHeaderBtn,
    AddModal,
    Drag,
    DropList,
  },
};
</script>
<style lang="scss">
.list > div {
  display: flex;
  flex-direction: column;
}

.flip-list-move {
  // transition: transform 0.2s;
}

.over {
  opacity: 0.6;
}

html,
body,
#app,
.v-application--wrap,
.v-content,
.v-content__wrap {
  height: 100%;
}

.drop-in {
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}
.wrapper {
  .list {
    border: 1px solid black;
    margin: 100px auto;
    width: 200px;

    .item {
      padding: 20px;
      margin: 10px;
      background-color: rgb(220, 220, 255);
      display: flex;
      align-items: center;
      justify-content: center;

      &.feedback {
        background-color: rgb(255, 220, 220);
        border: 2px dashed black;
      }

      &.drag-image {
        background-color: rgb(220, 255, 220);
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
