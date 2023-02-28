<template lang="html">
  <div class="toolbar">
    <el-container
      style="height: 500px; border: 1px solid #eee;"
      :class="{ collapsedСontrol: collapsed }"
    >
      <div class="toolbar-aside">
        <div class="toolbar-logo">
          <img src="../assets/svg/custom/toolbar/default-dark.svg" alt="" />
          <div class="sidebar_toggle" @click="collapsedToggle">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                fill="currentColor"
              ></path>
              <path
                d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
          <el-menu
            @open="handleOpen"
            @close="handleClose"
            :default-active="activeRouterName"
            :default-openeds="defaultOpens"
            ref="mainMenu"
          >
            <el-submenu index="1" class="home_menu">
              <div slot="title">
                <span>
                  <svg
                    class="menu-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <p>Каталог</p>
              </div>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/catalog/products">
                  <el-menu-item
                    index="1-1"
                    :class="{
                      'is-active': $route.name == 'catalog-products',
                    }"
                  >
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Продукты</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <el-menu-item
                  index="12"
                  @click="$router.push('/catalog/categories')"
                  :class="{
                    'is-active': $route.name == 'catalog-categories',
                  }"
                >
                  <span class="menu-bullet"
                    ><span class="bullet-dot"></span
                  ></span>
                  <p>Категории</p></el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/catalog/atributs">
                  <el-menu-item
                    index="1-3"
                    :class="{
                      'is-active': $route.name == 'catalog-atributs',
                    }"
                  >
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Атрибуты</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/catalog/characteristic">
                  <el-menu-item
                    index="1-4"
                    :class="{
                      'is-active': $route.name == 'catalog-characteristic',
                    }"
                  >
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Характеристика</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/catalog/characteristic">
                  <el-menu-item index="1-5">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Бренды</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" class="home_menu">
              <div slot="title">
                <span>
                  <svg
                    class="menu-icon"
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
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.3"
                        d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </span>
                <p>Заказы</p>
              </div>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/all-orders">
                  <el-menu-item index="21">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Все заказы</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/new-orders">
                  <el-menu-item index="22">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Новые заказы (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/accepted-orders">
                  <el-menu-item index="23">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Принятые заказы (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/ready-orders">
                  <el-menu-item index="24">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Готовые в отправке (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/delivery-orders">
                  <el-menu-item index="25">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>В доставке (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/return-orders">
                  <el-menu-item index="26">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Возврат (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/delivered-orders">
                  <el-menu-item index="27">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Доставленные (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/orders/canceled-orders">
                  <el-menu-item index="28">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Отмененные (0)</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" class="home_menu">
              <div slot="title">
                <span>
                  <svg
                    class="menu-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <p>Маркетинг</p>
              </div>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/inbox/sms">
                  <el-menu-item index="31">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Скидки</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/inbox/email">
                  <el-menu-item index="32">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>По Email</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/inbox/sms">
                  <el-menu-item index="33">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>По SMS</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item-group class="home_menu toolbar-menu-products">
              <nuxt-link to="/home/customer">
                <el-menu-item index="40">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z"
                        fill="currentColor"
                      ></path>
                      <rect
                        opacity="0.3"
                        x="8"
                        y="3"
                        width="8"
                        height="8"
                        rx="4"
                        fill="currentColor"
                      ></rect>
                    </svg>
                  </span>
                  <p  class="mx-2 not-ul-menu">Клиенты</p></el-menu-item
                >
              </nuxt-link>
            </el-menu-item-group>
            <el-submenu index="5" class="home_menu">
              <div slot="title">
                <span>
                  <svg
                    width="24"
                    class="menu-icon"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                      fill="currentColor"
                    ></path>
                    <rect
                      x="6"
                      y="12"
                      width="7"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="6"
                      y="7"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                  </svg>
                </span>
                <p>Контент сайта</p>
              </div>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/contents/blog">
                  <el-menu-item index="51">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Блог</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/contents/banners">
                  <el-menu-item index="52">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Баннеры</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products">
                <nuxt-link to="/contents/comments">
                  <el-menu-item index="53">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Вопрос и ответы</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/contents/comments">
                  <el-menu-item index="54">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Отзывы</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" class="home_menu">
              <div slot="title">
                <span>
                  <svg
                    width="24"
                    class="menu-icon"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                      fill="currentColor"
                    ></path>
                    <rect
                      x="6"
                      y="12"
                      width="7"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="6"
                      y="7"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                  </svg>
                </span>
                <p>настройки</p>
              </div>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/contents/blog">
                  <el-menu-item index="61">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Переводы</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/contents/banners">
                  <el-menu-item index="62">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Справочник</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/contents/comments">
                  <el-menu-item index="63">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Общие данные</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
              <el-menu-item-group class="toolbar-menu-products disabled">
                <nuxt-link to="/contents/comments">
                  <el-menu-item index="64">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Пользователи</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <div class="toolbar-setting pt-05r pr-15r pl-15r pb-15r">
          <a href="">
            Docs & Components
          </a>
        </div>
      </div>
      <el-container class="toolbar-right">
        <el-header
          style="text-align: right; font-size: 12px;"
          class="d-flex justify-content-between"
        >
          <div><div class="header-btn"></div></div>
          <div class="d-flex align-items-center">
            <!-- <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px;"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <div
              class="block d-flex align-items-center"
              @click="$auth.logout('local')"
            >
              <el-avatar
                shape="circle"
                size="medium"
                :src="squareUrl"
              ></el-avatar>
            </div>
          </div>
        </el-header>
        <div class="toolbar-inner">
          <Nuxt />
        </div>
      </el-container>
      <AddModal
        title="New group"
        name="add_atribute_group"
        btnText="Add Group"
        :callback="getData"
      >
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
            <div><label for="">Group </label></div>
            <el-form-item prop="character_name">
              <el-input placeholder="Product model"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </AddModal>
    </el-container>
  </div>
</template>
<script>
import FormTitle from "../components/Form-title.vue";
import AddModal from "../components/modals/Add-modal.vue";

export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };
    return {
      activeRouterName: "",
      tableData: Array(20).fill(item),
      sidebarToggle: true,
      collapsed: false,
      defaultOpens: ["1", "1-2"],
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.handleOpen();
    this.handleClose();
  },
  methods: {
    takeChange(e) {
      console.log(e);
    },
    getData() {
      console.log("dadasdaadas");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapsedToggle() {
      this.collapsed = !this.collapsed;
      // const modalContainer = document.querySelector(".vm--container");
      // if (!this.collapsed) {
      //   modalContainer.style.paddingLeft = "265px";
      // } else {
      //   modalContainer.style.paddingLeft = "75px";
      // }
    },
    checkToolbar() {
      switch (this.$route.name) {
        case "orders-all-orders":
          this.activeRouterName = "21";

          break;
        case "orders-new-orders":
          this.activeRouterName = "22";
          // this.defaultOpens = ["2"];
          break;
      }
    },
    logout() {
      localStorage.removeItem("Auth");
      this.$router.push("/");
    },
  },
  watch: {
    routerName(oldVal, newVal) {
      if (oldVal !== newVal) {
        switch (oldVal) {
          case "catalog-products":
            this.defaultOpens = ["1", "1-1", "1-1-1"];
            break;
          case "orders-all-orders":
            this.activeRouterName = "21";
            break;
          case "orders-new-orders":
            this.activeRouterName = "22";
            break;
          case "orders-accepted-orders":
            this.activeRouterName = "23";
            break;
          case "orders-ready-orders":
            this.activeRouterName = "24";
            break;
          case "orders-delivery-orders":
            this.activeRouterName = "25";
            break;
          case "orders-return-orders":
            this.activeRouterName = "26";
            break;
          case "orders-delivered-orders":
            this.activeRouterName = "27";
            break;
          case "orders-canceled-orders":
            this.activeRouterName = "28";
            break;
        }
      }
    },
  },
  components: { FormTitle, AddModal },
};
</script>
<style>
.disabled {
  color: red !important;
  background: rgba(255, 0, 0, 0.02);
  pointer-events: none !important;
}
</style>
