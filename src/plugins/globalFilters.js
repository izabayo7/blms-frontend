/**
 * all filters that are needed in many components
 */
import Vue from 'vue'
import {elapsedDuration} from "../services/global_functions";

// eslint-disable-next-line
const urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi

const filters = [
    {
        // decrease a strings length
        name: 'trimString',
        structure: (string, length) => {
            if (!string)
                return
            if (string.length < length)
                return string
            let trimedString = string.substring(0, length);
            // trimedString = trimedString.split(" ");
            // trimedString.splice(trimedString.length - 1, trimedString.length > 1 ? 1 : 0);
            // let arrlength = trimedString.length
            // trimedString = trimedString.join(" ");
            // trimedString += arrlength > 1 ? " ..." : ''
            trimedString += "..."
            return trimedString;
        },
    },
    {
        // (get short form of a string)
        name: 'computeText',
        structure: (string) => {
            if (!string) return;
            return string[0].toUpperCase();
        },
    },
    {
        //format date
        name: 'formatDate',
        structure: (dateToFormat) => {
            if (!dateToFormat) return
            const dateFormat = new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            }); // format to format the date
            const formatedDate = dateFormat.formatToParts(new Date(dateToFormat)); //lets format date
            const [
                {value: month},
                ,
                {value: day},
                ,
                {value: year},
            ] = formatedDate; //lets destruct data from the formated date

            return `${day} ${month} ${year}`;
        },
    },
    {
        //get difference between two dates
        name: 'getTimeDifference',
        structure: (date1, date2 = new Date()) => {

            let result

            // make sure they are date objects
            if (typeof date1 !== 'object') {
                date1 = new Date(date1)
            }
            if (typeof date1 !== 'object') {
                date2 = new Date(date2)
            }

            var diff = (date2.getTime() - date1.getTime());

            // To calculate the no. of days between two dates
            var Difference_In_Days = Math.round(diff / (1000 * 3600 * 24))

            if (Difference_In_Days > 1) {
                result = date1.toISOString().substr(2, 8).split('-').reverse().join('/')
            } else if (Difference_In_Days === 1) {
                result = 'yesterday'
            } else {
                result = date1.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
            }

            return result
        },
    },
    {
        name: 'urlify',
        structure(text) {
            if (!text)
                return
            else if(text !== "")
                return text
            // return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
            return text.replace(urlRegex, (d) => {
                return `<a href="${d}" target="_blank" >${d} </a>`
            })

        }
    },
    {
        name: 'injectTime',
        structure(text) {
            if (!text)
                return
            const regex = /^__time__(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z)/i
            const segments = text.split(" ")

            for (const i in segments) {
                if (regex.test(segments[i]))
                    segments[i] = segments[i].replace(/^__time__(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z)/i, (d) => {
                        return elapsedDuration(d.split('__time__')[1])
                    })
                else if (segments[i] === 'at')
                    segments[i] = ''
            }
            return segments.join(" ")
        }
    }

]
// add the filters to vue
const MyPlugin = {
    install(Vue) {
        for (const currentFunction of filters) {
            Vue.filter(currentFunction.name, currentFunction.structure)
        }

    },
}
Vue.use(MyPlugin)


