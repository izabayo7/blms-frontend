<template>
  <div class="my-table">
    <div class="table-container">
      <div class="table-wrapper">
        <table :class="{'colored-rows':options.coloredRows}">
          <thead>
          <tr>
            <!--            select checkbox-->
            <th v-if="options.showSelect" class="select--wrapper">
              <div class="select select-all">
                <div class="icon" @click="selectAll">
                  <div class="icon__checked " v-if="selected_all">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path
                          d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/>
                    </svg>
                  </div>
                  <div class="icon__unchecked" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </th>

            <!--            table header-->
            <th class="" v-for="tabHead in tabHeads" @click="sort(tabHead)" :key="`${tabHead}${Date.now()}` ">
              <div class="head-tab-wrapper d-flex justify-space-between"
                   :class="{sorting:currentSortingTab === tabHead}">
                <div class="content">{{ tabHead }}</div>
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
                    <path
                        d="M6.61983 10.4368H10.0767V8.7084H6.61983V10.4368ZM0.570312 0.0662231V1.79466H16.1262V0.0662231H0.570312ZM3.16296 6.11574H13.5336V4.38731H3.16296V6.11574Z"
                        fill="black"/>
                  </svg>
                </div>
              </div>
            </th>
          </tr>
          </thead>

          <!--        table body-->
          <tbody>
          <tr class="table-body-row" v-for="(content,i) in tabularData" :key="`${content}${Date.now()*Math.random()}`">
            <!--            select checkbox-->
            <td v-if="options.showSelect" class="select--wrapper">
              <div class="select select-one">
                <div class="icon" @click="select(i)">
                  <div class="icon__checked" v-if="selected_all || inSelectedRows(i)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path
                          d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/>
                    </svg>
                  </div>
                  <div class="icon__unchecked" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </td>

            <!--            table data-->
            <td :class="{'cursor-pointer': options.link}"
                @click="rowClicked(content[options.link.paramPropertyName] || null)" v-for="col in columnNames"
                :key="`${col}${Date.now()*Math.random()}` ">{{ content[col] }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//TODO auto flexible column based on length of data [liberi]
import S from 'string'


/**
 * Table ui
 *
 * @deprecated
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
  name: "table-ui",
  props: {
    data: {required: true, type: Array},
    options: {type: Object},

  },
  data() {
    return {
      selected_all: false,
      selected: [],
      tabularData: this.data,
      currentSortingTab: "",
      sortingIncreasing: false
    }
  },
  computed: {

    /**
     * formatted tab/column names that are inserted in table
     *
     * @returns {string[]} array
     */
    tabHeads() {
      let tabHeadsCols = this.columnNames;

      tabHeadsCols = tabHeadsCols.map(aTabHead => {
        let s = S(aTabHead).humanize().s;
        s = S(s).chompLeft("Total").s;

        return S(s).humanize().s;
      })

      return tabHeadsCols;
    },


    /**
     * pure / not formatted tab/column names
     *
     * @returns {string[]} array
     */
    columnNames() {
      const {keysToShow} = this.options;
      return keysToShow || Object.keys(this.data[0]);
    }
  },
  methods: {
    inSelectedRows(idx) {
      const selected = new Set(this.selected)
      return selected.has(idx)
    },
    rowClicked(id) {
      if (!id)
        return

      const {link: {routeTo}} = this.options

      const paramTestRegex = /{([a-z0-9])+}/gim

      const link = routeTo.replace(paramTestRegex, id)

      this.$router.push(link)
    },
    selectAll() {
      //if selected all was currently true delete all selected elements to set them to false
      if (this.selected_all)
        this.selected = []

      this.selected_all = !this.selected_all

      this.$emit('select', {index: -1})

    },
    sort(tabHead) {

      if (this.currentSortingTab === tabHead)
        this.sortingIncreasing = !this.sortingIncreasing


      this.tabularData = this.tabularData.sort((first, second) => {
        if (first[tabHead] < second[tabHead]) return this.sortingIncreasing ? -1 : 1
        if (first[tabHead] > second[tabHead]) return this.sortingIncreasing ? 1 : -1
        return 0
      })

      this.currentSortingTab = tabHead
    },
    select(i) {
      const selected = new Set(this.selected)

      if (selected.has(i))
        selected.delete(i)
      else {
        selected.add(i)
        this.$emit('select', {index: i, data: this.data[i]})
      }

      this.selected = selected
    }
  }
}
</script>

<style lang="scss" scoped>
.my-table {
  .table-container {
    .table-wrapper {
      background-color: $main;
      padding: 1rem;

      table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        border-bottom: 2px solid $bg-one;

        thead {
          width: calc(100% - .6rem);
          display: table;
          table-layout: fixed;

          th {
            padding: 0;
            border-right: 1px solid $tertiary;

            &:nth-last-child {
              border-right: none;
            }
          }
        }

        tbody {
          display: block;
          max-height: 50vh;
          overflow: auto;
          height: fit-content;

          &::-webkit-scrollbar {
            width: .6rem;
          }

          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 1rem;
          }

          &::-webkit-scrollbar-thumb {
            background-color: darken($bg-one, 10);
            border-radius: 1rem;
            cursor: pointer;
            //outline: 1px solid $bg-one;
          }
        }

        tbody tr {
          width: fit-content;
          min-width: 100%;
          display: table;
          table-layout: fixed;
        }

        tr {
          .select--wrapper {
            width: 2.5rem;
          }

          &.table-body-row {
            border-bottom: .5px solid $bg-one;
            border-top: .5px solid $bg-one;

            &:hover {
              background-color: $bg-one;
            }
          }

          .select {
            display: flex;
            justify-content: center;
            align-content: center;

            .icon {
              cursor: pointer;
              height: fit-content;
              width: fit-content;

              svg {
                fill: lighten($font, 30);
              }
            }
          }

          th {
            text-align: start;

            .head-tab-wrapper {
              padding: .6rem .5rem;
              cursor: pointer;

              .icon {
                svg {
                  transform: scale(.9);
                }
              }
            }

            //active/sorgin tab
            .sorting {
              height: 100%;
              background-color: $bg-one;

              .icon {
                svg {
                  transform: rotate(180deg);
                }
              }
            }
          }

          td {
            padding: .6rem .5rem;
            box-sizing: border-box;
            min-width: fit-content;
          }
        }

        &.colored-rows {
          tr {
            &:hover {
              background-color: unset;
            }

            &:nth-child(even) {
              background-color: darken($bg-one, 5);
            }
          }
        }
      }
    }
  }
}
</style>