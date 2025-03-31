<template>
  <v-container fluid class="inner px-6 pl-lg-14 pr-md-2 pt-6">
    <v-row>
      <div class="col-12 col-md-4">
        <div class="upper">Dashboard</div>
        <div class="lower">School details</div>
      </div>
      <div class="col-12 col-md-8">
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

export default {
  name: "Settings",
  data: () => ({

  }),
  computed: {

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