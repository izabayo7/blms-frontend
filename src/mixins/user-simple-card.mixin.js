export default{
    methods:{
        mouseOnPic(e,userName,cardId){
            const card = document.getElementById(cardId)

            this.timeout = setTimeout(() => {
                this.$store.dispatch('users/getUserByUsername',userName)
                card.style.display = "block"
                card.style.top = e.clientY + "px";
                card.style.left = e.clientX + "px";
            }, 1500)

        },
        mouseOutPic(e,cardId){
          clearTimeout(this.timeout)
          const card = document.getElementById(cardId)
          card.style.display = "none";
        },
    }
}