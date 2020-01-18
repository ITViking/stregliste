<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1 class="text-center">Root</h1>
        <v-data-table
          :headers="headers"
          disable-pagination
          :items="users"
          item-key="name"
          :single-expand="true"
          :expanded.sync="expanded"
          hide-default-footer
          class="elevation-1"
          show-expand
          mobile-breakpoint="300"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-btn @click="makeUserAdmin(item)">Make admin</v-btn>
            </td>
          </template>
        </v-data-table>
        <v-btn @click="restartProject" color="error" large class="mt-12">Restart project</v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { firestore } from "../firebaseSetup";

export default {
  data() {
    return {
      expanded: [],
      users: [],
      headers: [
        { text: "", value: "name", align: "left", width: "250" },
        { text: '', value: 'data-table-expand', align:'end', width: "50" },
      ]
    };
  },
  methods: {
    listUsers() {
      firestore.collection("users").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let user = {
              uid: change.doc.id,
              ...change.doc.data()
            };
            this.users.push(user);
          }
        });
      });
    },
    async makeUserAdmin(user) {
      let payload = {
        data: {
          user
        }
      };

      let headers = {
        "Content-type": "application/json"
      };

      let response;
      try {
        response = await axios.post(
          "https://us-central1-stregliste-79a6d.cloudfunctions.net/set_admin",
          payload,
          {
            headers
          }
        );
      } catch (error) {
        console.error("faild to make user admin: ", error);
        return;
      }

      console.log("User is now an admin :", response);
    },
    async restartProject() {
      //This function sole purpose is to allow for starting over due to the restrictive nature of firebase.
      let payload = {
        data: {
          users: this.users
        }
      };

      let headers = {
        "Content-type": "application/json"
      };

      let response;
      try {
        response = await axios.post(
          "https://us-central1-stregliste-79a6d.cloudfunctions.net/restart_project",
          payload,
          {
            headers
          }
        );
      } catch (error) {
        console.error("faild to restart project: ", error);
        return;
      }
      this.deleteUsersCollection();
      console.log("projected restarted :", response);
    },
    deleteUsersCollection() {
      this.users.map(user => {
        try {
          firestore.collection("users").doc(user.uid).delete();
        } catch (error) {
          console.error("failed to delete user from collection:", error);
          return;
        }
      });
    }
  },
  created() {
    this.listUsers();
  },
  layout: "rootLayout",
  middleware: "reguireRootAuthorization"
};
</script>
