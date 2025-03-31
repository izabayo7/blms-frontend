<template>
<div class="my-table">
  <div class="table-container">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th><div class="select select-all">
              <div class="icon">
                <div class="icon__unchecked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/></svg>
                </div>
                <div class="icon__checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg>
                </div>
              </div>
            </div></th>
            <th class="" v-for="tabHead in tabHeads" :key="`${tabHead}${Date.now()}` ">
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
          <tr class="table-body-row" v-for="content in data" :key="`${content}${Date.now()*Math.random()}`">
            <td><div class="select select-one">
              <div class="icon">
                <div class="icon__unchecked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/></svg>
                </div>
                <div class="icon__checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg>
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
.my-table{
  .table-container{
    .table-wrapper{
      background-color:$main;
      padding:2rem 1rem 1rem 1rem;
      table{
        width: 100%;
        border-collapse: collapse;

        tr{

          &.table-body-row{
            border-bottom: .5px solid $bg-one;
            border-top: .5px solid $bg-one;
            &:hover{
              background-color:$bg-one;
            }
          }

          .select{
            .icon{
              cursor:pointer;
              svg{
                fill:lighten($font,30);
              }
            }
          }

          th{
            text-align: start;
            padding:.5rem .5rem;

            .head-tab-wrapper{
              cursor: pointer;
            }
          }
          td{
            padding:.5rem .5rem;
          }
        }
      }
    }
  }
}
</style>