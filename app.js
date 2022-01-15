const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const bodyParser = require('body-parser');
const { getDefaultSettings } = require('http2');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

// const wildrootsRoutes = require('./routes/wildroots');
// const blogRoutes = require('./routes/blog');

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

// app.use('/', wildrootsRoutes);
// app.use('/blog', blogRoutes)

app.get('/', (req, res) => {
    res.render('home.ejs', {title: "Wildroots Kitchen & Bar"})
});

app.get('/sustainability', (req, res) => {
    res.render('sustainability.ejs', {title: "Wildroots Kitchen & Bar"})
})