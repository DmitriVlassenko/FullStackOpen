const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    let blogsObject = new Blog(helper.initialBlogs[0])
    await blogsObject.save()
    blogsObject = new Blog(helper.initialBlogs[1])
    await blogsObject.save()
})

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

afterAll(() => {
    mongoose.connection.close()
})