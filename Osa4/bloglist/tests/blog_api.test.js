const supertest = require('supertest')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

describe("when there are initially blogs saved", () => {
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
        let headers
        beforeEach(async () => {
            await User.deleteMany({})

            const user = { 
                username: 'root',
                name: 'Superuser',
                password: 'password'
            }

            await api
                .post('/api/users')
                .send(user)
            
            const loginUser = await api
                .post('/api/login')
                .send(user)
                        
            headers = {
                'Authorization': `bearer ${loginUser.body.token}`
            }
        })

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
                .set(headers)
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
                .set(headers)
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
                .set(headers)
                .expect(400)
            
            const blogsAtEnd = await helper.blogInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => {
        let headers
        beforeEach(async () => {
            await User.deleteMany({})
            await Blog.deleteMany({})
            await Blog.insertMany(helper.initialBlogs)

            const user = { 
                username: 'root',
                name: 'Superuser',
                password: 'password'
            }

            await api
                .post('/api/users')
                .send(user)
            
            const loginUser = await api
                .post('/api/login')
                .send(user)
                        
            headers = {
                'Authorization': `bearer ${loginUser.body.token}`
            }

            const newBlog = {
                title: "best blog",
                author: "best author",
                url: "www.google.com"
            }

            await api
                .post("/api/blogs")
                .set(headers)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)
        })

        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogInDb()
            const blogToDelete = blogsAtStart[helper.initialBlogs.length]
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set(headers)
                .expect(204)

            const blogsAtEnd = await helper.blogInDb()
            expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

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
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'batman',
            name: 'bruce',
            password: 'gotham',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username and password must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is too short', async () =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'pa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username and password must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is missing', async () =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Superuser',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username and password are require')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is missing', async () =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username and password are require')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})