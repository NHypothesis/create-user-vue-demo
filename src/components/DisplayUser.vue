<template>
  <section class="container">
    <table class="table">
      <tbody>
        <tr>
          <th>Login Id</th>
          <td>{{ user.loginId }}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{{ user.name }}</td>
        </tr>
        <tr>
          <th>Department</th>
          <td>{{ department }}</td>
        </tr>
        <tr>
          <th>Is Manager</th>
          <td>{{ isManager }}</td>
        </tr>
        <tr>
          <th>Hire Date</th>
          <td>{{ hireDate }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { DateTime } from 'luxon';
import departments from '../departments';

export default {
  props: { user: { type: Object, required: true } },
  computed: {
    department() {
      return departments[this.user.department];
    },
    isManager() {
      return this.user.isManager ? 'Yes' : 'No';
    },
    hireDate() {
      const { hireDate } = this.user;
      return DateTime.fromJSDate(hireDate).toLocaleString(DateTime.DATE_MED);
    },
  },
};
</script>

<style>
table {
  margin-left: auto;
  margin-right: auto;
}
</style>
