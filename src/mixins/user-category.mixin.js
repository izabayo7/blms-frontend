import {mapGetters} from "vuex"

export default{
    computed:{
        ...mapGetters('user',['user']),
        isStudent(){
          return this.user.category === "STUDENT"
        },
        isInstructor(){
          return this.user.category === "INSTRUCTOR"
        },
        isAdmin(){
          return this.user.category === "ADMIN"
        }
    }
}