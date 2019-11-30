<template>
  <v-app dark>
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
        this.$store.commit("user/signOut");
        this.signedIn = this.$store.getters["user/isSignedIn"];
        this.$router.push({ path: "/"});
      })
      .catch(console.error);
    }
  },
  created() {
    if(this.$store.getters["user/isAdmin"]) {
      this.userIsAdmin = this.$store.getters["user/isAdmin"];
    }

    if(this.$store.getters["user/isSignedIn"]) {
      this.signedIn = this.$store.getters["user/isSignedIn"];
    }

    if(this.$store.getters["user/isRoot"]) {
      this.userIsRoot = this.$store.getters["user/isRoot"];
    }
  }
};
</script>
