import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
})


