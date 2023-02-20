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
          <el-menu :default-openeds="defaultOpens">
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
                <p>eCommerce</p>
              </div>
              <!-- <el-menu-item-group>
                <div slot="title">Group 1</div>
              </el-menu-item-group> -->
              <el-submenu index="1-1" class="sub_menu">
                <div slot="title">
                  <p class="d-flex">
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span></span
                    >Catalog
                  </p>
                </div>
                <el-menu-item-group class="toolbar-menu-products">
                  <nuxt-link to="/catalog/products">
                    <el-menu-item
                      index="1-1-1"
                      :class="{
                        'is-active': $route.name == 'catalog-products',
                      }"
                    >
                      <span class="menu-bullet"
                        ><span class="bullet-dot"></span
                      ></span>
                      <p>Products</p></el-menu-item
                    >
                  </nuxt-link>
                </el-menu-item-group>
                <el-menu-item-group class="toolbar-menu-products">
                  <el-menu-item
                    index="1-1-2"
                    @click="$router.push('/catalog/categories')"
                    :class="{
                      'is-active': $route.name == 'catalog-categories',
                    }"
                  >
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span
                    ></span>
                    <p>Categories</p></el-menu-item
                  >
                </el-menu-item-group>
                <el-menu-item-group class="toolbar-menu-products">
                  <nuxt-link to="/catalog/atributs">
                    <el-menu-item
                      index="1-1-3"
                      :class="{
                        'is-active': $route.name == 'catalog-atributs',
                      }"
                    >
                      <span class="menu-bullet"
                        ><span class="bullet-dot"></span
                      ></span>
                      <p>Atributs</p></el-menu-item
                    >
                  </nuxt-link>
                </el-menu-item-group>
                <el-menu-item-group class="toolbar-menu-products">
                  <nuxt-link to="/catalog/characteristic">
                    <el-menu-item
                      index="1-1-4"
                      :class="{
                        'is-active': $route.name == 'catalog-characteristic',
                      }"
                    >
                      <span class="menu-bullet"
                        ><span class="bullet-dot"></span
                      ></span>
                      <p>Characteristic</p></el-menu-item
                    >
                  </nuxt-link>
                </el-menu-item-group>
                <!-- <el-menu-item-group class="toolbar-menu-products">
                  <el-menu-item
                    index="1-1-2"
                    @click="$router.push('/products/add_products')"
                  >
                    <span class="menu-bullet"
                      ><span class="bullet-dot"></span></span
                    >Add Product</el-menu-item
                  >
                </el-menu-item-group> -->
              </el-submenu>
              <!-- <el-menu-item-group title="Group 2">
                <el-menu-item index="1-3">Option 3</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-submenu index="1-4"  class="sub_menu">
                <div slot="title"> <span class="menu-bullet"
                    ><span class="bullet-dot"></span
                  ></span>Categories</div>
                <el-menu-item
                  index="1-4-1"
                  @click="$router.push('/products/products')"
                  >Categories</el-menu-item
                >
              </el-submenu> -->
            </el-submenu>
            <el-submenu index="2" class="home_menu">
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
                    ></path></svg
                ></span>
                <p>Navigator Two</p>
              </div>
              <el-menu-item-group class="toolbar-menu-products">
                <div slot="title">Group 1</div>
                <el-menu-item index="2-1">Option 1</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2" class="toolbar-menu-products">
                <el-menu-item index="2-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4" class="home_menu">
                <div slot="title">Option 4</div>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-submenu>
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
          <div><div class="header-btn">Products</div></div>
          <div class="d-flex align-items-center">
            <!-- <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px;"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <div class="block d-flex align-items-center" @click="logout">
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
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };
    return {
      tableData: Array(20).fill(item),
      sidebarToggle: true,
      collapsed: false,
      defaultOpens: ["1", "1-1", "1-1-1"],
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
    this.checkToolbar();
  },
  methods: {
    takeChange(e) {
      console.log(e);
    },
    collapsedToggle() {
      this.collapsed = !this.collapsed;
    },
    checkToolbar() {
      switch (this.$route.name) {
        case "catalog-products":
          this.defaultOpens = ["1", "1-1"];
          break;
        case "catalog-categories":
          this.defaultOpens = ["1", "1-1"];
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
        console.log(oldVal);
        switch (oldVal) {
          case "catalog-products":
            this.defaultOpens = ["1", "1-1", "1-1-1"];
            break;
          case "catalog-categories":
            this.defaultOpens = ["1", "1-1"];
            break;
        }
      }
    },
  },
};
</script>
