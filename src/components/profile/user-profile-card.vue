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
            <img v-if="user.profile" :src="user.profile +'?width=86'" alt="user profile picture">
            <v-avatar v-else :size="96" class="profile-avatar">
              {{ `${user.sur_name} ${user.other_names}` | computeText }}
            </v-avatar>
          </figure>
        </article>
<!--        user information-->
        <article class="upc--information--data px-5 pt-2">
          <div class="upc--information--data--name">
            <h2>{{ user.sur_name + ' ' + user.other_names }}</h2>
          </div>
          <div class="upc--information--data--type">
            <h5>{{ user.category }} profile</h5>
          </div>
          <div v-if="user.category === 'STUDENT'" class="upc--information--data--faculty">
            <h3>{{ user.user_groups }}</h3>
          </div>
          <div class="upc--information--data--email">
            <p>{{ user.email }}</p>
          </div>
        </article>
      </article>

<!--      user picture card call to action buttons row-->
      <article class="upc--cat--buttons d-flex justify-space-between">
<!--        msg button-->
        <div class="upc--cat--message">
          <button-ui @click="$router.push(`/messages/${user.user_name}`)"  fill class-list="px-16 py-3"> <template #content>Message</template></button-ui>
        </div>
<!--        call button-->
        <div class="upc--cat--call">
          <button-ui class-list="px-16 py-3" category="outlined" fill> <template #content>Call</template></button-ui>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import ButtonUi from "../reusable/ui/button-ui";

export default {
name: "user-profile-card",
  components: {ButtonUi},
  props:{
    user:{
      type:Object,
      required: true
    }
  },
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
        img,.profile-avatar{
          border-radius: 50%;
          width:6rem;
          height:6rem;
          margin: 0 !important;
          padding: 0 !important;
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
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 15.1822px;
          line-height: 18px;

          color: #FF7700;
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