if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require('./routes/index') // calling the router from /routed/index so thst i can load pages that use express router, i.e router.get()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //seting where our views are comming from
app.set('layout', 'layouts/layout') //helps sets layouts such as html headers and co in a layout all togrther

app.use(expressLayouts) //to use expresslayout
app.use(express.static('public'))// the public is the folder containg all our public files, such as images stylesheets(css)

const mongoose = require('mongoose') // mongodb library
mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser: true,
useUnifiedTopology: true 
})// setting up connection for database, we used env.DATABASE.URL since we dont have url and we will deploy it later

// to check if we are not connected to the database
const db = mongoose.connection
db.on('error', error => console.error(error)) // prints error if not connectd
db.once('open', () => console.log('connected to mongoose'))// to run one time on connection



app.use('/', indexRouter) // to use router.get(), '/' specifies that it is the route path of our application

app.listen(process.env.PORT || 3000) // our port to listen to 3000