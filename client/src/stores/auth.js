import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

// const BASE_URL = 'https://open-ai-v1.nicodemust.my.id/auth'
const BASE_URL = 'http://localhost:3000/auth'

export const useAuthStore = defineStore({
  id: 'auth',
  state() {
    return {
      regisMessage: ''
    }
  },
  actions: {
    async login(email, password) {
      try {
        const { data } = await axios.post(`${BASE_URL}/login`, { email, password })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        router.push('/home')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },

    async register(username, email, password, confirmPassword) {
      try {
        const { data } = await axios.post(`${BASE_URL}/register`, {
          username,
          email,
          password,
          confirmPassword
        })
        router.push('/login')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },

    async googleLogin(credential) {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/login-google`,
          {
            token: credential
          },
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          }
        )

        this.login(data.data.email, data.data.password)
      } catch (error) {
        console.log(error)
      }
    },

    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You're abot to log out",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log out'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          router.push('/login')
          Swal.fire('Logged out!', 'See you soon', 'success')
        }
      })
    }
  }
})
