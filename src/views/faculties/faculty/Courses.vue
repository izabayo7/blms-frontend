<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6" v-if="courses.length > 0">

<!--          table header-->
          <div class="table-header">
            <table-header />
          </div>

<!--          list of courses in table form-->
          <div class="table">
            <table-ui :options="options" :data="courses"/>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/ui/table-ui";
import {mapGetters} from "vuex";

export default {
  //TODO using dynamic students from backend
name: "FacultyCourses",
  components: {TableUi, TableHeader},
  data(){
    return{
      courses:[],
      options:{
        keysToShow:[ "name",  "published",  "status",  "updatedAt",  "createdAt"]
      }
    }
  },
  computed:{
    ...mapGetters('faculties',['faculties']),
    faculty(){
      return this.faculties
    }
  },
  methods:{

  },
  mounted(){
    this.$store.dispatch('faculties/changeHeader',{head:this.faculty.name,title:"Courses List"})

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

  }
}
</style>