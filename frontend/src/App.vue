<template>
  <v-app id="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style>
#app {
  background: url("./assets/bg27.jpg") top/100% no-repeat;
}
</style>
