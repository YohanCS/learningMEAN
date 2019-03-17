// get the module we need
const express = require('express'); 
const path = require('path'); // standard module we get

// init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// GET request to homepage
// req = request, res = response
app.get('/', (req, res) => {
    // create a static array of objects to loop through 
    // placeholder for data that will be passed in
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Traversy Media',
            body: 'Youtube video tutorial'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Yohan',
            body: 'Youtube video tutorial'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Both',
            body: 'Youtube video tutorial'
        }
    ];
    
    res.render('index', {
        title:'Articles',
        articles: articles // pass in the articles array 
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