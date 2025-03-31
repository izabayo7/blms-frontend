<template>
<main class="faculty">
  <main class="faculty--wrapper">

<!--    faculty page information/overview-->
    <section class="faculty--information information">
      <section class="faculty--information--wrapper d-flex " v-if="faculty">

<!--        column 1-->
        <article class="faculty--information--col__1 faculty--information--col col-4">
          <div class="information--faculty-details">
            <div class="information--faculty-details--header">
              <h2>{{faculty.name}}</h2>
            </div>
            <div class="information--faculty-details--paragraph">
              <p v-if="faculty.description">{{faculty.description}}</p>
              <small v-else>No description</small>
            </div>
          </div>
        </article>

<!--        column 2-->
        <article class="faculty--information--col__2 faculty--information--col col-8">
          <div class="faculty--details">

<!--            row one for cards-->
            <article class="faculty--details--row__1 faculty--details--row">
              <div class="faculty--information-cards d-flex justify-space-between">

<!--                card 1-->
                <router-link to="">
                  <div class="faculty--information-card__1 faculty--information-card">
                    <div class="faculty--information-card--wrapper d-flex flex-column align-center">
                      <div class="faculty--information-card--icon faculty--information-card--inner-row">
                        <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M37.8387 15.542C41.9726 15.542 45.2848 12.205 45.2848 8.07107C45.2848 3.93713 41.9726 0.600098 37.8387 0.600098C33.7048 0.600098 30.3677 3.93713 30.3677 8.07107C30.3677 12.205 33.7048 15.542 37.8387 15.542ZM17.9161 15.542C22.0501 15.542 25.3622 12.205 25.3622 8.07107C25.3622 3.93713 22.0501 0.600098 17.9161 0.600098C13.7822 0.600098 10.4452 3.93713 10.4452 8.07107C10.4452 12.205 13.7822 15.542 17.9161 15.542ZM17.9161 20.5227C12.1137 20.5227 0.483871 23.4364 0.483871 29.2388V35.4646H35.3484V29.2388C35.3484 23.4364 23.7186 20.5227 17.9161 20.5227ZM37.8387 20.5227C37.1165 20.5227 36.2947 20.5725 35.4231 20.6472C38.3119 22.7391 40.329 25.5531 40.329 29.2388V35.4646H55.271V29.2388C55.271 23.4364 43.6412 20.5227 37.8387 20.5227Z" fill="#193074"/>
                        </svg>
                      </div>
                      <div class="faculty--information-card--number faculty--information-card--inner-row"> {{faculty.attendants}} </div>
                      <div class="faculty--information-card--text faculty--information-card--inner-row"> Users </div>
                    </div>
                  </div>
                </router-link>

<!--                card 2-->
                <router-link to="">
                  <div class="faculty--information-card__2 faculty--information-card">
                    <div class="faculty--information-card--wrapper d-flex flex-column align-center">
                      <div class="faculty--information-card--icon faculty--information-card--inner-row">
                        <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M37.8387 15.542C41.9726 15.542 45.2848 12.205 45.2848 8.07107C45.2848 3.93713 41.9726 0.600098 37.8387 0.600098C33.7048 0.600098 30.3677 3.93713 30.3677 8.07107C30.3677 12.205 33.7048 15.542 37.8387 15.542ZM17.9161 15.542C22.0501 15.542 25.3622 12.205 25.3622 8.07107C25.3622 3.93713 22.0501 0.600098 17.9161 0.600098C13.7822 0.600098 10.4452 3.93713 10.4452 8.07107C10.4452 12.205 13.7822 15.542 17.9161 15.542ZM17.9161 20.5227C12.1137 20.5227 0.483871 23.4364 0.483871 29.2388V35.4646H35.3484V29.2388C35.3484 23.4364 23.7186 20.5227 17.9161 20.5227ZM37.8387 20.5227C37.1165 20.5227 36.2947 20.5725 35.4231 20.6472C38.3119 22.7391 40.329 25.5531 40.329 29.2388V35.4646H55.271V29.2388C55.271 23.4364 43.6412 20.5227 37.8387 20.5227Z" fill="#193074"/>
                        </svg>
                      </div>
                      <div class="faculty--information-card--number faculty--information-card--inner-row"> {{faculty.total_student_groups}} </div>
                      <div class="faculty--information-card--text faculty--information-card--inner-row"> Students Groups </div>
                    </div>
                  </div>
                </router-link>

<!--                card 3-->
                <router-link to="">
                  <div class="faculty--information-card__3 faculty--information-card">
                    <div class="faculty--information-card--wrapper d-flex flex-column align-center">
                      <div class="faculty--information-card--icon faculty--information-card--inner-row">
                        <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M37.8387 15.542C41.9726 15.542 45.2848 12.205 45.2848 8.07107C45.2848 3.93713 41.9726 0.600098 37.8387 0.600098C33.7048 0.600098 30.3677 3.93713 30.3677 8.07107C30.3677 12.205 33.7048 15.542 37.8387 15.542ZM17.9161 15.542C22.0501 15.542 25.3622 12.205 25.3622 8.07107C25.3622 3.93713 22.0501 0.600098 17.9161 0.600098C13.7822 0.600098 10.4452 3.93713 10.4452 8.07107C10.4452 12.205 13.7822 15.542 17.9161 15.542ZM17.9161 20.5227C12.1137 20.5227 0.483871 23.4364 0.483871 29.2388V35.4646H35.3484V29.2388C35.3484 23.4364 23.7186 20.5227 17.9161 20.5227ZM37.8387 20.5227C37.1165 20.5227 36.2947 20.5725 35.4231 20.6472C38.3119 22.7391 40.329 25.5531 40.329 29.2388V35.4646H55.271V29.2388C55.271 23.4364 43.6412 20.5227 37.8387 20.5227Z" fill="#193074"/>
                        </svg>
                      </div>
                      <div class="faculty--information-card--number faculty--information-card--inner-row"> {{ faculty.total_courses  }} </div>
                      <div class="faculty--information-card--text faculty--information-card--inner-row"> Courses </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </article>

<!--            row two for dean/instructor information-->
            <article class="faculty--details--row__2 faculty--details--row">
              <article class="faculty--dean-information">
                <div class="faculty--dean-header">
                  <h3>Dean Instructor</h3>
                </div>
                <div class="faculty--dean-name">
                  <h3 v-if="true" class="instructor">Ntwari Clarance Liberi</h3>
                  <h3 v-else class="no-instructor">Not assigned</h3>
                </div>
                <div class="faculty--dean-note">
                  <p>Please visit the administration tab and assign a dean for this faculty</p>
                </div>
              </article>
            </article>
          </div>
        </article>
      </section>
    </section>
  </main>
</main>
</template>

<script>

import {mapGetters} from 'vuex';

// attendants:7
// createdAt:"2020-10-20T20:34:47.334Z"
// name:"Software Engineering"
// total_courses:5
// total_student_groups:1
// total_students:7

export default {
name: "Faculty",
  data(){
    return{
      facultyId:this.$route.params.facultyId,
    }
  },
  computed:{
    ...mapGetters('faculties',{
      faculty:'faculties',
    }),
    // faculty(){
    //   return this.faculties
    // }
  },
  methods:{
  },
  async created(){
      await this.$store.dispatch("faculties/getFaculties",this.facultyId)
  }
}
</script>

<style lang="scss" scoped>
.faculty{
  &--wrapper{
    background:$tertiary;

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