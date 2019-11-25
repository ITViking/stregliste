<template>
  <v-container>
    <v-col>
      <h1 class="text-center pb-6">Opret bruger</h1>
      <v-text-field :name="name" label="Navn" filled></v-text-field>
      <v-text-field :email="email" :rules="[rules.email, rules.required]" label="Email" filled></v-text-field>
      <v-text-field
        :password="password"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-col offset="4" cols="12">
        <v-row>
          <v-btn depressed class="mt-8" x-large color="primary">Opret</v-btn>
        </v-row>
        <v-row>
          <v-btn class="mt-8" outlined x-large color="primary" to="/login">Login</v-btn>
        </v-row>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
      sendToLogin() {
          this.$router.push("../pages/login");
      }
  }
};
</script>