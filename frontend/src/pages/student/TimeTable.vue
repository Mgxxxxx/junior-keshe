<template>
  <v-tab-item>
    <v-card class="ma-4" outlined elevation="1">
      <v-simple-table fixed-header dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center" v-for="item in weekday" :key="item">
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in courseEvent" :key="i">
              <td
                v-for="(value, index) in item"
                :key="index"
                class="text-center"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "TimeTable",
  data() {
    return {
      weekday: ["", "周一", "周二", "周三", "周四", "周五"],
      courseEvent: [
        {
          name: "第一节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第二节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第三节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第四节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第五节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第六节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第七节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第八节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第九节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第十节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
        {
          name: "第十一节",
          mon: "无",
          tue: "无",
          wed: "无",
          thu: "无",
          fri: "无",
        },
      ],
    };
  },
  props: {
    courses: { type: Array, required: true },
  },
  methods: {
    initTimeTable() {
      this.courses.forEach((item) => {
        let time = item._time.split("-");
        let state = item.state ? item.cname : "无";
        this.courseEvent[Number(time[1])][time[0]] = state;
        this.courseEvent[Number(time[1]) - 1][time[0]] = state;
        if (time[1] === "9")
          this.courseEvent[Number(time[1]) + 1][time[0]] = state;
      });
    },
  },
  watch: {
    courses() {
      console.log("update");
      // console.log(this.courses);
      this.initTimeTable();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
