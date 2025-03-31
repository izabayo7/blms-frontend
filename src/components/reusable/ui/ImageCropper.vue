<template>
<div class="cropper-container" id="imageCropper" v-if="visible">
  <div class="inner-cropper" >
      <div class="cropper-holder">
        <cropper class="cropper" :src="img" :stencil-props="{aspectRatio: 1}" @change="change"></cropper>
      </div>
<!--      cropped image preview-->
      <div class="preview"><img ref="cropper-privew" id="preview-cropped-image" src="" alt=""></div>
  </div>
</div>
</template>

<script defer>
import { Cropper } from 'vue-advanced-cropper'
import {emit, on} from "@/services/event_bus";

export default {
  name: "ImageCropper",
  components:{
    Cropper
  },
  props:{
    img:{required:true}
  },
  data(){
    return{
      visible:false
    }
  },
  methods:{
    //liste to change of the cropped area
    change({canvas}){
      const image = document.getElementById('preview-cropped-image')
      image.src = canvas.toDataURL()
      this.$emit('change',canvas.toDataURL()) //emit on component that cropped photo was changed
      emit('image_cropped') //emit globally that image cropped
    }
  },
  mounted() {

    //when new image uploaded makd this cropper visible
    on('new-image-loaded',()=>{
      this.visible = true
    })
    //listen click on the document
    document.addEventListener('click',e => {
      const thisDoc = document.getElementById('imageCropper')
      const clickInside = thisDoc.contains(e.target) //is what we clicked inside of thisDoc

      //if not inside the make img empty to hide this component
      if(!clickInside) this.visible = false
    })
  }
}
</script>

<style lang="scss" scoped>
.cropper{
  max-height: 100%;
  height: 30rem;
}
.cropper-container{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding:1rem 10rem;
  height: 21rem;
  min-width: 20rem;
  width: fit-content;
  background-color: $main;
  z-index: 101;
  box-shadow: 0 0 7px $font;

  .inner-cropper{
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-display: row;
    justify-content: center;
    align-self: flex-end;
    .cropper-holder{
      //position: absolute;
      ////max-width: 10rem;
      //top:50%;
      //left:50%;
      //transform: translate(-50%,-50%);

    }
    .preview{
      align-self: flex-end;
      img{
        width: 10rem;
      }
    }
  }

}
</style>
