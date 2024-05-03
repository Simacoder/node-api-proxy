const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000
const app = express()


// Rate limiting 

const limiter = rateLimit ({
    windowMs: 10 * 60* 1000, // 10 minutes
    max: 5
})
app.use(limiter)
app.set('trust proxy', 1)


//  set static folder

app.use(express.static('public'))

// router

app.use('/api', require('./routes'))

// Enable cors

app.use(cors())

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))