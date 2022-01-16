const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require ('mongoose');

// mongoose.connect('mongodb://localhost:27017/blog', {
//     useNewUrlParser: true,
//     useCreateindex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

const wildrootsRouter = require('./routes/wildroots');
const blogRouter = require('./routes/blog');

//View engine setup
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

//body Parser replacement Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Additional file directories
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.use('/', wildrootsRouter);
app.use('/blog', blogRouter)


