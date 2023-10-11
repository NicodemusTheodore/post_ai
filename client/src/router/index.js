import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CreatePostPage from '../views/CreatePostPage.vue'
import HomePage from '../views/HomePage.vue'
import MainView from '../views/MainView.vue'
import PostDetailPage from '../views/PostDetailPage.vue'
import BookmarkPage from '../views/BookmarkPage.vue'
import UserProfilePage from '../views/UserProfilePage.vue'
import WelcomePage from '../views/WelcomePage.vue'
import EditProfilePage from '../views/EditProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomePage
        },
        {
          path: '/:username/:id',
          name: 'postDetail',
          component: PostDetailPage
        },
        {
          path: '/create-post',
          name: 'createPost',
          component: CreatePostPage
        },
        {
          path: '/bookmarks',
          name: 'bookmarks',
          component: BookmarkPage
        },
        {
          path: '/:username',
          name: 'userProfile',
          component: UserProfilePage
        },
        {
          path: '/:username/edit-profile',
          name: 'editProfile',
          component: EditProfilePage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home')
  } else if (!localStorage.access_token && to.name === 'home') {
    next('/login')
  } else if (!localStorage.access_token && to.name === 'bookmarks') {
    next('login')
  } else if (!localStorage.access_token && to.name === 'createPost') {
    next('login')
  } else if (!localStorage.access_token && to.name === 'userProfile') {
    next('login')
  } else if (!localStorage.access_token && to.name === 'postDetail') {
    next('login')
  } else if (!localStorage.access_token && to.name === 'editProfile') {
    next('login')
  } else if (localStorage.access_token && to.name === 'login') {
    next('/home')
  } else if (localStorage.access_token && to.name === 'register') {
    next('/home')
  } else {
    next()
  }
})

export default router
