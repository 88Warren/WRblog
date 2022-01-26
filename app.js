const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require ('mongoose');
const methodOverride = require('method-override');
const wildrootsRouter = require('./routes/wildroots');
const blogsRouter = require('./routes/blogs');
const ExpressError = require('./utils/ExpressError');

const app = express();

mongoose.connect('mongodb://localhost:27017/WRblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

//View engine setup for ejs
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

//body Parser replacement Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Additional file directories
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.use('/', wildrootsRouter);
app.use('/blogs', blogsRouter);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});