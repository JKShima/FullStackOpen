const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    } else {
        return blogs.reduce((sum, blog) => sum + blog.likes,0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return null
    } else {
        const mostLikedBlog = blogs.reduce(
            (prev, current) => {
                return prev.likes > current.likes ? prev : current
            }
        )
        return ({
            title: mostLikedBlog.title,
            author: mostLikedBlog.author,
            likes: mostLikedBlog.likes
        })
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}