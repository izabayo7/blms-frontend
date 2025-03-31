// check if object has certain property
exports.hasOwn = (obj, key) => {
    if (obj === null || obj === undefined)
        return false
    return Object.prototype.hasOwnProperty.call(obj, key)
}

//convert base 64 to file image
exports.getImgFile= async (base64,filename)=>{
    /* convert base 64 to blob */
    const blob = await (await fetch(base64)).blob()
    /* convert blob to file image  and return it*/
    return  new File([blob],filename,{type:'image/png'})
}