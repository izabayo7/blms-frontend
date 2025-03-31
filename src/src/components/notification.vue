<template>
  <v-row>
      <v-col :cols="$vuetify.breakpoint.name === 'sm' ? 2 : $vuetify.breakpoint.name === 'xs' ? 1 : 1">
        <v-menu transition="slide-y-transition" class="elevation-0" offset-y :close-on-content-click="true">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="42" class="ml-n4"  v-bind="attrs" v-on="on">
              <v-icon>mdi-bell-outline</v-icon>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in notifications"
              :key="index"
              class="n-padding"
            >
              <v-btn :to="item.to" color="#828282" text>
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
      <v-col>
        <v-menu v-model="menu" transition="slide-y-transition" class="elevation-0" offset-y :close-on-content-click="true">
          <template v-slot:activator="{ on, attrs }">
            <span class="mx-3 hidden-sm-and-down" v-bind="attrs" v-on="on">
              <v-avatar size="42" class="user-profile ml-2">
                  <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="avatar"
                  >
              </v-avatar>
              {{ `${$store.state.user.surName}` }}
              <v-icon>{{`mdi-chevron-${menu === true ? 'up' : 'down'}`}}</v-icon>
              </span>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              class="n-padding"
            >
              <v-btn :to="item.title === 'Log out' ? undefined : item.to" color="#828282" text @click="item.title === 'Log out' ? logOut() : undefined">
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
        { title: 'Profile', icon: 'mdi-account', to:'/accounts/currentUser' },
        { title: 'Settings', icon: 'mdi-cog', to: '/settings'},
        { title: 'Log out', icon: 'mdi-arrow-expand-right', to: '/settings'},
      ],
      notifications: [
        { title: 'your instructor have released a new course', icon: 'mdi-account', to:'/anyDestination' },
        { title: 'your account is now active', icon: 'mdi-account', to:'/anyDestination' },
        { title: 'please reset your passord ', icon: 'mdi-account', to:'/anyDestination' },
      ],
    }),
    methods: {
      logOut () {
        this.$session.destroy()
        this.$router.push('/login')
      }
    }
}
</script>

<style>

</style>