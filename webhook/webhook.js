const express = require('express')
const router = express.Router()
const Request = require('../models/requetsModel')
const Product = require('../models/productModel')


router.post('/' , async(req , resp) => {
    try{
        const {requestId} = req.body;
        //update the requiest or ui to frontend 
        console.log(`Webhook received for requestId: ${requestId}`);

        resp.status(200).json({ message: 'Webhook received and processed successfully' });
    }catch(err){
        console.error('Webhook error:', err);
        resp.status(500).json({ error: 'Failed to process webhook' });
    }
})


module.exports = router