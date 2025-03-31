<template>
<article class="user-card">
  <article class="user-card--wrapper">
    <div class="user-card--row user-card--info user-card--row__1">
      <div class="user-card--info--col user-card--info--names-and-type user-card--info--col__1">
        <h2> <slot name="name"></slot> </h2>
        <h4> <slot name="type"></slot> </h4>
      </div>
      <div class="user-card--info--col user-card--info--pic user-card--info--col__2">
        <div class="image--wrapper">
          <slot name="image"></slot>
        </div>
      </div>
    </div>
    <div class="user-card--row user-card--actions user-card--row__2">
      <div class="user-card--actions--col user-card--actions--col__1">
        <router-link to="">
          <button class="user-card--actions--visit-profile">
            <span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM7 2.1C8.162 2.1 9.1 3.038 9.1 4.2C9.1 5.362 8.162 6.3 7 6.3C5.838 6.3 4.9 5.362 4.9 4.2C4.9 3.038 5.838 2.1 7 2.1ZM7 12.04C5.25 12.04 3.703 11.144 2.8 9.786C2.821 8.393 5.6 7.63 7 7.63C8.393 7.63 11.179 8.393 11.2 9.786C10.297 11.144 8.75 12.04 7 12.04Z" fill="#193074"/>
              </svg>
            </span>
            <span>Visit profile</span>
          </button>
        </router-link>
      </div>
      <div class="user-card--actions--col user-card--actions--col__2">
        <router-link to="">
          <button class="user-card--actions--message">
            <span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9.55557C18.003 10.7288 17.7289 11.8861 17.2 12.9333C16.5728 14.1882 15.6086 15.2437 14.4155 15.9816C13.2223 16.7195 11.8473 17.1106 10.4444 17.1111C9.27122 17.1142 8.11387 16.8401 7.06666 16.3111L2 18L3.68889 12.9333C3.15994 11.8861 2.88583 10.7288 2.88889 9.55557C2.88943 8.15269 3.28054 6.77766 4.01841 5.58451C4.75629 4.39135 5.81178 3.42719 7.06666 2.80002C8.11387 2.27107 9.27122 1.99697 10.4444 2.00003H10.8889C12.7416 2.10224 14.4916 2.88426 15.8037 4.19634C17.1157 5.50843 17.8978 7.25837 18 9.11113V9.55557Z" stroke="#193074" stroke-width="2.29139" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>Message</span>
          </button>
        </router-link>
      </div>
    </div>
  </article>
</article>
</template>

<script>
export default {
  name: "user-simple-card"
}
</script>

<style scoped>

</style>