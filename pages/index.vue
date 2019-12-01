<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6a>
      <div class="text-xs-center">
        <img src="/gnu-logo.png" />
      </div>
      <v-container>
        <v-col>
          <login v-if="showLogin"></login>
          <register-user v-if="!showLogin"></register-user>
        </v-col>
        <v-row justify="center">
          <v-btn
            @click="toggleBetweenRegisterAndLogin"
            outlined
            x-large
            color="primary"
          >{{ showLogin ? "Register" : "Login" }}</v-btn>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from "../components/login";
import RegisterUser from "../components/registerUser";

export default {
  data() {
    return {
      showLogin: true,
      showLoginText: "Login"
    };
  },
  methods: {
    toggleBetweenRegisterAndLogin() {
      this.showLogin = !this.showLogin;
    }
  },
  created() {
    console.log("mounted");
    if (this.$store.getters["user/isSignedIn"]) {
      this.$router.push({ path: "/tap"});
    }
  },
  components: {
    RegisterUser,
    Login
  },
  layout: "indexLayout"
};
</script>
