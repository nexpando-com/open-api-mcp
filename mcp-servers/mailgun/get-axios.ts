import axios from 'axios'

console.log('Customizing axios instance...')
export const getAxiosInstance = () => {
  const auth = Buffer.from(`api:${process.env.API_KEY}`).toString('base64')
  const options = {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  const instance = axios.create(options)
  return instance
}
