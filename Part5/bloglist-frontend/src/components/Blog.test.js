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

})


