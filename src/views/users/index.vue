<template>
  <div class="my-users-page bg-one d-flex justify-center">
    <div class="users-page-container d-flex flex-column">
      <div class="header">
        <div class="header-wrapper d-flex justify-space-between">
          <div class="heading col d-flex align-center">
            <div class="icon">
              <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25" fill="none">
                  <rect x="4.79248" y="0.93927" width="12.4343" height="12.4343" rx="6.21716" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.99325 15.1499C4.22031 15.1499 0.351074 19.0191 0.351074 23.7921V24.9197H21.667V23.7921C21.667 19.0191 17.7978 15.1499 13.0249 15.1499H8.99325Z"
                        fill="#193074"/>
                </svg>
              </div>
            </div>
            <div class="text-content">
              <h4>Dashboard</h4>
              <h2>Users List</h2>
            </div>
          </div>
          <div class="search col">
            <div class="search-wrapper">
              <!--              <search placeholder="Search user"/>-->
            </div>
          </div>
          <div class="add-user col d-flex justify-end">
            <div class="add-user-button">
              <button-ui @click="showInviteUsers = true">
                <template #content>Invite users</template>
              </button-ui>
            </div>
          </div>
        </div>
      </div>
      <div class="tabular-users all-users-table">
        <div class="table-wrapper mt-6" v-if="users.length > 0">
          <!--          {{ size }}-->
          <div class="table-header">
            <table-header>
              <template #actions>
                <div :class="{invisible:!size}" class="d-flex">
                  <div class="action mx-2" @click="click('announce')">
                    <table-action-burner>
                      <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                              d="M3.14576 1.55151L2.41437 0.80361C1.18685 1.76071 0.378734 3.23559 0.307129 4.90921H1.33006C1.40678 3.52324 2.10237 2.30987 3.14576 1.55151ZM9.48281 4.90921H10.5057C10.429 3.23559 9.62091 1.76071 8.39851 0.80361L7.67223 1.55151C8.70539 2.30987 9.40609 3.52324 9.48281 4.90921ZM8.47523 5.17071C8.47523 3.56508 7.63642 2.22096 6.17363 1.86531V1.50967C6.17363 1.07557 5.83095 0.725159 5.40644 0.725159C4.98192 0.725159 4.63924 1.07557 4.63924 1.50967V1.86531C3.17133 2.22096 2.33765 3.55985 2.33765 5.17071V7.78574L1.31472 8.83175V9.35476H9.49816V8.83175L8.47523 7.78574V5.17071ZM5.40644 10.9238C5.47804 10.9238 5.54453 10.9185 5.61102 10.9029C5.94347 10.8296 6.21455 10.5995 6.34753 10.2857C6.39868 10.1602 6.42425 10.0242 6.42425 9.87776H4.37839C4.38351 10.4531 4.83871 10.9238 5.40644 10.9238Z"
                              fill="#193074"/>
                        </svg>
                      </template>
                      <template #text>Send announcement</template>
                    </table-action-burner>
                  </div>
                  <!--                <div class="action mx-2" @click="click('invite')">-->
                  <!--                  <table-action-burner>-->
                  <!--                    <template #icon>-->
                  <!--                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">-->
                  <!--                        <path-->
                  <!--                            d="M12.0394 0.725159H1.84074C1.13959 0.725159 0.572292 1.29883 0.572292 1.99999L0.565918 9.64895C0.565918 10.3501 1.13959 10.9238 1.84074 10.9238H12.0394C12.7405 10.9238 13.3142 10.3501 13.3142 9.64895V1.99999C13.3142 1.29883 12.7405 0.725159 12.0394 0.725159ZM12.0394 3.27481L6.94005 6.46188L1.84074 3.27481V1.99999L6.94005 5.18705L12.0394 1.99999V3.27481Z"-->
                  <!--                            fill="#193074"/>-->
                  <!--                      </svg>-->
                  <!--                    </template>-->
                  <!--                    <template #text>Send invitations</template>-->
                  <!--                  </table-action-burner>-->
                  <!--                </div>-->
                  <div class="action mx-2" @click="click('delete')">
                    <table-action-burner>
                      <template #icon>
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M0.891564 10.2864C0.891564 10.9875 1.46524 11.5612 2.16639 11.5612H7.2657C7.96685 11.5612 8.54052 10.9875 8.54052 10.2864V2.63742H0.891564V10.2864ZM9.17794 0.725182H6.94699L6.30958 0.0877686H3.12251L2.4851 0.725182H0.25415V2.00001H9.17794V0.725182Z"
                              fill="#FF0808"/>
                        </svg>
                      </template>
                      <template #text>Delete account</template>
                    </table-action-burner>
                  </div>
                  <div class="action mx-2" @click="click('hold')">
                    <table-action-burner>
                      <template #icon>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M7.34168 1.30865C4.2141 1.30865 1.67578 3.84698 1.67578 6.97455C1.67578 10.1021 4.2141 12.6404 7.34168 12.6404C10.4693 12.6404 13.0076 10.1021 13.0076 6.97455C13.0076 3.84698 10.4693 1.30865 7.34168 1.30865ZM2.80896 6.97455C2.80896 4.47023 4.83735 2.44183 7.34168 2.44183C8.38987 2.44183 9.35307 2.79879 10.118 3.39937L3.7665 9.75084C3.16591 8.98595 2.80896 8.02274 2.80896 6.97455ZM7.34168 11.5073C6.29349 11.5073 5.33028 11.1503 4.56539 10.5497L10.9169 4.19826C11.5174 4.96316 11.8744 5.92636 11.8744 6.97455C11.8744 9.47888 9.846 11.5073 7.34168 11.5073Z"
                              fill="#FFAE34"/>
                        </svg>
                      </template>
                      <template #text>Hold account</template>
                    </table-action-burner>
                  </div>

                  <div class="action mx-2" @click="click('unhold')">
                    <table-action-burner>
                      <template #icon>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M7.34168 1.30865C4.2141 1.30865 1.67578 3.84698 1.67578 6.97455C1.67578 10.1021 4.2141 12.6404 7.34168 12.6404C10.4693 12.6404 13.0076 10.1021 13.0076 6.97455C13.0076 3.84698 10.4693 1.30865 7.34168 1.30865ZM2.80896 6.97455C2.80896 4.47023 4.83735 2.44183 7.34168 2.44183C8.38987 2.44183 9.35307 2.79879 10.118 3.39937L3.7665 9.75084C3.16591 8.98595 2.80896 8.02274 2.80896 6.97455ZM7.34168 11.5073C6.29349 11.5073 5.33028 11.1503 4.56539 10.5497L10.9169 4.19826C11.5174 4.96316 11.8744 5.92636 11.8744 6.97455C11.8744 9.47888 9.846 11.5073 7.34168 11.5073Z"
                              fill="#FFAE34"/>
                        </svg>
                      </template>
                      <template #text>Unhold account</template>
                    </table-action-burner>
                  </div>
                </div>
              </template>
            </table-header>
          </div>
          <!--          <div class="table">-->
          <!--            <table-ui :options="options" @select="handleSelect" :data="users"/>-->
          <!--          </div>-->
          <div class="table">
            <table-ui :options="options">
              <template #tableHeaderRow>
                <table-head-row @select="handleSelect" :cols="options.keysToShow"/>
              </template>

              <!--              rows-->
              <template #tableRows>
                <table-row :selected="selected_users.has(i)" @select="handleRowSelect(i)" :data="user"
                           v-for="(user, i) in users" :key="user._id" :ref="`row${i}`">
                  <template #cols>
                    <td @click="$router.push(`/users/${user.user_name}`)" class="row--image"
                        @mouseenter="mouseOnPic($event,user.user_name,'user-profile-card')"
                        @mouseleave="mouseOutPic($event,'user-profile-card')">
                      <img v-if="user.profile" :src="user.profile + '?width=50'" class="img" alt=" profile pic">
                      <v-avatar v-else size="30" class="profile-avatar img">
                        {{ `${user.sur_name} ${user.other_names}` | computeText }}
                      </v-avatar>
                    </td>
                    <td @click="$router.push(`/users/${user.user_name}`)"
                        @mouseenter="mouseOnPic($event,user.user_name,'user-profile-card')"
                        @mouseleave="mouseOutPic($event,'user-profile-card')">{{ user.sur_name }} {{ user.other_names }}
                    </td>
                    <td @click="$router.push(`/users/${user.user_name}`)" :title="user.email">
                      {{ user.email | trimString(18) }}
                    </td>
                    <td @click="$router.push(`/users/${user.user_name}`)">{{ user.user_name }}</td>
                    <td v-if="$store.state.sidebar_navbar.college.users_verification_link">
                      <div
                          :class="`payment-status ${user.category === 'STUDENT' ? user.paid ? 'paid' : 'pending' : 'free'}`">
                        {{ user.category === 'STUDENT' ? user.paid ? "Paid" : "Pending" : "Free" }}
                      </div>
                    </td>
                    <td @click="$router.push(`/users/${user.user_name}`)">{{ user.status }}</td>
                    <td @click="$router.push(`/users/${user.user_name}`)">{{ user.gender }}</td>
                  </template>
                </table-row>
              </template>
            </table-ui>
          </div>
        </div>
        <div v-else class="d-flex justify-center align-center loader">
          <img class="" src="https://kurious.rw/_nuxt/img/loader.059b462.gif" alt="lodading ...">
        </div>
      </div>
    </div>
    <invite-users-dialog
        v-if="showInviteUsers"
        @closeModal="showInviteUsers = false"
    />
  </div>
</template>

<script>
import buttonUi from '@/components/reusable/ui/button-ui'
// import Search from '@/components/reusable/Search2'
// import tableUi from '@/components/reusable/ui/table-ui'
import TableHeader from "../../components/reusable/ui/table-header";
import apis from "../../services/apis"
import tableActionBurner from '../../components/reusable/ui/table-action-burner'
import moment from 'moment'
import {mapActions, mapMutations} from "vuex";
import userSimpleCard from "../../mixins/user-simple-card.mixin";
import TableRow from "../../components/reusable/table/TableRow";
import TableHeadRow from "../../components/reusable/table/TableHeadRow";
import TableUi from "../../components/reusable/table/TableUi";

export default {
  name: "Users",
  components: {
    TableHeader, buttonUi,
    // Search,
    tableActionBurner, TableRow, TableHeadRow, TableUi,
    InviteUsersDialog: () => import("@/components/dashboard/InviteUsersDialog")
  },
  data() {
    return {
      users: [],
      size: 0,
      selected_users: new Set([]),
      showInviteUsers: false,
    }
  },
  computed: {
    options() {
      const options = {
        link: {
          routeTo: '/users/{id}',
          paramPropertyName: 'user_name'
        },
        keysToShow: this.$store.state.sidebar_navbar.college.users_verification_link ? [" ", "names", "email", "user_name", "Payment status", "status", "gender"] : [" ", "names", "email", "user_name", "status", "gender"],
        showSelect: true
      }

      return options
    }
  },
  mixins: [userSimpleCard],
  methods: {
    ...mapActions("modal", ["set_modal"]),
    ...mapMutations("users", ["SET_SELECTED_USERS"]),
    click(value) {
      if (!this.selected_users.size)
        return this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "please select atleast one user",
          status: "info",
          uptime: 5000,
        })

      if (value === 'announce') {
        let users = []

        if (this.selected_users.has(-1)) {
          users = this.users
        } else
          for (const item of this.selected_users) {
            users.push(this.users[item])
          }

        this.SET_SELECTED_USERS(users)
        this.$router.push('/announcements/new?target=individual')
      }

      if (value.includes('hold')) {
        const ids = []

        for (const item of this.selected_users) {
          ids.push(this.users[item].user_name)
        }

        this.set_modal({
          template: 'action_confirmation',
          title: "Hold accounts",
          method: {action: 'users/holdAccounts', parameters: {usernames: ids, hold: value === 'hold'}},
          message: `Are you sure you want to ${value === 'hold' ? '' : 'un'}hold ${this.selected_users.has(-1) ? 'All' : this.selected_users.size} user${this.selected_users.size > 1 || this.selected_users.has(-1) ? 's' : ''}?`,
        })

      } else if (value === 'delete') {
        const ids = []

        for (const item of this.selected_users) {
          ids.push(this.users[item]._id)
        }

        this.set_modal({
          template: 'action_confirmation',
          title: "Delete accounts",
          method: {action: 'users/deleteAccounts', parameters: {ids}},
          message: `Are you sure you want to delete ${this.selected_users.has(-1) ? 'All' : this.selected_users.size} user${this.selected_users.size > 1 || this.selected_users.has(-1) ? 's' : ''}?`,
        })
      }
      setTimeout(() => {
        this.loadUsers();
      }, 5000);
    },
    handleSelect(value) {
      for (const i in this.users) {
        if (value.has(-1)) {
          if (!this.$refs[`row${i}`][0].selectSelected)
            this.$refs[`row${i}`][0].changeSelectedIndex()
        } else if (this.$refs[`row${i}`][0].selectSelected)
          this.$refs[`row${i}`][0].changeSelectedIndex()
      }
      this.size = this.users.length
      this.selected_users = value
    },
    handleRowSelect(index) {
      const found = this.selected_users.has(index)
      if (found) {
        this.selected_users.delete(index)
        this.size--
      } else {
        this.selected_users.add(index)
        this.size++
      }
      this.$refs[`row${index}`][0].changeSelectedIndex()
    },
    loadUsers() {
      this.users = []
      apis.get(`user/college/ALL`)
          .then(({data: {data}}) => {
            let filteredUsers = [];

            data.map(user => {
              user.names = user.sur_name + ' ' + user.other_names
              user.createdAt = moment(user.createdAt).format("DD MMM  YYYY")
              user.updatedAt = moment(user.updatedAt).format("DD MMM YYYY")
              user.status = user.status.disabled ? 'INACTIVE' : 'ACTIVE';

              filteredUsers.push(user)
            })
            this.users = filteredUsers;
          })
          .catch(err => {
            this.$store.dispatch("app_notification/SET_NOTIFICATION", {
              message: err,
              status: "danger",
              uptime: 2000,
            })
          })
    }
  },
  created() {
    this.loadUsers();
  }
}
</script>

<style lang="scss" scoped>
.my-users-page {
  height: 100%;
  width: 100%;

  .users-page-container {
    height: 100%;
    width: 90%;

    .header {
      @include admin-page-header;

    }

    .invisible {
      visibility: hidden;
    }

    .loader {
      height: 60vh;
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-users-page {
    .users-page-container {
      .all-users-table {
        overflow: auto;

        .table-wrapper {
          min-width: 945px;
          overflow: auto;
        }
      }
    }
  }
}
</style>