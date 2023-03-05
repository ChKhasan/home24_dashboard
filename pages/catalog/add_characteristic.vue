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
            Добавить характеристику
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
              v-for="(item, index) in lang"
              :label="item.label"
              :name="item.label"
              :key="index"
            >
              <div class="form-container form-container-ltr">
                <FormTitle title="Характеристика" />

                <div class="form-block required">
                  <div><label for="character_group">Группа</label></div>
                  <div class="group-grid" id="character_group">
                    <el-form-item prop="group_id">
                      <el-select
                        class="w-100"
                        v-model="ruleForm.group_id"
                        filterable
                        allow-create
                        placeholder="Choose tags for your article"
                      >
                        <el-option
                          v-for="item in groups"
                          :key="item.id"
                          :label="item.name.ru"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <div
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
                    </div>
                  </div>
                </div>
                <div class="atribut-input-grid">
                  <div class="form-block required">
                    <div><label for="">Имя характеристики </label></div>
                    <el-form-item :prop="`name_${item.key}`">
                      <el-input
                        v-model="ruleForm[`name_${item.key}`]"
                        placeholder="Atribut Name"
                      ></el-input>
                    </el-form-item>
                    <span class="bottom_text"
                      >Установите список ключевых слов, с которыми связана
                      категория. Разделите ключевые слова, добавив запятую между
                      каждым ключевым словом.</span
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
                      >Установите список ключевых слов, с которыми связана
                      категория. Разделите ключевые слова, добавив запятую между
                      каждым ключевым словом.</span
                    >
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
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
import AddBtn from "../../components/form/Add-btn.vue";
import LayoutHeaderBtn from "../../components/form/Layout-header-btn.vue";
import AddModal from "../../components/modals/Add-modal.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";

export default {
  layout: "toolbar",
  data() {
    return {
      activeName: "Русский",
      multiSelectError: true,
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
      value: [],
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
      },
      characteristic: {
        name_ru: "",
        name_uz: "",
        name_en: "",
      },
    };
  },
  methods: {
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
    headerbtnCallback() {
      console.log("fsfsdf");
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
    toAddProduct() {
      this.$router.push("/catalog/add_products");
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
    AddBtn,
    Title,
    TitleBlock,
    LayoutHeaderBtn,
    AddModal,
  },
};
</script>

