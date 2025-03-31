<template v-if="visible">
<div class="shade" v-if="visible">
  <div class="cropper-container" id="imageCropper" >
    <div class="inner-cropper" >
      <div class="img">
        <div class="cropper-holder">
          <h3 v-if="imgLoaded">Crop image</h3>
          <cropper max-height="300px" @change="changed" ref="cropper" class="cropper" :src="img" :stencil-props="{aspectRatio: 1}" ></cropper>
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
      imgLoaded:false,
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
    width:fit-content;
    height: fit-content;

    .cropper-holder{
      width:100% !important;

      img{
        width:100% !important;
      }
    }

    .preview{
      display: none;
    }
  }
}

.shade{
  width: 100%;
  height: 100%;

  .cropper-container{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:1rem ;
    width: 90%;
    height: fit-content;
    background-color: $main;
    z-index: 101;
    box-shadow:  0 0 20px 4px #4ac1c62e;

    .btn{
      display: flex;
      justify-content: center;

      button{
        min-width: 8rem;
        padding:.5rem 1rem;
        margin:1rem;
        font-size: .9rem;
        width: fit-content;

        &.done{
          background-color: $success;
          color:$main;

          &:hover{
            background-color: darken($success,10);
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
            max-height: 50vh !important;
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
          max-height: 500px;
          border: 1px solid lighten($font,60);

          .vue-advanced-cropper__image{
            width:100%;
            object-fit: contain;

          }

          .vue-advanced-cropper__stretcher{
          }
        }
      }
    }

  }
}
</style>
