export default{
    methods:{
        mouseOnPic(e,userId){
            console.log(e)
          this.timeout = setTimeout(() => {
            this.card.style.display = "block"
            this.card.style.top = e.clientY + "px";
            this.card.style.left = e.clientX + "px";

            console.log(userId)

            // console.log(e.clientY)
          }, 1500)

        },
        mouseOutPic(){
          clearTimeout(this.timeout)
            console.log(this.card)
          this.card.style.display = "none";
        },
    }
}