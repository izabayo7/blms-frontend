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
    return new File([blob], filename, {type: 'image/png'})
}

/**
 * elapsed time between date_time and now
 * @param date_time
 * @returns {string}
 */
function elapsedDuration(date_time, endTime) {

    const now = endTime ? moment(endTime) : moment()

    date_time = moment(date_time)

    let elapsed = date_time.diff(now)
    elapsed = moment.duration(elapsed).humanize(true);

    return elapsed
}

/**
 * elapsed time difference date_time and now
 * @param date_time
 * @returns {number}
 */
function daysDifference(date_time) {
    const now = moment()

    date_time = moment(date_time)
    now.set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    })
    date_time.set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    })
    return now.diff(date_time, 'days')
}

/**
 * date_time to local time
 * @param date_time
 * @returns {string}
 */
function toLocal(date_time) {
    return moment.utc(date_time).local().format()
}

/**
 * returns local date and time
 * @returns {Object}
 */
function getDateAndTime() {
    let now = moment();
    return {
        date: now.format("YYYY-MM-DD"),
        time: now.format("HH:mm")
    }
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
 * auto increases input height
 */
function autoResizeQuestionInput(e, el) {
    console.log(e,el)
    if (!el)
        el = e.target
    else
        console.log(el,el.style.height)
    el.style.height = "auto";
    el.style.height = (el.scrollHeight) + "px";
    console.log(el.style.height)
}


/**
 * log out user and return him to login
 */
async function logout() {

    const institution = store.state.sidebar_navbar.college.name

    // clear the session
    await vue.$session.destroy();

    // reset the modules
    await store.dispatch("user/unsetUser");
    await store.commit("users/RESET_STATE");
    await store.commit("sidebar_navbar/RESET_STATE");
    await store.commit("quiz/RESET_STATE");
    await store.commit("quiz_submission/RESET_STATE");
    await store.commit("notification/RESET_STATE");
    await store.commit("modal/RESET_STATE");
    await store.commit("faculties/RESET_STATE");
    await store.commit("courses/RESET_STATE");
    await store.commit("colleges/RESET_STATE");
    await store.commit("chat/RESET_STATE");
    await store.commit("years/RESET_STATE");

    // redirect to login
    await router.push("/login?institution=" + institution);
    location.reload()
}

function calculateNearestLiveSession(course) {
    let live_session = undefined
    for (const i in course.chapters) {
        if (course.chapters[i].live_sessions.length) {
            live_session = course.chapters[i].live_sessions.filter(e => e.status == "PENDING")
            if (live_session.length) {
                live_session = live_session[0]
                break
            } else {
                live_session = undefined
            }
        }
    }
    return live_session;
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - Math.abs(offset));
    return newDate;
}

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

async function downloadAttachment(url) {
    window.open(url, "_blank");
}

function getTime(date) {
    date = new Date(date)
    date.setHours(date.getUTCHours())
    date.setMinutes(date.getUTCMinutes())
    return new Date(date).toLocaleTimeString()
}

function findLocalTime(date) {
    let date_copy = date
    date = new Date(date)
    date.setHours(date.getUTCHours())
    date.setMinutes(date.getUTCMinutes())

    let s = new Date(date)
    let t = s.toLocaleTimeString()
    let hours = s.getHours()
    if (hours < 10)
        hours = `0${hours}`
    return `${date_copy.substring(0, 11)}${hours}:${t.split(':')[1]}`
}

export {
    hasOwn,
    getImgFile,
    elapsedDuration,
    empty,
    logout,
    calculateNearestLiveSession,
    convertUTCDateToLocalDate,
    toLocal,
    playSound,
    getDateAndTime,
    downloadAttachment,
    daysDifference,
    getTime,
    findLocalTime,
    autoResizeQuestionInput
}
