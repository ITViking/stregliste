<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6a>
      <div class="text-xs-center">
        <img src="GnuLogoTrekant.png" alt width="340" height="165" />
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
import { mapMutations } from "vuex";
import { auth } from "../firebaseSetup";

export default {
  data() {
    return {
      showLogin: true,
      showLoginText: "Login"
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    toggleBetweenRegisterAndLogin() {
      this.showLogin = !this.showLogin;
    }
  },
  components: {
    RegisterUser,
    Login
  }
};
</script>
