import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  //const [newTitle, setNewTitle] = useState('')
  //const [newAuthor, setNewAuthor] = useState('')
  //const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const createdBlog = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlog(createdBlog))
    dispatch(setNotification(`A new blog ${title} by ${author} was added`, 5))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input name="title" placeholder="write blog title here" />
        </div>
        <div>
          Author:
          <input name="author" placeholder="write blog author here" />
        </div>
        <div>
          Url:
          <input name="url" placeholder="write blog url here" />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
