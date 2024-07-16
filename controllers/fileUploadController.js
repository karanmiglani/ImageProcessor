const multer = require('multer');
const fs = require('fs');
const Request = require('../models/requetsModel');
const Product = require("../models/productModel")
const path = require('path')
const csv = require('csv-parser')
const {v4:uuid} = require('uuid')
const {validateCsv} = require('../utils/validate_csv')
const {processImages} = require('./fileProcessingController')
const upload = multer({
    dest:'uploads/'
})




const uploadCsv = (req , resp) => {
    if(!req.file){
        return resp.status(400).json({message:"Please upload the csv file."})
    }
    const requestId = uuid();
    const results = [];
    const file = req.file;
    const fileExtension = path.extname(file.originalname)
    const filepath = req.file.path
    if(fileExtension !== '.csv'){
        return resp.status(400).json({message:"Please upload the csv file."})
    }
   
    fs.createReadStream(filepath)
    .pipe(csv())
    .on('data' , (data) => results.push(data) )
    .on('end' , async () => {
        if(!validateCsv(results)){
            fs.unlink(filepath , (err) => {
                if (err) console.error('Error deleting file:', err);
            })
            return resp.status(400).json({ message: 'Invalid CSV format' });
        }
        console.log('Saving...')
       const result =  await new Request({requestId}).save()
       for (const row of results){
        const saveId = await new Product({
            requestID : requestId,
            serialNumber : row['S.NO.'],
            productName : row['Product Name'],
            imageInputUrls : row['Input Image Urls'].split(',') 
        }).save()
       }
       fs.unlink(filepath, (err) => {
        if (err) console.error('Error deleting file:', err);
    });
       processImages(requestId , results , filepath);
       return resp.status(200).json({requestId})
    } )
}


module.exports = {uploadCsv}