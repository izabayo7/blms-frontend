<template>
<div class="my-table">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="tabHead in tabHeads" :key="`${tabHead}${Date.now()}` ">{{tabHead}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="content in data" :key="`${content}${Date.now()*Math.random()}`">
          <td v-for="tabHead in tabHeads" :key="`${tabHead}${Date.now()*Math.random()}` ">{{content[tabHead]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: "table",
  props:{
    data:{required:true,type:Array}
  },
  computed:{
    tabHeads(){
      return Object.keys(this.data[0])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>