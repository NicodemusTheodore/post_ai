import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

// const BASE_URL = 'https://open-ai-v1.nicodemust.my.id/api/v1'
const BASE_URL = 'http://localhost:3000/api/v1'

export const usePostStore = defineStore({
  id: 'post',
  state() {
    return {
      generatedImage: '',
      generatingImage: false,
      posts: [],
      post: {},
      comments: {},
      bookmark: {},
      postQrCode: ''
    }
  },
  actions: {
    async generateImage(prompt) {
      this.generatingImage = true
      try {
        const { data } = await axios.post(
          `${BASE_URL}/openai`,
          {
            prompt
          },
          {
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          }
        )

        this.generatedImage = data.image
      } catch (error) {
        console.log(error)
        alert(error.response.data.message)
      } finally {
        this.generatingImage = false
        console.log(this.generatingImage)
      }
    },

    async fetchAllPosts(query) {
      try {
        const { data } = await axios.get(`${BASE_URL}/post/`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          params: {
            prompt: query
          }
        })
        console.log(data)

        this.posts = data.data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchPostById(id) {
      try {
        const { data } = await axios.get(`${BASE_URL}/post/${id}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.post = data.data
        this.bookmark = data.bookmark
        this.postQrCode = data.qrcode
      } catch (error) {
        console.log(error)
      }
    },

    async fetchComments(id) {
      try {
        const { data } = await axios.get(`${BASE_URL}/post/${id}/comments`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.comments = data.data
      } catch (error) {
        console.log(error)
      }
    },

    async addComments(id, comment) {
      try {
        await axios.post(
          `${BASE_URL}/post/${id}/comments`,
          { comment },
          {
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          }
        )
      } catch (error) {
        console.log(error)
      }
    },

    async likePost(id) {
      try {
        await axios.get(`${BASE_URL}/post/${id}/like`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async increasePostView(id) {
      try {
        await axios.get(`${BASE_URL}/post/${id}/view`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.fetchPostById(id)
      } catch (error) {
        console.log(error)
      }
    },

    async createPost(prompt, image, caption) {
      try {
        await axios.post(
          `${BASE_URL}/post/`,
          {
            prompt,
            image,
            caption
          },
          {
            headers: {
              'Content-Type': 'application/json',
              access_token: localStorage.getItem('access_token')
            }
          }
        )

        router.push('/home')
        this.generatedImage = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
})
