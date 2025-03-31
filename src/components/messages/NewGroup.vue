<template>
  <div class="new-group">
    <div class="group-wrapper">
      <div class="background-darkness"></div>
      <form action="#" class="col-xs-11 col-sm-10 col-md-8 col-lg-8 col-xl-6">
        <div class="group-card row flex">
          <div class="infos col col-8 ">
            <div class="row group-name">
              <label for="group_name_input">Group name</label>
              <input type="text" id="group_name_input" v-model="group.name">
            </div>
            <div class="row group-members">
              <label for="group_members_input">Add members</label>
              <input type="text" id="group_members_input">
              <div class="added-members-list">
                <v-chip v-for="(member,i) in group.members" :key="i" close class="ma-2 my-chip" color="white">
                  {{ member }}
                </v-chip>
              </div>
            </div>
            <div class="group-privacy">
              <label >Make Public</label>
              <div class="switch">
                <switch-ui v-model="group.public" />
              </div>
            </div>
            <div class="row action-buttons">
              <button class="create-group-button">Create group</button>
              <button class="cancel-group-creation">Cancel</button>
            </div>
          </div>
          <div class="profile-pic col col-4 ">
            <div class="pic">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="83" height="58.1" viewBox="0 0 83 58.1">
                  <path id="Icon_awesome-users" data-name="Icon awesome-users"
                        d="M12.45,27.15a8.3,8.3,0,1,0-8.3-8.3A8.308,8.308,0,0,0,12.45,27.15Zm58.1,0a8.3,8.3,0,1,0-8.3-8.3A8.308,8.308,0,0,0,70.55,27.15ZM74.7,31.3H66.4a8.276,8.276,0,0,0-5.849,2.412A18.97,18.97,0,0,1,70.291,47.9H78.85A4.146,4.146,0,0,0,83,43.75V39.6A8.308,8.308,0,0,0,74.7,31.3Zm-33.2,0A14.525,14.525,0,1,0,26.975,16.775,14.518,14.518,0,0,0,41.5,31.3Zm9.96,4.15H50.384a20.054,20.054,0,0,1-17.767,0H31.54A14.944,14.944,0,0,0,16.6,50.39v3.735a6.227,6.227,0,0,0,6.225,6.225h37.35A6.227,6.227,0,0,0,66.4,54.125V50.39A14.944,14.944,0,0,0,51.46,35.45ZM22.449,33.712A8.276,8.276,0,0,0,16.6,31.3H8.3A8.308,8.308,0,0,0,0,39.6v4.15A4.146,4.146,0,0,0,4.15,47.9H12.7A19.018,19.018,0,0,1,22.449,33.712Z"
                        transform="translate(0 -2.25)" fill="#aaa"/>
                </svg>
              </div>
              <div class="img-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="30.621" height="30.621" viewBox="0 0 30.621 30.621">
                  <g id="Icon_feather-image" data-name="Icon feather-image" transform="translate(-3 -3)">
                    <path id="Path_2162" data-name="Path 2162"
                          d="M7.5,4.5h21a3,3,0,0,1,3,3v21a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3V7.5a3,3,0,0,1,3-3Z"
                          fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path id="Path_2163" data-name="Path 2163"
                          d="M15,12.75a2.25,2.25,0,1,1-2.25-2.25A2.25,2.25,0,0,1,15,12.75Z" fill="none" stroke="#fff"
                          stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path id="Path_2164" data-name="Path 2164" d="M31.5,22.5,24,15,7.5,31.5" fill="none" stroke="#fff"
                          stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewGroup",
  components:{
    switchUi:()=> import('@/components/reusable/ui/switch')
  },
  data() {
    return {
      group: {
        name: '',
        public: true,
        members: ['liberi','ntwari clarance','jama yanafuha','gustavino leo','ntwari clarance','jama yanafuha','gustavino leo','ntwari clarance','jama yanafuha','gustavino leo','ntwari clarance','jama yanafuha','gustavino leo','ntwari clarance','jama yanafuha','gustavino leo'],
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-group {
  position: absolute;
  z-index: 100;
  width: 100vw;
  height: 100vh;


  .group-wrapper {
    position: relative;
    height: 100%;
    width: 100%;


    .background-darkness {
      background-color: $font;
      opacity: .3;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    form {
      background-color: $main;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);

      .infos{
        .group-members,.group-name{
          flex-direction: column;

        }
        .group-privacy{
            display: flex;
            label{
              margin-right: 1rem;
            }
            .switch{
              display: flex;
              align-content: center;
              justify-content: center;
            }
          }
        .row{
          display: flex;
          margin:1rem 0;


          label{
            display: block;
            margin: .5rem 0;
          }
          input{
            display: block;
            padding: .2rem;
            max-width:20rem;
            color:darken($font,30);
            border:2px solid lighten($font,45);
            background-color: lighten($secondary,5);
            padding-left: 1rem;
          }
        }
        .action-buttons{
          button{
            padding:.5rem 1rem;
            margin:.4rem;

            &.create-group-button{
              background-color: $success;
              color:$main;
              width: 8rem;
            }
            &.cancel-group-creation{
              width: 8rem;
              background-color: $secondary;
            }
          }
        }
      }

      .group-card {
        padding: 1rem 2rem;

        .col{
          padding:0;
        }
      }
    ;
    }

  }
;
}
</style>
