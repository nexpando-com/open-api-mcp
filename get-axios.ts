import axios from 'axios'

export const getAxiosInstance = () => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  }
  const instance = axios.create(options)
  return instance
}
