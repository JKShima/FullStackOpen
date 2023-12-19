import { useSelector } from 'react-redux'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => {
    return state.blogs.slice().sort((a, b) => b.votes - a.votes)
  })
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>log out</button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
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

export default BlogList
