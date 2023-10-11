import { defineStore } from 'pinia'
import axios from 'axios'

// const BASE_URL = 'https://open-ai-v1.nicodemust.my.id/'
const BASE_URL = 'http://localhost:3000'

export const useBookmarkStore = defineStore({
  id: 'bookmark',
  state() {
    return {
      bookmarks: []
    }
  },
  actions: {
    async fetchAllBookmarks() {
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.bookmarks = data.data
      } catch (error) {
        console.log(error)
      }
    },
    async addPostToBookmark(id) {
      try {
        await axios.post(`${BASE_URL}/bookmarks/${id}`, null, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    async removeFromBookmark(id) {
      try {
        await axios.patch(`${BASE_URL}/bookmarks/${id}`, null, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
