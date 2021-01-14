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
      </v-card>
      <v-card class="flex-grow-1 flex-shink-1 ml-2">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">所属课程组</th>
                <th class="text-left">组长/组员</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in groupInfo" :key="item.cname">
                <td>{{ item.cname }}</td>
                <td>{{ item.tno === item.headerno ? "组长" : "组员" }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-card class="flex-grow-1 flex-shink-1 ml-2">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">带领的班级</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in classes" :key="item.clno">
                <td>{{ item.clno }}</td>
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
  props: {
    infoItems: { type: Object, required: true },
    groupInfo: { type: Array, required: true },
    classes: { type: Array, required: true },
  },
};
</script>

<style scoped lang="scss">
</style>
