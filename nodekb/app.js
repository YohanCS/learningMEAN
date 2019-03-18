// get the module we need
const express = require('express'); 
const path = require('path'); // standard module we get
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// we installed mongoose so let's connect it to mongodb's Service process
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

// Body Parser Middleware to parse the form submittions later on
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

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

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;  // need to add a module called body parser
    article.author = req.body.author;
    article.body = req.body.body; 

    // save 
    article.save((err) => {
        if(err) {
            console.log(err);
            return; 
        }
        // redirect to index page 
        res.redirect('/');
        
    });

    console.log("Submitted");
});

// need to call listen function so res.send actually does something
// listen takes in a port number then a callback
// starts server
app.listen(3000, () => { 
    console.log('Server started on port 3000');
});