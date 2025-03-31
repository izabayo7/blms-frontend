<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header />
          </div>
          <div class="table">
            <table-ui :data="students" :options="options"/>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/ui/table-ui";

export default {
  //TODO using dynamic students from backend
name: "FacultyUsers",
  components: {TableUi, TableHeader,},
  data(){
    return{
      faculty:{},
      students:[],
      options:{
        keysToShow:[ "name",  "published",  "status",  "updatedAt",  "createdAt"]
      }
    }
  },
  created(){
    console.log('users')
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