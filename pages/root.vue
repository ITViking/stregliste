<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1 class="text-center">Root</h1>
        <v-data-table
          :headers="headers"
          disable-pagination
          :items="users"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.role }}</td>
              </tr>
            </tbody>
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
      users: [],
      headers: [
        { text: "Navn", value: "name" },
        { text: "Rolle", value: "bruger" }
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