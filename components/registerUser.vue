<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-col>
          <h1 class="text-center mb-6">Opret bruger</h1>
          <v-text-field v-model="name" label="Navn" filled></v-text-field>
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
              <v-btn depressed class="mt-8" x-large color="primary" @click="registerUser">Opret</v-btn>
            </v-row>
          </v-col>
        </v-col>
        <v-snackbar v-model="snackbar" color="error" :timeout="snackbarTimeout">{{ snackbarText }}</v-snackbar>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth, firestore } from "../firebaseSetup";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 2000,
      email: "",
      name: "",
      password: "",
      showPassword: false,
      createdAt: Date.now()
    };
  },
  methods: {
    ...mapMutations(["setuser"]),
    sendToLogin() {
      this.$router.push("../pages/login");
    },
    async registerUser() {
      await this.createUser()
        .then(() => {
          this.$router.push({ path: "/tap" });
        })
        .catch(error => {
          this.snackbar = true;
          this.snackbarText = error.message;
        });
    },
    async createUser() {
      return auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(async response => {
          await this.createUserInFirestore(response.user.uid);
        })
        .then(() => {
          auth.currentUser.sendEmailVerification()
          .then(() => {
            console.log("verification email sent");
          })
          .catch((error) => {
            console.error("failed to send verification email", error);
          });
        });
    },
    async createUserInFirestore(uid) {
      return firestore.collection("users").doc(uid).set({
          name: this.name,
          createdAt: this.createdAt,
        })
        .then();
    },
  },
};
</script>
