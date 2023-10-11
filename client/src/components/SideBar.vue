<script>
import { useAuthStore } from '../stores/auth'
import { mapActions } from 'pinia'
export default {
  name: 'SideBar',
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['logout'])
  }
}
</script>
<template>
  <div class="p-5 w-[30vw] h-screen flex flex-col justify-between sticky top-0 border-r-[1px]">
    <div>
      <div class="p-3 my-5">
        <h1 class="text-3xl font-semibold">POST-AI</h1>
      </div>
      <nav>
        <ul class="flex flex-col gap-2">
          <RouterLink
            :class="
              this.$route.name === 'home'
                ? 'p-3 flex items-center gap-5 text-lg font-semibold rounded-3xl bg-emerald-400 text-white'
                : 'p-3 flex items-center gap-5 text-lg rounded-3xl hover:bg-emerald-400  hover:font-semibold transition-colors duration-300 hover:text-white'
            "
            to="/home"
          >
            <box-icon v-if="this.$route.name !== 'home'" name="home"></box-icon>
            <box-icon v-if="this.$route.name === 'home'" type="solid" name="home"></box-icon>
            Home
          </RouterLink>

          <!-- <RouterLink
            :class="
              this.$route.name === 'notifications'
                ? 'p-3 flex items-center gap-5 text-lg font-semibold rounded-3xl bg-emerald-400 text-white'
                : 'p-3 flex items-center gap-5 text-lg rounded-3xl hover:bg-emerald-400  hover:font-semibold transition-colors duration-300 hover:text-white'
            "
            to="/notifications"
          >
            <box-icon
              :type="this.$route.name === 'notifications' ? 'solid' : null"
              name="bell"
            ></box-icon
            >Notifications
          </RouterLink>

          <RouterLink
            :class="
              this.$route.name === 'messages'
                ? 'p-3 flex items-center gap-5 text-lg font-semibold rounded-3xl bg-emerald-400 text-white'
                : 'p-3 flex items-center gap-5 text-lg rounded-3xl hover:bg-emerald-400  hover:font-semibold transition-colors duration-300 hover:text-white'
            "
            to="/messages"
          >
            <box-icon
              :type="this.$route.name === 'messages' ? 'solid' : null"
              name="envelope"
            ></box-icon
            >Messages
          </RouterLink> -->

          <RouterLink
            :class="
              this.$route.name === 'bookmarks'
                ? 'p-3 flex items-center gap-5 text-lg font-semibold rounded-3xl bg-emerald-400 text-white'
                : 'p-3 flex items-center gap-5 text-lg rounded-3xl hover:bg-emerald-400  hover:font-semibold transition-colors duration-300 hover:text-white'
            "
            to="/bookmarks"
          >
            <box-icon
              v-if="this.$route.name === 'bookmarks'"
              type="solid"
              name="bookmark"
            ></box-icon>
            <box-icon v-if="this.$route.name !== 'bookmarks'" name="bookmark"></box-icon>Bookmarks
          </RouterLink>

          <RouterLink
            :class="
              this.$route.name === 'createPost'
                ? 'p-3 flex items-center gap-5 text-lg font-semibold rounded-3xl bg-emerald-400 text-white'
                : 'p-3 flex items-center gap-5 text-lg rounded-3xl hover:bg-emerald-400  hover:font-semibold transition-colors duration-300 hover:text-white'
            "
            to="/create-post"
          >
            <box-icon
              v-if="this.$route.name === 'createPost'"
              type="solid"
              name="plus-circle"
            ></box-icon>
            <box-icon v-if="this.$route.name !== 'createPost'" name="plus-circle"></box-icon>
            Create Post
          </RouterLink>

          <RouterLink
            :class="
              this.$route.name === 'userProfile'
                ? 'p-3 flex items-center gap-5 text-lg font-semibold rounded-3xl bg-emerald-400 text-white'
                : 'p-3 flex items-center gap-5 text-lg rounded-3xl hover:bg-emerald-400  hover:font-semibold transition-colors duration-300 hover:text-white'
            "
            :to="{
              name: 'userProfile',
              params: {
                username: username
              }
            }"
          >
            <box-icon v-if="this.$route.name === 'userProfile'" type="solid" name="user"></box-icon>
            <box-icon v-if="this.$route.name !== 'userProfile'" name="user"></box-icon>
            Profile
          </RouterLink>
        </ul>
      </nav>
    </div>

    <div class="dropup">
      <button class="w-full p-3 flex items-center gap-5 text-lg dropbtn">
        <box-icon name="menu"></box-icon>More
      </button>
      <div class="dropup-content w-full">
        <a href="#" @click.prevent="logout">Log out</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dropbtn {
  font-size: 16px;
  border: none;
  transition: all 0.2s ease;
  border-bottom-left-radius: 1.3rem;
  border-bottom-right-radius: 1.3rem;
}

.dropup {
  position: relative;
  display: inline-block;
}

.dropup-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  bottom: 50px;
  z-index: 1;
  border-top-left-radius: 1.3rem;
  border-top-right-radius: 1.3rem;
}

.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropup-content a:first-child {
  border-top-left-radius: 1.3rem;
  border-top-right-radius: 1.3rem;
}

.dropup-content a:hover {
  background-color: #ccc;
}

.dropup:hover .dropup-content {
  display: block;
}

.dropup:hover .dropbtn {
  background-color: #34d399;
  color: #fff;
  transition: all 0.3s ease;
}
</style>
