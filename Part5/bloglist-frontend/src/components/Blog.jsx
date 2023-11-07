import { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateLikes(blog.id, blogToUpdate)
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>View</button> 
      </div>
      <div style={showWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>Hide</button>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.user !== null && blog.user.name}</div>
      </div>

    </div> 
  )
}

export default Blog