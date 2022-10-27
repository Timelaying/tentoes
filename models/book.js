const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'

//create a schema(it creates in columns)
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
       type: Date,
       required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
     },
     coverImage: {
        type: Buffer,
        required: true
     },
     coverImageType: {
        type: String,
        required: true
     },
     author: {
        type: mongoose.Schema.Types.ObjectId,    // refernces another object, i.e author
        required: true,
        ref: 'Author'
     }
})


bookSchema.virtual('coverImagePath').get(function(){  // gives us path to the image
    if (this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Book', bookSchema) //'Book' is the name of the schema we created
module.exports.coverImageBasePath = coverImageBasePath