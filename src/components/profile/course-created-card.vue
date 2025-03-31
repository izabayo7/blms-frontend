<template>
  <!--course created card-->

  <div class="ccc">
    <div class="ccc--wrapper d-flex justify-space-between">
      <!--      col 1 with tittle-->
      <div class="ccc--col ccc--col__1 ccc--title col-4 pa-0">
        <div class="ccc--title--name">
          <h3>{{ data.name }}</h3>
        </div>
        <div class="ccc--title--start-date">
          <p>Started on {{ data.createdAt | formatDate }}</p>
        </div>
      </div>
      <!--      col 2 with success rate-->
      <div class="ccc--col ccc--col__2 ccc--class col-4 pa-0">
        <div v-if="type === 'INSTRUCTOR'" class="ccc--class--name">
          <p>{{ data.user_group.name }}</p>
        </div>
        <div v-else class="ccc--class--name">
          <div class="text mx-auto">{{ Math.round(data.progress.progress) }} % completion</div>
          <progress :value="data.progress.progress" max="100"></progress>
        </div>
      </div>
      <!--      col 3 with last attempted quiz infos-->
      <div v-if="type === 'INSTRUCTOR'" class="ccc--col ccc--col__3 ccc--students col-4 pa-0">
        <div class="ccc--students--number text-center">
          <h5>{{ data.total_students }}</h5>
        </div>
        <div class="ccc--students--title text-center">
          <p>Students</p>
        </div>
      </div>
      <div v-else class="ccc--col ccc--col__3 ccc--students col-4 pa-0">
        <div class="ccc--students--title">
          <p>Last chapter accessed</p>
        </div>
        <div class="ccc--students--number">
          <h5>{{data.last_accessed_chapter.name}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-created-card",
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/imports/profile-course-cards';
</style>