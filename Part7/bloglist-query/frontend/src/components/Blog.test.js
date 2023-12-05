import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// Testing Blogs
describe('Testing Blog', () => {
  const blog = {
    title: 'Test first blog',
    author: 'Robert Martin',
    url: 'www.firstest.com',
    likes: 5,
    user: {
      username: 'john',
      name: 'john',
    }
  }

  const user = {
    username: 'john',
    name: 'john'
  }

  const mockHandler = jest.fn()

  // Testing render content
  test('renders content', () => {
    const { container } = render(<Blog blog={blog} user={user}/>)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Test first blog - Robert Martin'
    )
  })

  // Testing only title and author
  test('render title and author, no url or likes', () => {
    const { container } = render(<Blog blog={blog} user={user}/>)

    const blogHidden = container.querySelector('.blogHidden')
    expect(blogHidden).toHaveTextContent(
      'Test first blog - Robert Martin'
    )

    const urlHidden = screen.queryByText(blog.url)
    expect(urlHidden).not.toBeVisible()

    const likesHidden = screen.queryByText('like')
    expect(likesHidden).not.toBeVisible()
  })

  // Testing url and likes after clicking view button
  test('render url and likes when clicking view button', async () => {
    const { container } = render(<Blog blog={blog} user={user}/>)

    const userClick = userEvent.setup()
    const button = screen.getByText('View')
    await userClick.click(button)

    const div = container.querySelector('.blogVisible')
    expect(div).toBeVisible()

  })

  // Testing clicking like button
  test('if the like button is clicked twice, event handler is called twice', async () => {
    render(<Blog blog={blog} user={user} updateLikes={mockHandler}/>)

    const userClick = userEvent.setup()
    const button = screen.getByText('View')
    await userClick.click(button)

    const likeClick = userEvent.setup()
    const likeButton = screen.getByText('like')
    await likeClick.click(likeButton)
    await likeClick.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})


