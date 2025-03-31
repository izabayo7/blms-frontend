<template>
  <v-navigation-drawer
    v-model="sideBar"
    app
    :right="false"
    mobile-break-point="960"
    :mini-variant.sync="$store.state.sidebar.minivariant"
    :mini-variant-width="78"
    id="sidebar"
    :width="breakPoint === 'xs' ? '50%' : breakPoint === 'sm' ? '25%' : '15%'"
    height="100%"
    fixed
  >
      <v-list-item>
        <v-list-item-icon v-if="$store.state.sidebar.minivariant" class="hidden-sm-and-down">
          <v-app-bar-nav-icon @click="changeStyles('expand')" @click.stop="$store.state.sidebar.minivariant = !$store.state.sidebar.minivariant"></v-app-bar-nav-icon>
          <!-- <v-btn class="ml-n3" @click="changeStyles('expand')" @click.stop="$store.state.sidebar.minivariant = !$store.state.sidebar.minivariant"><v-icon>mdi-menu</v-icon></v-btn> -->
        </v-list-item-icon>
        <v-list-item-content v-else>
          <v-list-item-title class="title">
            <v-app-bar-nav-icon @click="changeStyles('reduce')" @click.stop="$store.state.sidebar.minivariant = !$store.state.sidebar.minivariant" class="hidden-sm-and-down"></v-app-bar-nav-icon>
            <v-list-item-title class="title hidden-md-and-up">
              Kurious
            </v-list-item-title>
              <!-- <v-btn round class="mr-2" @click="changeStyles('reduce')" @click.stop="$store.state.sidebar.minivariant = !$store.state.sidebar.minivariant">Kurious</v-btn> -->
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-1"></v-divider>
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon medium>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    components: {
      // KuriousLibrary : () => import('@/assets/icons/library.svg'),
    },
    data () {
      return {
        // items: this.sidebarItems(),
        sideBar: (this.breakPoint !== 'sm' && this.breakPoint !== 'xs'),
        right: null,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    },
    computed: {
      visible () {
        return this.$store.state.sidebar.visible
      },
      breakPoint () {
        return this.$vuetify.breakpoint.name
      },
      items () {
        if (this.$store.state.user.category === 'Student'){
            return  [
              { title: 'Courses', icon: 'mdi-projector-screen', to: '/courses' },
              { title: 'Reports', icon: 'mdi-file-chart',to: '/reports' },
              { title: 'My Library', icon: 'mdi-bookshelf', to: '/library' },
              { title: 'Messages', icon: 'mdi-message', to: '/messages' },
            ]
        } else if (this.$store.state.user.category === 'Instructor'){
            return  [
              { title: 'Courses', icon: 'mdi-projector-screen', to: '/courses' },
              { title: 'Submissions', icon: 'mdi-image',to: '/reports' },
              { title: 'My Library', icon: 'mdi-help-box', to: '/library' },
              { title: 'Messages', icon: 'mdi-message', to: '/messages' },
            ]
        }
        else {
          return []
        }
      }
    },
    watch: {
      visible () {
        if (this.breakPoint !== 'lg' && this.breakPoint !== 'xl' && !this.sideBar) {
          this.sideBar = this.$store.state.sidebar.visible
        }
      },
      sideBar () {
        if (this.sideBar === false) {
          this.$store.state.sidebar.visible = false
        }
        if (this.breakPoint === 'lg' && this.sideBar === true) {
          setTimeout(() => {
            document.getElementById("mainContent").style = 'padding: 48px 0px 0px 15% !important;'
            document.getElementById("navbar").style = 'height: 48px; margin-top: 0px; transform: translateY(0px); left:  15%; right: 0px !important;'
          }, 100);
        }
        if (this.breakPoint === 'md' && this.sideBar === true) {
          setTimeout(() => {
            document.getElementById("mainContent").style = 'padding: 48px 0px 0px 154px !important;'
            document.getElementById("navbar").style = 'height: 48px; margin-top: 0px; transform: translateY(0px); left:  154px; right: 0px !important;'
          }, 100);
        }
      },
    },
    methods: {
      changeStyles (state) {
        if (state === "expand") {
          document.getElementById("mainContent").style = `padding: 48px 0px 0px 15%;`
          document.getElementById("navbar").style = `height: 48px; margin-top: 0px; transform: translateY(0px); left: 15%; right: 0px;`
        } else {
          document.getElementById("mainContent").style = "padding: 48px 0px 0px 78px;"
          document.getElementById("navbar").style = "height: 48px; margin-top: 0px; transform: translateY(0px); left: 78px; right: 0px;"
        }
      }
    }
  }
</script>