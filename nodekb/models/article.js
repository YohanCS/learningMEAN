let mongoose = require('mongoose');

// Creating a schema
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true 
    }
});

// create a model now using the schema
// module.exports so that it exports to other files 
let Article = module.exports = mongoose.model('Article', articleSchema);