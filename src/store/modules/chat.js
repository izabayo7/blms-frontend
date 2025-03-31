import io from 'socket.io-client'
import {emit} from '@/services/event_bus'
import user from '@/store/modules/user'

export default {
    namespaced:true,
    state:{
        username:null,
        currentDisplayedUser:{},
        currentChatMessages:[],
        incomingMessages:[],
        loadedMessages:[]
    },
    mutations:{
        //set the current user
        SET_USERNAME(state, username){

            return new Promise((res,rej)=>{
                state.username = username
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
            state.loadedMessages.push(data)
        }
    },
    actions:{
        loadIncomingMessages({getters,state}){
            // get contacts new style
            getters.socket.emit('request_user_contacts');

            // Get contacts new style
            getters.socket.on('recieve_user_contacts', ({contacts}) => {
                state.incomingMessages = contacts
                emit('incoming_message_initially_loaded')
            });
        },

        //load user messages
        loadMessages({getters,state,commit},id){
            console.log(id,state.username)
            // get messages new style
            getters.socket.emit('request_conversation',{ contactId: id});

            // Get messages new style
            getters.socket.on('recieve_conversation', ({conversation,}) => {
                console.log(conversation,id)
                commit('STORE_LOADED_DATA',{username:id,messages:conversation})
                state.currentChatMessages = conversation
            })
        },

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
