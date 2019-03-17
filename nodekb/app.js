// get the module we need
const express = require('express'); 
const path = require('path'); // standard module we get
const mongoose = require('mongoose');

// we installed mongoose so let's connect it
mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true});
let db = mongoose.connection;

// Check connection 
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// before we init app 
// Check for DB errors
db.on('error', (err) => {
    console.log(err);
});

// init app
const app = express();

// Bring in Models from mongoose
let Article = require('./models/article'); // to use article variable which is a model 

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// GET request to homepage
// req = request, res = response
app.get('/', (req, res) => {
    // empty function, err if there is any, and response which we call articles
    Article.find({}, (err, articles) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('index', {
                title:'Articles',
                articles: articles
            });
        }
    });
    
});

// add route
app.get('/articles/add', (req, res) => {
    // render another template
    res.render('add_articles', {
        title: 'Add Article'
    });
});

// need to call listen function so res.send actually does something
// listen takes in a port number then a callback
// starts server
app.listen(3000, () => { 
    console.log('Server started on port 3000');
});