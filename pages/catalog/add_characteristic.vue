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
              v-for="(item, index) in lang"
              :label="item.label"
              :name="item.label"
              :key="index"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Характеристика" />

                <div class="form-block required">
                  <div><label for="character_group">Группа</label></div>
                  <div class="group-grid1" id="character_group">
                    <el-form-item prop="group_id">
                    <el-input placeholder="group"/>
                      <!-- <el-select
                        class="w-100"
                        popper-class="select-popper-hover"
                        v-model="ruleForm.group_id"
                        filterable
                        no-data-text="No group"
                        no-match-text="No group"
                        placeholder="Choose tags for your article"
                      >
                        <el-option
                          v-for="item in groups"
                          :key="item.id"
                          :label="item.name.ru"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select> -->
                    </el-form-item>
                    <!-- <div
                      class="outline-btn outline-light-blue-btn mt-1"
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
                    </div> -->
                  </div>
                </div>
                <!-- <div class="atribut-input-grid">
                  <div class="form-block required">
                    <div><label for="">Имя характеристики </label></div>
                    <el-form-item :prop="`name_${item.key}`">
                      <el-input
                        v-model="ruleForm[`name_${item.key}`]"
                        placeholder="Atribut Name"
                      ></el-input>
                    </el-form-item>
                    <span class="bottom_text"
                      >Установите список ключевых слов, с которыми связана категория.
                      Разделите ключевые слова, добавив запятую между каждым ключевым
                      словом.</span
                    >
                  </div>
                  <div
                    class="form-block"
                    :class="{ 'multi-select-required': multiSelectError }"
                  >
                    <div><label>Имя опции</label></div>
                    <el-form-item label-position="top" prop="options">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.options"
                        popper-class="select-popper-hover"
                        filterable
                        multiple
                        allow-create
                        no-data-text="No options"
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
                      Разделите ключевые слова, добавив запятую между каждым ключевым
                      словом.</span
                    >
                  </div>
                </div> -->
                <div class="list">
                  <transition-group name="flip-list" tag="div">
                    <div
                      class="character-input-grid mb-3"
                      v-for="(item1, i) in ruleForm.characters"
                      :class="{
                        over: item1 === over.item && item1 !== dragFrom,
                        [over.dir]: item1 === over.item && item1 !== dragFrom,
                      }"
                      :key="item1.id"
                    >
                      <div class="form-block required mb-0">
                        <el-form-item>
                          <el-input
                            v-model="item1[`name_ru`]"
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
                            no-data-text="No options"
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
                      </div>
                      <div class="variant_btns mb-1 mt-0">
                        <div class="variant-btn variant-btn-delete mx-2">
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
                          class="variant-btn variant-btn-check"
                          draggable="true"
                          @dragend="(e) => finishDrag(item1, i, e)"
                          @dragover="(e) => onDragOver(item1, i, e)"
                          @dragstart="(e) => startDrag(item1, i, e)"
                        >
                          <a-icon
                            type="drag"
                            :style="{ color: '#3699FF', fontSize: '18px' }"
                          />
                          <!-- <a-radio :checked="item.is_default == 1"></a-radio> -->
                        </div>
                      </div>
                    </div>
                  </transition-group>
                  <div class="d-flex justify-content-start">
                    <div class="create-inner-variant">
                      <span v-html="addInnerValidatIcon"></span>
                      Добавит внутренний варизаци
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!-- <div id="app">
            items{{ items }}
            <div class="list">
              <transition-group name="flip-list" tag="div">
                <li
                  v-for="(item, i) in ruleForm.characters"
                  class="item"
                  :class="{
                    over: item === over.item && item !== dragFrom,
                    [over.dir]: item === over.item && item !== dragFrom,
                  }"
                  :key="item"
                >
                  {{ item.name_ru }}
                  <button
                    draggable="true"
                    @dragend="(e) => finishDrag(item, i, e)"
                    @dragover="(e) => onDragOver(item, i, e)"
                    @dragstart="(e) => startDrag(item, i, e)"
                  >
                    drag
                  </button>
                </li>
              </transition-group>
            </div>
          </div> -->
        </div>
      </div>
    </el-form>
    <AddModal
      title="New group"
      name="add_atribute_group"
      btnText="Add Group"
      :callback="getData"
      :closeModal="closeModal"
    >
      <el-form
        label-position="top"
        :model="characteristic"
        :rules="rulesModal"
        ref="characteristic"
        label-width="120px"
        class="demo-ruleForm"
        action=""
      >
        <div class="modal_tab mb-4">
          <span
            v-for="(item, index) in modalTabData"
            :key="index"
            @click="modalTab = item.index"
            :class="{ 'avtive-modalTab': modalTab == item.index }"
          >
            {{ item.label }}
          </span>
        </div>
        <div
          class="form-block required"
          v-for="(item, index) in modalTabData"
          :key="index"
          v-if="modalTab == item.index"
        >
          <div><label for="">Group </label></div>
          <el-form-item prop="name_ru">
            <el-input
              placeholder="Group"
              v-model="characteristic[`name_${item.index}`]"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </AddModal>
  </div>
</template>
<script>
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import AddModal from "../../components/modals/Add-modal.vue";
import TitleBlock from "../../components/Title-block.vue";

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
            name_ru: "11111",
            name_uz: "2222",
            name_en: "",
            options: [],
          },
          {
            id: 2,

            name_ru: "222222",
            name_uz: "",
            name_en: "",
            options: [],
          },
          {
            id: 3,

            name_ru: "333333",
            name_uz: "",
            name_en: "",
            options: [],
          },
          {
            id: 4,

            name_ru: "44444",
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
    startDrag(item, i, e) {
      this.startLoc = e.clientY;
      this.dragging = true;
      this.dragFrom = item;
      console.log(this.dragFrom);
    },
    finishDrag(item, pos) {
      this.ruleForm.characters.splice(pos, 1);
      this.ruleForm.characters.splice(this.over.pos, 0, item);
      this.over = {};
    },

    onDragOver(item, pos, e) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      setTimeout(() => {
        this.over = { item, pos, dir };
      }, 50);
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
    handleClick() {},
  },
  mounted() {
    this.__GET_GROUPS();
  },
  components: {
    TitleBlock,
    LayoutHeaderBtn,
    AddModal,
  },
};
</script>
<style lang="scss">
.list > div {
  display: flex;
  flex-direction: column;
}

.item {
  width: 200px;
  padding: 10px;
  margin: 10px auto 10px 10px;
  background: tomato;
  color: white;
  font-family: sans-serif;
  border-radius: 5px;
  display: inline-block;
  position: relative;
  transition: transform 0.2s;
  button {
    position: absolute;
    right: -100%;
  }
  /*   transition: opacity .3s ease-in-out; */
}

.flip-list-move {
  // transition: transform 0.2s;
}

.over {
  opacity: 0.6;
}

.down {
  /*   transform: translateY(-20px); */
}

.up {
  /*    transform: translateY(20px); */
}
</style>
