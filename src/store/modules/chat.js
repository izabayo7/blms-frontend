import io from 'socket.io-client'
import {emit} from '@/services/event_bus'
import store from '@/store'
import router from '@/router'
import apis from "@/services/apis";
import Vue from 'vue'

const getDefaultState = () => ({
    username: null,
    currentDisplayedUser: {},
    incomingMessages: [],
    loadedMessages: [],
    request: {
        ongoing: false,
        id: null,
        status: 0
    },
    socket: undefined,
    group: {
        error: ""
    }
})

export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        SET_SOCKET(state) {
            if (io.socket) io.socket.removeAllListeners()

            state.socket = io(process.env.VUE_APP_api_service_url, {
                query: {
                    token: Vue.prototype.$session.get(
                        "jwt"
                    ) // toke n of the connected user
                }
            })
        },
        //set the current user
        SET_USERNAME(state, username) {
            state.username = username
        },

        //set the user who is being displayed on the chat
        SET_DISPLAYED_USER(state, data) {
            state.currentDisplayedUser = data;
        },
        ADD_INCOMING_CONTACT(state, data) {
            let FOUND = false;

            /* handling existing user */
            state.incomingMessages.map(msg => {
                if (msg.id === data.id) FOUND = true
            })

            if (!FOUND) state.incomingMessages.push(data)
        },

        SET_GROUP_ERROR(state, err) {
            state.group.error = err;

            setTimeout(() => {
                state.group.error = '';
            }, 3000)
        },

        //store loaded messages
        STORE_LOADED_MESSAGES(state, data) {
            // verify if data object has information
            if (data.conversation.length <= 0 || data.username === undefined || data.username == null || data.username.length <= 0)
                return

            let exists = false;

            //check if the messages we are about to add doesn't exist
            state.loadedMessages.map(loadedMsg => {
                if (loadedMsg.username === data.username)
                    exists = true
            })

            if (!exists)
                state.loadedMessages.push(data)
        },

        //add incoming message
        ADD_INCOMING_MESSAGE(state, newMessage) {

            const id = newMessage.title ? 'announcements' : newMessage.group ? newMessage.group : newMessage.sender.user_name
            //get last message from stored conversation
            store.dispatch('chat/lastMessageInCertainChatMessages', id.toString()).then(({
                                                                                             lastMessage,
                                                                                             groupIndex,
                                                                                             userIndex
                                                                                         }) => {

                //if conversation was found and message not duplicated
                if (userIndex === undefined || lastMessage._id === newMessage._id)
                    return

                //full names of the one who is sending messsage
                let incomingName = `${newMessage.sender.sur_name} ${newMessage.sender.other_names}`
                //user conversation between sender and receiver
                let userMessages = state.loadedMessages[userIndex].conversation
                //if conversation was found
                if (userMessages && id !== "announcements") {
                    // if the last sender is the receiver
                    if (userMessages[groupIndex].from.toLowerCase() === 'me') {
                        //store it as new set of message conversation
                        userMessages.push({
                            from: incomingName,
                            image: newMessage.sender.profile,
                            messages: [newMessage]
                        })
                        //else append to the current messages
                    } else {
                        //if the last sender is the same as new message sender
                        if (lastMessage.sender === newMessage.sender._id || lastMessage.sender._id === newMessage.sender._id) {
                            userMessages[userMessages.length - 1].messages.push(newMessage)
                        } else {
                            userMessages.push({from: incomingName, messages: [newMessage]})
                        }
                    }
                } else if (userMessages) {
                    userMessages.push(newMessage)
                }

                //increase unread message or read message
                store.dispatch('chat/findIndexOfUserInIncomingMessages', id).then(idx => {
                    if (idx === null) {
                        //to be done later
                    } else {
                        //if the last message sender is the sam as new message sender
                        if (newMessage.sender._id === state.currentDisplayedUser.id)
                            state.incomingMessages[idx].unreadMessagesLength = 0
                        else // unless the last message sender is not the same as new message sender
                            state.incomingMessages[idx].unreadMessagesLength += 1

                        state.incomingMessages[idx].last_message = newMessage

                        //put conversation on the first place
                        // store.commit('chat/CHANGE_CONVERSATION_STAND', newMessage)
                        state.incomingMessages.splice(0, 0, state.incomingMessages.splice(idx, 1)[0])
                    }
                })

            })

        },
        //store the message that we sent
        ADD_ONGOING_MESSAGE(state, newMessage) {

            store.dispatch('chat/lastMessageInCertainChatMessages', state.username).then(({
                                                                                              lastMessage,
                                                                                              groupIndex,
                                                                                              userIndex
                                                                                          }) => {
                if (lastMessage._id !== newMessage._id) {

                    //if we have not yet chatted with the user
                    if (userIndex === undefined) {
                        state.loadedMessages.push({
                            username: state.username,
                            conversation: [{from: 'me', messages: [newMessage]}]
                        })
                    } else {//if we have been chatting
                        let userMessages = state.loadedMessages[userIndex].conversation

                        if (userMessages[groupIndex].from.toLowerCase() !== 'me') {
                            userMessages.push(
                                {from: 'me', messages: [newMessage]}
                            )
                        } else {
                            userMessages[userMessages.length - 1].messages.push(newMessage)
                        }
                    }
                }


            })

            store.dispatch('chat/findIndexOfUserInIncomingMessages', state.currentDisplayedUser.id).then(idx => {
                if (idx === null) {
                    //to be done later
                } else {
                    state.incomingMessages[idx].unreadMessagesLength = 0
                    state.incomingMessages[idx].last_message = newMessage

                    // put conversation on the first place
                    state.incomingMessages.splice(0, 0, state.incomingMessages.splice(idx, 1)[0])
                }
            })
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },

        //change msg status on read
        CHANGE_MESSAGE_READ_STATUS(state) {
            let idx;

            //find conversation of who wa are chatting with
            state.incomingMessages.map((val, i) => {
                if (val.id === state.currentDisplayedUser.id) idx = i;
            })

            // if found then unread messages
            if (idx > -1) state.incomingMessages[idx].unreadMessagesLength = 0;
        },

        // change conversation to first if new message is sent or received
        CHANGE_CONVERSATION_STAND(state, msg) {
            let idx = -1;
            const id = msg.group ? msg.group : msg.sender.user_name;
            const message = {
                content: msg.content,
                sender: msg.sender._id,
                time: msg.createdAt
            }

            // find the index of the incoming message
            state.incomingMessages.map((val, i) => {
                if (val.id == id) idx = i
            })

            if (idx > -1) {
                state.incomingMessages.splice(0, 0, state.incomingMessages.splice(idx, 1)[0])
                state.incomingMessages[0].last_message = message
            }

        }

    },
    actions: {
        lastMessageInCertainChatMessages({state}, id) {

            let lastMessage;
            let lastGroupedMessageIndex;
            let userIndex;

            state.loadedMessages.map((conversation, index) => {
                if (conversation.username === id) {
                    lastGroupedMessageIndex = state.loadedMessages[index].conversation.length - 1
                    if (id !== 'announcements') {
                        let lastIndividualMessageIndex = state.loadedMessages[index].conversation[lastGroupedMessageIndex].messages.length - 1
                        lastMessage = state.loadedMessages[index].conversation[lastGroupedMessageIndex].messages[lastIndividualMessageIndex]
                    } else {
                        lastMessage = state.loadedMessages[index].conversation[lastGroupedMessageIndex]
                    }
                    userIndex = index
                }
            })

            return ({lastMessage, groupIndex: lastGroupedMessageIndex, userIndex})
        },
        loadIncomingMessages({getters, state}) {
            // get contacts new style
            getters.socket.emit('message/contacts');

            // Get contacts new style
            getters.socket.on('res/message/contacts', ({contacts}) => {
                state.incomingMessages = contacts
                emit('incoming_message_initially_loaded')
            });

            // Get new contact
            getters.socket.on('res/message/contacts/new', ({contact, redirect}) => {
                state.incomingMessages.unshift(contact)
                if (redirect)
                    router.push(`/messages/${contact.id}`)
            });
        },
        removeMember({state}, {groupId, member}) {
            apis.update("chat_group", `${groupId}/remove_member/${member.data.user_name}`).then(() => {
                for (const i in state.incomingMessages) {
                    if (state.incomingMessages[i].id == groupId) {
                        state.incomingMessages[i].members.splice(state.incomingMessages[i].members.indexOf(member), 1)
                        break
                    }
                }
            })

        },
        toogleIsAdmin({state}, {groupId, member}) {
            apis.update("chat_group", `${groupId}/toogle_isAdmin/${member.data.user_name}`).then(() => {
                for (const i in state.incomingMessages) {
                    if (state.incomingMessages[i].id == groupId) {
                        for (const k in state.incomingMessages[i].members) {
                            if (state.incomingMessages[i].members[k].id == member.id) {
                                state.incomingMessages[i].members[k].isAdmin = !state.incomingMessages[i].members[k].isAdmin
                            }
                        }
                        break
                    }
                }
            })

        },
        start_conversation({state, getters}, user_name) {

            // search if conversation exist
            const contact_found = state.incomingMessages.filter(c => c.id == user_name)

            // if found go to it
            if (contact_found.length) router.push(`/messages/${user_name}`);

            // else initialise it
            else getters.socket.emit('message/start_conversation', {conversation_id: user_name});
        },
        //load user messages
        loadMessages({getters, state, commit}, id) {
            // const group = user.is_group

            // get messages
            //first check if we have ongoing requested data with the same id as this
            if (state.request.id !== id) {
                getters.socket.emit('message/conversation', {conversation_id: id});
                state.request.ongoing = true
                state.request.id = id
            }

            // Get messages
            getters.socket.on('res/message/conversation', ({conversation}) => {
                //check if returned conversation object has data
                if (conversation.length > 0) {
                    commit('STORE_LOADED_MESSAGES', {username: id, conversation: conversation})

                }
                if (conversation.status === 404)
                    state.request.status = 404

                state.request.id = null
                state.request.ongoing = false
                emit('conversation_loaded')
            })
        },
        setUsername({commit, state}, username) {
            commit('SET_USERNAME', username)
            return new Promise((res, rej) => {
                if (state.username === username) {
                    res(state.username)
                } else {
                    rej()
                }
            })

        },

        //to get index of user in incoming/received contacts
        findIndexOfUserInIncomingMessages({state}, id) {
            let index = null;
            state.incomingMessages.map((message, idx) => {
                if (message.id === id)
                    index = idx
            })

            return index
        }
    },
    getters: {
        // connect to socket from sever side
        socket(state) {
            return state.socket
        },

        groupError(state) {
            return state.group.error;
        },

        //get messages from loaded messages base on its id
        getLoadedMessagesBaseOnId: state => id => {
            let message = false;
            state.loadedMessages.map(convo => {
                if (convo.username === id)
                    message = convo.conversation
            })
            return message
        },

        //message current messages to display base on the current user (selected user in the link)
        currentMessages(state) {

            //get the user messages from store
            let messages = store.getters['chat/getLoadedMessagesBaseOnId'](state.username)
            let messagesFound = !!messages

            //if user messages are not in store load it from backend
            //and user has conversation with
            if (messagesFound === false && state.request.status !== 404) {
                store.dispatch('chat/loadMessages', state.username)
            }

            return messages
        },
        conversationLoading(state) {
            return state.request.ongoing
        },

    },
}

