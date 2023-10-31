const lodash = require('lodash')
const { count } = require('../../Part3/Phonebook/models/person')

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null 
    } else {
        const countAuthor = lodash.countBy(blogs, 'author')
        const topAuthor = Object.keys(countAuthor).reduce(
            (prev, current) => {
                return countAuthor[prev] > countAuthor[current] ? prev : current
            }
        )
        return ({
            author: topAuthor,
            blogs: countAuthor[topAuthor]
        })
        
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return null
    } else {
        const groupBlogsAuthor = lodash.groupBy(blogs, 'author')
        const likesAuthor = lodash.map(groupBlogsAuthor, author => {
            return ({
                author: author[0].author,
                likes: lodash.sumBy(author, 'likes')
            })
        })
        
        const mostLikesAuthor = likesAuthor.reduce(
            (prev, current) => {
                return prev.likes > current.likes ? prev : current
            }
        )

        return ({
            author: mostLikesAuthor.author,
            likes: mostLikesAuthor.likes
        })
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}