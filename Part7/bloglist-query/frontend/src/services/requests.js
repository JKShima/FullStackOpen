import axios from 'axios'

const baseUrl = '/api/blogs'

export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
