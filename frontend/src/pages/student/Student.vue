<template>
  <div class="px-16 py-4">
    <v-card width="1000" height="640" class="mx-auto">
      <v-toolbar color="cyan" dark flat>
        <v-toolbar-title>你好,{{ infoItems["姓名"] }}</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs v-model="tab">
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="(item, i) in items" :key="i">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <profile :infoItems="infoItems" :courses="courses" ref="profile" />

        <time-table :courses="courses" />

        <course-select
          :sno="infoItems['学号']"
          :courses="courses"
          :noSelectCourses="noSelectCourses"
        />
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import { courses, coursesy } from "@/api";

import Profile from "./Profile";
import TimeTable from "./TimeTable";
import CourseSelect from "./CourseSelect";

export default {
  name: "Student",
  components: {
    Profile,
    TimeTable,
    CourseSelect,
  },
  data() {
    return {
      tab: null,
      items: ["个人信息", "我的课表", "选课系统"],
      infoItems: null,
    };
  },
  async created() {
    this.infoItems = {
      学号: this.getUserInfo.sno,
      姓名: this.getUserInfo.sname,
      性别: this.getUserInfo.sex ? "女" : "男",
      班级: this.getUserInfo.clno,
      密码: this.getUserInfo.pwd,
    };

    try {
      let selected = await courses(this.getUserInfo.sno);
      let noSelected = await coursesy(this.getUserInfo.sno);
      // console.log(selected);
      // console.log(noSelected);
      this.setCourses([
        ...selected.map((item) => ({ ...item, state: true })),
        ...noSelected.map((item) => ({ ...item, state: false })),
      ]);
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapGetters(["getUserInfo", "getCourses", "getNoSelectCourses"]),
    courses() {
      return this.getCourses || [];
    },
    noSelectCourses() {
      return this.getNoSelectCourses || [];
    },
  },
  methods: {
    ...mapMutations(["setCourses"]),
  },
};
</script>

<style scoped lang="scss">
</style>
