import apis from "@/services/apis";
import router from '@/router'

const getDefaultState = () => ({
    announcements: {
        data: [],
        loaded: false
    },
    selected_announcement: ''
})
export default {
    namespaced: true,
    state: getDefaultState,
    mutations: {
        set_selected_announcement(state, id) {
            state.selected_announcement = id
        },
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        //get announcement from backend
        getAnnouncements({state}) {
            // if announcements not loaded fetch them
            if (!state.announcements.loaded) {
                apis.get(`announcement/user`).then(d => {
                    d.data = d.data.data
                    state.announcements.data = d.data
                    //announce that data have been loaded
                    state.announcements.loaded = true
                })
            }
        },

        addAnnouncement({state}, announcement) {
                state.announcements.data.unshift(announcement)
        },
        //create a announcement
        deleteAnnouncement({state}) {
            const id = state.selected_announcement
            return apis.delete('announcement', id).then((d) => {
                if(d.data.status === 200) {
                    state.announcements.data = state.announcements.data.filter(e => e._id !== id)
                    router.push('/announcements')
                }
            })
        },
        //update a announcement
        updateAnnouncement({state}, {content}) {
            let announcementIndex
            for (const i in state.announcements.data) {
                if (state.announcements.data[i]._id == state.selected_announcement) {
                    announcementIndex = i
                    break
                }
            }

            return apis.update('announcement', state.selected_announcement, {content}).then(d => {

                state.announcements.data[announcementIndex].content = d.data.content
            })

        },
    },
    getters: {
        //get the selected_announcement
        selected_announcement: state => {
            return state.selected_announcement
        },
        //get all announcements
        announcements: state => {
            return state.announcements.data
        },
        //get a specified announcements
        announcement: state => {
            return state.announcements.data.filter(announcement => announcement._id == state.selected_announcement)[0]
        },
    },
}
