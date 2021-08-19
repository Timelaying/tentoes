const express = require('express')
const router = express.Router() // to use the router fuction of express

router.get('/', (req, res)=>{
    res.render('index') //we dont necessary need to put .ejs when specifing what to render since we are using layout.
})

module.exports = router