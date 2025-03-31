<template>
  <v-container class="details-menu pa-0">
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
              <v-icon
                :color="maximumIndex > i  ? '#FFD248' : '#B4B4B4'"
              >mdi-checkbox-{{maximumIndex > i ? 'marked' : 'blank'}}-circle{{maximumIndex > i ? '' : '-outline'}}</v-icon>
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
  },
  data: () => ({
    activeIndex: 0,
  }),
};
</script>
<style lang="scss">
.active--chapter {
  background: #0000001a !important;
}
</style>