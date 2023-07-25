<template lang="html">
  <div class="toolbar">
    <el-container
      style="height: 500px; border: 1px solid #eee"
      :class="{ collapsedСontrol: collapsed }"
    >
      <div class="toolbar-aside">
        <div class="toolbar-logo">
          <div class="d-flex">
            <!-- <span v-html="icons.logoIcon"></span> -->
            <h3>Admin panel</h3>
          </div>
          <div
            class="sidebar_toggle"
            @click="collapsedToggle"
            v-html="icons.toolbarResIcon"
          ></div>
        </div>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
                <nuxt-link
                  :to="items.to"
                  :class="{ 'event-none': items.to == $route.path }"
                >
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"><span class="bullet-dot"></span></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8" class="home_menu">
              <div slot="title">
                <span class="menu-icon" v-html="icons.orderIcon"> </span>
                <p>Витрины</p>
              </div>
              <el-menu-item-group
                v-for="(items, index) in toolbarMenu.showcases"
                class="toolbar-menu-products"
                :key="index"
                :class="{ disabled: items.disabled }"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"><span class="bullet-dot"></span></span>
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
                    <span class="menu-bullet"><span class="bullet-dot"></span></span>
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
                    <span class="menu-bullet"><span class="bullet-dot"></span></span>
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
                    <span class="menu-bullet"><span class="bullet-dot"></span></span>
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

              <el-submenu
                index="7"
                v-for="(items, index) in toolbarMenu.settings"
                v-if="items.submenu"
                :key="index"
              >
                <template slot="title">{{ items.name }}</template>
                <el-menu-item-group
                  class="toolbar-menu-products"
                  v-for="(itemsIn, index) in items.data"
                  :key="index"
                  :class="{ disabled: items.disabled }"
                  v-if="items.data"
                >
                  <nuxt-link :to="itemsIn.to" class="sub_menu">
                    <el-menu-item
                      :index="itemsIn.index"
                      :class="{ 'is-active': itemsIn.to == $route.path }"
                    >
                      <span class="menu-bullet"><span class="bullet-dot"></span></span>
                      <p>{{ itemsIn.name }}</p></el-menu-item
                    >
                  </nuxt-link>
                </el-menu-item-group>
              </el-submenu>

              <el-menu-item-group
                class="toolbar-menu-products"
                v-for="(items, index) in toolbarMenu.settings"
                :key="index"
                :class="{ disabled: items.disabled }"
                v-if="!items.submenu"
              >
                <nuxt-link :to="items.to">
                  <el-menu-item :index="items.index">
                    <span class="menu-bullet"><span class="bullet-dot"></span></span>
                    <p>{{ items.name }}</p></el-menu-item
                  >
                </nuxt-link>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item-group class="home_menu toolbar-menu-products">
              <nuxt-link to="/home/content-manager">
                <el-menu-item index="70">
                  <span class="menu-icon" v-html="icons.contentManagerIcon"></span>
                  <p class="not-ul-menu">Контент-менеджеры</p></el-menu-item
                >
              </nuxt-link>
            </el-menu-item-group>
          </el-menu>
        </el-aside>
        <div class="toolbar-setting pt-05r pr-15r pl-15r pb-15r">
          <a href=""> Docs & Components </a>
        </div>
      </div>
      <el-container class="toolbar-right">
        <el-header
          style="text-align: right; font-size: 12px"
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
                    alt="avatar"
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
        logoIcon: require("../assets/svg/custom/toolbar/home24-logo.svg?raw"),
      },
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
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
            to: "/catalog/characteristic_groups",
            path: "catalog-characteristic_groups",
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
            name: "Значки",
            index: "16",
            to: "/catalog/badges",
            path: "catalog-badges",
            disabled: false,
          },
        ],
        showcases: [],
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
          {
            name: "Заявки",
            index: "29",
            to: "/orders/applications",
            path: "orders-applications",
            disabled: false,
          },
        ],
        marketing: [
          {
            name: "Скидки",
            index: "31",
            to: "/inbox/discount",
            path: "inbox-discount",
            disabled: false,
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
          {
            name: "Aкции",
            index: "34",
            to: "/inbox/promotions",
            path: "inbox-promotions",
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
            name: "Категории (F.A.Q)",
            index: "56",
            to: "/contents/faq_categories",
            path: "contents-faq_categories",
            disabled: false,
          },
          {
            name: "Отзывы",
            index: "57",
            to: "/contents/feedbacks",
            path: "contents-feedbacks",
            disabled: false,
          },
          {
            name: "Топ меню",
            index: "58",
            to: "/contents/top-menu",
            path: "contents-top-menu",
            disabled: false,
          },
        ],
        settings: [
          {
            name: "Характеристика",
            disabled: false,
            submenu: true,
            data: [
              {
                index: "71",
                name: "Параметры",
                to: "/settings/characteristics/options",
                path: "settings-characteristics-options",
                disabled: false,
              },
            ],
          },
          {
            name: "Переводы",
            index: "62",
            to: "/settings/translations",
            path: "settings-translations",
            disabled: true,
          },
          {
            name: "Справочник",
            index: "63",
            to: "/settings/banners2",
            path: "settings-banners2",

            disabled: true,
          },
          {
            name: "Общие данные",
            index: "64",
            to: "/settings/comments2",
            path: "settings-comments2",

            disabled: true,
          },
          {
            name: "Пользователи",
            index: "65",
            to: "/settings/banners2",
            path: "settings-banners2",
            disabled: true,
          },
          {
            name: "Регионы",
            index: "66",
            to: "/settings/regions",
            path: "settings-regions",
            disabled: false,
          },
          {
            name: "Di Coin и Барабан",
            index: "67",
            to: "/settings/d-coin",
            path: "settings-d-coin",
            disabled: false,
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
  async mounted() {
    await this.$store.dispatch("getShowCasesStore");
    this.toolbarMenu.showcases = [];
    this.$store.state.showcases.forEach((elem, index) => {
      this.toolbarMenu.showcases.push({
        name: elem?.name?.ru,
        index: `${81 + index}`,
        to: `/showcases/case/${elem.id}`,
        path: `showcases-case-${elem.id}`,
        disabled: false,
      });
    });
    this.handleOpen();
    this.handleClose();
    this.activeOpens();
    this.checkToolbar(this.$route.path);
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
      } else if (routerName.includes("charactristic")) {
        this.defaultOpens = ["6", "7"];
      } else if (routerName.includes("showcases")) {
        this.defaultOpens = ["8"];
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
      console.log(newVal);
      const toolBarNames = Object.keys(this.toolbarMenu);
      toolBarNames.forEach((elem) => {
        this.toolbarMenu[elem].forEach((item) => {
          switch (newVal) {
            case item.to:
              this.activeRouterName = item.index;
              break;
          }
        });
      });
    },
  },
  watch: {
    "$store.state.changeShowcases"(val) {
      this.toolbarMenu.showcases = [];
      this.$store.state.showcases.forEach((elem, index) => {
        this.toolbarMenu.showcases.push({
          name: elem?.name?.ru,
          index: `${81 + index}`,
          to: `/showcases/case/${elem.id}`,
          path: `showcases-case-${elem.id}`,
          disabled: false,
        });
      });
    },
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
        } else if (oldVal.includes("charactristic")) {
          this.defaultOpens = ["6", "7"];
        } else if (oldVal.includes("showcases")) {
          this.defaultOpens = ["8"];
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
.event-none {
  pointer-events: none;
}
</style>
