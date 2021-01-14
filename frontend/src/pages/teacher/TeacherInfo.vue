<template>
  <v-card>
    <v-card-title>
      教师信息
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
      :items="teachers"
      :search="search"
      dense
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "TeacherInfo",
  props: {
    teachers: { type: Array, required: true },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "工号", value: "tno" },
        { text: "姓名", value: "tname" },
        { text: "性别", value: "sex" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
</style>
