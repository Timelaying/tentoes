const express = require('express')
const router = express.Router() // to use the router fuction of express
const Author = require('../models/author') // import author model database

// All Authors Routes
router.get('/', async (req, res)=>{
    let searchOptions = {}  // a variable to search
    if (req.query.name != null && req.query.name !==''){// this line seach if there is a name
        searchOptions.name = new RegExp(req.query.name, 'i')// for searching wihtout caring for case
    }
    //to display authors
    try {
        const authors = await Author.find(searchOptions) // to find all authors
        res.render('authors/index', {
            authors: authors, 
            searchOptions:req.query
        })//passing the found authors //seach option upon input
    } catch {
        res.redirect('/')
    }

})

//create New Author Route
router.get('/new',(req, res) =>{
    res.render('authors/new',{author: new Author()})
})                              //create an instance of Author object

//Create Author... from post form
router.post('/', async (req, res) =>{
    const author = new Author({
        name: req.body.name
    })
    try {   //to save author
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
           res.redirect('authors')
    } catch (error) {
        res.render('authors/new', {
              author: author,  // stops re-entering entered names
             errorMessage:'Error Creating Author'
        })
    }
})

module.exports = router