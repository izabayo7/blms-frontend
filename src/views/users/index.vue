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
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99325 15.1499C4.22031 15.1499 0.351074 19.0191 0.351074 23.7921V24.9197H21.667V23.7921C21.667 19.0191 17.7978 15.1499 13.0249 15.1499H8.99325Z" fill="#193074"/>
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
              <search  placeholder="Search user"/>
            </div>
          </div>
          <div class="add-user col d-flex justify-end">
            <div class="add-user-button">
              <button-ui>
                <template #content>Add user</template>
              </button-ui>
            </div>
          </div>
        </div>
      </div>
      <div class="tabular-users">
        <div class="table-wrapper mt-6" v-if="users.length > 0">
          <div class="table-header">
            <table-header />
          </div>
          <div class="table">
            <table-ui :options="options" :data="users"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonUi from '@/components/reusable/ui/button-ui'
import Search from '@/components/reusable/Search2'
import tableUi from '@/components/reusable/ui/table-ui'
import TableHeader from "../../components/reusable/ui/table-header";
import apis from "../../services/apis"
import moment from 'moment'

export default {
  name: "Users",
  components:{TableHeader, buttonUi,Search,tableUi},
  data(){
    return {
      users:[],
      options:{
          link: {
              RouteTo:'/users/user/{id}',
              paramPropertyName:'_id'
            },
          keysToShow:[ "sur_name", "other_names", "email", "user_name","status", "gender"]
        },
    }
  },
  methods:{
    loadUsers(){
      apis.get("user")
        .then(({data:{data}}) => {
          let filteredUsers = [];

          data.map(user => {
            console.log();

            user.createdAt = moment(user.createdAt).format("DD MMM  YYYY")
            user.updatedAt = moment(user.updatedAt).format("DD MMM YYYY")
            user.status = user.status.disabled ? 'INACTIVE' : 'ACTIVE';

            filteredUsers.push(user)
          })
          this.users = filteredUsers;
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created(){
    this.loadUsers();
  }
}
</script>

<style lang="scss" scoped>
.my-users-page{
  height: 100%;
  width:100%;

  .users-page-container{
    height: 100%;
    width:90%;

    .header{
      @include admin-page-header;

    }

  }
}
</style>