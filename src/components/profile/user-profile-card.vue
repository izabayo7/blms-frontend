<template>
<!--  upc = user profile card-->
  <section class="upc">
    <section class="upc--wrapper">
      <article class="upc--information">
        <article class="upc--information--picture">
          <figure class="upc--information--picture--img">
            <img src="https://i0.wp.com/www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png?w=150&ssl=1" alt="user profile picture">
          </figure>
        </article>
        <article class="upc--information--data">
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
      <article class="upc--cat--buttons">
        <div class="upc--cat--message">
          <button-ui> <template #content>Message</template></button-ui>
        </div>
        <div class="upc--cat--call">
          <button-ui> <template #content>Call</template></button-ui>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import ButtonUi from "../reusable/ui/button-ui";
export default {
name: "user-profile-card",
  components: {ButtonUi}
}
</script>

<style scoped>

</style>