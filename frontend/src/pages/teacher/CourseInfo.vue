<template>
  <v-card>
    <v-card-title>
      课程信息
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
      :items="courses"
      :search="search"
      dense
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "CourseInfo",
  props: {
    courses: { type: Array, required: true },
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "课程号", value: "cno" },
        { text: "课程名", value: "cname" },
        { text: "学分", value: "credit" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
</style>
