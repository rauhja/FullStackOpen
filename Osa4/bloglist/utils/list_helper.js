const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, blogList) => totalLikes + blogList.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((favorite, blogList) => favorite = favorite.likes > blogList.likes ? favorite : blogList, 0)
    return {
        'title': favorite.title,
        'author': favorite.author,
        'likes': favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authorCount = lodash.countBy(blogs, "author")
    const topAuthor = Object.keys(authorCount).reduce((a,b) => {
        return authorCount[a] > authorCount[b] ? a : b
    })
    return {
        "author": topAuthor,
        "blogs": authorCount[topAuthor]
    }
}

const mostLikes = (blogs) => {
    const likeCount = lodash(blogs)
        .groupBy("author")
        .map((objectives, key) => ({
             author: key, likes: lodash.sumBy(objectives, "likes"),
            }))
            .value()

    return likeCount.reduce((a,b) => {
        return a.likes > b.likes ? a : b
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}