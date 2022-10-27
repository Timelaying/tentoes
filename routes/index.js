const express = require('express')
const router = express.Router() // to use the router function of express
const Book = require('../models/book')

router.get('/', async(req, res)=>{
    let books
try{
    books = await Book.find().sort({createdAt:'desc'}).limit(10).exec()
}catch{
    books=[]
}

    res.render('index',{books: books}) //we dont necessary need to put .ejs when specifying what to render since we are using layout.
    // to render books searched in our index page
})

module.exports = router