<template lang="html">
  <div>
    <TitleBlock
      title="Products"
      :breadbrumb="['eCommerce', 'Catalog']"
      lastLink="Products"
    >
      <div class="d-flex">
        <div class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3">
          Cancel
        </div>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="uploadLoading"
        >
          <span class="svg-icon" v-if="!uploadLoading" v-html="addIcon"> </span>
          Add Product
        </a-button>
      </div>
    </TitleBlock>
    <div class="container_xl">
      <div class="card_block-form py-5">
        <el-form
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <div
            class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
          ></div>
          <div class="products-from-grid">
            <div class="products-select-grid">
              <el-tabs class="form_tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-start">
                      <FormTitle title="Добавить продукт" />
                    </div>
                    <div class="form-block required">
                      <div><label for="">Имя</label></div>
                      <el-form-item :prop="`name_ru`">
                        <el-input
                          v-model="ruleForm[`name_${item.key}`]"
                          placeholder="Product name"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="products-input-grid-3">
                      <div class="form-block">
                        <div><label for="">Модель</label></div>
                        <el-form-item prop="model">
                          <el-input
                            v-model="ruleForm.model"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <!-- <div class="form-block">
                        <div><label for="">Имя</label></div>
                        <el-form-item prop="nbm">
                          <el-input
                            v-model="ruleForm.nbm"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block">
                        <div><label for="">Код</label></div>
                        <el-form-item prop="nbm">
                          <el-input
                            disabled
                            placeholder="162 111 415 515 118"
                          ></el-input>
                        </el-form-item>
                      </div> -->
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="form-container">
                <div class="d-flex justify-content-start">
                  <FormTitle title="Информация о продукте" />
                </div>
                <div class="d-flex align-items-end">
                  <div class="products-input-grid-3 w-100">
                    <div class="form-block mb-0 required">
                      <div><label>Категория</label></div>
                      <el-form-item prop="category_id">
                        <el-select
                          v-model="ruleForm.category_id"
                          filterable
                          class="w-100"
                          default-first-option
                          placeholder="Select category"
                          no-data-text="no category"
                          no-match-text="no category"
                        >
                          <el-option
                            v-for="item in categories"
                            :key="item.id"
                            :label="item.name?.ru"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <span class="bottom_text">Добавить товар в категорию</span>
                    </div>
                    <div class="form-block mb-0">
                      <div><label>Дочерняя категория</label></div>
                      <el-select
                        v-model="categoryChild.child1.id"
                        filterable
                        no-data-text="no category"
                        no-match-text="no category"
                        :disabled="categoryChild.child1.arr.length < 1"
                        placeholder="Select post category"
                      >
                        <el-option
                          v-for="item in categoryChild.child1.arr"
                          :key="item.id"
                          :label="item.name.ru"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                      <span class="bottom_text">Добавить товар в категорию</span>
                    </div>
                    <div class="form-block mb-0">
                      <div><label>Последняя категория</label></div>
                      <el-select
                        v-model="categoryChild.child2.id"
                        filterable
                        no-data-text="no category"
                        no-match-text="no category"
                        :disabled="categoryChild.child2.arr.length < 1"
                        placeholder="Select last category"
                      >
                        <el-option
                          v-for="item in categoryChild.child2.arr"
                          :key="item.id"
                          :label="item.name?.ru"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                      <span class="bottom_text">Добавить товар в категорию</span>
                    </div>
                  </div>
                  <div class="prducts-details-btns">
                    <div
                      class="outline-btn outline-light-green-btn"
                      @click="searchBlock = true"
                      v-html="searchIcon"
                    ></div>
                    <div
                      class="outline-btn outline-light-green-btn"
                      @click="reloadCategories"
                      v-html="reloadIcon"
                    ></div>
                    <div
                      class="outline-btn outline-light-blue-btn"
                      @click="show('add_category_modal')"
                      v-html="plusCategoryIcon"
                    ></div>
                  </div>
                </div>
                <Transition name="search-block">
                  <div class="d-flex" v-if="searchBlock">
                    <div class="search-container">
                      <div class="search-input-block">
                        <div class="form-block w-100 mb-0">
                          <div class="position-relative search-input-icon">
                            <el-input
                              class="w-100"
                              v-model="ruleForm.nbm"
                              placeholder="Product model"
                            ></el-input>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.5 18.5L22 22M21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21C16.7467 21 21 16.7467 21 11.5Z"
                                stroke="#A1A5BF"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div class="search-resoults">
                            <div class="search-clear">
                              <p>Вы недавно искали</p>
                              <span>Очистить</span>
                            </div>
                            <div class="search-resoult-items">
                              <p>Строймате</p>
                            </div>
                            <div class="search-resoult-items">
                              <p>Строймате</p>
                            </div>
                            <div class="search-resoult-items">
                              <p>Строймате</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            class="outline-btn outline-white-btn"
                            @click="searchBlock = false"
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
                                stroke="#28303F"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex search-container-btns">
                      <div
                        class="outline-btn outline-light-green-btn mx-3"
                        v-html="reloadIcon"
                      ></div>
                      <div
                        class="outline-btn outline-light-blue-btn"
                        v-html="plusCategoryIcon"
                      ></div>
                    </div>
                  </div>
                </Transition>
              </div>
              <el-tabs class="form_tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in lang"
                  :label="item.label"
                  :name="item.label"
                  :key="index"
                >
                  <div class="form-container form-container-ltr">
                    <div class="d-flex justify-content-start">
                      <FormTitle title="Информация о продукте" />
                    </div>
                    <el-tabs
                      class="desc_tab"
                      v-model="activeDesc"
                      @tab-click="handleClick"
                    >
                      <el-tab-pane label="Описание" name="Description">
                        <div class="mt-1">
                          <quill-editor
                            style="min-height: 250px"
                            :options="editorOption"
                            :value="ruleForm.desc[item.key]"
                            v-model="ruleForm.desc[item.key]"
                          /></div
                      ></el-tab-pane>
                      <el-tab-pane label="Характеристика" name="Character">
                        <div>
                          <h5 class="variant-img-title mb-4 mt-2">
                            Добавить характеристику
                          </h5>
                          <a-button type="primary" @click="show('characteristic_modal')"
                            >Редактировать характеристику
                          </a-button>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!-- Product Variants -->
              <transition-group name="el-zoom-in-top" tag="ul">
                <div
                  class="form-container product_list"
                  v-for="element in ruleForm.products"
                  :key="element.id"
                >
                  <div class="d-flex justify-content-between variant-header">
                    <h4 class="variant-title">Вариация №{{ element.id }}</h4>
                    <div
                      class="variant-btn variant-btn-delete"
                      @click="deleteProduct(element.id)"
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
                  <div class="variant-img-container">
                    <h5 class="variant-img-title">Изображение товара</h5>

                    <div class="variant-img">
                      <a-upload
                        list-type="picture-card"
                        :file-list="element.imagesData"
                        :multiple="true"
                        @preview="handlePreview"
                        @change="($event) => handleChangeVatiant($event, element.id)"
                      >
                        <div v-if="element.imagesData.length < 50">
                          <span v-html="addImgIcon"></span>
                          <div class="ant-upload-text">Добавить изображение</div>
                        </div>
                      </a-upload>
                      <a-modal
                        :visible="previewVisible"
                        :footer="null"
                        @cancel="handleCancel"
                      >
                        <img alt="example" style="width: 100%" :src="previewImage" />
                      </a-modal>
                    </div>
                    <p class="variant-img-text">
                      Изображение товар
                      <span>Первое изображение товара является главной.</span>
                    </p>
                  </div>
                  <div>
                    <!-- Validations -->
                    <transition-group name="el-zoom-in-top" tag="ul">
                      <div
                        class="product-variant"
                        v-for="item in element.variations"
                        :key="item.id"
                      >
                        <div class="product_variant_block" v-if="atributes.length > 0">
                          <div class="variant-grid-4 w-100">
                            <el-form
                              label-position="top"
                              :model="item.optionName"
                              :rules="rulesAtributes"
                              ref="ruleFormAtributes"
                              label-width="120px"
                              class="demo-ruleForm d-flex"
                              action=""
                            >
                              <div
                                class="form-variant-block atribut_selects"
                                v-for="(atribut, index) in atributes"
                              >
                                <div>
                                  <label>{{ atribut.name.ru }}</label>
                                </div>
                                <el-form-item :prop="`at_${atribut.id}`" class="mb-0">
                                  <el-select
                                    v-model="item.optionName[`at_${atribut.id}`]"
                                    class="w-100"
                                    default-first-option
                                    placeholder="265 gb"
                                    @change="
                                      atributOptions({
                                        productId: element.id,
                                        variantId: item.id,
                                        index: index,
                                        name: atribut.name.ru,
                                        id: atribut.id,
                                      })
                                    "
                                  >
                                    <el-option
                                      v-for="optionElement in atribut.options"
                                      :key="optionElement.id"
                                      :label="optionElement.name.ru"
                                      :value="optionElement.id"
                                    >
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </div>
                            </el-form>

                            <div class="form-variant-block">
                              <div><label>Popular</label></div>
                              <el-select
                                v-model="item.is_popular"
                                allow-create
                                class="w-100"
                                default-first-option
                                placeholder="265 gb"
                              >
                                <el-option
                                  v-for="item in [
                                    { label: `Да`, id: 1 },
                                    { label: `Нет`, id: 0 },
                                  ]"
                                  :key="item.id"
                                  :label="item.label"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </div>
                            <div class="form-variant-block">
                              <div><label>Product of day</label></div>
                              <el-select
                                v-model="item.product_of_the_day"
                                allow-create
                                class="w-100"
                                default-first-option
                                placeholder="265 gb"
                              >
                                <el-option
                                  v-for="item in [
                                    { label: `Да`, id: 1 },
                                    { label: `Нет`, id: 0 },
                                  ]"
                                  :key="item.id"
                                  :label="item.label"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </div>
                            <div class="form-variant-block">
                              <div><label>Status</label></div>
                              <el-select
                                v-model="item.status"
                                allow-create
                                class="w-100"
                                default-first-option
                                placeholder="265 gb"
                              >
                                <el-option
                                  v-for="item in validateStatus"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </div>
                            <div class="form-variant-block">
                              <div><label>Price</label></div>
                              <el-input
                                v-model="item.price"
                                placeholder="Price"
                                type="number"
                              ></el-input>
                            </div>
                          </div>

                          <div class="variant_btns mb-1">
                            <div
                              class="variant-btn variant-btn-delete mx-2"
                              @click="deleteValidation(element.id, item.id)"
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
                              class="variant-btn variant-btn-check"
                              @click="onChangeVariants(element.id, item.id)"
                            >
                              <a-radio :checked="item.is_default == 1"></a-radio>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition-group>
                    <!-- Validations -->
                  </div>
                  <div class="d-flex justify-content-start" v-if="atributes.length > 0">
                    <div class="create-inner-variant" @click="addValidation(element.id)">
                      <span v-html="addInnerValidatIcon"></span>
                      Добавит внутренний варизаци
                    </div>
                  </div>
                </div>
              </transition-group>
              <div>
                <div class="add-variant create-inner-variant mt-0" @click="addProduct">
                  <span v-html="addInnerValidatIcon"></span>
                  Добавит варизаци
                </div>
              </div>
              <!-- Product Variants -->
            </div>
            <!-- Product right details -->
            <div class="products-img-grid">
              <div class="form-container">
                <el-form
                  label-position="top"
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                  action=""
                >
                  <div class="form-block status-style">
                    <div><label for="status">Статус</label></div>
                    <el-form-item>
                      <el-select
                        id="status"
                        class="w-100"
                        v-model="ruleForm.is_active"
                        default-first-option
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
                    <span class="bottom_text">Установить статус продукта</span>
                  </div>
                  <div class="form-block mb-0">
                    <div><label for="">Бренд</label></div>
                    <div class="product-plus-btn">
                      <el-form-item prop="brand_id">
                        <el-select
                          class="w-100"
                          v-model="ruleForm.brand_id"
                          allow-create
                          :loading="brands.length < 1"
                          loading-text="Loading..."
                          placeholder="Бренд"
                        >
                          <el-option
                            v-for="item in brands"
                            :key="item?.id"
                            :label="item?.name"
                            :value="item?.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <div
                        class="outline-btn outline-light-blue-btn mt-1"
                        @click="show('add_brand_modal')"
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
                    <div class="bottom_text">Установить статус продукта</div>
                  </div>
                </el-form>
              </div>
              <div class="form-container">
                <ProductsStatistic />
              </div>
            </div>
            <!-- Product right details -->
          </div>
        </el-form>
      </div>
    </div>
    <AddBrandModal :getBrands="__GET_BRANDS" />
    <AddCategoryModal
      :brands="brands"
      :getCategories="__GET_CATEGORIES"
      :categories="categories"
    />
    <modal
      :adaptive="true"
      name="characteristic_modal"
      width="100%"
      height="100%"
      :clickToClose="false"
    >
      <div class="add_modal-container padding_characteristic_modal" ref="ruleForm1">
        <div class="character_modal-header">
          <div class="character_modal-header_btn">
            <div
              class="character-save-btn"
              @click="submitFormCharacter('ruleFormCharacter')"
            >
              <span class="svg-icon" v-html="addIcon"></span>
              сохранять
            </div>
            <div class="character-close-btn" @click="hide('characteristic_modal')">
              <span class="character-close-icon" v-html="closeIcon"></span>
              Закрыть
            </div>
          </div>
          <div
            class="character-products-container d-flex"
            ref="productScroll"
            @scroll="handleScroll"
          >
            <span v-for="product in ruleForm.products" class="d-flex">
              <div
                class="character-product-card"
                v-for="variations in product.variations"
              >
                <div class="ch-product-img">
                  <img v-if="product.images.length > 0" :src="product.images[0]" alt="" />
                  <img
                    v-else
                    src="../../assets/images/photo_2023-03-04_13-28-58.jpg"
                    alt=""
                  />
                </div>
                <div class="ch-product-body">
                  <span class="ch-product-info"> Пурпурные </span>
                  <span class="ch-product-info"> dual SIM 265 gb </span>
                  <span class="ch-product-info"> 17 100 000 сум LL A </span>
                </div>
              </div>
            </span>
          </div>
        </div>

        <div class="product-character-container" ref="characterScroll">
          <div class="d-inline-flex flex-column w-100">
            <div
              class="product-character-block"
              v-for="(characterGroup, characterGroupIndex) in character_group"
            >
              <div class="character-group">
                <h5 @click="characterValueCopy">
                  {{ characterGroup.name.ru }}
                </h5>
                <div
                  class="character_copy-btn"
                  v-if="characterGroupIndex == 0"
                  @click="characterValueCopy"
                >
                  <span v-html="copyIcon"> </span> Коп. характеристику
                </div>
              </div>
              <div
                class="product-character-items"
                v-for="(characters, index) in characterGroup.characteristics"
              >
                <div class="product-character-name">
                  {{ characters.name.ru }}
                </div>
                <span class="character_scroll_span" ref="characterScrollItems">
                  <span v-for="product in ruleForm.products" class="d-flex">
                    <div
                      class="product-character-info"
                      v-for="variations in product.variations"
                    >
                      <el-form
                        label-position="top"
                        :model="variations.characteristicsValues"
                        :rules="rulesCharacter"
                        ref="ruleFormCharacter"
                        label-width="120px"
                        class="demo-ruleForm character_form"
                        action=""
                      >
                        <el-form-item :prop="`char_${characters.id}`">
                          <el-select
                            v-model="
                              variations.characteristicsValues[`char_${characters.id}`]
                            "
                            filterable
                            allow-create
                            default-first-option
                            placeholder="Select category"
                            no-data-text="no-category"
                          >
                            <el-option
                              v-for="optionsItem in characters.options"
                              :key="optionsItem.id"
                              :label="optionsItem.name?.ru"
                              :value="optionsItem.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import TitleBlock from "../../components/Title-block.vue";
import ProductsStatistic from "../../components/products/Products-statistic.vue";
import ProductCharacterList from "../../components/products/Product-character-list.vue";
import CommentCard from "../../components/products/CommentCard.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import AddBrandModal from "../../components/products/Add-brand-modal.vue";
import AddCategoryModal from "../../components/products/Add-category-modal.vue";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  layout: "toolbar",
  middleware: "auth",
  data() {
    return {
      closeIcon: require("../../assets/svg/components/remove.svg?raw"),
      copyIcon: require("../../assets/svg/components/copy.svg?raw"),
      addIcon: require("../../assets/svg/components/add-icon.svg?raw"),
      searchIcon: require("../../assets/svg/components/search-icon.svg?raw"),
      reloadIcon: require("../../assets/svg/components/reload-icon.svg?raw"),
      addImgIcon: require("../../assets/svg/components/add-img-icon.svg?raw"),
      addInnerValidatIcon: require("../../assets/svg/components/add-inner-validat-icon.svg?raw"),
      plusCategoryIcon: require("../../assets/svg/components/add-category-icon.svg?raw"),
      title: "Quill Editor",
      items: [1, 2],
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],

            ["image"],
            ["code-block"],
          ],
        },
      },
      atributes: [],
      variantId: null,
      activeName: "Русский",
      activeDesc: "Description",
      searchBlock: false,
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
      options: [
        {
          value: 1,
          label: "Active",
        },
        {
          value: 0,
          label: "Inactive",
        },
      ],
      rules: {
        name_ru: [
          {
            required: true,
            message: "Product name is required",
            trigger: "change",
          },
        ],
        category_id: [
          {
            required: true,
            message: "Product name is required",
            trigger: "change",
          },
        ],
      },
      categories: [],
      categoryChild: {
        child1: {
          id: "",
          arr: [],
        },
        child2: {
          id: "",
          arr: [],
        },
      },
      ruleForm: {
        name_ru: "",
        name_uz: "",
        name_en: "",
        model: "",
        desc: {
          ru: "",
          uz: "",
          en: "",
        },
        brand_id: "",
        is_active: 1,
        category_id: "",
        products: [
          {
            id: 1,
            images: [],
            imagesData: [],
            variations: [
              {
                id: 1,
                options: [],
                optionName: {},
                characteristics: [],
                characteristicsValues: {},
                price: 0,
                is_default: 1,
                is_popular: 0,
                product_of_the_day: 0,
                status: "active",
              },
            ],
          },
        ],
      },
      validateStatus: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
      previewVisible: false,
      previewImage: "",
      fileList: [],
      rulesCharacter: {},
      rulesAtributes: {},
      brands: [],
      uploadLoading: false,
      character_group: [],
      characterNames: [],
      characterRequired: false,
    };
  },
  mounted() {
    this.__GET_BRANDS();
    this.__GET_CATEGORIES();
    console.log(process.env);
  },
  methods: {
    // products
    submitForm(ruleForm) {
      const newData = this.transformData();
      let artibutReqiured = [];
      if (this.$refs.ruleFormAtributes) {
        this.$refs["ruleFormAtributes"].forEach((item) => {
          item.validate((valid) => {
            valid ? artibutReqiured.push(valid) : false;
          });
        });
      }
      this.$refs[ruleForm].validate((valid) => {
        const atr = this.$refs.ruleFormAtributes
          ? this.$refs.ruleFormAtributes.length
          : 0;
        const atributValid = artibutReqiured.length == atr;
        if (!valid && !atributValid) return false;
        this.characterRequired
          ? this.__POST_PRODUCTS(newData)
          : this.notification("Success", "Вы не добавили характеристику", "error");
      });
    },
    submitFormCharacter(ruleForm) {
      this.characterRequired = false;
      const trueData = [];
      this.$refs[ruleForm].forEach((item) => {
        item.validate((valid) => {
          if (!valid) return false;
          trueData.push(valid);
          if (trueData.length == this.$refs[ruleForm].length)
            (this.characterRequired = true), this.hide("characteristic_modal");
        });
      });
    },
    transformData() {
      const newData = {
        ...this.ruleForm,
        name: {
          ru: this.ruleForm.name_ru,
          uz: this.ruleForm.name_uz,
          en: this.ruleForm.name_en,
        },
        products: this.ruleForm.products.map((item) => {
          const newVariation = item.variations.map((elem) => {
            return {
              options: elem.options,
              price: Number.parseFloat(elem.price).toFixed(2) * 1,
              is_default: elem.is_default,
              is_popular: elem.is_popular,
              product_of_the_day: elem.product_of_the_day,
              characteristics: [...Object.values(elem.characteristicsValues)],
              status: elem.status,
            };
          });
          return {
            variations: newVariation,
            images: item.images,
          };
        }),
      };
      delete newData["name_ru"];
      delete newData["name_uz"];
      delete newData["name_en"];
      if (!this.categoryChild.child1.id) return newData;
      newData.category_id = this.categoryChild.child1.id;
      if (!this.categoryChild.child2.id) return newData;
      newData.category_id = this.categoryChild.child2.id;
      return newData;
    },
    notification(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
      });
    },
    reloadCategories() {
      this.ruleForm.category_id = "";
    },
    closeModal(name) {
      this.hide("add_category_modal");
    },
    handleScroll(event) {
      this.$refs.characterScrollItems.forEach((item) => {
        item.scrollLeft = this.$refs.productScroll.scrollLeft;
      });
      this.$refs.characterScroll.scrollLeft = this.$refs.productScroll.scrollLeft;
    },
    handleChangeVatiant({ fileList }, id) {
      this.variantId = id;
      this.fileList = fileList;
    },
    atributOptions(obj) {
      const product = this.findProductWithId(obj.productId);
      product.variations.find((varId) => varId.id == obj.variantId).options[
        obj.index
      ] = product.variations.find((varId) => varId.id == obj.variantId).optionName[
        `at_${obj.id}`
      ];
    },
    show(name) {
      this.$modal.show(name);
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    },
    hide(name) {
      this.$modal.hide(name);
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    //variant
    atributNames() {
      const options = {};
      this.atributes.forEach((elem) => {
        return (options[elem.name] = "");
      });
      return options;
    },
    addValidation(variantId) {
      const product = this.findProductWithId(variantId);
      const options = { ...this.atributNames };
      product.variations.push({
        id: product.variations.at(-1).id + 1,
        options: [1],
        price: 0,
        is_default: 0,
        product_of_the_day: 0,
        is_popular: 0,
        characteristics: [],
        characteristicsValues: {},
        optionName: options,
        status: "active",
      });
    },
    deleteProduct(variantId) {
      if (this.ruleForm.products.length > 1) {
        this.ruleForm.products = this.ruleForm.products.filter(
          (item) => item.id != variantId
        );
      }
    },
    deleteValidation(variantId, innerVarId) {
      const product = this.findProductWithId(variantId);
      if (product.variations.length > 1) {
        product.variations = product.variations.filter((item) => item.id != innerVarId);
      }
    },
    findProductWithId(variantId) {
      return this.ruleForm.products.find((element) => element.id == variantId);
    },
    addProduct() {
      const options = { ...this.atributNames };
      const newVariations = [
        {
          id: 1,
          options: [1],
          price: 0,
          is_default: 1,
          product_of_the_day: 0,
          is_popular: 0,
          optionName: options,
          characteristics: [],
          characteristicsValues: {},
          status: "active",
        },
      ];
      this.ruleForm.products.push({
        id: this.ruleForm.products.at(-1).id + 1,
        images: [],
        imagesData: [],
        variations: newVariations,
      });
    },
    // variant
    async __UPLOAD_FILE(formData) {
      try {
        const data = await this.$store.dispatch("uploadFile/uploadFile", formData);
        return data.path;
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    handleClick(tab, event) {
      this.formVal = "";
    },
    onChangeVariants(elementId, varId) {
      this.ruleForm.products
        .find((proId) => proId.id == elementId)
        .variations.find((variantId) => variantId.id == varId).is_default = 1;
      this.ruleForm.products
        .find((proId) => proId.id == elementId)
        .variations.filter((element) => element.id != varId)
        .forEach((item) => {
          item.is_default = 0;
        });
    },
    async __POST_PRODUCTS(data) {
      try {
        await this.$store.dispatch("fetchProducts/postProducts", data);
        this.$router.push("/catalog/products");
        this.notification("Success", "Продукт успешно добавлен", "success");
      } catch (e) {
        this.statusFunc(e.response);
      }
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
    async __GET_BRANDS() {
      const data = await this.$store.dispatch("fetchBrands/getBrands");
      this.brands = [
        {
          name: '----',
          id: null,
        },
        ...data?.brands.data,
      ];
    },
    async __GET_CATEGORIES() {
      const data = await this.$store.dispatch("fetchCategories/getCategories");
      this.categories = [...data.categories?.data];
    },
    async __GET_CATEGORY_BY_ID(id) {
      const data = await this.$store.dispatch("fetchCategories/getCategoriesById", id);
      const category = data.category;
      this.atributes = category.attributes;
      this.character_group = category.characteristic_groups;
      this.atributes.forEach((element) => {
        this.rulesAtributes[`at_${element.id}`] = [
          {
            required: true,
            message: "Atribut is required",
            trigger: "change",
          },
        ];
      });

      category.characteristic_groups.forEach((item) => {
        item.characteristics.forEach((elem) => {
          this.characterNames.push(`char_${elem.id}`);
          this.rulesCharacter[`char_${elem.id}`] = [
            {
              required: true,
              message: "Brand name is required",
              trigger: "change",
            },
          ];
        });
      });
    },
    characterValueCopy() {
      var copyCharacter = {};
      this.ruleForm.products.forEach((item, itemIndex) => {
        item.variations.forEach((elem, elemIndex) => {
          if (itemIndex == 0 && elemIndex == 0) {
            copyCharacter = { ...elem.characteristicsValues };
          } else {
            Object.keys(copyCharacter).forEach((charElem) => {
              if (!Object.keys(elem.characteristicsValues).includes(charElem)) {
                elem.characteristicsValues[charElem] = copyCharacter[charElem];
                elem.characteristicsValues = { ...elem.characteristicsValues };
              }
            });
          }
        });
      });
      copyCharacter = {};
    },
  },
  watch: {
    "ruleForm.category_id"(val) {
      if (val) {
        const child1 = this.categories.find((item) => item.id == val);
        this.__GET_CATEGORY_BY_ID(val);
        if (!child1.children) return false;
        if (child1.children.length > 0) {
          this.categoryChild.child1.arr = child1.children;
        } else {
          this.categoryChild.child1.arr = [];
          this.categoryChild.child2.arr = [];
        }
      } else {
        this.categoryChild.child1.arr = [];
        this.categoryChild.child2.arr = [];
        this.atributes = [];
      }
      this.categoryChild.child1.id = "";
      this.categoryChild.child2.id = "";
    },
    "categoryChild.child1.id"(val) {
      if (!val) return false;
      const child2 = this.categoryChild.child1.arr.find((item) => item.id == val);
      this.__GET_CATEGORY_BY_ID(val);
      if (child2.children.length > 0) {
        this.categoryChild.child2.arr = child2.children;
      } else {
        this.categoryChild.child2.arr = [];
        this.categoryChild.child2.id = "";
      }
    },
    "categoryChild.child2.id"(val) {
      this.__GET_CATEGORY_BY_ID(val);
    },
    async fileList() {
      const currentProduct = this.findProductWithId(this.variantId);
      currentProduct.imagesData = this.fileList;
      const newImages = [];
      this.fileList.forEach((element, index) => {
        let formData = new FormData();
        formData.append("file", element.originFileObj);
        newImages[index] = formData;
      });
      this.uploadLoading = true;
      newImages.forEach(async (element, index) => {
        currentProduct.images[index] = await this.__UPLOAD_FILE(element);
        this.uploadLoading = false;
      });
    },
  },
  components: {
    ProductsStatistic,
    ProductCharacterList,
    CommentCard,
    TitleBlock,
    AddBrandModal,
    AddCategoryModal,
  },
};
</script>
<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list {
  transition: all 0.4s;
  display: grid;
  grid-gap: 24px;
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.list-move {
  opacity: 1;
  transition: all 0.4s;
}
.product_list {
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
}

.search-block-enter,
.search-block-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.search-block-enter-form,
.search-block-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.search-block {
  transition: all 0.4s;
}
.search-block-enter-to,
.search-block-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.search-block-enter-active,
.search-block-leave-active {
  transition: all 0.4s;
}
// 1761
</style>
