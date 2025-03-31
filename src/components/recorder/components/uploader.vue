<style lang="scss">
@import '../../../assets/sass/imports/icons';
</style>

<template>
  <icon-button name="save" class="ar-icon ar-icon__xs ar-icon--no-border" @click.native="upload"/>
</template>

<script>
  import IconButton from './icon-button'
  import UploaderPropsMixin from '@/mixins/uploader-props'
  import {emit} from "@/services/event_bus";

  export default {
    mixins: [UploaderPropsMixin],
    props: {
      record: { type: Object }
    },
    components: {
      IconButton
    },
    methods: {
      upload () {
        if (!this.record.url) {
          return
        }

        emit('start-upload')

        const data = new FormData()
        data.append('audio', this.record.blob, `${this.filename}.mp3`)

        const headers = Object.assign(this.headers, {})
        headers['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`

        this.$http.post(this.uploadUrl, data, { headers: headers }).then(resp => {
          emit('end-upload', { status: 'success', response: resp })
        }).catch(error => {
          emit('end-upload', { status: 'fail', response: error })
        })
      }
    }
  }
</script>
