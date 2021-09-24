<template>
  <section class="container">
    <b-field
      label="Login Id"
      :type="errLoginId ? 'is-danger' : ''"
      :message="errLoginId"
    >
      <b-input
        v-model="loginId"
        maxlength="10"
      />
    </b-field>

    <b-field
      label="Name"
      :type="errName ? 'is-danger' : ''"
      :message="errName"
    >
      <b-input
        v-model="name"
        maxlength="100"
      />
    </b-field>

    <b-field
      label="Department"
      :type="errDepartment ? 'is-danger' : ''"
      :message="errDepartment"
    >
      <b-select
        v-model="department"
        placeholder="Select a department..."
      >
        <option
          v-for="(label, id) in departments"
          :key="id"
          :value="id"
        >
          {{ label }}
        </option>
      </b-select>
    </b-field>

    <b-field>
      <b-switch v-model="isManager">
        Is Manager?
      </b-switch>
    </b-field>

    <b-field
      label="Hire Date"
      :type="errHireDate ? 'is-danger' : ''"
      :message="errHireDate"
    >
      <b-datepicker
        v-model="hireDate"
        :date-formatter="formatDate"
      />
    </b-field>

    <div class="buttons">
      <b-button
        type="is-primary"
        @click="handleSave"
      >
        Save
      </b-button>
      <b-button
        type="is-primary"
        @click="handleClear"
      >
        Clear Form
      </b-button>
    </div>
  </section>
</template>

<script>
import { DateTime } from 'luxon';
import departments from '../departments';

const getDefaultUser = () => ({
  loginId: '',
  name: '',
  department: null,
  isManager: false,
  hireDate: null,
});

const isRequiredErrMsg = 'This field is required.';
const lcAlphaNumErrMsg = 'Field may only contain lowercase, alphanumeric characters.';
const rgxLcAlphaNum = /^[a-z]*$/;

export default {
  props: { initialUser: { type: Object, default: getDefaultUser } },
  data() {
    return { ...this.initialUser, enableValidations: false };
  },
  computed: {
    departments() {
      return departments;
    },
    errLoginId() {
      if (!this.enableValidations) return '';
      const { loginId } = this;
      return !loginId
        ? isRequiredErrMsg
        : rgxLcAlphaNum.test(loginId) ? '' : lcAlphaNumErrMsg;
    },
    errName() {
      if (!this.enableValidations) return '';
      return this.name ? '' : isRequiredErrMsg;
    },
    errDepartment() {
      if (!this.enableValidations) return '';
      return Reflect.has(departments, this.department) ? '' : isRequiredErrMsg;
    },
    errHireDate() {
      if (!this.enableValidations) return '';
      return this.hireDate ? '' : isRequiredErrMsg;
    },
    allValid() {
      if (!this.enableValidations) return '';
      const {
        errLoginId,
        errName,
        errDepartment,
        errHireDate,
      } = this;
      return Boolean(!errLoginId && !errName && !errDepartment && !errHireDate);
    },
  },
  methods: {
    formatDate(date) {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
    },
    handleSave() {
      this.enableValidations = true;

      if (!this.allValid) return;

      const {
        loginId, name, department, isManager, hireDate,
      } = this;

      this.$emit('save', {
        loginId, name, department, isManager, hireDate,
      });
    },
    handleClear() {
      this.enableValidations = false;
      Object.assign(this, getDefaultUser());
    },
  },
};
</script>
