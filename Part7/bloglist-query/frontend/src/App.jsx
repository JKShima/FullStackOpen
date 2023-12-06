import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //const [notificationMessage, setNotificationMessage] = useState(null)
  //const [notificationType, setNotificationType] = useState('')

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    blogService.getAllBlogs().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch({
          type: 'showNotification',
          payload: `A new blog: ${blogObject.title} by ${blogObject.author} added successfully`,
        })
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
      })
      .catch((error) => {
        dispatch({
          type: 'showNotification',
          payload: error.response.data.error,
        })
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
      })
  }

  const updateLikes = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogId, blogObject)
      dispatch({
        type: 'showNotification',
        payload: `The blog: ${blogObject.title} by ${blogObject.author} was liked`,
      })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
      setBlogs(
        blogs.map((oldBlog) => (oldBlog.id === blogId ? updatedBlog : oldBlog))
      )
    } catch (error) {
      dispatch({
        type: 'showNotification',
        payload: 'Cannot like blog',
      })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)

      const updatedBlogList = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updatedBlogList)
      dispatch({
        type: 'showNotification',
        payload: 'The blog was removed',
      })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    } catch (error) {
      dispatch({
        type: 'showNotification',
        payload: 'Cannot delete blog',
      })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch({
        type: 'showNotification',
        payload: 'Wrong username or password',
      })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
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
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>log out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
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
