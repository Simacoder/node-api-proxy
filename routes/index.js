const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache =require('apicache');


// environment varialbles

const API__BASE_URL = process.env.API__BASE_URL
const API__KEY_NAME = process.env.API_KEY_NAME
const API__KEY_VALUE = process.env.API__KEY_VALUE

// init cache 
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res) => {
    
    try {
       
        const params = new URLSearchParams({
            [API__KEY_NAME]: API__KEY_VALUE,
            ...url.parse(req.url, true).query,
        })
        const apiRes = await needle('get', `${API__BASE_URL}?${params}`)
        const data = apiRes.body

        // Log the request to the public API
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API__BASE_URL}?${params}`)
        }
        res.status(200).json(data)

    } catch(error) {

        res.status(500).json({error})

    }
})



module.exports =router