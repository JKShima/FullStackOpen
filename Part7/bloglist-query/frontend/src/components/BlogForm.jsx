import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createBlog } from '../services/requests'
import { useNotificationDispatch } from '../notificationContext'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
    onError: () => {
      dispatch({ type: 'showNotification', payload: 'Could not add blog' })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    },
  })

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate({ title, author, url, likes: 0 })
    console.log('new blog added')

    await dispatch({
      type: 'showNotification',
      payload: `A new blog: ${title} by ${author} added successfully`,
    })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
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
