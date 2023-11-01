const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    }, 100000)
      
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
      
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
      
        const titles = response.body.map(r => r.title)
        expect(titles).toContain(
            'Go To Statement Considered Harmful'
        )
    })
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogsToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogsToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogsToView)
    })

    test('fails with statuscode 404 if blog doesnt exist', async () => {
        const validNonExistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonExistingId}`)
            .expect(404)
    })

    test('fails with statuscode 404 if id is invalid', async () => {
        const invalidId = '4444aaaaa33333'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }
      
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(t => t.title)
        expect(titles).toContain(
            'Canonical string reduction'
        )
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            likes: 15
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    
    test('the unique identificer property of the blog post is named id', async () => {
        const blogsAtStart = await helper.blogsInDb()
    
        const blogsId = blogsAtStart.map(blog => blog.id)
    
        expect(blogsId[0]).toBeDefined()
    
    })
    
    
    test('verify that if the likes property is missing, it will default to value 0', async () => {
        const newBlog = {
            title: 'New Blog',
            author: 'New Author',
            url: 'www.newBlog.com',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
    
        const likes = blogsAtEnd.map(l => l.likes)
        expect(likes).toContain(0)
    })
    
    test('verify that if the title property is missing, the respond will be status 400', async () => {
        const newBlog = {
            author: 'New Author 2',
            url: 'www.newBlog2.com',
            likes: 1
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        //console.log('No title')
    })
    
    test('verify that if the url property is missing, the respond will be status 400', async () => {
        const newBlog = {
            title: 'New Blog 3',
            author: 'New Author 3',
            likes: 2
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        //console.log('No url')
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(t => t.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating of a blog', () => {
    test('the information of a blog is updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 50000,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        expect(blogsAtEnd[0].likes).toBe(50000)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})