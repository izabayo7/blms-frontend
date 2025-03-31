<template>
<div class="my-table">
  <div class="table-container">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th><div class="select select-all">
              <div class="icon" @click="selectAll">
                <div class="icon__checked " v-if="selected_all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg>
                </div>
                <div class="icon__unchecked" v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/></svg>
                </div>
              </div>
            </div></th>
            <th class="" v-for="tabHead in tabHeads" @click="sort(tabHead)" :key="`${tabHead}${Date.now()}` ">
              <div class="head-tab-wrapper d-flex justify-space-between">
                <div class="content">{{tabHead}}</div>
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
                    <path d="M6.61983 10.4368H10.0767V8.7084H6.61983V10.4368ZM0.570312 0.0662231V1.79466H16.1262V0.0662231H0.570312ZM3.16296 6.11574H13.5336V4.38731H3.16296V6.11574Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-body-row" v-for="(content,i) in data" :key="`${content}${Date.now()*Math.random()}`">
            <td><div class="select select-one">
              <div class="icon" @click="select(i)">
                <div class="icon__checked" v-if="selected_all || inSelectedRows(i)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg>
                </div>
                <div class="icon__unchecked" v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/></svg>
                </div>
              </div>
            </div></td>
            <td v-for="tabHead in tabHeads" :key="`${tabHead}${Date.now()*Math.random()}` ">{{content[tabHead]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "table-ui",
  props:{
    data:{required:true,type:Array}
  },
  data(){
    return{
      selected_all:false,
      selected:[],
      tabularData:this.data,
    }
  },
  computed:{
    tabHeads(){
      return Object.keys(this.data[0])
    }
  },
  methods:{
    inSelectedRows(idx){
      const selected = new Set(this.selected)
      return selected.has(idx)
    },
    selectAll(){
      //if selected all was currently true delete all selected elements to set them to false
      if(this.selected_all)
        this.selected = []

      this.selected_all = !this.selected_all

      this.$emit('select',{index:-1})

    },
    sort(tabHead){
            this.tabularData = this.tabularData.sort((first,second) => {
              if(first[tabHead] < second[tabHead]) return -1
              if(first[tabHead] > second[tabHead]) return 1
              return 0
            })
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
.my-table{
  .table-container{
    .table-wrapper{
      background-color:$main;
      padding:2rem 1rem 1rem 1rem;
      table{
        width: 100%;
        border-collapse: collapse;
        border-bottom: 2px solid $bg-one;

        thead{
          width:calc(100% - .6rem);
          display:table;
          table-layout:fixed;
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
          width:100%;
          display:table;
          table-layout:fixed;
        }

        tr{
          td:nth-child(1),th:nth-child(1){
            width:2.5rem;
          }

          &.table-body-row{
            border-bottom: .5px solid $bg-one;
            border-top: .5px solid $bg-one;
            &:hover{
              background-color:$bg-one;
            }
          }

          .select{
            display: flex;
            justify-content: center;
            align-content: center;
            .icon{
              cursor:pointer;
              height: fit-content;
              width:fit-content;
              svg{
                fill:lighten($font,30);
              }
            }
          }

          th{
            text-align: start;
            padding:.6rem .5rem;

            .head-tab-wrapper{
              cursor: pointer;
            }
          }
          td{
            padding:.6rem .5rem;
          }
        }
      }
    }
  }
}
</style>