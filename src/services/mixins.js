import {emit} from "./event_bus";

const chatMixins = {
    methods:{
        //scroll chat to button
        scrollChatToBottom(){
            let el = document.getElementById('my-chat-messaging')
            el.scrollTop = el.scrollHeight
        },
    }
}

const cropperMixin = {
    methods:{
        readURL(input) {
            const self = this;
            input = input.target;
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    self.img = e.target.result;
                    emit("new-image-loaded"); // to tell image cropper that new image was added
                };

                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        },
        imageCropped(img) {
            //if we have preview add it
            const image = document.getElementById("preview");
            image.src = img;

            this.profile = img;
        },
        handleFileUpload(e) {
            //make sure that target is cleaned
            e.target.value = ''

            this.readURL(e);
            this.profile = this.$refs.file.files[0];
        }
    }
}

export {cropperMixin,chatMixins}