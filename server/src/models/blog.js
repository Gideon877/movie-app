const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Blog = new Schema({
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, required: true },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', Blog)