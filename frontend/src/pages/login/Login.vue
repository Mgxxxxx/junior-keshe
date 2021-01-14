<template>
  <div>
    <v-card
      width="600px"
      class="mx-auto pt-2"
      style="margin-top: 180px; background-color: #ffffff80"
    >
      <form class="pa-2">
        <v-text-field
          v-model="account"
          label="Account"
          required
          autocomplete="off"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          required
        ></v-text-field>
        <v-select
          v-model="role"
          :items="roles"
          label="Role"
          required
        ></v-select>
        <div class="d-flex flex-row-reverse">
          <v-btn
            class="mr-4"
            @click="userLogin"
            :disabled="canSubmit"
            style="background-color: #ffffff80"
          >
            login
          </v-btn>
        </div>
      </form>
      <v-alert
        dense
        v-show="showInfo"
        type="error"
        border="left"
        width="300px"
        class="mx-auto"
        origin="left"
        transition="slide-x-transition"
        style="position: absolute; bottom: -8px; left: 8px"
      >
        账号或密码错误!
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import { login, home } from "@/api";

export default {
  name: "Login",
  data() {
    return {
      showInfo: false,
      account: "",
      password: "",
      role: "Teacher",
      roles: ["Teacher", "Student"],
    };
  },
  methods: {
    ...mapMutations(["setLoginStatu", "setRole", "setUerInfo"]),
    userLogin() {
      login(this.account, this.password, this.role)
        .then((res) => {
          // console.log(res);
          if (!res.loginStatu) {
            this.showInfo = true;
            setTimeout(() => {
              this.showInfo = false;
            }, 1000);
          } else if (res.loginStatu) {
            this.setLoginStatu(true);
            this.setRole(this.role);
            this.setUerInfo(res.usersInfo[0]);
            this.$router.push(`/${this.role.toLowerCase()}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    canSubmit() {
      return this.account === "" || this.password == "";
    },
  },
};
</script>

<style scoped lang="scss">
</style>
