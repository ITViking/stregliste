<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-col>
          <h1 class="text-center mb-6">Login</h1>
          <v-text-field v-model="email" label="Email" filled></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-col offset="3" cols="12">
            <v-row>
              <v-btn depressed class="mt-8" x-large color="primary" @click="signin">Login</v-btn>
            </v-row>
          </v-col>
        </v-col>
        <v-snackbar v-model="snackbar" color="error" :timeout="snackbarTimeout">
          {{ snackbarText }}
          <v-btn text @click="snackbar = false">X</v-btn>
        </v-snackbar>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth } from "../firebaseSetup"

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 4000,
      email: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    async signin() {
      await this.authenticateUser()
        .then(() => {
          this.$router.push({ path: "/tap" });
        })
        .catch((error) => {
          this.snackbar = true;
          this.snackbarText = error.message;
        });
    },
    authenticateUser() {
      let email = this.email.toLowerCase();

      return auth.signInWithEmailAndPassword(email, this.password)
        .then();
    }
  }
};
</script>