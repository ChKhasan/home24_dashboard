export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    extendRoutes(routes) {
      routes.push({
        path: "/admin/login",
        component: "~/pages/admin/login.vue",
      });
    },
  },
  head: {
    title: "Home24 admin panel",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/jpg", href: "/logo.jpg" }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/app.scss", "~/assets/fonts/stylesheet.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/element-ui.js", ssr: false },
    { src: "~plugins/vue-js-modal.js", ssr: false },
    { src: "~plugins/quill-editor.js", ssr: false },
    { src: "~plugins/antd-ui.js", ssr: false },
    { src: "~plugins/vue-toast-notification.js", ssr: false },
  ],
  axios: {
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: "https://bombadmin.pythonanywhere.com",
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/svg"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
  ],
  mode: "spa",
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "access",
          maxAge: 60 * 60 * 2,
        },
        refreshToken: {
          property: "refresh",
          data: "refresh",
          maxAge: 60 * 60 * 24,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: "/api/account/login",
            method: "post",
            propertyName: "access",
          },
          refresh: { url: "/api/auth/refresh", method: "post" },
          logout: { url: "/api/account/logout", method: "post" },
          user: false,
        },
      },
    },
    redirect: {
      login: "/admin/login",
      logout: "/admin/login",
      callback: "/admin/login",
      home: "/catalog/products",
    },
    watchLoggedIn: true,
  },
  server: {
    port: 8000, // default: 3000
    host: "localhost", // default: localhost
  },
};
