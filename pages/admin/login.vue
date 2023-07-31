<template lang="html">
  <div class="login_container">
    <div class="login_block">
      <div class="login_header mb-10">
        <h1 class="mb-3">Admin Panel</h1>
      </div>
      <div class="login_form">
        <div class="login_input mb-10">
          <label for="">Login</label>
          <input type="text" class="input" v-model="auth.login" placeholder="Login..." />
        </div>
        <div class="login_input mb-10">
          <div class="d-flex justify-content-between">
            <label for="">Password</label>
            <!-- <nuxt-link to="/">Forgot Password ?</nuxt-link> -->
          </div>
          <input
            type="password"
            class="input"
            v-model="auth.password"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="login_btn d-flex justify-content-center" @click="login">Continue</div>
    </div>
  </div>
</template>
<script>
export default {
  // middleware: "auth",
  middleware: "login",
  data() {
    return {
      auth: {
        login: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      console.log("asdasdasdasdasdasdasd 324234234");

      if (this.auth.login == "admin" && this.auth.password == "123123") {
        localStorage.setItem("auth_token", "uiqywueiyqwuye78236e78qwyuye763278");
        this.$router.push("/");
      } else {
        console.log("asdasdasdasdasdasdasd ");
        this.$notify.error({
          title: "Error",
          message: "Указанные данные недействительны.",
        });
      }
    },
  },
};
</script>
<style lang="scss"></style>
