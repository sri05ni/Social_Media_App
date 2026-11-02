const { verify } = require('jsonwebtoken')
const speakeasy=require('speakeasy')
const generateSecret=()=>{
    return speakeasy.generateSecret({length:20})
}

const verifyToken=(secret,token)=>{
    console.log(token ,secret)
    return speakeasy.totp.verify({
        secret:secret,
        encoding:'base32',
        token:token,
        window:1,
        
    })
}

module.exports={generateSecret,verifyToken}