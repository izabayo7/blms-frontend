<template>
<div class="shade">
  <div class="cropper-container" id="imageCropper" v-if="visible">
    <div class="inner-cropper" >
      <div class="img">
        <div class="cropper-holder">
          <h3 v-if="imgLoaded">Crop image</h3>
          <cropper @change="changed" ref="cropper" class="cropper" :src="img" :stencil-props="{aspectRatio: 1}" ></cropper>
        </div>
        <div class="preview" v-show="imgLoaded">
          <h3>Image preview</h3>
          <img ref="preview" src="" alt="">
        </div>
      </div>
      <div class="btn">
        <button class="done" @click="done">Save changes</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
    </div>
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
      visible:false,
      imgLoaded:false
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
    changed({canvas}){
      this.$refs.preview.src = canvas.toDataURL();
      this.imgLoaded = true
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

/* Medium (md) */
@media (max-width: 768px) {
  .cropper-container{
    width:90%;
    max-width: 90%;

    .cropper-holder{
      width:100% !important;

      img{
        width:100% !important;
      }
    }
  }
}

.shade{

  .cropper-container{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:1rem ;
    height: fit-content;
    min-width: 50%;
    max-width: 80%;
    width: fit-content;
    background-color: $main;
    z-index: 101;
    box-shadow:  0 0 20px 4px #4ac1c62e;

    .btn{
      display: flex;
      justify-content: center;

      button{
        min-width: 10rem;
        padding:1rem 2rem;
        margin:1rem;
        width: fit-content;

        &.done{
          background-color: $success;
          color:$main;

          &:hover{
            background-color: lighten($success,10);
          }

        }
        &.cancel{
          background-color: $secondary;

          &:hover{
            background-color:darken( $secondary,5);
          }
        }

      }
    }
    .inner-cropper{
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: flex-end;


      .img{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;


        h3{
          text-align: center;
          padding: .5rem;
        }

        .cropper-holder{
          padding: 1rem;
          max-width: 40rem;
          box-sizing: border-box;
          width:80%;
          img{
            width: 100% !important;
            object-fit: contain;
          }
        }

        .preview{
          box-sizing: border-box;
          align-self: center;
          padding: 1rem;
          min-width: 10rem;
          width: 20%;
          img{
            width: 100%;
          }
        }

      }

      .cropper-holder{
        padding: 1rem;
        .cropper{

          .vue-advanced-cropper__image{
            width:100%;
            object-fit: contain;
          }
        }
      }
    }

  }
}
</style>
