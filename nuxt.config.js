export default {
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
  css: ["~/assets/scss/app.scss", "~/assets/fonts/stylesheet.css"],

  plugins: [
    { src: "~plugins/element-ui.js", ssr: false },
    { src: "~plugins/vue-js-modal.js", ssr: false },
    { src: "~plugins/quill-editor.js", ssr: false },
    { src: "~plugins/antd-ui.js", ssr: false },
  ],
  axios: {
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: "https://bombadmin.pythonanywhere.com",
  },
  components: true,

  buildModules: ["@nuxtjs/svg", "@nuxt/postcss8", "@nuxtjs/dotenv"],

  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/dotenv",
    "nuxt-precompress",
  ],
  ssr: false,
  build: {
    analyze: true,
  },

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
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ["br", "gzip"],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,

      filename: "[path].gz[query]",
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: "[path].br[query]",
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
  server: {
    port: 8000, // default: 3000
    host: "localhost", // default: localhost
  },
};
