<template lang="html">
  <div class="toolbar">
    <el-container
      style="height: 500px; border: 1px solid #eee;"
      :class="{ collapsedСontrol: collapsed }"
    >
      <div class="toolbar-aside">
        <div class="toolbar-logo">
          <img src="../assets/svg/custom/toolbar/default-dark.svg" alt="" />
          <div
            class="sidebar_toggle"
            @click="collapsedToggle"
            v-html="icons.toolbarResIcon"
          ></div>
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
                <span class="menu-icon" v-html="icons.catalogIcon"></span>
                <p>Каталог</p>
              </div>
              <el-menu-item-group
                v-for="(items, index) in toolbarMenu.category"
                class="toolbar-menu-products"
                :class="{ disabled: items.disabled }"
                :key="index"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" class="home_menu">
              <div slot="title">
                <span class="menu-icon" v-html="icons.orderIcon"> </span>
                <p>Заказы</p>
              </div>
              <el-menu-item-group
                v-for="(items, index) in toolbarMenu.orders"
                class="toolbar-menu-products"
                :key="index"
                :class="{ disabled: items.disabled }"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" class="home_menu">
              <div slot="title">
                <span v-html="icons.marketingIcon" class="menu-icon"> </span>
                <p>Маркетинг</p>
              </div>
              <el-menu-item-group
                class="toolbar-menu-products"
                v-for="(items, index) in toolbarMenu.marketing"
                :key="index"
                :class="{ disabled: items.disabled }"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item-group class="home_menu toolbar-menu-products">
              <nuxt-link to="/home/customer">
                <el-menu-item index="40">
                  <span class="menu-icon" v-html="icons.customerIcon"> </span>
                  <p class="not-ul-menu">Клиенты</p></el-menu-item
                >
              </nuxt-link>
            </el-menu-item-group>
            <el-submenu index="5" class="home_menu">
              <div slot="title">
                <span class="menu-icon" v-html="icons.contentIcon"> </span>
                <p>Контент сайта</p>
              </div>
              <el-menu-item-group
                class="toolbar-menu-products"
                v-for="(items, index) in toolbarMenu.content"
                :key="index"
                :class="{ disabled: items.disabled }"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" class="home_menu">
              <div slot="title">
                <span class="menu-icon" v-html="icons.settingsIcon"> </span>
                <p>настройки</p>
              </div>
              <el-menu-item-group
                class="toolbar-menu-products"
                v-for="(items, index) in toolbarMenu.settings"
                :key="index"
                :class="{ disabled: items.disabled }"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item-group class="home_menu toolbar-menu-products">
              <nuxt-link to="/home/content-manager">
                <el-menu-item index="70">
                  <span
                    class="menu-icon"
                    v-html="icons.contentManagerIcon"
                  ></span>
                  <p class="not-ul-menu">
                    Контент-менеджеры
                  </p></el-menu-item
                >
              </nuxt-link>
            </el-menu-item-group>
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
            <div class="block d-flex align-items-center">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link d-flex">
                  <el-avatar
                    shape="circle"
                    size="medium"
                    :src="squareUrl"
                  ></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">Log Out</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <div class="toolbar-inner">
          <Nuxt />
        </div>
      </el-container>
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
      defaultOpens: [],
      icons: {
        catalogIcon: require("../assets/svg/custom/toolbar/eCommersSvg.svg?raw"),
        orderIcon: require("../assets/svg/custom/toolbar/orderIcon.svg?raw"),
        marketingIcon: require("../assets/svg/custom/toolbar/marketingIcon.svg?raw"),
        customerIcon: require("../assets/svg/custom/toolbar/customerIcon.svg?raw"),
        contentIcon: require("../assets/svg/custom/toolbar/contentIcon.svg?raw"),
        settingsIcon: require("../assets/svg/custom/toolbar/settingsIcon.svg?raw"),
        contentManagerIcon: require("../assets/svg/custom/toolbar/contentManagerIcon.svg?raw"),
        toolbarResIcon: require("../assets/svg/custom/toolbar/toolbarResIcon.svg?raw"),
      },
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      toolbarMenu: {
        category: [
          {
            name: "Продукты",
            index: "11",
            to: "/catalog/products",
            path: "catalog-products",
            disabled: false,
          },
          {
            name: "Категории",
            index: "12",
            to: "/catalog/categories",
            path: "catalog-categories",
            disabled: false,
          },
          {
            name: "Атрибуты",
            index: "13",
            to: "/catalog/atributs",
            path: "catalog-atributs",

            disabled: false,
          },
          {
            name: "Характеристика",
            index: "14",
            to: "/catalog/characteristic",
            path: "catalog-characteristic",
            disabled: false,
          },
          {
            name: "Бренды",
            index: "15",
            to: "/catalog/brands",
            path: "catalog-brands",

            disabled: false,
          },
          {
            name: "Группа характеристика",
            index: "16",
            to: "/catalog/characteristic_groups",
            path: "catalog-characteristic_groups",
            disabled: false,
          },
        ],
        orders: [
          {
            name: "Все заказы (0)",
            index: "21",
            to: "/orders/all-orders",
            path: "orders-all-orders",

            disabled: false,
          },
          {
            name: "Новые заказы (0)",
            index: "22",
            to: "/orders/new-orders",
            path: "orders-new-orders",

            disabled: false,
          },
          {
            name: "Принятые заказы (0)",
            index: "23",
            to: "/orders/accepted-orders",
            path: "orders-accepted-orders",

            disabled: false,
          },
          {
            name: "Готовые в отправке (0)",
            index: "24",
            to: "/orders/ready-orders",
            path: "orders-ready-orders",

            disabled: false,
          },
          {
            name: "В доставке (0)",
            index: "25",
            to: "/orders/delivery-orders",
            path: "orders-delivery-orders",

            disabled: false,
          },
          {
            name: "Возврат (0)",
            index: "26",
            to: "/orders/return-orders",
            path: "orders-return-orders",

            disabled: false,
          },
          {
            name: "Доставленные (0)",
            index: "27",
            to: "/orders/delivered-orders",
            path: "orders-delivered-orders",

            disabled: false,
          },
          {
            name: "Отмененные (0)",
            index: "28",
            to: "/orders/canceled-orders",
            path: "orders-canceled-orders",
            disabled: false,
          },
        ],
        marketing: [
          {
            name: "Скидки",
            index: "31",
            to: "/inbox/sms",
            path: "inbox-sms",
            disabled: true,
          },
          {
            name: "По Email",
            index: "32",
            to: "/inbox/email",
            path: "inbox-email",

            disabled: false,
          },
          {
            name: "По SMS",
            index: "33",
            to: "/inbox/sms",
            path: "inbox-sms",

            disabled: false,
          },
        ],
        content: [
          {
            name: "Блог",
            index: "51",
            to: "/contents/blog",
            path: "contents-blog",
            disabled: false,
          },
          {
            name: "Баннеры",
            index: "52",
            to: "/contents/banners",
            path: "contents-banners",

            disabled: false,
          },
          {
            name: "Комментарии",
            index: "53",
            to: "/contents/comments",
            disabled: false,
          },
          {
            name: "Отзывы",
            index: "54",
            to: "/contents/banners2",
            path: "contents-banners2",

            disabled: true,
          },
          {
            name: "Вопрос и ответы",
            index: "55",
            to: "/contents/faq",
            path: "contents-faq",

            disabled: false,
          },
          {
            name: "Категории (Faqs)",
            index: "56",
            to: "/contents/faq_categories",
            path: "contents-faq_categories",

            disabled: false,
          },
        ],
        settings: [
          {
            name: "Переводы",
            index: "61",
            to: "/contents/blog2",
            path: "contents-blog2",
            disabled: true,
          },
          {
            name: "Справочник",
            index: "62",
            to: "/contents/banners2",
            path: "contents-banners2",

            disabled: true,
          },
          {
            name: "Общие данные",
            index: "63",
            to: "/contents/comments2",
            path: "contents-comments2",

            disabled: true,
          },
          {
            name: "Пользователи",
            index: "64",
            to: "/contents/banners2",
            path: "contents-banners2",
            disabled: true,
          },
        ],
      },
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
    this.activeOpens();
    this.checkToolbar(this.$route.name);

  },

  methods: {
    takeChange(e) {
      console.log(e);
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$auth.logout("local");
          break;
      }
    },
    activeOpens() {
      const routerName = this.$route.name;
      if (routerName.includes("catalog")) {
        this.defaultOpens = ["1"];
      } else if (routerName.includes("orders")) {
        this.defaultOpens = ["2"];
      } else if (routerName.includes("inbox")) {
        this.defaultOpens = ["3"];
      } else if (routerName.includes("contents")) {
        this.defaultOpens = ["5"];
      } else if (routerName.includes("contents")) {
        this.defaultOpens = ["5"];
      } else if (routerName.includes("settings")) {
        this.defaultOpens = ["6"];
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapsedToggle() {
      this.collapsed = !this.collapsed;
    },
    checkToolbar(newVal) {
      const toolBarNames = Object.keys(this.toolbarMenu);
      toolBarNames.forEach((elem) => {
        this.toolbarMenu[elem].forEach((item) => {
          switch (newVal) {
            case item.path:
              this.activeRouterName = item.index;
              break;
          }
        });
      });
    },
  },
  watch: {
    routerName(oldVal, newVal) {
      if (oldVal !== newVal) {
        if (oldVal.includes("catalog")) {
          this.defaultOpens = ["1"];
        } else if (oldVal.includes("orders")) {
          this.defaultOpens = ["2"];
        } else if (oldVal.includes("inbox")) {
          this.defaultOpens = ["3"];
        } else if (oldVal.includes("contents")) {
          this.defaultOpens = ["5"];
        } else if (oldVal.includes("contents")) {
          this.defaultOpens = ["5"];
        } else if (oldVal.includes("settings")) {
          this.defaultOpens = ["6"];
        }
      }
      this.checkToolbar(oldVal);
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
