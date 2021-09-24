<template>
  <article class="panel">
    <header class="panel-heading">
      {{ label }}
    </header>
    <section class="panel-block">
      <edit-user
        v-if="!user"
        :initial-user="initialUser"
        @save="saveHandler"
      />
      <display-user
        v-else
        :user="user"
      />
    </section>
  </article>
</template>
<script>
import EditUser from './EditUser.vue';
import DisplayUser from './DisplayUser.vue';

const initialUser = {
  loginId: '',
  name: '',
  department: null,
  isManager: false,
  hireDate: new Date(),
};

export default {
  components: { EditUser, DisplayUser },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    label() {
      return this.user ? 'User' : 'Create User';
    },
    initialUser() {
      return initialUser;
    },
  },
  methods: {
    saveHandler(data) {
      this.user = data;
      this.$buefy.toast.open({
        duration: 5000,
        message: `Created user for "${data.name}"`,
        type: 'is-success',
      });
    },
  },
};
</script>
