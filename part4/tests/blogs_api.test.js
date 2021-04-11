const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('blogs api tests', () => {
    test('blog posts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(x => expect(x.id).toBeDefined())
    })

    test('HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
        const newBlog = helper.initialBlogs[0]

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const title = blogsAtEnd.map(x => x.title)
        expect(title).toContain('blog number 1 for testing')
    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog =
            {
                title: "blog number 3 for testing",
                author: "Dmitri",
                url: "test"
            }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const noLikes = await blogs.find(x => x.title === 'blog number 3 for testing')
        expect(noLikes.likes).toEqual(0)
    })

    test('if the title and url are missing from the request, backend responds 400 Bad Request.', async () => {
        const badPost = {
            author: 'Dmitri',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(badPost)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})