import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { getBlogs, setToken } from './services/requests'
import loginService from './services/login'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './notificationContext'
import UserContext from './userContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useNotificationDispatch()
  const blogFormRef = useRef()

  const [user, userDispatch] = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'setUser', payload: user })
      setToken(user.token)
    }
  }, [])

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const blogsQuery = data

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setToken(user.token)

      userDispatch({ type: 'setUser', payload: user })
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
    userDispatch({ type: 'clearUser' })
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
          <BlogForm />
        </Togglable>
        {blogsQuery
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
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
