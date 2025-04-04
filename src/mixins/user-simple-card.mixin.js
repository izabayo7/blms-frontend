export default {
    methods: {
        mouseOnPic(e, userName, cardId) {
            const card = document.getElementById(cardId)
            if (!card)
                return
            this.timeout = setTimeout(() => {
                this.$store.dispatch('users/getUserByUsername', userName)
                card.style.display = "block"
                card.style.top = e.clientY + "px";
                card.style.left = e.clientX + "px";
            }, 1500)

        },
        mouseOutPic(e) {
            // if (e) {
            // if (e.relatedTarget ? (e.relatedTarget.id !== cardId && e.relatedTarget.className !== "user-card--wrapper") : false) {
            //     clearTimeout(this.timeout)
            //     const card = document.getElementById(cardId)
            //     setTimeout(() => {
            //         card.style.display = "none";
            //     }, 1000)
            // }
            let el = document.querySelector('.user-card')

            if (!el || !el.contains(e.relatedTarget)) {
                clearTimeout(this.timeout)
                const card = document.getElementById('user-profile-card')
                setTimeout(() => {
                    card.style.display = "none";
                }, 1000)
            }
            // }
        },
    }
}