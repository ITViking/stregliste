<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1 class="text-center mb-6">Administration</h1>

        <v-text-field label="Tilføj Beløb" v-model="amount" placeholder="beløb" outlined></v-text-field>

        <v-data-table
          sort-by="name"
          height="400"
          :mobile-breakpoint="0"
          show-select
          v-model="selectedUsers"
          :headers="headers"
          disable-pagination
          :items="users"
          item-key="uid"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>

        <v-card v-if="usersHaveBeenSelected" color="warning" height="60" class="mt-4">
          <v-layout row justify-center align-content-space-between>
            <v-btn @click="addAmountToSelectedUsers" class="mt-2" color="info">Tilføj</v-btn>
            <v-btn @click="cancel" class="mt-2 ml-6" color="error">Fortryd</v-btn>
          </v-layout>
        </v-card>
        <v-snackbar v-model="snackbar" color="info" :timeout="snackbarTimeout">{{ snackbarText }}</v-snackbar>
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
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 2000,
      amount: "",
      users: [],
      selectedUsers: [],
      headers: [
        {
          text: "Navn",
          value: "name",
          align: "left"
        },
        {
          text: "Saldo",
          value: "balance",
          align: "left"
        }
      ]
    };
  },
  methods: {
    cancel() {
      this.selectedUsers = [];
    },
    addAmountToSelectedUsers() {
      let amountConvertedToFloat = parseFloat(this.amount);

      this.selectedUsers.forEach(user => {
        let newBalance = (user.balance += amountConvertedToFloat);

        firestore.collection("users").doc(user.uid).update({ balance: newBalance });
      });

      this.snackbar = true;
      this.snackbarText = `${this.amount}kr. tilføjet til de valgte brugere`;
      this.amount = "";
      this.selectedUsers = [];
    },
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
    }
  },
  computed: {
    usersHaveBeenSelected() {
      if (!this.selectedUsers.length) return;
      return true;
    }
  },
  created() {
    this.listUsers();
  },
  //todo: remember to switch back to admin layout when going live
  layout: "rootLayout"
};
</script>