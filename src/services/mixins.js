import { emit } from "./event_bus";

const chatMixins = {
    methods: {
        //scroll chat to button
        scrollChatToBottom() {
            let el = document.getElementById('my-chat-messaging')
            if (el){
                el.scrollTop = el.scrollHeight

                el.scrollTo({top: el.scrollHeight, behavior: 'smooth'})
            }
        },
    }
}

const cropperMixin = {
    methods: {
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

            //emit event on component that we have cropped image
            this.$emit("image_cropped")

            this.profile = img;
        },
        handleFileUpload(e) {
            this.readURL(e);
            // this.profile = this.$refs.file.files[0];

            //make sure that target is cleaned
            e.target.value = ''
        }
    }
}

export { cropperMixin, chatMixins }