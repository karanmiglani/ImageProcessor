const Request  = require('../models/requetsModel')


const checkStatus = async (req , resp) => {
    console.lo
    const {requestId} = req.query
    const request = await Request.findOne({requestId:requestId})
    if(!request){
        return resp.status(404).json({status : 'Request not found'})
    }
    return resp.status(200).json({status:request.status , completedAt:request.updatedAt})
}


module.exports = {checkStatus}