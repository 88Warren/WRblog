const Joi = require('joi');

module.exports.blogSchema = Joi.object({
    blog: Joi.object({
        image: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        markdown: Joi.string().required()
    }).required()
});