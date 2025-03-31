
<template>
<section class="table">
  <section class="table--container">
    <section class="table--wrapper">
      <table :class="{'colored-rows': coloredRows}">
        <thead>
          <slot name="tableHeaderRow"></slot>
        </thead>

<!--        table body-->
        <tbody>
          <slot name="tableRows"></slot>
        </tbody>
      </table>
    </section>
  </section>
</section>
</template>

<script>
//TODO auto flexible column based on length of data [liberi]
import S from 'string'


/**
 * Table ui
 *
 * @props
 * - data:array of object elements to be displayed in table
 *
 * - options:
 *    - coloredRows: Boolean, if you want colored nth(even) child rows
 *    - link : Object, {
 *                routeTo: link to route to , it may contain `{var}` as a param id which will be replaced by paramPropertyId
 *                paramPropertyName: name of the property in data to replace `{var}` in link
 *          } => specifies where user will go when he click on a row
 *     - showSelect: Boolean, if you want to select feature
 *     - keysToShow: Array, list of properties that are in data to be shown in table
 */
export default {
  name: "TableUi",
  props:{
    // data:{required:true,type:Array},
    options:{default:""},

  },
  data(){
    return{
      selected_all:false,
      selected:[],
      tabularData:this.data,
      currentSortingTab:"",
      sortingIncreasing:false
    }
  },
  computed:{


    coloredRows(){
      console.log(this.options)
      return this.options.coloredRows || false
    }
  },
  methods:{
    inSelectedRows(idx){
      const selected = new Set(this.selected)
      return selected.has(idx)
    },
    rowClicked(id){
      if(!id)
        return

      const {link:{routeTo}} = this.options

      const paramTestRegex = /{([a-z0-9])+}/gim

      const link = routeTo.replace(paramTestRegex,id)

      this.$router.push(link)
    },
    selectAll(){
      //if selected all was currently true delete all selected elements to set them to false
      if(this.selected_all)
        this.selected = []

      this.selected_all = !this.selected_all

      this.$emit('select',{index:-1})

    },
    sort(tabHead){

      if(this.currentSortingTab === tabHead)
        this.sortingIncreasing = !this.sortingIncreasing


      this.tabularData = this.tabularData.sort((first,second) => {
        if(first[tabHead] < second[tabHead]) return this.sortingIncreasing ? -1 : 1
        if(first[tabHead] > second[tabHead]) return this.sortingIncreasing ? 1 : -1
        return 0
      })

      this.currentSortingTab = tabHead
    },
    select(i){
      const selected = new Set(this.selected)

      if(selected.has(i))
        selected.delete(i)
      else{
        selected.add(i)
        this.$emit('select',{index:i,data:this.data[i]})
      }

      this.selected = selected
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
  &--container {
  }


  &--wrapper{
    background-color:$main;
    padding:1rem;
    table{
      width: 100%;
      table-layout:fixed;
      border-collapse: collapse;
      border-bottom: 2px solid $bg-one;

      thead{
        width:calc(100% - .6rem);
        display:table;
        table-layout:fixed;

        th{
          padding:0;
          border-right:1px solid $tertiary;

          &:nth-last-child{
            border-right:none;
          }
        }
      }
      tbody{
        display: block;
        max-height: 50vh;
        overflow:auto;
        height: fit-content;

        &::-webkit-scrollbar{
          width: .6rem;
        }

        &::-webkit-scrollbar-track{
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 1rem;
        }

        &::-webkit-scrollbar-thumb{
          background-color: darken($bg-one,10);
          border-radius: 1rem;
          cursor:pointer;
          //outline: 1px solid $bg-one;
        }
      }

      tbody tr {
        width:fit-content;
        min-width: 100%;
        display:table;
        table-layout:fixed;
      }

      tr{
        .select--wrapper{

          width:2.5rem;
        }

        &.table-body-row{
          border-bottom: .5px solid $bg-one;
          border-top: .5px solid $bg-one;
          &:hover{
            background-color:$bg-one;
          }
        }

      }

      &.colored-rows{
        tr{
          &:hover{
            background-color:unset;
          }
          &:nth-child(even){
            background-color:darken($bg-one,5);
          }
        }
      }
    }
  }
}
</style>