<template>
  <tr class="table-header-row table-row">
    <!--            select checkbox-->
    <th v-if="showSelect" class="select--wrapper">
      <div class="select select-all">
        <div class="icon" @click="select">
          <div class="icon__checked " v-if="selectSelected">
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
    <th :class="{small : col === ' '}" v-for="(col,i) in cols" @click="clickHandler($event,i)"
        :key="`${col}${Date.now()}` ">
      <div class="head-tab-wrapper d-flex justify-space-between" :class="{sorting:ascendingCol === col}">
        <div class="content">{{ col }}</div>
        <div class="icon sort-icon" v-if="col !== ' '">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
            <path
                d="M6.61983 10.4368H10.0767V8.7084H6.61983V10.4368ZM0.570312 0.0662231V1.79466H16.1262V0.0662231H0.570312ZM3.16296 6.11574H13.5336V4.38731H3.16296V6.11574Z"
                fill="black"/>
          </svg>
        </div>
      </div>
    </th>
  </tr>
</template>

<script>

/**
 * table header component
 *
 * props
 *    - cols: array of columns to be displayed
 *    - ascendingCol: name of the col that is ascending
 */

export default {
  name: "TableHeadRow",
  props: {
    cols: {type: Array, required: true},
    ascendingCol: {default: ""},
    showSelect: {default: true},
    selected: {default: false}
  },
  data() {
    return {
      selectSelected: this.selected,
    }
  },
  methods: {
    clickHandler(e, i) {
      this.$emit('click', e, i)
    },
    select() {
      if (!this.selectSelected)
        this.$emit('select', new Set([-1]))
      else
        this.$emit('select', new Set([]))

      this.selectSelected = !this.selectSelected;
    }
  },
}
</script>

<style lang="scss" scoped>
.table-header-row {
  @include table-row;

  .small {
    width: 3rem;
  }

  th {
    &:hover {
      .sort-icon {
        display: block;
      }
    }

    .sort-icon {
      display: none;
    }
  }
}
</style>