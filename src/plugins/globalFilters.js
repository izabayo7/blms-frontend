/**
 * all filters that are needed in many components
 */
import Vue from 'vue'

const filters = [
    {
        // decrease a strings length
        name: 'trimString',
        structure: (string, length) => {
            let trimedString = string.substring(0, length);
            trimedString = trimedString.split(" ");
            trimedString.splice(trimedString.length - 1, 1);
            trimedString = trimedString.join(" ") + " ...";
            return trimedString;
        },
    },
    {
        // (get short form of a string)
        name: 'computeText',
        structure: (string) => {
            let text = "";
            const forbiden = ["and", "of"];
            string.split(" ").forEach((val) => {
                if (!forbiden.includes(val)) text += val.substring(0, 1).toUpperCase();
            });

            return text;
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