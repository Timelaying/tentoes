const express = require('express')
const router = express.Router() // to use the router function of express
const path = require('path')//to use path
const fs = require('fs') //to use file system
const Book = require('../models/book') // import author model database
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath) // to use path to combine public and Book.coverImageBasePath
//const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']//create a variable of arrays that accept images
// const upload = multer({
//    dest: uploadPath, // setting destination to the path specified above
//    fileFilter: (req, file, callback) =>{ //filter files the server accept
//       callback(null, imageMimeTypes.includes(file.mimetype))
//    }
// })

// All Books Routes
router.get('/', async (req, res)=>{
  let query = Book.find()   // to make our search query match
  if (req.query.title != null && req.query.title != '') { // to check if tittle is not null or empty
    query = query.regex('title', new RegExp(res.query.title,'i'))
  }

  if (req.query.publishedBefore != null && req.query.publishedBefore != '') { // to check if publishedBefore is not null or empty
    query = query.lte('publishedDate', req.query.publishedBefore)
  }

  if (req.query.publishedAfter != null && req.query.publishedAfter != '') { // to check if publisedAfter is not null or empty
    query = query.lte('publishedDate', req.query.publishedAfter)
  }

  try{
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch{
    res.redirect('/')
  }
    
})

// New Book Route
router.get('/new', async (req, res) =>{
  renderNewPage(res, new Book())
})                              

//Create Book... from post form
router.post('/', async (req, res) =>{ // remember the name of the element in our form field was 'cover' that was why we used it
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate), // this is done because of date format
    pageCount: req.body.pageCount,
    description: req.body.description 
  })

  saveCover(book, req.body.cover) // using filepond

  // The below code is to save our created book 
  try {
    const newBook = await book.save()
    //res.redirect('books/$(newBook.id)')
    res.redirect('books') 
  }catch{
    renderNewPage(res, book, true)
  }
})



async function renderNewPage(res, book, hasError = false ) { // function to render new page
  try{
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch{
    res.redirect('/books')
  }
}

//function for file-pond and upload
function saveCover(book, coverEncoded){
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)){
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}

module.exports = router