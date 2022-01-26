const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema ({
    image: String,
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String
    }
});

module.exports = mongoose.model('Blog', blogSchema);