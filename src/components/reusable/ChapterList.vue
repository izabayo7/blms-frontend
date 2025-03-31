<template>
  <v-container class="details-menu customScroll pa-0" fluid>
    <v-row class="fill-height">
      <v-col class="chapters px-8">
        <v-btn
          @click="userCategory === 'ADMIN' ? $router.go(-1) : $router.push('/courses')"
          rounded
          color="#fff"
          elevation="0"
          class="mt-13 mb-6 hidden-sm-and-down d-block"
        >
          <v-icon>mdi-chevron-left</v-icon>back {{ userCategory === 'ADMIN' ? '' : 'to courses' }}
        </v-btn>
        <span class="title mb-3 d-block">Course content</span>
        <v-progress-linear
          :value="progress"
          :color="primary"
          height="25"
          class="mb-3 kurious--progressbar"
        />
        <p class="text-caption">{{ Math.round(progress) }}% completion</p>
        <span class="title mb-3 d-block">Chapters</span>
        <v-list subheader class="chapters-list ml-n3">
          <v-list-item
            v-for="(item, i) in chapters"
            :key="i"
            :disabled="i > maximumIndex"
            @click="$emit('change-chapter', { index: i, id: item._id })"
            :class="activeIndex === i ? 'active--chapter' : ''"
          >
            <v-list-item-content class="vertically--centered">
              <p class="chapter_name">{{ item.name }}</p>
            </v-list-item-content>

            <v-list-item-action>
              <svg
                v-if="maximumIndex > i || progress == 100"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 35 35"
              >
                <circle
                  id="Ellipse_101"
                  data-name="Ellipse 101"
                  cx="17.5"
                  cy="17.5"
                  r="17.5"
                  :fill="primary"
                />
                <path
                  id="Icon_feather-check"
                  data-name="Icon feather-check"
                  d="M21.571,9,10.866,19.705,6,14.839"
                  transform="translate(4 3)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 35 35"
              >
                <g
                  id="Ellipse_102"
                  data-name="Ellipse 102"
                  fill="none"
                  :stroke="i == maximumIndex ? primary : '#b4b4b4'"
                  stroke-width="3"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" stroke="none" />
                  <circle cx="17.5" cy="17.5" r="16" fill="none" />
                </g>
              </svg>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
export default {
  props: {
    chapters: {
      type: Array,
      required: true,
    },
    maximumIndex: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    activeIndex() {
      return this.currentIndex + 0;
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    primary() {
      return colors.primary;
    },
  },
};
</script>
<style lang="scss">
.active--chapter {
  background: #0000001a !important;
}
.chapter_name {
  line-height: 25px !important;
  margin-bottom: 0 !important;
}
</style>
