<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-col>
          <img src="GnuLogoTrekant.png" alt="" width="340" height="165">
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
          <v-col offset="4" cols="12">
            <v-row>
              <v-btn depressed class="mt-8" x-large color="primary" @click="registerUser">Opret</v-btn>
            </v-row>
            <v-row>
              <v-btn class="mt-4" outlined x-large color="primary" to="/login">Login</v-btn>
            </v-row>
          </v-col>
        </v-col>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth, firestore } from "../firebaseSetup";

export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      showPassword: false,
      createdAt: Date.now()
    };
  },
  methods: {
    async registerUser() {
      await this.createUser()
        .then(() => {
          this.$router.push({ path: "/tap" });
        })
        .catch(console.error);
    },
    async createUser() {
      return auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(async (response) => {
          await this.createUserInFirestore(response.user.uid);
        });
    },
    async createUserInFirestore(uid) {
      return firestore.collection("users").doc(uid).set({ 
          name: this.name,
          createdAt: this.createdAt 
        })
        .then(console.log("user created"));
    }
  }
};
</script>
