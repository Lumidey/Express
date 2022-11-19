//require mongoose
// From mongoose, we use a methode which is schema(This define the structure of the docs we would store in a collection, the model will wrap around it)
const mongoose = require('mongoose')
const Schema= mongoose.Schema
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    }, 
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
}, {timestamps:true})
//lets create our model(model is what surrounds the schema amd provides us with an interface by which to communicate with a DB)
const Blogs = mongoose.model('Blog', blogSchema)
module.exports = Blogs