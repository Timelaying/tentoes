const express = require('express')
const router = express.Router() // to use the router fuction of express

router.get('/', (req, res)=>{
    res.render('index.ejs')
})

module.exports = router