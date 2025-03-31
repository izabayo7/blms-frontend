import io from 'socket.io-client'
import {emit} from '@/services/event_bus'
import user from '@/store/modules/user'
import store from '@/store'

export default {
    namespaced:true,
    state:{
        username:null,
        currentDisplayedUser:{},
        incomingMessages:[],
        loadedMessages:[],
        request:{
            ongoing:false,
            id:null,
            status:0
        },
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
        STORE_LOADED_MESSAGES(state,data){
            // verify if data object has information
            if(data.conversation.length <=0 || data.username === undefined || data.username == null || data.username.length<=0)
                return

            let exists = false;

            //check if the messages we are about to add doesn't exist
            state.loadedMessages.map(loadedMsg => {
                if(loadedMsg.username === data.username)
                    exists = true
            })

            if(!exists)
                state.loadedMessages.push(data)
        },

        //add incoming message
        ADD_INCOMING_MESSAGE(state,newMessage){

            //get last message from stored conversation
            store.dispatch('chat/lastMessageInCertainChatMessages',newMessage.sender._id).then(({lastMessage,groupIndex,userIndex}) => {

                //if conversation was found and message not duplicated
               if(userIndex === undefined || lastMessage._id === newMessage._id)
                   return

                //full names of the one who is sending messsage
                let incomingName = `${newMessage.sender.surName} ${newMessage.sender.otherNames}`
                    //user conversation between sender and receiver
                    let userMessages = state.loadedMessages[userIndex].conversation
                        //if conversation was found
                    if(userMessages){
                        // if the last sender is the receiver
                        if(userMessages[groupIndex].from.toLowerCase() === 'me'){
                            //store it as new set of message conversation
                            userMessages.push(
                                {from:incomingName,messages:[newMessage]}
                            )
                            //else append to the current messages
                        } else{
                            userMessages[userMessages.length-1].messages.push(newMessage)
                        }
                    }

                })
        },
        //store the message that we sent
        ADD_ONGOING_MESSAGE(state,newMessage){

            newMessage = {
                content:newMessage,
                createdAt: new Date(),
                _id:`${Math.random()}`
            }

            store.dispatch('chat/lastMessageInCertainChatMessages',state.username).then(({lastMessage,groupIndex,userIndex}) => {

                if(lastMessage._id !== newMessage._id){

                    if(userIndex === undefined){
                        state.loadedMessages.push({username:state.username,conversation:[{from:'me',messages:[newMessage]}]})
                    }else {
                        let userMessages = state.loadedMessages[userIndex].conversation

                        if(userMessages[groupIndex].from.toLowerCase() !== 'me'){
                            userMessages.push(
                                {from:'me',messages:[newMessage]}
                            )
                        } else{
                            userMessages[userMessages.length-1].messages.push(newMessage)
                        }
                    }
                }

            })
        },

    },
    actions:{
        lastMessageInCertainChatMessages({state},id){

            let lastMessage;
            let lastGroupedMessageIndex;
            let userIndex;


            state.loadedMessages.map((conversation,index) => {
                if(conversation.username === id){
                    lastGroupedMessageIndex = state.loadedMessages[index].conversation.length -1
                    let lastIndividualMessageIndex = state.loadedMessages[index].conversation[lastGroupedMessageIndex].messages.length -1
                    lastMessage = state.loadedMessages[index].conversation[lastGroupedMessageIndex].messages[lastIndividualMessageIndex]
                    userIndex = index
                }
            })

          return ({lastMessage,groupIndex:lastGroupedMessageIndex,userIndex})
        },
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
            // get messages
            //first check if we have ongoing requested data withe the same id as this
            if(state.request.id !== id){
                getters.socket.emit('request_conversation',{ contactId: id});
                state.request.ongoing = true
                state.request.id = id
            }


            // Get messages
            getters.socket.on('receive_conversation', ({conversation}) => {
                emit('conversation_loaded')
                //check if returned conversation object has data
                if(conversation.length > 0){
                    commit('STORE_LOADED_MESSAGES',{username:id,conversation:conversation})

                }
                if(conversation.status === 404)
                    state.request.status = 404

                state.request.id = null
                state.request.ongoing = false
                // console.log(conversation)
            })
        },
        setUsername({commit,state},username){
            commit('SET_USERNAME',username)

            return new Promise((res,rej) => {
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
            // return io('http://192.168.8.100:7070',{
                query:{
                    id:user.state.user._id // username of the connected user
                }
            })
        },

        //get messages from loaded messages base on its id
        getLoadedMessagesBaseOnId:state => id => {
            let message = false;
            state.loadedMessages.map(convo => {
                if(convo.username === id)
                    message = convo.conversation
            })
            return message
        },

        //message current messages to display base on the current user (selected user in the link)
        currentMessages(state){

            //get the user messages from store
            let messages = store.getters['chat/getLoadedMessagesBaseOnId'](state.username)
            let messagesFound = !!messages

            //if user messages are not in store load it from backend
            //and user has conversation with
            if(messagesFound === false && state.request.status !== 404){
                store.dispatch('chat/loadMessages',state.username)
            }

            return messages
        },
        conversationLoading(state){
            return state.request.ongoing
        },

    },
}

