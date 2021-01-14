<template>
  <v-tab-item>
    <v-card class="ma-4" outlined elevation="1">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Course</th>
              <th class="text-left">State</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in allCourses" :key="item.cname">
              <td>{{ item.cname }}</td>
              <td>
                <v-btn
                  :color="!item.state ? 'accent' : 'error'"
                  small
                  @click="noSelectClick(item)"
                  >{{ item.state ? "退课" : "选课" }}</v-btn
                >
              </td>
            </tr>
            <!-- <tr v-for="item in courses" :key="item.name">
              <td>{{ item.cname }}</td>
              <td><v-btn small disabled>已选</v-btn></td>
            </tr>
            <tr v-for="(item, i) in noSelectCourses" :key="i">
              <td>{{ item.cname }}</td>
              <td>
                <v-btn
                  color="accent"
                  small
                  :disabled="item.state"
                  @click="noSelectClick(item)"
                  >{{ item.state ? "已选" : "选择" }}</v-btn
                >
              </td>
            </tr> -->
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-tab-item>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CourseSelect",
  props: {
    sno: { type: Number, required: true },
    courses: {
      type: Array,
      required: true,
    },
    noSelectCourses: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(["sAddCourseAsync", "sDelCourseAsync"]),
    noSelectClick(item) {
      if (!item.state) {
        console.log(item);
        // item.state = true;
        this.sAddCourseAsync({
          cno: item.cno,
          sno: this.sno,
          _time: item._time,
          cname: item.cname,
        });
      } else {
        // console.log("del");
        // item.state = false;
        this.sDelCourseAsync({ cno: item.cno, sno: this.sno });
      }
    },
  },
  computed: {
    allCourses() {
      return [...this.courses, ...this.noSelectCourses];
    },
  },
};
</script>

<style scoped lang="scss">
</style>
