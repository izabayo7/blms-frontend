<template>
<v-app id="reports-page">
  <h1>My Reports</h1>
  <div class="table-one">
  <h3>Submissions batch</h3>
  <v-data-table
    :headers="submissionHeaders"
    :items="submissions"
    sort-by="name"
    class="data-table"
  >
    <template v-slot:item.actions="{  }">
      <v-icon
        small
        class="view-icon"
        @click="$router.push(`/submissions/`)"
      >
        mdi-eye
      </v-icon>
    </template>
  </v-data-table>
</div>
<div class="table-two">
  <h3>Classes</h3>
  <v-data-table
    :headers="classesHeaders"
    :items="classes"
    sort-by="name"
    class="data-table"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="view-icon"
        @click="$router.push(`reports/submissions/${item.name}`)"
      >
        mdi-eye
      </v-icon>
    </template>
  </v-data-table>
</div>
</v-app>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      submissionHeaders: [
        {
          text: 'Class',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Chapter', value: 'chapter',align: 'center' },
        { text: 'Submissions', value: 'submissions',align: 'center' },
        { text: 'Type', value: 'type',align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false,align: 'center' },
      ],
      submissions: [
        {
          name: 'Economics Basics',
          chapter: 3,
          submissions: 4,
          type: 'Class quiz'
        },
        {
          name: 'Computer Science',
          chapter: 5,
          submissions: 10,
          type: 'Class quiz'
        }
      ],classesHeaders: [
        {
          text: 'Class',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Attendance', value: 'attendance',align: 'center' },
        { text: 'Progress', value: 'progress',align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false,align: 'center' },
      ],
      classes: [
        {
          name: 'Economics Basics',
          attendance: 'High',
          progress: '80%'
        },
        {
          name: 'Computer Science',
          attendance: 'Moderate',
          progress: '55%'
        }
      ],
    }),
  }
</script>