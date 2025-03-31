// check if object has certain property
exports.hasOwn =  (obj,key) => {
    if(obj === null || obj === undefined)
        return false
    return Object.prototype.hasOwnProperty.call(obj,key)
}
