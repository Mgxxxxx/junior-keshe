<template>
  <div>
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
          <profile
            :infoItems="infoItems"
            :groupInfo="groupInfo"
            :classes="classes"
          />

          <time-table :courses="teaCourse" />

          <grade :stusGrade="stusGrade" />

          <dean-view
            v-if="isDean"
            :students="allStudent"
            :teachers="allTeacher"
            :courses="allCourse"
          />
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import {
  tea_group_info,
  tea_course,
  stu_grade,
  deans,
  all_student,
  all_teacher,
  all_course,
} from "@/api";

import Profile from "./Profile";
import TimeTable from "./TimeTable";
import Grade from "./Grade";
import DeanView from "./DeanView";

export default {
  name: "Teacher",
  components: { Profile, TimeTable, Grade, DeanView },
  data() {
    return {
      tab: null,
      items: ["个人信息", "我的课表", "课程登分"],
      infoItems: null,
      stusGrade: [],
      isDean: false,
      allStudent: [],
      allTeacher: [],
      allCourse: [],
    };
  },
  async created() {
    this.infoItems = {
      工号: this.getUserInfo.tno,
      姓名: this.getUserInfo.tname,
      性别: this.getUserInfo.sex ? "女" : "男",
      密码: this.getUserInfo.pwd,
    };
    let tno = this.getUserInfo.tno;
    try {
      let [groupInfo, teaCourse, stusGrade, allDean] = await Promise.all([
        tea_group_info(tno),
        tea_course(tno),
        stu_grade(tno),
        deans(),
      ]);
      // console.log(groupInfo);
      // console.log(teaCourse);
      // console.log(stusGrade);
      // console.log(allDean);
      if (allDean.indexOf(tno) !== -1) {
        this.items.push("信息查询");
        this.isDean = true;
      }
      this.setTeaGroupInfo(groupInfo.teaGroupInfo);
      this.setLeadClass(groupInfo.teaWithClass);
      this.setTeaCourse(teaCourse);
      this.stusGrade = stusGrade;
      if (this.isDean) {
        let [allStudent, allTeacher, allCourse] = await Promise.all([
          all_student(),
          all_teacher(),
          all_course(),
        ]);
        // console.log(allStudent);
        // console.log(allTeacher);
        // console.log(allCourse);
        this.allStudent = allStudent.map((item) => {
          item.sex = item.sex ? "女" : "男";
          return item;
        });
        this.allTeacher = allTeacher.map((item) => {
          item.sex = item.sex ? "女" : "男";
          return item;
        });
        this.allCourse = allCourse;
      }
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapGetters([
      "getUserInfo",
      "getTeaGroupInfo",
      "getLeadClass",
      "getTeaCourse",
    ]),
    groupInfo() {
      return this.getTeaGroupInfo || [];
    },
    classes() {
      return this.getLeadClass || [];
    },
    teaCourse() {
      return this.getTeaCourse || [];
    },
  },
  methods: {
    ...mapMutations(["setTeaGroupInfo", "setLeadClass", "setTeaCourse"]),
  },
};
</script>

<style scoped lang="scss">
</style>
