<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-col>
          <img src="GnuLogoTrekant.png" alt width="340" height="165" />
          <login v-if="showLogin"></login>
          <register-user v-if="!showLogin"></register-user>
          <v-col :offset="4" cols="12">
            <v-row>
              <v-btn
                @click="toggleBetweenRegisterAndLogin"
                outlined
                x-large
                color="primary"
              >{{ showLogin ? "Register" : "Login" }}</v-btn>
            </v-row>
          </v-col>
        </v-col>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from "../components/login";
import RegisterUser from "../components/registerUser";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      showLogin: false,
      showLoginText: 'Login'
    };
  },
  methods: {
    ...mapMutations([
            'setUser'
    ]),
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
