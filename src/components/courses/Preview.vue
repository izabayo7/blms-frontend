<template>
    <!-- preview container -->
    <div class="preview-container pb-3">
    <!-- preview image -->
        <img class="preview-media" src="@/assets/images/Mask Group 15@2x.png"/>
        <!-- preview information -->
        <div class="center pt-8">
            <div class="preview-progress"><span class="content  pr-15">Progress:</span> <v-progress-circular size="40" width="2" value="10" > 10 </v-progress-circular></div>
            <div class="preview-date pt-5"><span class="content ">Date uploaded: </span><b class="date">19 July 2020</b></div>
            <!-- preview button -->
        </div>
            <button>start course</button>
    </div>
</template>
<style lang="scss" scoped>
    $green :#3ce970;

 //make image fit the div
img{
    width:100%;
}  

.preview{

    //centering the informations
    .center{
        width:fit-content;
        margin: auto;
        font-size: 1.2rem;
    }
    &-container{
        // width:10rem;
        max-width: 25rem;
        background-color: #f9f9f9 ;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
        
        
    }
    &-media{
        width:100%;
      height: 20rem;
      object-fit: cover;
    }

    &-date{

      //.time{
      //  font-weight: bold;
      //}
    }
    //button
    button{
        background-color:$green;
        color: white;
        text-align: center;
        width: 180px;
        margin: 1rem;
        border-radius: 30px;
        padding: .5rem;
        // box-shadow: 0px 0px 2px lighten($green,10);
        &:hover{
          background-color: darken($green,10);
        }
    }
}
</style>