import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="write blog title here"
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            placeholder="write blog author here"
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            placeholder="write blog url here"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
