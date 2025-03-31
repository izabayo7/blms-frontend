<template>
<div class="my-search">
  <div class="search-container">
    <form action="" @submit.prevent="search" class="d-flex ">
      <div class="input-wrapper col-10">
        <label for="search">
           <input :placeholder="placeholder" v-model="content" type="text" id="search">
        </label>
      </div>
      <div class="icon col-2 flex justify-center">
        <button type="submit" class="icon-wrapper" @click="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
           <path d="M12.4472 10.1758H11.7199L11.4622 9.92725C12.3643 8.87779 12.9075 7.51534 12.9075 6.0332C12.9075 2.72832 10.2286 0.0494385 6.92371 0.0494385C3.61883 0.0494385 0.939941 2.72832 0.939941 6.0332C0.939941 9.33808 3.61883 12.017 6.92371 12.017C8.40584 12.017 9.7683 11.4738 10.8178 10.5717L11.0663 10.8294V11.5567L15.6692 16.1504L17.0409 14.7787L12.4472 10.1758ZM6.92371 10.1758C4.63146 10.1758 2.7811 8.32545 2.7811 6.0332C2.7811 3.74096 4.63146 1.8906 6.92371 1.8906C9.21595 1.8906 11.0663 3.74096 11.0663 6.0332C11.0663 8.32545 9.21595 10.1758 6.92371 10.1758Z" fill="black"/>
          </svg>
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "Search2",
  props:{
    placeholder:{default:"Search ..."}
  },
  data(){
    return{
      content:""
    }
  },
  methods:{
    search(){
      this.$emit('search',this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-search{
  .search-container{
    form{
      background:$main;
      border-radius:5px;
      width:100%;
      border:1px solid $color-grey;
      .input-wrapper{
        input{
          height:100%;
          width:100%;
        }
      }
      .icon{
        button{
          background:none;
          border:none;
        }
      }
    }
  }
}
</style>