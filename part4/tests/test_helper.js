const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "blog number 1 for testing",
        author: "Dmitri",
        url: "test",
        likes: 5
    },
    {
        title: "blog number 2 for testing",
        author: "Dmitri",
        url: "testing",
        likes: 15
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}