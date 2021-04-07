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

module.exports = {
    dummy,
    totalLikes
}