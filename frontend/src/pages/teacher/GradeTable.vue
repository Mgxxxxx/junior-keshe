<template>
  <div>
    <v-data-table dense :headers="headers" :items="desserts">
      <template v-slot:item.grade="props">
        <v-edit-dialog
          :return-value.sync="props.item.grade"
          @cancel="cancel"
          large
        >
          {{ props.item.grade }}
          <template v-slot:input>
            <v-text-field
              :value="props.item.grade"
              :rules="[checkGrade]"
              @change="updateGrade(props.item, $event)"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { set_grade } from "@/api";

export default {
  name: "GradeTable",
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      checkGrade: (v) => /^0$|(^[1-9]\d{0,2}$)/.test(v) && Number(v) <= 100,
    };
  },
  props: {
    headers: { type: Array, required: true },
    desserts: { type: Array, required: true },
    cno: { type: Number, required: true },
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    async updateGrade(item, e) {
      console.log(item, this.cno);
      if (/^0$|(^[1-9]\d{0,2}$)/.test(e) && Number(e) <= 100) {
        try {
          let success = await set_grade(item.sno, this.cno, e);
          console.log(success);
          item.grade = e;
          this.save();
        } catch (error) {
          console.log(error);
          this.cancel();
        }
      } else {
        this.cancel();
        // e = item.grade;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
