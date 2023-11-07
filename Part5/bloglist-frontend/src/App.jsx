import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    blogService
      .getAllBlogs()
      .then(blogs => {
        setBlogs( blogs )
      })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationType('success')
        setNotificationMessage(`A new blog: ${blogObject.title} by ${blogObject.author} added successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const updateLikes = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogId, blogObject)
      setNotificationType('success')
      setNotificationMessage(`The blog: ${blogObject.title} by ${blogObject.author} was liked`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogs(
        blogs.map((oldBlog) => oldBlog.id === blogId ? updatedBlog : oldBlog)
      )
    } catch (error){
        setNotificationType('error')
        setNotificationMessage('Cannot like blog')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)

      const updatedBlogList = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updatedBlogList)
      setNotificationType('success')
      setNotificationMessage(`The blog was removed`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error){
        setNotificationType('error')
        setNotificationMessage('Cannot delete blog')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setNotificationType('error')
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message = {notificationMessage} type = {notificationType}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}></input>
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return(
      <div>
        <h2>Blogs</h2>
        <Notification message = {notificationMessage} type = {notificationType}/>
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>log out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
          )}
      </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App
