<template>
  <v-navigation-drawer
    v-model="show"
    app
    :right="true"
    mobile-breakpoint="960"
    id="sidebar"
    :width="breakPoint === 'xs' ? '70%' : breakPoint === 'sm' ? '50%' : '15%'"
    height="100%"
    fixed
  >
    <slot />
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: {
     visible: {
         type: Boolean,
         required: true
     },
    },
    computed: {
      show(){
        return this.visible
      },
      breakPoint () {
        return this.$vuetify.breakpoint.name
      },
    },
    watch: {
      show () {
        if (this.show === false) {
          this.$emit('hideActions');
        }
        
      }
    },
  }
</script>