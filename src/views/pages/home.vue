<template>
  <v-container fluid class="home-page">
    <v-row>
      <v-col
          cols="12"
          class="mt-12 hidden-md-and-up"
      >
        <v-img class="home-page-image"
               :src="require('@/assets/images/Classroom-rafiki.svg')"
        />
      </v-col>
      <v-col
          cols="12"
          md="6"
          class="login-side"
      >
        <h2 class="head-one">Kurious</h2>
        <h2 class="head-two">Online Class</h2>
        <router-link @click="$router.push('/login')" to="/login" class="login-btn"><v-btn>Login</v-btn></router-link>
      </v-col>
      <v-col
          cols="12"
          md="6"
          class="home-image-side hidden-sm-and-down"
      >
        <v-img class="home-page-image"
               mt-100
               :src="require('@/assets/images/Classroom-rafiki.svg')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Home',
}
</script>
