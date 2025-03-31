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
              <h4>Dashboard</h4>
              <h2>Faculties List</h2>
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
        <subpage-navbar/>
      </section>
    </section>

<!--    faculty page information/overview-->
    <section class="faculty--information information">
      <section class="faculty--information--wrapper d-flex ">

<!--        column 1-->
        <article class="faculty--information--col__1 faculty--information--col col-4">
          <div class="information--faculty-details">
            <div class="information--faculty-details--header">
              <h2>Communication design</h2>
            </div>
            <div class="information--faculty-details--paragraph">
              <p>Communication Design and Management Program aims to train creative and fully-equipped professionals who are able to manage the outcomes of communication, design and management areas for the benefit of end-users. </p>
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
                <div class="faculty--information-card__1 faculty--information-card">
                  <div class="faculty--information-card--wrapper d-flex flex-column align-center">
                    <div class="faculty--information-card--icon faculty--information-card--inner-row">
                      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.8387 15.542C41.9726 15.542 45.2848 12.205 45.2848 8.07107C45.2848 3.93713 41.9726 0.600098 37.8387 0.600098C33.7048 0.600098 30.3677 3.93713 30.3677 8.07107C30.3677 12.205 33.7048 15.542 37.8387 15.542ZM17.9161 15.542C22.0501 15.542 25.3622 12.205 25.3622 8.07107C25.3622 3.93713 22.0501 0.600098 17.9161 0.600098C13.7822 0.600098 10.4452 3.93713 10.4452 8.07107C10.4452 12.205 13.7822 15.542 17.9161 15.542ZM17.9161 20.5227C12.1137 20.5227 0.483871 23.4364 0.483871 29.2388V35.4646H35.3484V29.2388C35.3484 23.4364 23.7186 20.5227 17.9161 20.5227ZM37.8387 20.5227C37.1165 20.5227 36.2947 20.5725 35.4231 20.6472C38.3119 22.7391 40.329 25.5531 40.329 29.2388V35.4646H55.271V29.2388C55.271 23.4364 43.6412 20.5227 37.8387 20.5227Z" fill="#193074"/>
                      </svg>
                    </div>
                    <div class="faculty--information-card--number faculty--information-card--inner-row"> 68 </div>
                    <div class="faculty--information-card--text faculty--information-card--inner-row"> Users </div>
                  </div>
                </div>

<!--                card 2-->
                <div class="faculty--information-card__2 faculty--information-card">
                  <div class="faculty--information-card--wrapper d-flex flex-column align-center">
                    <div class="faculty--information-card--icon faculty--information-card--inner-row">
                      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.8387 15.542C41.9726 15.542 45.2848 12.205 45.2848 8.07107C45.2848 3.93713 41.9726 0.600098 37.8387 0.600098C33.7048 0.600098 30.3677 3.93713 30.3677 8.07107C30.3677 12.205 33.7048 15.542 37.8387 15.542ZM17.9161 15.542C22.0501 15.542 25.3622 12.205 25.3622 8.07107C25.3622 3.93713 22.0501 0.600098 17.9161 0.600098C13.7822 0.600098 10.4452 3.93713 10.4452 8.07107C10.4452 12.205 13.7822 15.542 17.9161 15.542ZM17.9161 20.5227C12.1137 20.5227 0.483871 23.4364 0.483871 29.2388V35.4646H35.3484V29.2388C35.3484 23.4364 23.7186 20.5227 17.9161 20.5227ZM37.8387 20.5227C37.1165 20.5227 36.2947 20.5725 35.4231 20.6472C38.3119 22.7391 40.329 25.5531 40.329 29.2388V35.4646H55.271V29.2388C55.271 23.4364 43.6412 20.5227 37.8387 20.5227Z" fill="#193074"/>
                      </svg>
                    </div>
                    <div class="faculty--information-card--number faculty--information-card--inner-row"> 4 </div>
                    <div class="faculty--information-card--text faculty--information-card--inner-row"> Students Groups </div>
                  </div>
                </div>

<!--                card 3-->
                <div class="faculty--information-card__3 faculty--information-card">
                  <div class="faculty--information-card--wrapper d-flex flex-column align-center">
                    <div class="faculty--information-card--icon faculty--information-card--inner-row">
                      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.8387 15.542C41.9726 15.542 45.2848 12.205 45.2848 8.07107C45.2848 3.93713 41.9726 0.600098 37.8387 0.600098C33.7048 0.600098 30.3677 3.93713 30.3677 8.07107C30.3677 12.205 33.7048 15.542 37.8387 15.542ZM17.9161 15.542C22.0501 15.542 25.3622 12.205 25.3622 8.07107C25.3622 3.93713 22.0501 0.600098 17.9161 0.600098C13.7822 0.600098 10.4452 3.93713 10.4452 8.07107C10.4452 12.205 13.7822 15.542 17.9161 15.542ZM17.9161 20.5227C12.1137 20.5227 0.483871 23.4364 0.483871 29.2388V35.4646H35.3484V29.2388C35.3484 23.4364 23.7186 20.5227 17.9161 20.5227ZM37.8387 20.5227C37.1165 20.5227 36.2947 20.5725 35.4231 20.6472C38.3119 22.7391 40.329 25.5531 40.329 29.2388V35.4646H55.271V29.2388C55.271 23.4364 43.6412 20.5227 37.8387 20.5227Z" fill="#193074"/>
                      </svg>
                    </div>
                    <div class="faculty--information-card--number faculty--information-card--inner-row"> 68 </div>
                    <div class="faculty--information-card--text faculty--information-card--inner-row"> Courses </div>
                  </div>
                </div>
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
import SubpageNavbar from "../../../components/reusable/subpage-navbar";
import Search from "../../../components/reusable/Search2";
import ButtonUi from "../../../components/reusable/ui/button-ui";
export default {
name: "Faculty",
  components: {ButtonUi, Search, SubpageNavbar}
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