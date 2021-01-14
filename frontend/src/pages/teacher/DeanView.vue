<template>
  <v-tab-item>
    <v-card class="ma-4" outlined elevation="1">
      <v-tabs vertical>
        <v-tab v-for="item in tabItems" :key="item">{{ item }}</v-tab>

        <v-tab-item>
          <student-info :students="students" />
        </v-tab-item>
        <v-tab-item>
          <teacher-info :teachers="teachers" />
        </v-tab-item>
        <v-tab-item>
          <course-info :courses="courses" />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-tab-item>
</template>

<script>
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";
import CourseInfo from "./CourseInfo";

export default {
  name: "DeanView",
  props: {
    students: { type: Array, required: true },
    teachers: { type: Array, required: true },
    courses: { type: Array, required: true },
  },
  data() {
    return {
      tabItems: ["学生", "教师", "课程"],
    };
  },
  components: { StudentInfo, TeacherInfo, CourseInfo },
};
</script>

<style scoped lang="scss">
</style>
