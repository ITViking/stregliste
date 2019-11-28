<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1 class="text-center mb-6">Velkommen til streglisten</h1>
        <v-card>
          <v-data-table
            :headers="headers"
            disable-pagination
            :items="users"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="user in items" :key="user.name">
                  <td>{{ user.name }}</td>
                  <td>
                    <v-btn @click="addToUsersTap(user, 5)">
                      <img src="coin.jpg" alt="coin" height="30p" width="30" />
                    </v-btn>
                  </td>
                  <td>
                    <v-btn @click="addToUsersTap(user, 10)">
                      <img src="coin.jpg" alt="coin" height="30p" width="30" />
                      <img src="coin.jpg" alt="coin" height="30p" width="30" />
                    </v-btn>
                  </td>
                  <td v-if="user.cart != 0">{{ user.cart }}</td>
                  <td>{{ user.balance }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { firestore, auth } from "../firebaseSetup";

export default {
  data() {
    return {
      loading: false,
      users: [],
      headers: [
        { text: "Navn", value: "name" },
        { text: "Saldo", value: "balance" },
      ],
      width: 5,
    };
  },
  methods: {
    listUsers() {
      firestore.collection("users").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let user = {
              uid: change.doc.id,
              balance: change.doc.get("balance") ? changes.doc.get("balance") : 0,
              cart: 0,
              name: change.doc.get("name")
            };

            this.users.push(user);
          }
        });
      });
    },
    addToUsersTap(userToAddTo, amount) {
      this.users.map(user => {
        if (user.uid == userToAddTo.uid) {
          userToAddTo.cart += amount;
        }
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