<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1 class="text-center mb-6">Velkommen</h1>
        <v-card>
          <v-data-table
            height="400"
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
                    <v-btn x-small @click="addToUsersTap(user, 5)">
                      <img src="coin.jpg" alt="coin" height="25" width="25" />
                    </v-btn>
                  </td>
                  <td>
                    <v-btn x-small @click="addToUsersTap(user, 10)">
                      <img src="coin.jpg" alt="coin" height="25" width="25" />
                      <img src="coin.jpg" alt="coin" height="25" width="25" />
                    </v-btn>
                  </td>
                  <td v-if="user.cart != 0">{{ user.cart }}</td>
                  <td>{{ user.balance }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
        <v-card v-if="cartHasItems" color="warning" height="60" class="mt-4">
          <v-layout row justify-center align-content-space-between>
            <v-btn @click="addCartToBalance" class="mt-2" color="info">Køb</v-btn>
            <v-btn @click="emptyCartForAllUsers" class="mt-2 ml-6" color="error">Fortryd</v-btn>
          </v-layout>
        </v-card>
        <v-snackbar v-model="snackbar" color="info" :timeout="snackbarTimeout">{{ snackbarText }}</v-snackbar>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { firestore, auth } from "../firebaseSetup";

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 2000,
      loading: false,
      cartHasItems: false,
      users: [],
      headers: [
        { text: "Navn", value: "name" },
        { text: "Saldo", value: "balance" }
      ],
      width: 5
    };
  },
  methods: {
    listUsers() {
      firestore.collection("users").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let user = {
              uid: change.doc.id,
              balance: change.doc.get("balance")
                ? change.doc.get("balance")
                : 0,
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
          this.cartHasItems = true;
        }
      });
    },
    emptyCartForAllUsers() {
      this.users.map(user => {
        if(!user.cart) return;
        user.cart = 0;
        this.cartHasItems = false;
      });
    },
    addCartToBalance() {
      this.users.map(user => {
        if(!user.cart) return;
        let newBalance = user.balance += user.cart;
        firestore.collection("users").doc(user.uid).update({
          balance: newBalance
        })
        .then(() => {
          this.snackbar = true;
          this.snackbarText = "Købet er gennemført";
          this.cartHasItems = false;
        })
        .catch((error) => {
          console.error("failed to add new balance to user: ", error);
          return;
        });
        user.cart = 0;
      })
    }
  },
  async mounted() {
    this.loading = true;
    this.listUsers();
    this.loading = false;
  },
  middleware: "checkAuthentication",
  layout(context) {
    if(context.store.getters["user/isAdmin"]) {
      return "adminLayout";
    }
    if(context.store.getters["user/isRoot"]) {
      return "rootLayout";
    }
  }
};
</script>
