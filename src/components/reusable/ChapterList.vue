<template>
  <v-container class="pa-0">
    <v-row>
      <v-col
        class="chapters px-8"
      >
        <v-btn @click="$router.push('/courses')"  rounded color="#fff" elevation="0" class="mt-13 mb-6 hidden-sm-and-down d-block"> <v-icon>mdi-chevron-left</v-icon> back to courses</v-btn>
        <span class="title mb-3 d-block">Course content</span>
        <v-progress-linear
            v-model="power"
            color="#ffc100"
            height="25"
            class="mb-3"
        />
        <p class="text-caption">17% completion</p>
        <span class="title mb-3 d-block">Chapters</span>
        <v-list two-line subheader class="chapters-list ml-n3">
          <!-- only in finished ones you should navigate -->
        <v-list-item
            v-for="(item, i) in chapters"
            :key="i"
            @click="$emit('changeChapter',i)"
        >
            <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-icon :color="item.finished  ? '#FFD248' : '#B4B4B4'">mdi-checkbox-{{item.finished  ? 'marked' : 'blank'}}-circle{{item.finished  ? '' : '-outline'}}</v-icon>
            </v-list-item-action>
        </v-list-item>
        </v-list> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data : () => ({
      power: 17,
      items: [
          { finished: true, title: 'Photos' },
          { title: 'Recipes' },
          { title: 'Work' },
      ],
    }),
    props: {
      chapters: {
        type: Array,
        required: true
      }
    }
  }
</script>