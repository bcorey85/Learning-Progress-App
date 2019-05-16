const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const moment = require('moment');
const mongoose = require('mongoose')
const methodOverride = require('method-override')

//APP CONFIG
mongoose.connect('mongodb://localhost/time_tracker_app', { useNewUrlParser: true, useFindAndModify: false  })
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


//MONGOOSE CONFIG
let timeSchema = new mongoose.Schema({
    date: String,
    start: String,
    end: String,
    notes: String,
    totalMin: String,
    timeString: String 
})

var Timestamp = mongoose.model('Timestamp', timeSchema)

let dbdata = []

let overallData = {
    overallMin: calcOverallMin(dbdata), 
    overallString: calcTimeString(calcOverallMin(dbdata))
}


app.get('/', (req,res)=>{
    res.redirect('/posts')
})

//INDEX
app.get('/posts', (req, res) =>{
    Timestamp.find({}, (err, allTimes) =>{
        if(err){
            console.log(err)
        } else {
            dbdata = allTimes
                overallData.overallMin = calcOverallMin(allTimes)
                overallData.overallString = calcTimeString(calcOverallMin(allTimes))
            res.render("tracker", {dbdata: allTimes, overallData: overallData})
        }
    })
})

//NEW
app.get('/posts/new', (req, res)=>{
    res.render('new')
})

//CREATE
app.post('/posts', (req, res)=>{
    Timestamp.create(req.body.post, (err, newTime) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/posts')
        }
    })
})

//SHOW
app.get('/posts/:id', (req, res)=>{
    Timestamp.findById(req.params.id, (err, foundPost)=>{
        if(err){
            res.redirect('/posts')
        } else{
            res.render('show', {post: foundPost})
        }
    })
})

//EDIT
app.get('/posts/:id/edit', (req, res)=>{
    Timestamp.findById(req.params.id, (err, foundPost)=>{
        if(err){
            res.redirect('posts')
        } else{
            res.render('edit', {post: foundPost})
        }
    })
})

//UPDATE
app.put('/posts/:id', (req, res)=>{
    Timestamp.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost)=>{
        if(err){
            res.redirect('/posts')
        } else{
            res.redirect(`/posts/${req.params.id}`)
        }
    })
})

//DESTROY
app.delete('/posts/:id', (req, res)=>{
    Timestamp.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect('/posts')
        } else{
            res.redirect('/posts')
        }
    })
})

app.listen(3000, ()=>{
    console.log('Tracker App Started')
})

function calcTimeString(total) {
    var totalHr = total / 60
    var diffHours = Math.floor(totalHr)
    var diffMin = Math.floor((totalHr % 1) * 60)
    return (`${diffHours}hr - ${diffMin}min`)
}

function calcOverallMin(arr){
    let overallMin = 0
    arr.forEach((i)=>{
        overallMin += parseInt(i.totalMin)
    })
    return overallMin
}
