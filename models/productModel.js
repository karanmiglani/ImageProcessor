const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    requestID  : String , 
    serialNumber : Number,
    productName : String,
    imageInputUrls : [String],
    outputImageUrls : [String],
    
},{
    timestamps : true,
});


module.exports =  mongoose.model('Product' , productSchema);