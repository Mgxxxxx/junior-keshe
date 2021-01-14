<template>
  <v-tab-item>
    <v-card flat class="d-flex pa-4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          :src="require('../.././assets/userhead3.jpg')"
          class="ma-1 rounded"
          height="200px"
        ></v-img>

        <v-card-title class="pa-1" v-for="(item, i) in infoItems" :key="i">
          {{ i }}:{{ item }}
        </v-card-title>
        <v-card-title class="pa-1">
          平均绩点:{{
            (Math.round((totalGPA / hasSelectLen) * 1000) / 1000).toFixed(3)
          }}
        </v-card-title>
      </v-card>
      <v-card class="flex-grow-1 flex-shink-1 ml-2">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Course</th>
                <th class="text-left">Grade</th>
                <th class="text-left">绩点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in courseInfo" :key="item.name">
                <td v-if="item.state">{{ item.cname }}</td>
                <td v-if="item.state">{{ item.grade }}</td>
                <td v-if="item.state">{{ item.GPA }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      totalGPA: 0,
      hasSelectLen: 0,
    };
  },
  props: {
    infoItems: {
      type: Object,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
  },
  methods: {
    calcGPA(grade) {
      let GPA = 0;
      // this.courses.forEach((item) => {
      // let grade = item.grade;
      if (grade >= 90) GPA += 4;
      else if (grade >= 80) GPA = GPA + 3 + (grade - 80) / 10;
      else if (grade >= 70) GPA = GPA + 2 + (grade - 70) / 10;
      else if (grade >= 60) GPA = GPA + 1 + (grade - 60) / 10;
      return GPA;
      // });
    },
  },
  computed: {
    courseInfo() {
      return this.courses.map((item) => {
        let GPA = this.calcGPA(item.grade);
        if (item.state) {
          this.totalGPA += GPA;
          this.hasSelectLen++;
        }
        return { ...item, GPA };
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
