<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-col>
          <img src="GnuLogoTrekant.png" alt="" width="340" height="165">
          <h1 class="text-center mb-6">Login</h1>
          <v-text-field v-model="email" label="Email" filled></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-col offset="4" cols="12">
            <v-row>
              <v-btn depressed class="mt-8" x-large color="primary" @click="signin">Login</v-btn>
            </v-row>
          </v-col>
          <v-col offset="3" cols="12">
            <v-row>
              <v-btn class="mt-4" outlined x-large color="primary" to="/">Registrer</v-btn>
            </v-row>
          </v-col>
        </v-col>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth } from "../firebaseSetup";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    async signin() {
      console.log("hit");
      await this.authenticateUser()
        .then(() => {
          this.$router.push({ path: "/tap" });
        })
        .catch(console.error);
    },
    authenticateUser() {
      return auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
        console.log("what a shit show: ", user);
      });
    }
  }
};
</script>