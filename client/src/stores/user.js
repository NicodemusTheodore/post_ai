import { defineStore } from 'pinia'
import axios from 'axios'
// import router from '../router'

// const BASE_URL = 'https://open-ai-v1.nicodemust.my.id/'
const BASE_URL = 'http://localhost:3000'

export const useUserStore = defineStore({
  id: 'user',
  state() {
    return {
      userProfile: {},
      generatingImage: false
    }
  },
  actions: {
    async fetchUserProfile(username) {
      try {
        const { data } = await axios.get(`${BASE_URL}/${username}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.userProfile = data.data
      } catch (error) {
        console.log(error)
      }
    },
    async changeProfileImage(file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        this.generatingImage = true
        const { data } = await axios.patch(`${BASE_URL}/updateImage`, formData, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.generatingImage = false
      }
    }
  }
})
