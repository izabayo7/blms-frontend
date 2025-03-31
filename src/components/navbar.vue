<template>
  <v-app-bar id="navbar" app dense>
    <v-row class="hidden-md-and-down">
      <v-col class="col-1">
        <v-col cols="2">
          <v-app-bar-nav-icon class="ml-n4 mt-n4" @click.stop="$store.state.sidebar.minivariant = !$store.state.sidebar.minivariant"></v-app-bar-nav-icon>
        </v-col>
      </v-col>
      <v-col cols="5">
        <v-text-field placeholder="Search Courses" append-icon="mdi-magnify" rounded dense filled />
      </v-col>
      <v-btn rounded color="#ffd248" class="mt-3 white--text" to="/courses/new-course" v-if="$route.name=='Courses' && $store.state.user.category === 'Instructor'">
        <v-icon>mdi-plus</v-icon> <div class="d-none">Create new class</div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-col cols="auto" id="nav-icons">
        <kurious-avatar />
      </v-col>
    </v-row>
    <v-row class="hidden-lg-and-up">
      <v-col cols="2">
        <v-app-bar-nav-icon class="ml-n2 mt-n1" @click="showSidebar()"></v-app-bar-nav-icon>
      </v-col>
      <v-col cols="7">
        <v-text-field
          class="ml-n2"
          placeholder="Search"
          append-icon="mdi-magnify"
          rounded
          dense
          filled
        />
      </v-col>
      <v-spacer class="hidden-xs-and-down"></v-spacer>
      <v-col cols="3" sm="2" id="nav-icons" class="pl-3">
        <kurious-avatar />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  components: {
    kuriousAvatar: () => import("@/components/notification"),
  },
  methods:{
    showSidebar(){
      console.log('llllllllllllll')
      this.$store.state.sidebar.visible = true
      console.log(this.$store.state.sidebar.visible)
    }
  }
};
</script>
