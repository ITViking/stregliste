<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1 class="text-center mb-6">Velkommen til streglisten</h1>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Navn</th>
                <th class="text-left text-center">10 kr</th>
                <th class="text-left text-center">5 kr</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.name">
                <td>{{ user.name }}</td>
                <td><v-btn>Tilføj</v-btn></td>
                <td><v-btn>Tilføj</v-btn></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { firestore } from "../firebaseSetup";

export default {
  data() {
    return {
      loading: false,
      users: []
    };
  },
  methods: {
    listUsers() {
      firestore.collection("users").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            this.users.push(change.doc.data());
          }
        });
      });
    }
  },
  async mounted() {
    this.loading = true;

    this.listUsers();

    this.loading = false;
  }
};
</script>