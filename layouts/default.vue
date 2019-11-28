<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list v-if="userIsAdmin">
        <v-list-item v-for="(page, i) in adminPages" :key="i" :to="page.to" router exact>
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="page.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="userIsRoot">
        <v-list-item v-for="(page, i) in rootPages" :key="i" :to="page.to" router exact>
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
      <v-app-bar-nav-icon v-if="userIsAdmin || userIsRoot" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title"/>
      <v-spacer />
      <v-btn v-if="signedIn" @click="signOut">Log ud</v-btn>
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
      userIsAdmin: "",
      userIsRoot: "",
      signedIn: false,
      adminPages: [
        // todo : fix roles så jeg har root
        {
          icon: "mdi-apps",
          title: "Root",
          to: "/root"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Stregeliste",
          to: "/tap"
        },
        {
          icon: "mdi-apps",
          title: "Admin",
          to: "/admin"
        }
      ],
      rootPages: [
        // todo : fix roles så jeg har root
        {
          icon: "mdi-apps",
          title: "Root",
          to: "/root"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Stregeliste",
          to: "/tap"
        },
      ],
      title: "Streglisten",
    };
  },
  methods: {
    signOut() {
      auth.signOut()
      .then((val)=> {
        this.$store.commit("setUser", {});
        this.$router.push({ path: "/"});
        this.signedIn = false;
      })
      .catch(console.error);
    }
  },
  created() {
    if(this.$store.state.user.isAdmin) {
      this.userIsAdmin = true;
    }

    if(this.$store.state.user.email) {
      this.signedIn = true;
    }

    if(this.$store.state.user.isRoot) {
      this.userIsRoot = true;
    }
  },
};
</script>
