<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div id="user-profile-card">
          <user-simple-card >
            <template #name>Ntwari Clarance</template>
            <template #type>Instructor</template>
            <template #image><img src="https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg?ssl=1" alt=" profile pic"></template>
          </user-simple-card>
        </div>
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header />
          </div>
<!--          <div class="table" v-if="usersOnFaculties.length > 0">-->
<!--            <table-ui :data="usersOnFaculties" :options="options"/>-->
<!--          </div>-->

          <div class="table">
            <table-ui :options="options">
              <template #tableHeaderRow>
                <table-head-row @select="selectAll" :cols="options.keysToShow" />
              </template>

<!--              rows-->
              <template #tableRows>
                <table-row :selected="allSelected" @select="selectRow($event, user)" :data="user" v-for="user in usersOnFaculties" :key="user._id">
                  <template #cols>
                    <td class="row--image" @mouseenter="mouseOnPic($event,user._id)" @mouseleave="mouseOutPic"><img src="https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg?ssl=1" alt=" profile pic"></td>
                    <td >{{user.sur_name}}</td>
                    <td>{{user.other_names}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.gender}}</td>
                  </template>
                </table-row>
              </template>
            </table-ui>
          </div>
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
import UserSimpleCard from "../../../components/reusable/user-simple-card";
import userSimpleCard from "../../../mixins/user-simple-card.mixin"

export default {
  //TODO using dynamic students from backend
name: "FacultyUsers",
  components: {UserSimpleCard, TableRow, TableHeadRow, TableUi, TableHeader,},
  mixins:[userSimpleCard],
  data(){
    return{
      students:[],
      allSelected:false,
      facultyId:this.$route.params.facultyId,
      options:{
        coloredRows:false,
        keysToShow:[" ", "sur_name",  "other_names",  "email",  "gender"]
      },
      selectedUsers:[],
      timeout:"",
      card : document.getElementById("user-profile-card")
    }
  },
  computed:{
    ...mapGetters('faculties',['faculties']),
    ...mapGetters('users',['usersOnFaculties']),
    faculty(){
      return this.faculties
    },
  },
  methods:{
    hovered(){
      console.log('hovered')
    },
    selectAll(){
      this.allSelected = !this.allSelected
    },
    selectRow(){
      const map = new Set();

      map.add()
    }
  },
  async mounted(){

  // if there is no faculty loaded load it based on this route id
    if(this.faculty.length <= 0)
      await this.$store.dispatch("faculties/getFaculties",this.facultyId)

    await this.$store.dispatch('faculties/changeHeader',{head:this.faculty.name,title:"Users List"})

    await this.$store.dispatch('users/loadUsersBasedOnFaculties',{facultyId:this.faculty._id,category:"STUDENT"})

  }
}
</script>

<style lang="scss" scoped>
.my-faculties{
  height: 100%;
  width:100%;

  .faculties-container{
    height: 100%;
    width:90%;

    .header{
      @include admin-page-header;
    }

    #user-profile-card{
      position:absolute;
      z-index:1;
    }

  }
}
</style>