<template>
  <div class="container">
    <section class="section">
      <create-user />
    </section>
  </div>
</template>

<script>
import CreateUser from './components/CreateUser.vue';

export default {
  components: { CreateUser },
  data() {
    return {};
  },
};
</script>
