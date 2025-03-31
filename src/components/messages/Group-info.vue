<template>
<div class="my-info">
  <div class="info-container">
    <div class="my-info">
      <div class="profile">
        <div class="photo">
            <input type="file" ref="img">
            <div class="icon" @click="$refs.img.click()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"/></svg>
            </div>
        </div>
        <p>Kurious</p>
      </div>
      <div class="members">
        <div class="header">
          <p>22 members</p>
          <div class="member-btn">
            <div class="icon">
              <svg id="user-add-line" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
                <path id="Path_2152" data-name="Path 2152" d="M0,0H33V33H0Z" fill="none"/>
                <path id="Path_2153" data-name="Path 2153" d="M17.75,19.222V22.1a8.25,8.25,0,0,0-11,7.78H4A11,11,0,0,1,17.75,19.22ZM15,17.5a8.25,8.25,0,1,1,8.25-8.25A8.248,8.248,0,0,1,15,17.5Zm0-2.75a5.5,5.5,0,1,0-5.5-5.5A5.5,5.5,0,0,0,15,14.75ZM23.25,23V18.875H26V23h4.125v2.75H26v4.125H23.25V25.75H19.125V23Z" transform="translate(1.5 0.375)"/>
              </svg>
            </div>
            <p>add member</p>
          </div>
        </div>
        <div class="members-list">
          <group-member v-for="(name,i) in members" :key="i" >
            <template #pic>
              <v-avatar size="35" class="avatar">
                {{ name | computeText }}
              </v-avatar>
            </template>
            <template #names >
              {{ name }}
            </template>
          </group-member>
        </div>
        <div class="action-btn">
          <button class="save">Save changes</button>
          <button class="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import GroupMember from "@/components/messages/Group-member";
export default {
  name: "Group-info",
  components: {GroupMember},
  data(){
    return {
      members:[
          'Izabayo cedric',
          'James cedric',
          'Umukura Olivier',
          'Liberi Ntwari',
          'Marie divine Gervais Hirwa',
          'Ange Sekata Moss',
          'Divin Irakiza',
          'Izabayo zakayo',
          'Liberi Jama Se',
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.my-info{
  .info-container{
    .my-info{
      padding:1rem;
      display: flex;
      flex-direction: column;
      min-width: 50rem;

      .profile{
        align-self: center;
        width: fit-content;
        .photo{
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          background-image: linear-gradient(#8456fe,#fe5bc8);
          position: relative;

            input{
              display: none;
            }
            .icon{
              position: absolute;
              top: 65%;
              left:75%;
              background-color: $success;
              width: 1.8rem;
              height: 1.8rem;
              display: flex;
              justify-content: center;
              border-radius: 50%;
              cursor: pointer;

              svg{
                transform: scale(.8);
                align-self: center;
                fill:$main;
              }
            }
        }
        p{
          font-weight: 600;
          text-align: center;
        }
      }
      .members{
        align-self: center;
        width: fit-content;

        .header{
          display: flex;
          justify-content: space-between;
          padding:.4rem 0;
          p{
            margin:0;
            height: fit-content;
            align-self: center;
            color:lighten($font,20)
          }

          .member-btn{
            display: inherit;
            background-color: $primary;
            padding:.25rem 2rem .25rem 1rem;
            border-radius: 400px;
            box-shadow: 0 0 7px lighten($primary,20);
            cursor: pointer;
            p{
              color:$main;
            }
            .icon{
              display: inherit;
              align-self: center;
              height: fit-content;
              svg{
                align-self: center;
                transform: scale(.6);
                fill:$main;
              }
            }
          }
        }

        .members-list{
          padding:1rem 0;
          max-height:17rem;
          overflow-x: hidden;
          overflow-y: auto;
          border-top: 1px solid lighten($font,65);
          border-bottom: 1px solid lighten($font,65);

          @include scroll-bar;
        }
      }

      .action-btn{
        display: flex;
        justify-content: flex-end;
        padding: .4rem 0;
        button{

          padding:.4rem 1rem;
          margin: .4rem;
          min-width: 8rem;
        }

        .save{
          background-color: $success;
          color:white;
        }
        .cancel{
          background-color: $secondary;
        }
      }
    }
  }
}
</style>