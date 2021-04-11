const _ = require('lodash');

const dummy = (blogs) => {
    blogs = 1
    return blogs
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, currentValue) => {
        return sum + currentValue.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}

const mostBlogs = (blogs) => {
    const author = _
        .chain(blogs)
        .countBy('author')
        .map((blog, author) => {
            return (
                {'author': author, 'blogs': blog}
            )
        })
        .last()
        .value()
    return author
}

const mostLikes = (blogs) => {
    const author = _
        .chain(blogs)
        .groupBy('author')
        .map((blog, author) => {
            return (
                {'author': author,'likes': _.sumBy(blog,'likes')}
            )
        })
        .sortBy('likes')
        .last()
        .value()
    return author
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}