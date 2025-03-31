<template>
  <transition :name="transitionEffect">
    <div
      class="carousel-item"
      v-show="currentSlide === index"
      @mouseenter="$emit('mouseenter')"
      @mouseout="$emit('mouseout')"
    >
      <div class="testimony">
        <div :style="`margin-top: ${alignHorizontally ? 51 : 27}px;`">
          <div class="profile">
            <img :src="slide.user_profile" />
          </div>
          <div class="content">
            {{ slide.content | trimString(100) }}
          </div>
        </div>
        <div>
          <div class="user_names">{{ slide.user_names }}</div>
          <div class="course_name">{{ slide.course_name }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["mouseenter", "mouseout"],
  props: ["slide", "currentSlide", "index", "direction", "alignHorizontally"],
  computed: {
    transitionEffect() {
      return this.direction === "right" ? "slide-out" : "slide-in";
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 1s ease-in-out;
}
.slide-in-enter-from {
  transform: translateX(-100%);
}
.slide-in-leave-to {
  transform: translateX(100%);
}
.slide-out-enter-from {
  transform: translateX(100%);
}
.slide-out-leave-to {
  transform: translateX(-100%);
}
.testimony {
  text-align: center;
  img {
    width: 128px;
    height: 136px;
    margin-bottom: 26px;
    object-fit: cover;
  }
  .content {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;

    /* or 136% */
    text-align: center;

    color: #f4f4f4;
    margin: 26px 0 19px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .user_names {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;

    /* identical to box height, or 136% */
    text-align: center;

    color: #f4f4f4;
  }
  .course_name {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 18.8272px;
    line-height: 27px;
    margin-top: 7px;
    /* identical to box height, or 144% */
    text-align: center;

    color: #f4f4f4;
  }
}
/* Portrait phones and smaller */
@media (max-width: 1200px) {
  .testimony {
  .content {
    font-size: 15px;
  }
  }
}
</style>
