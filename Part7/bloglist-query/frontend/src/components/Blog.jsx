import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateBlog } from '../services/requests'
import { useNotificationDispatch } from '../notificationContext'

const Blog = ({ blog, deleteBlog, user }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: () => {
      dispatch({ type: 'showNotification', payload: 'Could not like blog' })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    },
  })

  const handleLike = async (blog) => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
    await dispatch({
      type: 'showNotification',
      payload: `The blog: ${blog.title} by ${blog.author} was liked`,
    })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blogHidden" style={hideWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div className="blogVisible" style={showWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>Hide</button>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button id="likeButton" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user !== null && blog.user.name}</div>
        {blog.user.username === user.username && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
    </div>
  )
}

export default Blog
