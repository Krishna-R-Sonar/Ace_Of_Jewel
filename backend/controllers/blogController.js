import Blog from '../models/Blog.js';
import {validationResult} from 'express-validator';

// create a new blog post
export const createBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {title, content, author, tags} = req.body;

    try {
        const newBlogPost = new Blog({
            title,
            content,
            author,
            tags
        });

        const savedBlogPost = await newBlogPost.save();
        res.status(201).json(savedBlogPost);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get all blog posts
export const getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.find();
        res.json(blogPosts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get a specific blog post by id
export const getBlogPostById = async (req, res) => {
    const {blogId} = req.params;

    try {
        const blogPost = await Blog.findById(blogId);

        if(!blogPost){
            return res.status(404).json({ msg: 'Blog post not found' });
        }

        res.json(blogPost);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update a blog post
export const updateBlogPost = async (req, res) => {
    const {blogId} = req.params;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {title, content, author, tags} = req.body;

    try {
        let blogPost = await Blog.findById(blogId);

        if(!blogPost){
            return res.status(404).json({ msg: 'Blog post not found' });
        }

        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;
        blogPost.author = author || blogPost.author;
        blogPost.tags = tags || blogPost.tags;

        const updatedBlogPost = await blogPost.save();
        res.json(updatedBlogPost);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
};

// delete a blog post
export const deleteBlogPost = async (req, res) => {
    const {blogId} = req.params;

    try {
        const blogPost = await Blog.findByIdAndDelete(blogId);

        if(!blogPost){
            return res.status(404).json({ msg: 'Blog post not found' });
        }

        res.json({msg: 'Blog post removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
}