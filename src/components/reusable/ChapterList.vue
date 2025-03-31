<template>
  <v-container class="details-menu customScroll pa-0" fluid>
    <v-row>
      <v-col class="chapters px-8">
        <v-btn
          @click="$router.push('/courses')"
          rounded
          color="#fff"
          elevation="0"
          class="mt-13 mb-6 hidden-sm-and-down d-block"
        >
          <v-icon>mdi-chevron-left</v-icon>back to courses
        </v-btn>
        <span class="title mb-3 d-block">Course content</span>
        <v-progress-linear
          :value="progress"
          color="#ffc100"
          height="25"
          class="mb-3 kurious--progressbar"
        />
        <p class="text-caption">{{Math.round(progress)}}% completion</p>
        <span class="title mb-3 d-block">Chapters</span>
        <v-list subheader class="chapters-list ml-n3">
          <v-list-item
            v-for="(item, i) in chapters"
            :key="i"
            :disabled="i>maximumIndex"
            @click="$emit('changeChapter',i);activeIndex = i"
            :class="activeIndex === i ? 'active--chapter' : ''"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <!-- <v-icon
                :color="maximumIndex > i  ? '#FFD248' : '#B4B4B4'"
              >mdi-checkbox-{{maximumIndex > i ? 'marked' : 'blank'}}-circle{{maximumIndex > i ? '' : '-outline'}}</v-icon>-->
              <svg
                v-if="maximumIndex > i"
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
                  fill="#ffd248"
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
                  :stroke="i == maximumIndex ? '#ffd248' :  '#b4b4b4'"
                  v
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
  },
};
</script>
<style lang="scss">
.active--chapter {
  background: #0000001a !important;
}
</style>