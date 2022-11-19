const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Blogs = require('./models/blog');
require('dotenv/config')
// console.log(Blogs);

// ==============Template engine or View engine ==========================
// So far we ave bin serving html files,so we use template engine to render dynamic data
// We ave diff template engines like ejs,hbs and pug,but we wud use ejs since its quite simple and has nice features
// ejs has a syntax like html bt it jux allows us to inject dynamic data
// =======See below how to use ejs and its features=============
// 1) install ejs --- npm install ejs...cheq d package.json to confirm d installation
// 2) to use it u cn cheq it out on npmjs.com
// app.set('view engine',ejs) --- d set enables us to configure some app settings...so ejs now knws 2 go 2 ur views folder and search for d exact file u wnt to serve bt if d folder isnt titled view den u cn create lets say work folder and put in a file like index.ejs and input html templates...bt in d app.js wich is awa server file..... u need to tell ejs dt u ave a diff folder for ur view by doing d below
// app.set('view engine', ejs), app.set('views','work') ---to show d work we render and not sendFile ---- res.render('index')
// =========================================================================================

// app.get('/', (req,res)=>{
//     res.sendFile('./view/index.html',{root:__dirname})
// })
// app.get('/about', (req,res)=>{
//     res.sendFile('./view/about.html',{root:__dirname})
// })
// app.use((req,res)=>{
//     res.sendFile('./view/error.html',{root:__dirname})
// })

app.set('view engine', 'ejs')
// Middleware & its Examples
// ==== Middleware are codes dt runs on d server btw a get req and sending a response
// Even d ftns dt run in awa requests r also middleware,remember dt middleware r codes dt run on d server d diff is d get req only fires a ftn for certain routes while use method runs for every req for all routes
// Logger middleware to log details of every request
// Authentication check middleware for protected routes
// Middleware to parse json data from requests
// Return 404 pages(as we ave seen already)
app.use((req,res,next)=>{
    console.log('new request has been made: ');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method: ', req.method);
    next()
})
//All middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))
const DBurl= process.env.DBURL

mongoose.connect(DBurl)
.then((res)=>console.log('Db connected successfully'))
.catch((err)=>console.log(err))
//Start of Testing
app.get('/add-blog', (req,res)=>{
    const BLOGS= new Blogs({
        title:'latest newss',
        message:'We are testing it',
        name: 'Eggys'
    
    })
    

BLOGS.save()
.then((result)=>{
    res.send(result)
})
.catch((err)=>{
    console.log(err);
})

})
// //Lets get all the blogs
// app.get('/all-blogs',(req,res)=>{
//     Blogs.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })
// //Lets get a single blog
// app.get('/single-blog',(req,res)=>{
//     Blogs.findById('636fa3b5e92c49db8b43e82f')
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })
// index.ejs
app.get('/',(req,res)=>{
    Blogs.find()
    .then((result)=>{
        res.render('index',{title:'Home',Blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
    // const newBlogs = [
    //     {title:'Femi likes to code', body:'And also works'},
    //     {title:'Tims likes to go for break', body:'And also code'},
    //     {title:'Kamso likes to debug', body:'And also laffs'},
    // ];
   
})
// about.ejs
app.get('/about',(req,res)=>{
    res.render('about', { title: 'About' })
})
// createBlog.ejs
app.get('/createBlog',(req,res)=>{
    res.render('createBlog', { title: 'Create Blog' })
})
// error.ejs

//Get, Post and DELETE REQUEST
//=============POST REQUEST======
//Now we use app.post('')
//Ensure that the name attribute on the form is the same as the key property used in the schema
//Also we need middleware that would attach body to the req, see below
// app.use(express.urlemcoded())
app.post('/',(req,res)=>{
    console.log(req.body);
    const singleBlogs=new Blogs(req.body)
    singleBlogs.save()
    .then((rr)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err);
    })
})
//============================Routing to Details.Ejs============
app.get('/blogs/:id',(req,res)=>{
    const id= req.params.id
    Blogs.findById(id)
    .then((Result)=>{
        res.render('details',{Blogs:Result, title:'details page'})
    })
    .catch((err)=>{
        console.log(err);
    })
})
//DELETE
app.delete('/index/:id',(req,res)=>{
    const id = req.params.id
    Blogs.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/'})
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.listen(4000)
app.use((req,res)=>{
    res.render('error', { title: 'Error' })
})