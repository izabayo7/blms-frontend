<template>
<div class="cropper-container" id="imageCropper" v-if="visible">
  <div class="inner-cropper" >
      <div class="cropper-holder">
        <cropper ref="cropper" class="cropper" :src="img" :stencil-props="{aspectRatio: 1}" ></cropper>
      </div>
  </div>
  <button class="done" @click="done">Done</button>
  <button class="cancel" @click="cancel">Cancel</button>
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

    done(){
      console.log(this.$refs)
      const { canvas } = this.$refs.cropper.getResult();
      this.$emit('change',canvas.toDataURL()) //emit on component that cropped photo was changed
      emit('image_cropped') //emit globally that image cropped
      this.visible = false
    },
    cancel(){
      this.visible  = false
    }
  },
  mounted() {

    //when new image uploaded makd this cropper visible
    on('new-image-loaded',()=>{
      this.visible = true
    })
  }
}
</script>

<style lang="scss" scoped>

.cropper-container{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding:1rem 10rem;
  height: fit-content;
  min-width: 50%;
  max-width: 80%;
  width: fit-content;
  background-color: $main;
  z-index: 101;
  box-shadow:  0 0 20px 4px #4ac1c62e;

  button{
    box-shadow: 0 0 10px 1px lighten($success,10);
    width: 10rem;
    padding:1rem 2rem;
    background-color: $success;
    color:$main;

  }
  .inner-cropper{
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: flex-end;
    .cropper-holder{
        max-height: 50rem;
        min-height: 70vh;
        max-width:50rem;
        min-width: 80%;
      .cropper{

        .vue-advanced-cropper__image{
          width:100%;
          object-fit: contain;
        }
      }
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
