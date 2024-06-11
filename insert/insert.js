//import modules 
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongoclient 
let mcl = mongodb.MongoClient
//create router instance 
let router = express.Router()
//create rest api
router.post("/",(req,res)=>
{
    let obj = req.body
    //connect to mongodb
    mcl.connect(url,(err,conn) => {
        if(err) 
            console.log('Error in connection:-',err)
        else {
            let db = conn.db('nodedb')
            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert': 'Error'+err})
                else {
                    console.log("data inserted")
                    res.json({'insert':'success'})
                    conn.close()
                }
            })
        }
    })
})
module.exports = router;