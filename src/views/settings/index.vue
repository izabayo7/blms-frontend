<template>
  <v-container fluid class="settings_page px-6 pl-lg-10 pr-md-2 pt-0">
    <v-row>
      <div class="col-12 col-md-2 px-0 pt-9">
      <div class="upper">Dashboard</div>
      <div class="lower">School details</div>
        <div class="back">
          <button @click="$router.push('/')">Back</button>
        </div>
        <div class="links">
          <router-link :active-class="$route.path === '/settings' ? 'active' : ''" to="/settings">Personal</router-link>
          <router-link v-if="userCategory === 'ADMIN'" active-class="active" to="/settings/institution">Institution</router-link>
          <router-link active-class="active" to="/settings/payments">Payments</router-link>
        </div>
      </div>
      <div class="col-12 col-md-10 pr-0">
        <router-view></router-view>
      </div>
    </v-row>
    <v-row class="">

    </v-row>
  </v-container>
</template>

<script>
// import {mapActions, mapGetters, mapState} from "vuex";
// import Apis from "@/services/apis";
// import {elapsedDuration} from "../../../services/global_functions";

import {mapGetters} from "vuex";

export default {
  name: "Settings",
  data: () => ({

  }),
  computed: {
    ...mapGetters('user', ['userCategory']),
  },
  components: {

  },
  methods: {

  },
};
</script>

<style lang="scss">
@import '../../assets/sass/imports/settings';
</style>