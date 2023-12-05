import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const newBlog = {
  title: 'Test title blog',
  author: 'Test author blog',
  url: 'Test url blog'
}

test('<BlogForm /> upadtes parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write blog url here')

  const sendButton = screen.getByText('Add')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  //console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('Test title blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author blog')
  expect(createBlog.mock.calls[0][0].url).toBe('Test url blog')
})