<template>
  <div class="my-faculties bg-one d-flex justify-center">
    <div class="faculties-container  ">
      <div v-if="usersOnFaculties.length > 0" class="tabular-users">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header/>
          </div>

          <div class="table">
            <table-ui :options="options">
              <template #tableHeaderRow>
                <table-head-row @select="selectAll" :cols="options.keysToShow"/>
              </template>

              <!--              rows-->
              <template #tableRows>
                <table-row :options="options" :selected="allSelected" @select="selectRow($event, user)" :data="user"
                           v-for="user in usersOnFaculties" :key="user._id">
                  <template #cols>
                    <td class="row--image" @mouseenter="mouseOnPic($event,user.user_name,'user-profile-card')"
                        >
                      <img v-if="user.profile" :src="user.profile + '?width=50'" class="img" alt=" profile pic">
                      <v-avatar v-else size="30" class="profile-avatar img">
                        {{ `${user.sur_name} ${user.other_names}` | computeText }}
                      </v-avatar>
                    </td>
                    <td @mouseenter="mouseOnPic($event,user.user_name,'user-profile-card')"
                        >{{ user.sur_name }} {{ user.other_names }}
                    </td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.gender }}</td>
                  </template>
                </table-row>
              </template>
            </table-ui>
          </div>
        </div>
      </div>
      <div v-else class="empty-faculties">
        <div class="wrapper">
          <div class="icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3622_440)">
                <path d="M41.0715 25.6245H37.3594C37.7378 26.6605 37.9445 27.7784 37.9445 28.9436V42.9734C37.9445 43.4592 37.8599 43.9255 37.7061 44.3592H43.843C46.1355 44.3592 48.0005 42.4941 48.0005 40.2017V32.5535C48.0006 28.7329 44.8922 25.6245 41.0715 25.6245Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M10.0564 28.9436C10.0564 27.7783 10.2631 26.6605 10.6415 25.6245H6.92932C3.10863 25.6245 0.000244141 28.7329 0.000244141 32.5536V40.2018C0.000244141 42.4942 1.86522 44.3593 4.15769 44.3593H10.2948C10.1409 43.9254 10.0564 43.4592 10.0564 42.9734V28.9436Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M28.244 22.0132H19.7576C15.9369 22.0132 12.8285 25.1216 12.8285 28.9423V42.972C12.8285 43.7373 13.4489 44.3578 14.2143 44.3578H33.7873C34.5527 44.3578 35.1731 43.7373 35.1731 42.972V28.9423C35.1731 25.1216 32.0647 22.0132 28.244 22.0132Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M24.0001 3.6416C19.4052 3.6416 15.667 7.3798 15.667 11.9748C15.667 15.0915 17.3872 17.8135 19.9277 19.2427C21.1326 19.9205 22.5218 20.3079 24.0001 20.3079C25.4783 20.3079 26.8675 19.9205 28.0725 19.2427C30.613 17.8135 32.3331 15.0914 32.3331 11.9748C32.3331 7.37989 28.595 3.6416 24.0001 3.6416Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M9.36778 11.4087C5.93137 11.4087 3.13574 14.2043 3.13574 17.6407C3.13574 21.0771 5.93137 23.8728 9.36778 23.8728C10.2395 23.8728 11.0695 23.6922 11.8236 23.3677C13.1273 22.8064 14.2022 21.8128 14.8674 20.5683C15.3342 19.6948 15.5998 18.6983 15.5998 17.6407C15.5998 14.2044 12.8042 11.4087 9.36778 11.4087Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M38.6332 11.4087C35.1968 11.4087 32.4011 14.2043 32.4011 17.6407C32.4011 18.6984 32.6667 19.6949 33.1336 20.5683C33.7988 21.8129 34.8737 22.8065 36.1774 23.3677C36.9314 23.6922 37.7615 23.8728 38.6332 23.8728C42.0696 23.8728 44.8652 21.0771 44.8652 17.6407C44.8652 14.2043 42.0696 11.4087 38.6332 11.4087Z" fill="#3C3C3C" fill-opacity="0.51"/>
              </g>
              <defs>
                <clipPath id="clip0_3622_440">
                  <rect width="48" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="title">No users</div>
          <div class="subtitle">You can invite users to this <br>
            faculty by clicking on
          </div>
          <button  class="action">
            Invite users
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/table/TableUi";
import {mapGetters} from "vuex";
import TableHeadRow from "../../../components/reusable/table/TableHeadRow";
import TableRow from "../../../components/reusable/table/TableRow";
import userSimpleCard from "../../../mixins/user-simple-card.mixin"

export default {
  //TODO using dynamic students from backend
  name: "FacultyUsers",
  components: { TableRow, TableHeadRow, TableUi, TableHeader},
  mixins: [userSimpleCard],
  data() {
    return {
      students: [],
      facultyId: this.$route.params.facultyId,
      allSelected: false,
      options: {
        coloredRows: false,
        link: {
          routeTo: '/users/{id}',
          paramPropertyName: 'user_name'
        },
        keysToShow: [" ", "names", "email", "gender"],
      },
      selectedUsers: [],
      timeout: "",
    }
  },
  computed: {
    ...mapGetters('faculties', ['faculty']),
    ...mapGetters('users', ['usersOnFaculties']),
  },
  methods: {
    selectAll() {
      this.allSelected = !this.allSelected
    },
    selectRow() {
      const map = new Set();

      map.add()
    }
  },
  watch: {
    faculty() {
      this.$store.dispatch('users/loadUsersBasedOnFaculties', {facultyId: this.faculty._id, category: "STUDENT"})
    }
  },
  async mounted() {

    await this.$store.dispatch("faculties/getFaculty", this.facultyId)
    await this.$store.dispatch('faculties/changeHeader', {title: "Users List"})
    if (this.faculty)
      this.$store.dispatch('users/loadUsersBasedOnFaculties', {facultyId: this.faculty._id, category: "ALL"})
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/sass/imports/tableEmptyState';
.my-faculties {
  height: 100%;
  width: 100%;

  .faculties-container {
    height: 100%;
    width: 90%;

    .header {
      @include admin-page-header;
    }

  }
}
</style>