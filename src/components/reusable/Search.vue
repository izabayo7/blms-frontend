<template>
<div class="search">
    <div class="search-container" :style="{backgroundColor:bg,width:`${width}%`,fontSize:`${fontSize}px`}">
        <input class="search-text" type="text" :placeholder="placeholder" >
        <div class="search-icon pa-2"> <v-icon medium>mdi-magnify</v-icon></div>
    </div>
</div>
</template>
<script>
export default {
    name:"Search",
    props:{
      placeholder:{type:String,default:"search by name or title"},
      fontSize:Number,
      //in percantage (%)
      width:Number,
      bg:String,
    }
}
</script>
<style lang="scss" scoped>

  .search{
    
      &-container{
        margin: auto;
        background-color: $secondary;
        position: relative;
        // width:25rem;
        width:75%;
        display: flex;
        align-items: center;
        border-radius: 20px;
        justify-content: space-between;
      }
      &-text{
        width:75%;
        padding-left: 1.5rem;
        font-size: .9rem;
        color:$font;


      }
      &-icon{
        //   float:right;
      }
  } 
</style>