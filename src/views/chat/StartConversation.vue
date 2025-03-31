<template>
<div class="my-start-conversation">
  <div class="search-start-conversation-container">
    <div class="search-container">
      <h2>Search User</h2>
      <div class="search-bar-container">
        <div class="search-bar">
          <div class="search-input">
            <div class="input-container">
              <div class="user"  v-if="foundUser">
                <img :src="foundUser.pic" :alt="`${foundUser.names} profile picture`">
                <p>{{foundUser.names}}</p>
                <span v-if="foundUser.category.toLowerCase() === 'instructor' ">{{foundUser.category}}</span>
              </div>
              <input @input="searchIt" v-model="query" autocomplete="off" spellcheck="false" autocapitalize="off" v-else type="text">
              <ul class="searched-users" v-if="foundUsers.length > 0">
                <li class="user" v-for="(user,i) in foundUsers" :key="i" @click="selectUser(i)">
                  <img :src="user.pic" :alt="`${user.names} profile picture`">
                  <p>{{user.names}}</p>
                  <span v-if="user.category.toLowerCase() === 'instructor'">{{user.category}}</span>
                </li>
              </ul>
            </div>
            <div class="icon">
              <svg v-if="foundUser !== null" @click="erase" class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
              <svg v-else class="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg>
            </div>
          </div>
        </div>
        <div class="button">
          <button class="start-conversation-btn">Start conversation</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "StartConversation",
  data(){
    return {
      users : [
        {pic : "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",names:'Ntwari Clarance Liberiste', category:'Student'},
        {pic : "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",names:'Cedric Izabayo', category:'Student'},
        {pic : "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",names:'Gustave Umukura', category:'Instructor'},
        {pic : "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",names:'Inzara Nimbi', category:'Student'},
        {pic : "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",names:'Uzapfurundi Damas', category:'Student'},
        {pic : "https://i2.wp.com/worldbusinessfitness.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg",names:'Ingegera Pixel', category:'Instructor'},
      ],
      foundUsers:[],
      query:'',
      foundUser:null,

    }
  },
  methods:{
    search(str){
      this.foundUsers = [];

      this.users.map((val,i) => {
        if(val.names.search(new RegExp(str,'ig')) >= 0)
          this.foundUsers.push(this.users[i])
      })
    },
    searchIt(){
      this.search(this.query)
    },
    selectUser(idx){
      this.foundUser = this.foundUsers[idx]
      console.log(this.foundUser)
    },
    erase(){
      this.foundUser = ''
    }
  }

}
</script>

<style lang="scss" scoped>
.my-start-conversation{
  .search-start-conversation-container{
    background-color: $blue-gray;
    min-height: calc(100vh -  5rem);
    display: flex;
    justify-content: center;

    .search-container{
      align-self: center;
      background-color: $main;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      box-shadow: 0 0 10px lighten($font,62);
      border-radius: 1px;

      h2{
        font-size: .9rem;

      }
      .search-bar-container{
        display: flex;

        .search-input{
          width: 18rem;
          display: flex;
          justify-content: space-between;
          margin: .5rem 1rem .5rem 0;
          border:2px solid lighten($font,55);
          background-color: lighten($font,65);
          padding: .3rem;
          position: relative;

          div.icon{
            cursor: pointer;
            display: flex;
            svg{
              align-self: center;
              transform: scale(.8);
            }
          }
          div.user{
            display: flex;
            img{
              width: 20px;
              height: 20px;
              border-radius: 50%;
              object-fit: cover;
              margin: .2rem .3rem;
            }
            p{
              margin: .2rem .3rem;
              align-self: center;
              height: fit-content;
              padding:0;
              font-size: .8rem;
            }
            span{
              display: inline-flex;
              justify-self: self-end;
              align-self: center;
              background-color: lighten($success,20);
              font-size: .6rem;
              padding:.05rem 1rem;
              text-transform:lowercase;
              color:darken($font,50);
              border-radius: 40px;
              margin-left: 1rem;
            }
          }

          ul{
            position: absolute;
            width: 100%;
            background-color: $main;
            top:110%;
            left: 0;
            border-radius: 5px;
            box-shadow: 0 5px 10px lighten($font,60);
            padding:.4rem .5rem;

            span{
              display: inline-flex;
              justify-self: self-end;
              align-self: center;
              background-color: lighten($success,20);
              font-size: .6rem;
              padding:.05rem 1rem;
              text-transform:lowercase;
              color:darken($font,50);
              border-radius: 40px;
              margin-left: 1rem;
            }


            li{
              padding:.1rem;
              display: flex;
              flex-direction: row;
              max-height: 15rem;
              cursor: pointer;

              &:hover{
                background-color: lighten($font,65);
              }

              img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                object-fit: cover;
                margin: .2rem .3rem;
              }

              p{
                margin: .2rem .3rem;
                align-self: center;
                height: fit-content;
                padding:0;
                font-size: .8rem;
              }
            }
          }
        }
        .button{
          display: inline-flex;

          button{
            align-self: center;
            background-color: $success;
            color:$main;
            padding: .3rem 1rem;
            border-radius: 50px;
          }
        }
      }
    }
  }
}
</style>