import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAllBlogs()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
