import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [{
        type: String,
    }],
    imageUrl: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

BlogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    if (this.isModified('published') && this.published && !this.publishedAt) {
        this.publishedAt = Date.now();
    }
    next();
});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
