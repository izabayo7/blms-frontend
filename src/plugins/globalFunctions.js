/**
 * all functions that are needed in many components
 */
import Vue from 'vue'

const functions = [
    {
        // decrease a strings length
        name: 'trimString',
        structure: ({ string, length }) => {
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

]
// add the functions to vue
const MyPlugin = {
    install(Vue) {
        for (const currentFunction of functions) {
            Vue.prototype[currentFunction.name] = currentFunction.structure
        }

    },
}
Vue.use(MyPlugin)