<template>
  <v-app id="admin-dashboard" class="smooth--background">
      <h2>Welcome, <strong>Ahmed Mugu</strong></h2>
      <v-row>
          <v-col class="col-md-3 col-12">
              <v-card class="details-card">
                  <v-row>
                      <v-col class="col-4">
                          <v-icon>
                              mdi-account-outline
                          </v-icon>
                      </v-col>
                      <v-col class="col-8">
                          <h4>Users</h4>
                          <p><strong>200</strong></p>
                      </v-col>
                  </v-row>
              </v-card>
              <v-card class="details-card">
                  <v-row>
                      <v-col class="col-4">
                          <v-icon>mdi-table-chair</v-icon>
                      </v-col>
                      <v-col class="col-8">
                          <h4>Classes</h4>
                          <p><strong>20</strong></p>
                      </v-col>
                  </v-row>
              </v-card>
          </v-col>
          <v-col class="col-md-3 col-12">
              <v-card class="details-card">
                  <v-row>
                      <v-col class="col-4">
                          <v-icon>mdi-account-supervisor-outline</v-icon>
                      </v-col>
                      <v-col class="col-8">
                          <h4>Student Groups</h4>
                          <p><strong>8</strong></p>
                      </v-col>
                  </v-row>
              </v-card>
              <v-card class="details-card">
                  <v-row>
                      <v-col class="col-4">
                          <v-icon>mdi-bookshelf</v-icon>
                      </v-col>
                      <v-col class="col-8">
                          <h4>Courses</h4>
                          <p><strong>16</strong></p>
                      </v-col>
                  </v-row>
              </v-card>
          </v-col>
          <v-col class="col-md-3 col-12">
              <v-card class="details-card">
                  <v-row>
                      <v-col class="col-4">
                          <v-icon>mdi-wallet-outline</v-icon>
                      </v-col>
                      <v-col class="col-8">
                          <h4>Payment history</h4>
                          <p><strong>16</strong></p>
                      </v-col>
                  </v-row>
              </v-card>
          </v-col>
          <v-col class="col-md-3 col-12">
              <v-card class="school-card">
                   <v-row>
                       <v-col class="col-12"><h1>A</h1></v-col>
                       <v-col class="col-12">
                           <h5>African Leadership University</h5>
                           <v-btn rounded>View school details</v-btn>
                        </v-col>
                   </v-row>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-card class="users-table">
            <v-card-title>
            Users
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-btn rounded><v-icon>mdi-account-plus-outline</v-icon> Add new user</v-btn>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    sort-by="name"
                >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        color="success"
                        @click="$router.push(`reports/submissions/${item.name}`)"
                    >
                        mdi-account-edit
                    </v-icon>
                    <v-icon
                        small
                        color="error"
                        @click="$router.push(`reports/submissions/${item.name}`)"
                    >
                        mdi-delete
                    </v-icon>
                    <v-icon
                        small
                        color="warning"
                        @click="$router.push(`reports/submissions/${item.name}`)"
                    >
                        mdi-eye
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
      </v-row>
  </v-app>
</template>

<script>
export default {
    data: ()=>({
        headers: [
        {
          text: 'Names',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Type', value: 'type', },
        { text: 'Gender', value: 'gender', },
        { text: 'Faculty', value: 'faculty', },
        { text: 'Group', value: 'group', },
        { text: 'Date Added', value: 'date', },
        { text: 'Action', value: 'actions', sortable: false,align: 'center' },
      ],
      items: [
        {
          name: 'Twahirwa Tonny',
          type: 'Teacher',
          gender: 'Male',
          faculty: 'Business Management',
          group: 'Teachers',
          date: '02/12/2020'
        },
        {
          name: 'Umutoni Fredine',
          type: 'Student',
          gender: 'Female',
          faculty: 'Business Management',
          group: 'Year 1',
          date: '26/12/2020'
        },
        {
          name: 'Mugabo James',
          type: 'Student',
          gender: 'Male',
          faculty: 'Language and Literature',
          group: 'Year 3',
          date: '22/11/2020'
        },
        {
          name: 'Mutamba Fred',
          type: 'Teacher',
          gender: 'Male',
          faculty: 'Computer Science',
          group: 'Teachers',
          date: '13/11/2020'
        },
      ]
    })

}
</script>

<style>

</style>