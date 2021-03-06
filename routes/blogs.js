const express = require('express');
const Blog = require('../models/blogs');
const router = express.Router();
const { blogSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const validateBlog = (req, res, next) => {
    const { error } = blogSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async(req, res) => {
    const blogs = await Blog.find()
    res.render('blogs/index', { blogs })
}));

router.get('/new', (req, res) => {
    res.render('blogs/new')
});

router.post ('/', validateBlog, catchAsync(async (req, res, next) => {
    const blog = new Blog(req.body.blog);
    await blog.save();
    res.redirect(`/blogs/${blog._id}`)
}));

router.get('/:id', catchAsync(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/show', { blog })
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/edit', { blog })
}));

router.put ('/:id', validateBlog, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
    res.redirect(`/blogs/${blog._id}`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blogs');
}));

module.exports = router;