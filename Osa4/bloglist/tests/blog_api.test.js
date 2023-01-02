const mongoose = require("mongoose")
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('check if ID is defined as id not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
describe('testing HTTP POST request', () =>{

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'itsmemario',
            url: 'google.com',
            likes: 20
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        
        const blogsAtEnd = await helper.blogInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('Test blog')
    })

    test('blog without likes is added', async () =>{
        const newBlog = {
            title: 'Test blog without likes',
            author: 'itsmemario',
            url: 'google.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)
        
        const blogsAtEnd = await helper.blogInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })

    test('if title or url are missing respond 400 bad request', async () => {
        const newBlog = {
            author: 'luigi',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating blog post', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send( {likes: 2023 })
            .expect(200)

        const blogsAtEnd = await helper.blogInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const updatedBlog = blogsAtEnd[0]
        expect(updatedBlog.likes).toBe(2023)
    })
})

afterAll(() => {
    mongoose.connection.close()
})