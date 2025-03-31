export default{
    methods:{
        mouseOnPic(e,userId,cardId){
            const card = document.getElementById(cardId)
          this.timeout = setTimeout(() => {
            card.style.display = "block"
            card.style.top = e.clientY + "px";
            card.style.left = e.clientX + "px";

            console.log(userId)

            // console.log(e.clientY)
          }, 1500)

        },
        mouseOutPic(e,cardId){
          clearTimeout(this.timeout)
          const card = document.getElementById(cardId)
          card.style.display = "none";
        },
    }
}