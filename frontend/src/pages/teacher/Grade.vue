<template>
  <v-tab-item>
    <v-card class="ma-4" outlined elevation="1">
      <v-tabs vertical>
        <v-tab v-for="item in courses" :key="item">{{ item }}</v-tab>

        <v-tab-item v-for="(item, i) in diffCouGrade" :key="i">
          <grade-table
            :desserts="item.desserts"
            :headers="headers"
            :cno="item[0] ? item[0].cno : -1"
          />
        </v-tab-item>

        <!-- <v-tab-item>
            <grade-table :headers="headers" :desserts="desserts" />
            </v-tab-item>
            <v-tab-item>
            <grade-table :headers="headers" :desserts="desserts" />
            </v-tab-item>
            <v-tab-item>
            <grade-table :headers="headers" :desserts="desserts" />
            </v-tab-item> -->
      </v-tabs>
    </v-card>
  </v-tab-item>
</template>

<script>
import GradeTable from "./GradeTable";

export default {
  name: "Grade",
  components: { GradeTable },
  props: { stusGrade: { type: Array, required: true } },
  data() {
    return {
      courses: [],
      headers: [
        { text: "学号", value: "sno" },
        { text: "姓名", value: "name" },
        { text: "分数", value: "grade" },
      ],
      diffCouGrade: {},
    };
  },
  watch: {
    stusGrade() {
      let obj = {};
      this.stusGrade.forEach((item) => {
        if (!obj[item.cname]) {
          obj[item.cname] = [];
          this.courses.push(item.cname);
        }
        obj[item.cname].push(item);
      });

      this.stusGrade.forEach((item) => {
        if (!obj[item.cname].desserts) {
          obj[item.cname].desserts = [];
        }
        obj[item.cname].desserts.push({
          sno: item.sno,
          name: item.sname,
          grade: item.grade,
        });
      });
      this.diffCouGrade = obj;
      //   console.log(this.diffCouGrade);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
