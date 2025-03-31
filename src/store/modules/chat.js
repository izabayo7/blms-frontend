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
        loadedMessages:[],
        conversationLoading:true,
    },
    mutations:{
        //set the current user
        SET_USERNAME(state, username){
            state.username = username
        },

        //set the user who is being displayed on the chat
        SET_DISPLAYED_USER(state,data){
            state.currentDisplayedUser = data;
        },

        //store loaded messages
        STORE_LOADED_DATA(state,data){
            // verify if data object has information
            if(data.messages.length <=0 || data.username === undefined || data.username == null || data.username.length<=0)
                return

            let exists = false;

            //check if the messages we are about to add doesn't exist
            state.loadedMessages.map(loadedMsg => {
                if(loadedMsg.username === data.username)
                    exists = true
            })

            if(!exists)
                state.loadedMessages.push(data)
        }
    },
    actions:{
        loadIncomingMessages({getters,state}){
            // get contacts new style
            getters.socket.emit('request_user_contacts');

            // Get contacts new style
            getters.socket.on('receive_user_contacts', ({contacts}) => {
                // console.log(contacts)
                state.incomingMessages = contacts
                emit('incoming_message_initially_loaded')
            });
        },

        //load user messages
        loadMessages({getters,state,commit},id){
            // get messages new style
            getters.socket.emit('request_conversation',{ contactId: id});

            // Get messages new style
            getters.socket.on('receive_conversation', ({conversation}) => {
                emit('conversation_loaded')
                commit('STORE_LOADED_DATA',{username:id,messages:conversation})
                state.currentChatMessages = conversation;
                // console.log(conversation)
            })
        },
        setUsername({commit,state},username){
            commit('SET_USERNAME',username)

            return new Promise((res,rej) => {
                console.log(`set ${username} and ${state.username}`)
                if(state.username === username){
                    res(state.username)
                }else {
                    rej()
                }
            })

        }

    },
    getters:{
        // connect to socket from sever side
        socket(){
            return io('http://161.35.199.197:7070',{
                query:{
                    id:user.state.user._id // username of the connected user
                }
            })
        }
    },
}
