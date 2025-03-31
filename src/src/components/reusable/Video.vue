<template>
    <div class="container npadding">
        <div class="c-video">
            <video @click="tooglePlayPause()"  @timeupdate="updateTime()" :class="`video ${showControls}`" :poster="poster" :src="src"></video>
            <div :class="`${play==='play' ? 'd-flex' : ''} controls mt-n4`">
                    <v-slider
                        v-model="currentTime"
                        min="0"
                        @click="updateTime('force')"
                        :max="duration"
                        class="orange-bar"
                        color="#ffd248"
                        thumb-label
                    />
                <div class="row buttons d-flex px-2">
                    <v-col class="col-6 col-sm-8 py-3 col-xs-2 d-flex">
                        <!-- v-row>v-col*2 -->
                        <button id="play-pause" @click="tooglePlayPause()"><v-icon color="#fff">mdi-{{play}}</v-icon></button>
                        <button id="play-pause" @click="toogleMute()"><v-icon color="#fff">mdi-volume-{{volumeLevel}}</v-icon></button>
                        <v-slider
                            v-model="volume"
                            min="0"
                            :max="100"
                            id="volume"
                            class="orange-bar volume"
                            color="#ffd248"
                            thumb-label
                        />
                        <span class="mx-2 caption white--text mt-1">{{convertTime(currentTime)}} / {{convertTime(duration)}}</span>
                    </v-col>

                    <v-col class="col-6 col-sm-4 py-0">
                        <v-row>
                            <v-col class="px-0"><button id="play-pause"><v-icon size="20" color="#fff">mdi-cog</v-icon></button></v-col>
                            <v-col class="px-0"><button id="play-pause" @click="tooglePictureInPicture()"><v-icon size="20" color="#fff">mdi-picture-in-picture-bottom-right</v-icon></button></v-col>
                            <v-col class="px-0"><button id="play-pause" @click="toogleFullscreen()"><v-icon color="#fff">mdi-{{fullscreen}}</v-icon></button></v-col>
                        </v-row>
                    </v-col>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
     src: {
         type: String,
         required: true
     },
     poster: {
         type: String,
         default: ''
     },
    },
    data () {
      return {
        play: 'play',
        fullscreen: 'fullscreen',
        currentTime: 0,
        duration: 0,
        volume: 50,
        volumeLevel: 'medium',
        latestVolume: 50,
        showControls: true
      }
    },
    watch: {
        volume () {
            if (this.volume === 0) {
                this.volumeLevel = 'off'
            } else if (this.volume < 50){
                this.volumeLevel = 'medium'
            } else {
                this.volumeLevel = 'high'
            }
            this.updateVolume()
        },
    },
    mounted() {
        setTimeout(() => {
            this.currentTime = document.querySelector('.video').currentTime
            this.duration = document.querySelector('.video').duration
        }, 2000);

    },
    methods:{
        tooglePlayPause () {
            const video = document.querySelector('.video')
            if(video.paused){
                this.play = 'pause'
                this.showControls = false
                video.play();
            }
            else{
                this.play = "play"
                this.showControls = true
                video.pause();
            }
        },
        toogleFullscreen () {
            const video = document.querySelector('.video')
            if(this.fullscreen==='fullscreen'){
                this.fullscreen = 'fullscreen-exit'
                console.log(video)
                video.requestFullscreen()
                console.log(video)
            }
            else{
                this.fullscreen = "fullscreen"
                document.exitFullscreen()
            }
        },
        toogleMinPlayer () {
            const video = document.querySelector('.video')
            if(video){
                this.fullscreen = 'fullscreen-exit'
                console.log(video)
                video.requestFullscreen()
                console.log(video)
            }
            else{
                this.fullscreen = "fullscreen"
                document.exitFullscreen()
            }
        },
        convertTime(time) {
            const formatedTime = new Date(time * 1000).toISOString().substr(11, 8)
            return formatedTime.split(':')[0] === '00' ? `${formatedTime.split(':')[1]}:${formatedTime.split(':')[2]}` : formatedTime
        },
        updateTime(type) {
            const video = document.querySelector('.video')
            if (type === 'force') {
                video.currentTime = this.currentTime
            } else {
                this.currentTime = video.currentTime
            }
        },
        updateVolume() {
            console.log(this.latestVolume)
            if (this.volume !== 0) {
                this.latestVolume = this.volume
            }
            
             document.querySelector('.video').volume = this.volume/100
        },
        toogleMute() {
            this.volume = this.volume === 0 ? this.latestVolume : 0
        },
        async tooglePictureInPicture() {
            const video = document.querySelector('.video')
            if (video !== document.pictureInPictureElement)
            await video.requestPictureInPicture();
            else
            await document.exitPictureInPicture();
        }
    }
  }
</script>

<style lang="scss" scoped>
video::-webkit-media-controls-enclosure {
  display:none !important;
}
.container{
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
    // height: 100vh;
}

.video{
    width:100%;
}

.c-video{
    width: 100%;
    max-width: 800px;
    position: relative;
    overflow: hidden;
}

.c-video:hover .controls{
    display: flex;
}

.controls{
    display: none;
    position: absolute;
    width: 90%;
    // top: 82.4%;
    bottom: 4%;
    left: 5%;
    flex-wrap: wrap;
    background: rgb(0 0 0 / 43%);
    z-index: 2147483647;
}
.controls::full-screen {
  width: 100%;
  height: 100%;
  z-index: 2147483647;
}
.controls::-webkit-full-screen {
  width: 100%;
  height: 100%;
  z-index: 2147483647;
}

.buttons{
    // padding: 5px;
    
}

.buttons button{
    background: none;
    border: 0;
    outline: 0;
    cursor: pointer;
}

.buttons button:before{
    /* content: '\f144'; */
    font-family: 'Font Awesome 5 Free';
    width: 30px;
    height: 30px;
    display: inline-block;
    font-size: 28px;
    color: white;
    -webkit-font-smoothing: antialiased;
}

/* .buttons button.play:before{
    content: '\f144';
}

.buttons button.pause:before{
    content: '\f28b';
} */

.orange-bar{
    height: 10px;
    top: 0;
    left: 0;
    width: 100%;
    background: none;
}


.v-input.orange-bar.volume.theme--light.v-input__slider {
    max-width: 60px;
    margin-top: -3px;
}
@media (max-width: 800px){
    div#video {
        padding: 0 !important;
    }
    .container.npadding {
        padding: 0 !important;
    }
}
</style>