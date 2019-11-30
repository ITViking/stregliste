<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(page, i) in pages" :key="i" :to="page.to" router exact>
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="page.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title"/>
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
      drawer: false,
      fixed: false,
      displayName: "",
      pages: [
        {
          icon: "mdi-chart-bubble",
          title: "Stregeliste",
          to: "/tap"
        },
        {
          icon: "mdi-apps",
          title: "Root",
          to: "/root"
        },
      ],
      title: "Streglisten",
    };
  },
  methods: {
    signOut() {
      auth.signOut()
      .then((val)=> {
        this.$store.commit("user/signOut");
        this.$router.push({ path: "/"});
      })
      .catch(console.error);
    }
  },
};
</script>
