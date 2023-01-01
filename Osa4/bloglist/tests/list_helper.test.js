const listHelper = require('../utils/list_helper')
const { zeroBlog, oneBlog, multipleBlogs } = require('../utils/blog_helper.js')

test('dummy returns one', () => {
    const result = listHelper.dummy(zeroBlog)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(zeroBlog)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(oneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(multipleBlogs)
      expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('when list has one blog equals to favorite', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('when list has multiple blogs equals to favorite', () => {
        const result = listHelper.favoriteBlog(multipleBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })
})

describe('most blogs', () => {
    test('when list has one blog equals to one', () => {
        const result = listHelper.mostBlogs(oneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })
    test('when list has multiple blogs equals to most blogs', () => {
        const result = listHelper.mostBlogs(multipleBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('when list has multiple blogs equals to most likes', () => {
        const result = listHelper.mostLikes(multipleBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})