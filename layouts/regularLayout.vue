<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn @click="signOut">Log ud</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from "../firebaseSetup";

export default {
  data() {
    return {
      fixed: false,
      displayName: "",
      title: "Streglisten"
    };
  },
  methods: {
    signOut() {
      auth.signOut()
        .then(val => {
          this.$store.commit("user/signOut");
          this.$router.push({ path: "/" });
        })
        .catch(console.error);
    }
  }
};
</script>
