<template>
  <v-app id="reports-page">
    <v-data-table
    :headers="detailsHeaders"
    :items="details"
    sort-by="name"
    class="data-table details-table"
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
  </v-app>
</template>

<script>
export default {
  data: ()=>({
    detailsHeaders: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Date', value: 'date',align: 'center' },
        { text: 'Attachments', value: 'attachments',align: 'center' },
        { text: 'Status', value: 'status',align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false,align: 'center' },
      ],
      details: [
        {
          name: 'Uwamariya Jeanette',
          date: '22/ July /2020',
          attachments: 0,
          status: 'Not marked',
        },
        {
          name: 'Uwamariya Jeanette',
          date: '22/ July /2020',
          attachments: 0,
          status: 'Not marked',
        },{
          name: 'Uwamariya Jeanette',
          date: '22/ July /2020',
          attachments: 0,
          status: 'Not marked',
        },{
          name: 'Uwamariya Jeanette',
          date: '22/ July /2020',
          attachments: 0,
          status: 'Not marked',
        },{
          name: 'Uwamariya Jeanette',
          date: '22/ July /2020',
          attachments: 0,
          status: 'Not marked',
        },
      ]
  })
}
</script>

<style>

</style>