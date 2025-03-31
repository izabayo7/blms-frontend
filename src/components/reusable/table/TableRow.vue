<template>
  <tr class="table-body-row table-row" >
<!--            select checkbox-->
    <td v-if="showSelect" class="select--wrapper">
      <div class="select select-one" >
        <div class="icon" @click="select">
          <div class="icon__checked" v-if="selectSelected">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/></svg>
          </div>
          <div class="icon__unchecked" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/></svg>
          </div>
        </div>
      </div>
    </td>

<!--    row data-->
    <slot name="cols"></slot>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props:{
    selected:{default:false},
    data:{required:true},
    showSelect:{default:true}
  },
  data(){
    return {
      selectSelected:false,
    }
  },
  computed:{
    keys(){
      return Object.keys(this.data);
    }
  },
  methods:{
    select(e){
      this.$emit('select',e)
      this.selectSelected  = !this.selectSelected;
    }
  }
}
</script>

<style lang="scss" scoped>
.table-body-row{
  @include table-row;
}
</style>