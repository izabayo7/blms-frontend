<template>
<div class="my-faculties bg-one d-flex justify-center">
  <div class="faculties-container  ">
      <div class="header">
        <div class="header-wrapper d-flex ">
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
              <h2>Students List</h2>
            </div>
          </div>
          <div class="search col">
            <div class="search-wrapper">
              <search  placeholder="Search user"/>
            </div>
          </div>
          <div class="add-user d-flex justify-end col">
            <div class="add-user-button">
              <button-ui>
                <template #content>Create faculty</template>
              </button-ui>
            </div>
          </div>
        </div>
      </div>
      <div class="tabular-users">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header />
          </div>
          <div class="table">
            <table-ui :data="faculties"/>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import buttonUi from '@/components/reusable/ui/button-ui'
import Search from "../../components/reusable/Search2";
import TableHeader from "../../components/reusable/ui/table-header";
import TableUi from "../../components/reusable/ui/table-ui";

export default {
name: "Faculties",
  components: {TableUi, TableHeader, Search, buttonUi},
  data(){
    return{
      faculties:[
        {"Faculty Name":"Computer Science","Student groups":4, "Students":124, "Courses":12 ,"Created on":"today"},
        {"Faculty Name":"Language and arts","Student groups":9, "Students":64, "Courses":4 ,"Created on":"12/12/2020"},
        {"Faculty Name":"Curious learners","Student groups":3, "Students":13, "Courses":16 ,"Created on":"12/5/2020"},
        {"Faculty Name":"Communication design","Student groups":5, "Students":34, "Courses":1 ,"Created on":"13/12/2021"},
        {"Faculty Name":"Computer Science","Student groups":1, "Students":76, "Courses":20 ,"Created on":"3/10/2019"},
      ]
    }
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