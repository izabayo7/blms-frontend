<template>
<main class="faculty">
  <main class="faculty--wrapper">

<!--    faculty page header-->
    <section class="faculty--header header ">
      <div class="header--wrapper d-flex">
        <div class="heading col d-flex align-center">
            <div class="icon">
              <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="38" viewBox="0 0 49 38" fill="none">
                  <rect x="36.2266" y="10.3643" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.916 28.3897H48.8837C48.5444 24.2775 45.0995 21.046 40.8998 21.046C36.7002 21.046 33.2553 24.2775 32.916 28.3897Z" fill="#193074"/>
                  <rect x="26.8804" y="0.350098" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <rect x="14.1958" y="0.350098" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <rect x="4.18213" y="10.3643" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.871582 28.3895H16.8392C16.5 24.2774 13.0551 21.0459 8.85541 21.0459C4.65574 21.0459 1.21083 24.2774 0.871582 28.3895Z" fill="#193074"/>
                  <rect x="20.2056" y="19.0428" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8926 37.0682H32.8602C32.521 32.956 29.0761 29.7245 24.8764 29.7245C20.6767 29.7245 17.2318 32.956 16.8926 37.0682Z" fill="#193074"/>
                </svg>
              </div>
            </div>
            <div class="text-content">
              <h4>{{header.head}}</h4>
              <h2>{{ header.title }}</h2>
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
    </section>

<!--    faculty page links/navbar-->
    <section class="faculty--links links">
      <section class="links--wrapper">
        <faculty-navbar/>
      </section>
    </section>

<!--    subpages router view-->
    <section>
      <router-view></router-view>
    </section>
  </main>
</main>
</template>

<script>
import FacultyNavbar from "../../../components/reusable/faculty-navbar";
import Search from "../../../components/reusable/Search2";
import ButtonUi from "../../../components/reusable/ui/button-ui";
import {mapGetters} from "vuex";
export default {
name: "FacultyIndex",
  components: {ButtonUi, Search, FacultyNavbar},
  data(){
    return{
      facultyId:this.$route.params.facultyId
    }
  },
  computed:{
    ...mapGetters('faculties',['header']),
  },
  created(){

    // only route when we are not on children routes
    if(this.$route.path.split("/").length < 3){
      this.$router.replace({path:`/faculties/${this.facultyId}/details`})
    }
  },
}
</script>

<style lang="scss" scoped>
.faculty{
  height:100%;

  &--wrapper{
    background:$tertiary;
    height:100%;

  }

  &--header{
    @include admin-page-header;
  }

  &--links{
    &.links{
      &--wrapper{

      }
    }
  }

  &--information{
    &--wrapper{
      background-color:$main;
      padding-top:5rem;
      padding-left:3rem;

    }

    &--col{

      &__1{

      }
      &__2{

      }
    }

  }



  &--details--row{
    &__1{

    }
    &__2{

    }
  }

  &--information-cards{
    padding:0 5rem;
  }



  &--information-card{
    width:12rem;
    height:12rem;
    border:2px solid $secondary;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;

    &--wrapper{

    }

    &--inner-row{
      padding:.5rem 0;
    }

    &:hover{
      background-color:$primary;
      border:none;
      box-shadow: 0 0 10px 1px lighten($primary, 60);

      *{
        color:$main;
        fill:$main;
      }

    }

    &__1{

    }
    &__2{

    }
  }

  &--dean-information{
    padding:0 5rem;
  }


  &--dean-information{
    margin-top:3rem;
  }

  &--dean-header{
    h3{
      font-weight: 500;
      text-decoration: underline;
    }
  }

  &--dean-name{
    margin:.7rem 0;
    h3{
      font-size:1.1rem;
      font-weight:normal;
    }
  }

  &--dean-note{
    p{
      font-size:.6rem;
    }
  }

}
.information{
  &--faculty-details{
    &--header{
      h2{
        font-size:2rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>