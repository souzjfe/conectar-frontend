import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || 'https://boraconectar.herokuapp.com/',
  withCredentials: true,
})

export default api
