import Vue from 'vue'

const bus = new Vue

//emitter
const emit = function(eventName,payload = null){
    bus.$emit(eventName,payload)
}

//listener
const on = function(eventName,callback){
    bus.$on(eventName,function(payload){
        callback(payload)
    })
}

export {emit,on}
