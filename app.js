const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

//View engine setup
app.engine('ejs', ejsMate)

//body Parser replacement Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Additional file directories
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home.ejs', {title: "Wildroots Kitchen & Bar"})
})