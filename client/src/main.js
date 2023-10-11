import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'
import 'boxicons'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const clientId = '67397716409-s973udh9vugjkj9i230mvoap8kh0b9qr.apps.googleusercontent.com'

app.use(vue3GoogleLogin, {
  clientId
})

app.mount('#app')
