<template>
<!--  upc = user profile card-->

<!--  user picture card-->
  <section class="upc">
    <section class="upc--wrapper d-flex flex-column">

<!--      user picture card information row-->
      <article class="upc--information d-flex ">
        <article class="upc--information--picture px-5 pt-2">
<!--          user profile picture-->
          <figure class="upc--information--picture--img">
            <img src="https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png?w=150&ssl=1" alt="user profile picture">
          </figure>
        </article>
<!--        user information-->
        <article class="upc--information--data px-5 pt-2">
          <div class="upc--information--data--name">
            <h2>Umuhoza solange</h2>
          </div>
          <div class="upc--information--data--type">
            <h5>Student profile</h5>
          </div>
          <div class="upc--information--data--faculty">
            <h3>Accounting year 2</h3>
          </div>
          <div class="upc--information--data--email">
            <p>solange87@gmail.com</p>
          </div>
        </article>
      </article>

<!--      user picture card call to action buttons row-->
      <article class="upc--cat--buttons d-flex justify-space-between">
<!--        msg button-->
        <div class="upc--cat--message">
          <button-ui fill class-list="px-16 py-3"> <template #content>Message</template></button-ui>
        </div>
<!--        call button-->
        <div class="upc--cat--call">
          <button-ui class-list="px-16 py-3" category="warn" fill> <template #content>Call</template></button-ui>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import ButtonUi from "../reusable/ui/button-ui";
import userCategoryMixin from '@/mixins/user-category.mixin.js'

export default {
name: "user-profile-card",
  components: {ButtonUi},
  mixins:[userCategoryMixin]
}
</script>

<style lang="scss" scoped>
.upc{
  max-width: 24rem;
  &--wrapper{

  }

  &--information{
    &--picture{
      &--img{
        img{
          border-radius: 50%;
          width:6rem;
          height:6rem;
          object-fit: cover;
          border:5px solid lighten($primary,60)
        }
      }
    }

    &--data{
      &--name{
        h2{
          font-weight: 500;
        }
      }

      &--type{
        h5{
          font-weight: 400;
          color:lighten($font,20);
        }
      }

      &--faculty{
        margin-top: .5rem;
        h3{
          color:$color-one;
        }
      }

      &--email{
        p{
          font-size:.8rem;
        }
      }
    }
  }

  &--cat{
    &--buttons{

    }
    &--call{
      .orange-bg{
        background-color: $color-one;
      }
    }
  }
}
</style>