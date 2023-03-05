<template lang="html">
  <div>
    <TitleBlock
      title="Products"
      :breadbrumb="['eCommerce', 'Catalog']"
      lastLink="Products"
    >
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
        >
          Cancel
        </div>
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
          Add Product
        </div>
      </div>
    </TitleBlock>
    <div class="container_xl">
      <div class="card_block-form py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
        ></div>
        <div class="products-from-grid">
          <div class="products-select-grid">
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
                  <div class="d-flex justify-content-start">
                    <FormTitle title="Добавить продукт" />
                  </div>
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
                      <div><label for="">Имя</label></div>
                      <el-form-item :prop="`name_${item.key}`">
                        <el-input
                          v-model="ruleForm[`name_${item.key}`]"
                          placeholder="Product model"
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
                      <div class="form-block">
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
                      </div>
                    </div>
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="form-container">
              <div class="d-flex justify-content-start">
                <FormTitle title="Информация о продукте" />
              </div>
              <div class="d-flex align-items-end">
                <div class="products-input-grid-3 w-100">
                  <div class="form-block mb-0">
                    <div><label>Категория</label></div>
                    <el-select
                      v-model="ruleForm.category_id"
                      allow-create
                      default-first-option
                      placeholder="Select category"
                    >
                      <el-option
                        v-for="item in categories"
                        :key="item.id"
                        :label="item.name?.ru"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                    <span class="bottom_text">Добавить товар в категорию</span>
                  </div>
                  <div class="form-block mb-0">
                    <div><label>Дочерняя категория</label></div>
                    <el-select
                      v-model="categoryChild.child1.id"
                      allow-create
                      default-first-option
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
                      allow-create
                      :disabled="categoryChild.child2.arr.length < 1"
                      default-first-option
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
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5 18.5L22 22M21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21C16.7467 21 21 16.7467 21 11.5Z"
                        stroke="#181C32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="outline-btn outline-light-green-btn">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5M19.796 7.5V3M19.796 7.5H15.375"
                        stroke="#181C32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
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
                  <div class="outline-btn outline-light-gray-btn mx-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5M19.796 7.5V3M19.796 7.5H15.375"
                        stroke="#181C32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="outline-btn outline-blue-btn">
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
            </div>
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
                          style="min-height: 250px;"
                          :options="editorOption"
                          :value="ruleForm.desc[item.key]"
                          v-model="ruleForm.desc[item.key]"
                        /></div
                    ></el-tab-pane>
                    <el-tab-pane label="Характеристика" name="Character">
                      <ProductCharacterList />
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- Product Variants -->
            <div class="form-container" v-for="element in ruleForm.products">
              <div class="d-flex justify-content-between variant-header">
                <h4 class="variant-title">Вариация №{{ element.id }}</h4>
                <div
                  class="variant-btn variant-btn-delete"
                  @click="deleteVariant(element.id)"
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
                    @change="
                      ($event) => handleChangeVatiant($event, element.id)
                    "
                  >
                    <div v-if="element.imagesData.length < 50">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.2765 17.7765H4.72315C3.34231 17.7765 2.22314 16.6573 2.22314 15.2765V4.72315C2.22314 3.34231 3.34231 2.22314 4.72315 2.22314H15.2765C16.6573 2.22314 17.7765 3.34231 17.7765 4.72315V15.2765C17.7765 16.6573 16.6573 17.7765 15.2765 17.7765Z"
                          fill="#3699FF"
                        />
                        <path
                          d="M2.22314 11.4292C3.44814 11.1117 4.73231 10.9434 6.05648 10.9434C10.6106 10.9434 14.6981 12.94 17.4915 16.105"
                          fill="#3699FF"
                        />
                        <path
                          d="M2.22314 11.4292C3.44814 11.1117 4.73231 10.9434 6.05648 10.9434C10.6106 10.9434 14.6981 12.94 17.4915 16.105"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8753 9.48016C14.1028 9.48016 15.0978 8.48511 15.0978 7.25766C15.0978 6.0302 14.1028 5.03516 12.8753 5.03516C11.6479 5.03516 10.6528 6.0302 10.6528 7.25766C10.6528 8.48511 11.6479 9.48016 12.8753 9.48016Z"
                          fill="white"
                        />
                      </svg>
                      <div class="ant-upload-text">
                        Добавить изображение
                      </div>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%;"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
                <p class="variant-img-text">
                  Изображение товар
                  <span>Первое изображение товара является главной.</span>
                </p>
              </div>
              <div>
                <!-- Validations -->
                <div class="product-variant" v-for="item in element.variations">
                  <div
                    class="product_variant_block"
                    v-if="atributes.length > 0"
                  >
                    <div class="variant-grid-4 w-100">
                      <div
                        class="form-variant-block"
                        v-for="(atribut, index) in atributes"
                      >
                        <div>
                          <label>{{ atribut.name.ru }}</label>
                        </div>
                        <el-select
                          v-model="item.optionName[`at_${atribut.id}`]"
                          allow-create
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
                      </div>
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
                        <div><label>day</label></div>
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
                        <div><label>day</label></div>
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
                        @click="deleteInnerVariant(element.id, item.id)"
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
                <!-- Validations -->
              </div>
              <div class="d-flex justify-content-start">
                <div
                  class="create-inner-variant"
                  @click="addInnerVariant(element.id)"
                >
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8H14"
                      stroke="#3699FF"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.5 2.5V13.5"
                      stroke="#3699FF"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Добавит внутренний варизаци
                </div>
              </div>
            </div>
            <!-- Product Variants -->

            <div>
              <div
                class="add-variant create-inner-variant mt-0"
                @click="addVariant"
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H14"
                    stroke="#3699FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.5 2.5V13.5"
                    stroke="#3699FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Добавит варизаци
              </div>
            </div>
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
                      v-model="ruleForm.status"
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
                        default-first-option
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
            <div class="form-container">
              <div class="form-block mb-0">
                <label for="">Комментарий</label>
              </div>
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <div class="show-mode">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3313 3 18.2398 4.80989 19.796 7.5M19.796 7.5V3M19.796 7.5H15.375"
                    stroke="#3699FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                Показать ещё
              </div>
            </div>
          </div>
          <!-- Product right details -->
        </div>
      </div>
    </div>
    <AddModal
      title="New group"
      name="add_brand_modal"
      btnText="Add Group"
      :callback="getData"
      :loadingBtn="loadingBrand"
    >
      <el-form
        label-position="top"
        :model="brandData"
        :rules="rulesModal"
        ref="atributGroup"
        label-width="120px"
        class="demo-ruleForm"
        action=""
      >
        <div class="form-block required">
          <div><label for="">Brand </label></div>
          <el-form-item prop="character_name">
            <el-input
              placeholder="Product model"
              v-model="brandData.name"
            ></el-input>
          </el-form-item>
        </div>
        <div class="clearfix">
          <a-upload
            list-type="picture-card"
            :file-list="fileListBrand"
            @preview="handlePreview"
            @change="handleChangeBrand"
          >
            <div v-if="fileListBrand.length < 1">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0264 19.999L20.0125 24.999M20.0125 24.999L24.9987 19.999M20.0125 24.999L20.0125 4.99902"
                  stroke="#3699FF"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.5334 15V15C8.40276 15 5.0542 18.3486 5.0542 22.4792L5.0542 26.3333C5.0542 31.1198 8.9344 35 13.7209 35L26.3044 35C31.0909 35 34.9711 31.1198 34.9711 26.3333L34.9711 22.4792C34.9711 18.3486 31.6225 15 27.4919 15V15"
                  stroke="#3699FF"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="ant-upload-text">
                Upload image
              </div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%;" :src="previewImage" />
          </a-modal>
        </div>
      </el-form>
    </AddModal>
  </div>
</template>
<script>
import AddBtn from "../../../components/form/Add-btn.vue";
import FilterBtn from "../../../components/form/Filter-btn.vue";
import TitleBlock from "../../../components/Title-block.vue";
import Title from "../../../components/Title.vue";
import ProductsStatistic from "../../../components/products/Products-statistic.vue";
import ProductCharacterList from "../../../components/products/Product-character-list.vue";
import CommentCard from "../../../components/products/CommentCard.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import AddModal from "../../../components/modals/Add-modal.vue";
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
      title: "Quill Editor",
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Quill Editor",
          active: true,
        },
      ],
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
      option: {
        theme: "bubble",
        modules: {
          toolbar: [
            ["bold", "italic", "link"],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
              "blockquote",
            ],
          ],
        },
      },
      varinatOptions: {},
      atributes: [],
      variantId: "12",
      loadingBrand: false,
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
          value: "active",
          label: "Active",
        },
        {
          value: "disactive",
          label: "Disactive",
        },
      ],
      value: "",
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
        status: "active",
        category_id: "",
        products: [
          {
            id: 1,
            images: [],
            imagesData: [],
            variations: [
              {
                id: 1,
                options: [1],
                optionName: {},
                price: 0,
                is_default: 1,
                is_popular: 0,
                product_of_the_day: 0,
              },
            ],
          },
        ],
      },

      atributVariants: [],
      previewVisible: false,
      previewImage: "",
      variantImages: [{}],
      fileListBrand: [],
      fileList: [],
      brandData: {
        name: "",
        logo: "",
      },
      rulesModal: {
        group_id: [
          {
            required: true,
            message: "Atribut group is required",
            trigger: "change",
          },
        ],
      },
      brands: [],
    };
  },
  mounted() {
    this.__GET_BRANDS();
    this.__GET_CATEGORIES();
  },

  methods: {
    // products
    submitForm(ruleForm) {
      console.log(this.ruleForm);
      this.ruleForm = {
        ...this.ruleForm,
        name: {
          ru: this.ruleForm.name_ru,
          uz: this.ruleForm.name_uz,
          en: this.ruleForm.name_en,
        },
      };
      delete this.ruleForm["name_ru"];
      delete this.ruleForm["name_uz"];
      delete this.ruleForm["name_en"];
      const newData = {
        ...this.ruleForm,
        products: this.ruleForm.products.map((item) => {
          const newVariation = item.variations.map((elem) => {
            return {
              options: elem.options,
              price: elem.price,
              is_default: elem.is_default,
              is_popular: elem.is_popular,
              product_of_the_day: elem.product_of_the_day,
            };
          });
          const newItem = {
            variations: newVariation,
            images: item.images,
          };
          return newItem;
        }),
      };
      this.__POST_PRODUCTS(newData);
      // products: this.ruleForm.products.map((item) => {
      //     const newItem = {
      //       id: item.id,
      //       variations: item.variations,
      //       images: item.images,
      //     };
      //     return newItem;
      //   }),
      // this.ruleForm.products = newData;
      console.log(newData);

      // this.$refs[ruleForm].validate((valid) => {
      //   if (valid) {
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },

    async __POST_PRODUCTS(data) {
      try {
        const products = await this.$store.dispatch(
          "fetchProducts/postProducts",
          data
        );
        this.$router.push("/catalog/products");
        this.$notify({
          title: "Success",
          message: "Продукт успешно добавлен",
          type: "success",
        });
      } catch (e) {
        this.statusFunc(e.response);
      }
    },

    handleChangeVatiant({ fileList }, id) {
      this.variantId = id;
      this.fileList = fileList;
      // this.ruleForm.products.find(
      //   (item) => item.id == id
      // ).imagesData = fileList;
      // this.now(id) = fileList
      // const newImages = [];
      // fileList.forEach((element, index) => {
      //   let formData = new FormData();
      //   formData.append("file", element.originFileObj);
      //   newImages[index] = formData;
      // });
      // this.__UPLOAD_FILE_VARIANT(newImages, this.productId);
      console.log("Upload");
    },

    __UPLOAD_FILE_VARIANT(newImages, id) {
      const currentProduct = this.ruleForm.products.find(
        (item) => item.id == id
      );
      console.log("img data");
      newImages.forEach(async (element, index) => {
        try {
          const data = await this.$store.dispatch(
            "uploadFile/uploadFile",
            element
          );
          currentProduct.images[index] = data.path;
        } catch (e) {
          this.statusFunc(e.response);
        }
      });
      this.loadingBrand = false;
    },
    atributOptions(obj) {
      console.log("this.varinatOptions");
      const product = this.ruleForm.products.find(
        (productId) => productId.id == obj.productId
      );
      product.variations.find((varId) => varId.id == obj.variantId).options[
        obj.index
      ] = product.variations.find(
        (varId) => varId.id == obj.variantId
      ).optionName[`at_${obj.id}`];
      this.value = obj;
      this.ruleForm.products = this.ruleForm.products;
      console.log(this.ruleForm.products);
    },

    getData() {
      this.$refs["atributGroup"].validate((valid) =>
        valid ? this.__POST_BRAND() : false
      );
    },
    show(name) {
      this.$modal.show(name);
    },
    hide(name) {
      this.$modal.hide(name);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    getVariantId(id) {
      console.log(id);
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },

    //variant
    addInnerVariant(variantId) {
      const addVar = this.findVarintWithId(variantId);
      const options = {};
      this.atributes.forEach((elem) => {
        return (options[elem.name] = "");
      });
      addVar.variations.push({
        id: addVar.variations.at(-1).id + 1,
        options: [1],
        price: 0,
        is_default: 0,
        product_of_the_day: 0,
        is_popular: 0,
        optionName: options,
      });
    },
    deleteVariant(variantId) {
      if (this.ruleForm.products.length > 1) {
        this.ruleForm.products = this.ruleForm.products.filter(
          (item) => item.id != variantId
        );
      }
    },
    deleteInnerVariant(variantId, innerVarId) {
      const addVar = this.findVarintWithId(variantId);
      if (addVar.variations.length > 1) {
        addVar.variations = addVar.variations.filter(
          (item) => item.id != innerVarId
        );
      }
    },
    findVarintWithId(variantId) {
      return this.ruleForm.products.find((element) => element.id == variantId);
    },
    addVariant() {
      const options = {};
      this.atributes.forEach((elem) => {
        return (options[elem.name] = "");
      });
      const newInnerVar = [
        {
          id: 1,
          options: [1],
          price: 0,
          is_default: 1,
          product_of_the_day: 0,
          is_popular: 0,
          optionName: options,
        },
      ];
      this.ruleForm.products.push({
        id: this.ruleForm.products.at(-1).id + 1,
        images: [],
        imagesData: [],
        variations: newInnerVar,
      });
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
    },
    // variant

    handleChangeBrand({ fileList }) {
      this.loadingBrand = true;
      this.fileListBrand = fileList;
      let formData = new FormData();
      const newImg = fileList;
      if (newImg.length > 0) {
        formData.append("file", newImg[0].originFileObj);
        this.__UPLOAD_FILE("brandData", formData);
      }
    },
    async __UPLOAD_FILE(item, formData) {
      try {
        const data = await this.$store.dispatch(
          "uploadFile/uploadFile",
          formData
        );
        this[item].logo = data.path;
        this.loadingBrand = false;
      } catch (e) {
        this.statusFunc(e.response);
      }
    },

    handleClick(tab, event) {
      console.log("handlchange", tab, event);
      this.formVal = "";
    },
    onChangeVariants(elementId, varId) {
      console.log(this.ruleForm.products);
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

    async __POST_BRAND() {
      try {
        await this.$store.dispatch("fetchBrands/postBrands", this.brandData);
        this.$notify({
          title: "Success",
          message: "Бранд успешно добавлен",
          type: "success",
        });
        this.hide("add_brand_modal");
        this.__GET_BRANDS();
        this.brandData.name = "";
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_BRANDS() {
      const data = await this.$store.dispatch("fetchBrands/getBrands");
      this.brands = data?.brands.data;
    },
    statusFunc(res) {
      console.log("status");
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
    async __GET_CATEGORIES() {
      const data = await this.$store.dispatch("fetchCategories/getCategories");

      this.categories = data.categories?.data;
      console.log(data.categories?.data);
    },

    // async __GET_ATRIBUTES() {
    //   const data = await this.$store.dispatch("fetchAtributes/getAtributes");
    //   this.atributes = data.attributes?.data;
    // },
  },
  watch: {
    "ruleForm.category_id"(val) {
      const child1 = this.categories.find((item) => item.id == val);
      this.atributes = child1.attributes;
      // console.log(this.atributes);
      this.ruleForm.products.map((item) => {
        item.variations.map((item2) => {
          this.atributes.forEach((elem) => {
            return (item2.optionName[elem.name.ru] = "");
          });
        });
      });
      if (child1.children.length > 0) {
        this.categoryChild.child1.arr = child1.children;
      } else {
        this.categoryChild.child1.arr = [];
        this.categoryChild.child1.id = "";
        this.categoryChild.child2.arr = [];
        this.categoryChild.child2.id = "";
      }
      console.log("atr", this.atributes);
      console.log("cat2", child1);
    },
    "categoryChild.child1.id"(val) {
      const child2 = this.categoryChild.child1.arr.find(
        (item) => item.id == val
      );
      if (child2.attributes) {
        this.atributes = child2.attributes;
        this.ruleForm.products.map((item) => {
          item.variations.map((item2) => {
            this.atributes.forEach((elem) => {
              return (item2.optionName[elem.name.ru] = "");
            });
          });
        });
      }

      if (child2.children.length > 0) {
        this.categoryChild.child2.arr = child2.children;
      } else {
        this.categoryChild.child2.arr = [];
        this.categoryChild.child2.id = "";
      }
      console.log("atributs", this.atributes, child2);
      console.log("cat2", child2);
    },
    variantId(val, val2) {
      this.ruleForm.products.find(
        (item) => item.id == val
      ).imagesData = this.fileList;
      const newImages = [];
      this.fileList.forEach((element, index) => {
        let formData = new FormData();
        formData.append("file", element.originFileObj);
        newImages[index] = formData;
      });
      this.__UPLOAD_FILE_VARIANT(newImages, val);
    },
    fileList(val) {
      this.ruleForm.products.find(
        (item) => item.id == this.variantId
      ).imagesData = this.fileList;
      const newImages = [];
      this.fileList.forEach((element, index) => {
        let formData = new FormData();
        formData.append("file", element.originFileObj);
        newImages[index] = formData;
      });
      this.__UPLOAD_FILE_VARIANT(newImages, this.variantId);
      console.log(this.ruleForm);
    },
  },
  components: {
    FilterBtn,
    Title,
    AddBtn,
    ProductsStatistic,
    ProductCharacterList,
    CommentCard,
    TitleBlock,
    quillEditor,
    AddModal,
  },
};
</script>
<style lang="scss">
.add-product {
  display: grid;
  grid-template-columns: 670px auto;
  grid-gap: 13px;
}
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4rem;
}
.variant_form_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.variant-img {
  .ant-upload-text {
    font-family: "TT Interfaces";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #3699ff;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-info::before {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .ant-upload.ant-upload-select-picture-card {
    background: #f3f6f9;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-eye-o,
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-download,
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-delete {
    color: #000;
  }
  // .anticon {
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   background: rgba(#fff, 0.4);
  //   color: #000;
  //   svg {
  //     width: 16px;
  //     height: 16px;
  //   }
  // }
  // .ant-upload-list-item-actions {
  //   a {
  //     display: none;
  //   }
  //   opacity: 1;
  //   left: auto;
  //   top: 0;
  //   right: -20px;
  //   background: red;
  //   border-radius: 50%;
  //   i {
  //     svg {
  //       display: none;
  //     }
  //     position: relative;
  //     display: flex;
  //     align-items: center;
  //     width: 20px !important;
  //     height: 20px;
  //     margin: 0 !important;
  //     justify-content: center;
  //     &:after {
  //       content: "x";
  //       position: absolute;
  //       top: 8px;
  //     }
  //   }
  // }
}
</style>
