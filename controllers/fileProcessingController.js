const sharp = require('sharp')
const http = require('http');
const https = require('https');
const Request = require('../models/requetsModel')
const Product = require("../models/productModel")
const {v4:uuid} = require('uuid')
const fs = require('fs')
const downlaodImage = (url , dest) => {
    return new Promise((resolve , reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url , response => {
            if(response.statusCode != 200){
                reject(new Error(`Failed to get ${url}. Status Code: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish' , () => {
                file.close(resolve(dest));
            })

            file.on('error', err => {
                fs.unlink(dest , () => {})
                reject(err.message)
            })
        }).on('error' , err => {
            reject(err.message)
        }) 
    })
}


const processImages = async(requestId , products , filePath) => {
    const outputPath = `./ProcessedCSV/output_${requestId}.csv`;
    const outpuurData = [];
    for(const row of products){
        const inputUrls = row['Input Image Urls'].split(','); //getting input urls
        const outputUrls = []; // initialized empty array for storing output urls

        try{
            //download image concurrently
            const downloadPrmoises = inputUrls.map(async (url) => {
                const outputFileName = `${uuid()}.jpg`;
                const outputPath = `./uploads/images/${outputFileName}`;
                await downlaodImage(url.trim() , outputPath);
                const buffer = fs.readFileSync(outputPath);
                const compressedBuffer = await sharp(buffer).jpeg({quality:50}).toBuffer();
                fs.writeFileSync(outputPath , compressedBuffer)
                return outputPath;

            })
            const downlaodImages = await Promise.all(downloadPrmoises);
            outputUrls.push(...downlaodImages);
            outpuurData.push({
                'S.No.' : row['S.NO.'],
                'Product Name' : row['Product Name'],
                'Input Image Urls' : row['Input Image Urls'],
                'Output Image Urls' : outputUrls.join(',')
            })
            // update the output urls 
            await Product.updateMany({requestID:requestId},{$set:{outputImageUrls:outputUrls}});
            // update request status to completed
            await Request.updateOne({requestId:requestId} , {$set:{status:'completed'}})
            try{
                const webhookUrl = 'http://localhost:4000/api/webhook'
                const resp = await fetch(webhookUrl , {
                    method:"POST",
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ requestId }),});
                    const data = await resp.json()
                    console.log('Webhook triggered successfully');
                }catch(err){
                    console.error('Error triggering webhook:', err.message);
                }
            
        }catch(err){
            console.log(err);
        }
    }
}





module.exports = {processImages}