<template>
  <!-- preview container -->
  <div class="preview-container pb-3">
    <!-- preview image -->
    <v-img
        v-if="image"
        class="preview-media"
        :src="`${image}?token=${$session.get('jwt')}&height=320`"
    >
    </v-img>

    <!--  if image not provided -->
    <div
        v-else
        class="bg-color-one preview-media vertically--centered text-center preview-image"
        style="width: 100%"
    >
      <span class="text-h1 white--text">{{ name | computeText }}</span>
    </div>

    <!-- preview information -->
    <div class="center pt-8">
      <div v-if="progress" class="preview-progress">
        <span class="content pr-15">Progress:</span>
        <v-progress-circular size="40" width="2" :value="progress.progress">
          <span class="caption">{{ Math.round(progress.progress) }}%</span>
        </v-progress-circular>
      </div>
      <div class="preview-date pt-5">
        <span class="content">Date uploaded:</span>
        <b class="date">{{ dateUploaded }}</b>
      </div>
      <!-- preview button -->
    </div>
    <button
        v-if="!isLive"
        @click="
        progress
          ? handleCourseClick(name)
          : startCourse($store.state.user.user.user_name)
      "
    >
      {{
        `${
            !progress
                ? "start course"
                : progress.progress == 100
                ? "proceed to course"
                : "continue course"
        }`
      }}
    </button>
    <button
        v-else
        @click="
        $router.push(`/live/${class_id}`)
      "
        class="live"
    >
      open live class
    </button>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  props: {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    isLive: {
      type: Boolean,
    },
    dateUploaded: {
      type: String,
      required: true,
    },
    progress: {
      type: Object,
    },
    class_id: {
      type: String,
    },
  },
  methods: {
    ...mapActions("courses", ["startCourse"]),
    handleCourseClick(name) {
      // navigate to the course
      this.$router.push(`/courses/${name}`);
    },
  },
};
</script>
<style lang="scss" scoped>
$green: #02A617;

//make image fit the div
img {
  width: 100%;
}

.preview {
  .v-progress-circular__overlay {
    stroke: #02A617 !important;
  }

  //centering the informations
  .center {
    width: fit-content;
    margin: auto;
    font-size: 1.2rem;
  }

  &-container {
    width: 100%;
    max-width: 25rem;
    background-color: #f9f9f9;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-media {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }

  &-date {
    //.time{
    //  font-weight: bold;
    //}
  }

  //button
  button {
    background-color: $green;
    color: white;
    text-align: center;
    width: 180px;
    margin: 1rem;
    border-radius: 30px;
    padding: 0.5rem;
    // box-shadow: 0px 0px 2px lighten($green,10);
    &:hover {
      background-color: darken($green, 10);
    }
  }

  .live {
    width: 181px;
    height: 54px;
    left: 867px;
    top: 621px;

    background: #FF0808;
    border-radius: 6px;
    &:hover {
      background-color: darken(#FF0808, 10);
    }
  }
}
/* Portrait phones and smaller */
@media (max-width: 700px) {
  .preview {
    &-container {
      max-width: 100%;
    }
    }
}
</style>
