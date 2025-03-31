import {mapGetters} from "vuex"

export default{
    computed:{
        ...mapGetters('user',['user']),
        isStudent(){
          return this.user.category.name === "STUDENT"
        },
        isInstructor(){
          return this.user.category.name === "INSTRUCTOR"
        },
        isAdmin(){
          return this.user.category.name === "ADMIN"
        }
    }
}