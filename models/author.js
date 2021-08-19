const mongoose = require('mongoose')

//create a schema(it creates in columns)
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)
//'Author' is the name of the schema we created