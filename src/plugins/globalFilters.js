/**
 * all filters that are needed in many components
 */
import Vue from 'vue'

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
            trimedString = trimedString.split(" ");
            trimedString.splice(trimedString.length - 1, trimedString.length > 1 ? 1 : 0);
            let arrlength = trimedString.length
            trimedString = trimedString.join(" ");
            trimedString += arrlength > 1 ? " ..." : ''
            return trimedString;
        },
    },
    {
        // (get short form of a string)
        name: 'computeText',
        structure: (string) => {
            return string[0].toUpperCase();
        },
    },
    {
        //format date
        name: 'formatDate',
        structure: (dateToFormat) => {
            const dateFormat = new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            }); // format to format the date
            const formatedDate = dateFormat.formatToParts(new Date(dateToFormat)); //lets format date
            const [
                { value: month },
                ,
                { value: day },
                ,
                { value: year },
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
            var Difference_In_Days = diff / (1000 * 3600 * 24);

            if (Difference_In_Days > 1) {
                result = date1.toISOString().substr(2, 8).split('-').reverse().join('/')
            } else if (Difference_In_Days === 1) {
                result = 'yesterday'
            } else {
                result = date1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }

            return result
        },
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
