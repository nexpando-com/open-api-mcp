import axios from 'axios'

/**
curl http://localhost:3000/api/session/ \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "password": "",
  "username": ""
}'
*/
const API_URL = process.env.API_URL
const username = process.env.METABASE_USERNAME
const password = process.env.METABASE_PASSWORD

if (!username || !password) throw new Error('Either METABASE_USERNAME or METABASE_USERNAME not defined!')

let session = ''

export const getAxiosInstance = async () => {
  if (!session) {
    const resp = await login(username, password)
    session = resp.id
  }
  const options = {
    headers: {
      'X-Metabase-Session': session,
      'Content-Type': 'application/json',
    },
  }
  const instance = axios.create(options)
  return instance
}

const login = async (username: string, password: string) => {
  const url = `${API_URL}/api/session`
  const response = await axios.post(url, {
    username,
    password,
  })
  return response.data
}
