import moment from 'moment'
import router from '../router/index'
import store from '../store/index'
import vue from '../main'


/**
 * object owns a property
 *
 * @param obj
 * @param key
 * @returns {boolean}
 */
function hasOwn(obj, key) {
    if (obj === null || obj === undefined)
        return false
    return Object.prototype.hasOwnProperty.call(obj, key)
}


/**
 * convert base64 to file image
 *
 * @param base64
 * @param filename
 */
async function getImgFile(base64, filename) {
    /* convert base 64 to blob */
    const blob = await (await fetch(base64)).blob()
    /* convert blob to file image  and return it*/
    return new File([blob], filename, { type: 'image/png' })
}

/**
 * elapsed time between date_time and now
 * @param date_time
 * @returns {string}
 */
function elapsedDuration(date_time) {
    const now = moment()

    date_time = moment(date_time)

    let elapsed = date_time.diff(now)
    elapsed = moment.duration(elapsed).humanize(true)

    return elapsed
}

/**
 * know if string is empty
 * @param string
 * @returns {boolean}
 */
function empty(string) {
    return /^\s*$/.test(string);
}


/**
 * log out user and return him to login
 */
function logout() {

    // clear the session
    vue.$session.destroy();

    // reset the modules
    store.dispatch("user/unsetUser");
    store.commit("users/RESET_STATE");
    store.commit("sidebar_navbar/RESET_STATE");
    store.commit("quiz/RESET_STATE");
    store.commit("quiz_submission/RESET_STATE");
    store.commit("notification/RESET_STATE");
    store.commit("modal/RESET_STATE");
    store.commit("faculties/RESET_STATE");
    store.commit("courses/RESET_STATE");
    store.commit("colleges/RESET_STATE");
    store.commit("chat/RESET_STATE");
    store.commit("years/RESET_STATE");

    // redirect to login
    router.push("/login");
}

function calculateNearestLiveSession(course) {
    let live_session = undefined
    for (const i in course.chapters) {
        if (course.chapters[i].live_sessions.length) {
            if (!live_session && (new Date(course.chapters[i].live_sessions[0].date) >= new Date(new Date().toISOString().substring(0, 10)))) {
                live_session = course.chapters[i].live_sessions[0]
            } else if (live_session) {
                if (live_session.date < course.chapters[i].live_sessions[0].date) {
                    live_session = course.chapters[i].live_sessions[0]
                }
            }
        }
    }
    return live_session;
}

export {
    hasOwn,
    getImgFile,
    elapsedDuration,
    empty,
    logout,
    calculateNearestLiveSession
}