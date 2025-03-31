import io from 'socket.io-client'
// import {emit} from '@/services/event_bus'
import user from '@/store/modules/user'

export default {
    namespaced:true,
    state:{
        username:null,
        currentDisplayedUser:{},
        messages:[]
    },
    mutations:{
        //set the current user
        SET_USERNAME(state, username){

            return new Promise((res,rej)=>{
                state.username = username
                console.log(state.username)
                if(state.username.length > 0 || state.username != null)
                    res()
                else
                    rej()
            })
        },

        //set the user who is being displayed on the chat
        SET_DISPLAYED_USER(state,data){
            state.currentDisplayedUser = data;
        },

        //store loaded messages
        STORE_LOADED_DATA(state,data){
            state.messages.push(data)
        }
    },
    actions:{

    },
    getters:{
        // connect to socket from sever side
        socket(){
            return io('http://161.35.199.197:7070/',{
                query:{
                    id:user.state.user._id // username of the connected user
                }
            })
        }
    },
}
