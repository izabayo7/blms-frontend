<template>
  <v-row>
    <v-col
      :cols="$vuetify.breakpoint.name === 'sm' ? 2 : $vuetify.breakpoint.name === 'xs' ? 1 : 1"
    >
      <v-menu id="notification-box" class="elevation-0" offset-y :close-on-content-click="true">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="42" class="ml-n4" v-bind="attrs" v-on="on">
            <v-icon>mdi-bell-outline</v-icon>
          </v-avatar>
        </template>
        <v-row>
          <v-col class="col-12 subtitle text-center">Notifications</v-col>
          <v-col class="col-12">
            <div v-for="i in [1,2,3]" :key="i" :to="'/courses'" color="#828282" text>
              <v-divider class="mb-1" />
              <v-row>
                <v-col class="col-3 mt-4">
                  <span class="mx-3 hidden-sm-and-down">
                    <v-avatar size="48" class="user-profile ml-2">
                      <!-- <img
                  v-if="$store.state.user.profile"
                      :src="`http://192.168.1.125:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                      alt="avatar"
                      >-->
                      <v-img
                        v-if="$store.state.user.profile"
                        :src="`http://localhost:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                        alt="avatar"
                      />
                      <span
                        v-else
                        class="black--text"
                      >{{ computText(`${$store.state.user.surName} ${$store.state.user.otherNames}`) }}</span>
                    </v-avatar>
                  </span>
                </v-col>
                <v-col class="col-9 pr-7">
                  <span class="font-weight-bold">Bryian Irumva</span>
                  <span>&nbsp;want you in his office right now.</span>
                  <p class="mb-0">2m</p>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-menu>
    </v-col>
    <v-col>
      <v-menu
        v-model="menu"
        transition="slide-y-transition"
        class="elevation-0"
        offset-y
        :close-on-content-click="true"
      >
        <template v-slot:activator="{ on, attrs }">
          <span class="mx-3 hidden-sm-and-down" v-bind="attrs" v-on="on">
            <v-avatar size="42" class="user-profile ml-2">
              <!-- <img
                  v-if="$store.state.user.profile"
                      :src="`http://192.168.1.125:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                      alt="avatar"
              >-->
              <v-img
                v-if="$store.state.user.profile"
                :src="`http://localhost:7070/kurious/file/${ userType === 'Admin' ? 'adminProfile' : userType === 'SuperAdmin' ? 'superAdminProfile' : userType === 'Instructor' ? 'instructorProfile' : userType === 'Student' ? 'studentProfile' : ''}/${$store.state.user._id}`"
                alt="avatar"
              />
              <span
                v-else
                class="black--text"
              >{{ computText(`${$store.state.user.surName} ${$store.state.user.otherNames}`) }}</span>
            </v-avatar>
            {{ `${$store.state.user.surName}` }}
            <v-icon>{{`mdi-chevron-${menu === true ? 'up' : 'down'}`}}</v-icon>
          </span>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="n-padding">
            <v-btn
              :to="item.title === 'Log out' ? undefined : item.to"
              color="#828282"
              text
              @click="item.title === 'Log out' ? logOut() : undefined"
            >
              <v-list-item-icon>
                <v-icon medium>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    items: [
      { title: "Profile", icon: "mdi-account", to: "/accounts/currentUser" },
      { title: "Settings", icon: "mdi-cog", to: "/settings" },
      { title: "Log out", icon: "mdi-arrow-expand-right", to: "/settings" },
    ],
    notifications: [
      {
        title: "your instructor have released a new course",
        icon: "mdi-account",
        to: "/anyDestination",
      },
      {
        title: "your account is now active",
        icon: "mdi-account",
        to: "/anyDestination",
      },
      {
        title: "please reset your passord ",
        icon: "mdi-account",
        to: "/anyDestination",
      },
    ],
  }),
  computed: {
    userType() {
      return this.$store.state.user.category;
    },
  },
  methods: {
    logOut() {
      this.$session.destroy();
      this.$store.dispatch("unSetUser");
      this.$router.push("/login");
    },
    computText(name) {
      let text = "";
      const forbiden = ["and", "of"];
      name.split(" ").forEach((val) => {
        if (!forbiden.includes(val)) text += val.substring(0, 1).toUpperCase();
      });

      return text;
    },
  },
};
</script>

<style lang="scss">
.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
  max-width: 294px;
  top: 70px !important;
  left: 867px !important;
  background-color: white;
}
#notification-box{
  background-color: red;
}
</style>