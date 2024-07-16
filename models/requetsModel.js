const { request } = require('express')
const mongoose = require('mongoose')
const requestSchema = new mongoose.Schema({
    requestId : String,
    status : {type:String , default : 'pending'},
},{
    timestamps:true,
})



module.exports = mongoose.model('Request' , requestSchema)