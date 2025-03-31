exports.chatMixins = {
    methods:{
        //scroll chat to button
        scrollChatToBottom(){
            let el = document.getElementById('my-chat-messaging')
            el.scrollTop = el.scrollHeight
        },
    }
}
