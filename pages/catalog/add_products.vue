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
        <div class="add-btn add-header-btn add-header-btn-padding btn-primary">
          <span class="svg-icon"
            ><!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Files/File-plus.svg--><svg
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
            ><!--end::Svg Icon--></span
          >
          Add Product
        </div>
      </div>
    </TitleBlock>
    <div class="container_xl">
      <div class="card_block-form py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header card_tabs_padding"
        >
          <!-- <Title title="Product edit" />
          <AddBtn name="Save" :icon="false" :callback="toAddProduct" /> -->
        </div>
        <div class="products-from-grid">
          <div class="products-select-grid">
            <el-tabs
              class="form_tabs"
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
                v-for="item in lang"
                :label="item.key"
                :name="item.key"
              >
                <div class="form-container form-container-ltr">
                  <div class="d-flex justify-content-start">
                    <FormTitle title="Product edit" />
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
                      <div><label for="">Name</label></div>
                      <el-form-item prop="nbm">
                        <el-input
                          v-model="ruleForm.nbm"
                          placeholder="Product model"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="products-input-grid-3">
                      <div class="form-block">
                        <div><label for="">Model</label></div>
                        <el-form-item prop="nbm">
                          <el-input
                            v-model="ruleForm.nbm"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block">
                        <div><label for="">Name</label></div>
                        <el-form-item prop="nbm">
                          <el-input
                            v-model="ruleForm.nbm"
                            placeholder="Product model"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-block">
                        <div><label for="">Code</label></div>
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
                <FormTitle title="Product details" />
              </div>
              <div class="d-flex align-items-end">
                <div class="products-input-grid-3 w-100">
                  <div class="form-block mb-0">
                    <div><label>Category</label></div>
                    <el-select
                      v-model="value"
                      allow-create
                      default-first-option
                      placeholder="Select category"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <span class="bottom_text">Add product to a category</span>
                  </div>
                  <div class="form-block mb-0">
                    <div><label>Post category</label></div>
                    <el-select
                      v-model="value"
                      allow-create
                      default-first-option
                      placeholder="Select post category"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <span class="bottom_text">Add product to a category</span>
                  </div>
                  <div class="form-block mb-0">
                    <div><label>Last category</label></div>
                    <el-select
                      v-model="value"
                      allow-create
                      default-first-option
                      placeholder="Select last category"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <span class="bottom_text">Add product to a category</span>
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
                v-for="item in lang"
                :label="item.key"
                :name="item.key"
              >
                <div class="form-container form-container-ltr">
                  <div class="d-flex justify-content-start">
                    <FormTitle title="Product info" />
                  </div>
                  <el-tabs
                    class="desc_tab"
                    v-model="activeDesc"
                    @tab-click="handleClick"
                  >
                    <el-tab-pane label="Description" name="Description">
                      <Editor editorClass="product-editor mt-1"
                    /></el-tab-pane>
                    <el-tab-pane label="Character" name="Character">
                      <ProductCharacterList />
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="form-container" v-for="element in productVariant">
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
                    :file-list="fileList"
                    :multiple="true"
                    @preview="handlePreview"
                    @change="handleChange"
                  >
                    <div v-if="fileList.length < 50">
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
                </div>
                <p class="variant-img-text">
                  Изображение товар
                  <span>Первое изображение товара является главной.</span>
                </p>
              </div>
              <div>
                <div
                  class="product-variant"
                  v-for="item in element.innerVariants"
                >
                  <div class="d-flex w-100 align-items-end">
                    <div class="variant-grid-4 w-100">
                      <div class="form-variant-block">
                        <div><label>Цвета</label></div>
                        <el-select
                          v-model="value"
                          allow-create
                          class="w-100"
                          default-first-option
                          placeholder="265 gb"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="form-variant-block">
                        <div><label>Цвета</label></div>
                        <el-select
                          v-model="value"
                          allow-create
                          class="w-100"
                          default-first-option
                          placeholder="265 gb"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="form-variant-block">
                        <div><label>Цвета</label></div>
                        <el-select
                          v-model="value"
                          allow-create
                          class="w-100"
                          default-first-option
                          placeholder="265 gb"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="form-variant-block">
                        <div><label>Цвета</label></div>
                        <el-select
                          v-model="value"
                          allow-create
                          class="w-100"
                          default-first-option
                          placeholder="265 gb"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="d-flex mb-1">
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
                        @click="onChangeVariants(item.id)"
                      >
                        <a-radio
                          :checked="atributVariants.includes(item.id)"
                        ></a-radio>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <div><label for="status">Status</label></div>
                  <el-form-item>
                    <el-select
                      id="status"
                      class="w-100"
                      v-model="value"
                      allow-create
                      default-first-option
                      placeholder="Product name"
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
                  <span class="bottom_text">Set the product status</span>
                </div>
                <div class="form-block mb-0">
                  <div><label for="">Brand</label></div>
                  <div class="product-plus-btn">
                    <el-form-item prop="nbm">
                      <el-input
                        v-model="ruleForm.nbm"
                        placeholder="Product model"
                      ></el-input>
                    </el-form-item>
                    <div class="outline-btn outline-light-blue-btn mt-1">
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
                  <div class="bottom_text">Set the product status</div>
                </div>
              </el-form>
            </div>
            <div class="form-container">
              <ProductsStatistic />
            </div>
            <div class="form-container">
              <div class="form-block mb-0">
                <label for="">Comment</label>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import Editor from "../../components/form/editor.vue";
import FilterBtn from "../../components/form/Filter-btn.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";
import ProductsStatistic from "../../components/products/Products-statistic.vue";
import ProductCharacterList from "../../components/products/Product-character-list.vue";
import CommentCard from "../../components/products/CommentCard.vue";
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
      activeName: "Русский",
      activeDesc: "Description",
      searchBlock: false,
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
      ruleForm: {
        nbm: "",
      },

      productVariant: [
        {
          id: 1,
          innerVariants: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
      ],
      atributVariants: [],
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
    };
  },
  mounted() {
    // const imgText = document.querySelector(".ant-upload-text");
    // imgText.innerHTML = "Добавить изображение";
    this.$store.dispatch("fetchCharacters/getCharacters");
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleClick(tab, event) {
      console.log("handlchange", tab, event);
      this.formVal = "";
    },
    onChangeVariants(checked) {
      this.atributVariants.includes(checked)
        ? (this.atributVariants = this.atributVariants.filter(
            (item) => item != checked
          ))
        : this.atributVariants.push(checked);
    },
    addInnerVariant(variantId) {
      const addVar = this.findVarintWithId(variantId);
      addVar.innerVariants.push({ id: addVar.innerVariants.at(-1).id + 1 });
    },
    deleteVariant(variantId) {
      if (this.productVariant.length > 1) {
        this.productVariant = this.productVariant.filter(
          (item) => item.id != variantId
        );
      }
    },
    deleteInnerVariant(variantId, innerVarId) {
      const addVar = this.findVarintWithId(variantId);
      if (addVar.innerVariants.length > 1) {
        addVar.innerVariants = addVar.innerVariants.filter(
          (item) => item.id != innerVarId
        );
      }
    },
    findVarintWithId(variantId) {
      return this.productVariant.find((element) => element.id == variantId);
    },
    addVariant() {
      const newInnerVar = [
        {
          id: 1,
        },
      ];
      this.productVariant.push({
        id: this.productVariant.at(-1).id + 1,
        innerVariants: newInnerVar,
      });
    },
    toAddProduct() {
      this.$router.push("/catalog/add_products");
    },
  },
  components: {
    Editor,
    FilterBtn,
    Title,
    AddBtn,
    ProductsStatistic,
    ProductCharacterList,
    CommentCard,
    TitleBlock,
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
  .ant-upload.ant-upload-select-picture-card {
    background: #f3f6f9;
  }
  .anticon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(#fff, 0.4);
    svg {
      width: 16px;
      height: 16px;
    }
  }
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
