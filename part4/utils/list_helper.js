const dummy = (blogs) => {
    blogs = 1
    return blogs
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, currentValue) => {
        console.log(sum, currentValue.likes)
        return sum + currentValue.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}