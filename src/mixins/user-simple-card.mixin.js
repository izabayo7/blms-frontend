export default {
    methods: {
        mouseOnPic(e, userName, cardId) {
            const card = document.getElementById(cardId)
            this.timeout = setTimeout(() => {
                this.$store.dispatch('users/getUserByUsername', userName)
                card.style.display = "block"
                card.style.top = e.clientY + "px";
                card.style.left = e.clientX + "px";
            }, 500)

        },
        mouseOutPic(e, cardId) {
            if (!e || e.toElement.className !== "user-card--wrapper") {
                clearTimeout(this.timeout)
                const card = document.getElementById(cardId)
                setTimeout(() => {
                    card.style.display = "none";
                }, 500)
            }
        },
    }
}