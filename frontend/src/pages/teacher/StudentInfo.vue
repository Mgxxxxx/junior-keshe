<template>
  <v-card>
    <v-card-title>
      学生信息
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      dense
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "StudentInfo",
  props: {
    students: { type: Array, required: true },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "学号", value: "sno" },
        { text: "姓名", value: "sname" },
        { text: "班别", value: "clno" },
        { text: "性别", value: "sex" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
</style>
