import {emit} from "./event_bus";
import {mapGetters} from "vuex";

const chatMixins = {
    methods: {
        //scroll chat to button
        scrollChatToBottom() {
            let el = document.querySelector('.msg-container')
            if (el) {
                el.scrollTop = el.scrollHeight
            }
        },
    }
}
const assessmentMixins = {
    components:{
        ErrorPage: () => import("@/components/dashboard/error.vue"),
    },
    computed: {
        ...mapGetters("user", ["paymentStatus"]),
        disabled() {
            return this.paymentStatus.paid === false
        }
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

export {cropperMixin, chatMixins,assessmentMixins}