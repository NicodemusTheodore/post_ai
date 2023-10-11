<script>
import { useUserStore } from '../stores/user'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'UserProfilePage',
  data() {
    return {
      loggedUser: localStorage.getItem('username')
    }
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUserProfile']),
    getDate(inputDate) {
      const date = new Date(inputDate)

      const options = {
        year: 'numeric',
        month: 'long'
      }
      const newDate = date.toLocaleDateString('en-US', options)

      return newDate
    }
  },
  computed: {
    ...mapState(useUserStore, ['userProfile'])
  },
  created() {
    this.fetchUserProfile(this.$route.params.username)
  }
}
</script>
<template>
  <section>
    <div class="flex gap-3 border-b-2 mb-4 p-3 sticky top-0 bg-white">
      <p class="font-bold text-lg">{{ $route.params.username }}</p>
    </div>
    <div class="pt-5 px-5 w-full">
      <div class="w-[40vw] flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <img class="w-36 h-36 rounded-full" :src="userProfile.Profile?.image" alt="owo" />
          <RouterLink
            :to="{
              name: 'editProfile',
              params: {
                username: this.$route.params.username
              }
            }"
            v-if="$route.params.username === loggedUser"
            class="font-semibold border-2 border-emerald-400 py-2 px-3 rounded-3xl hover:bg-emerald-400 hover:text-white transition-colors duration-200"
          >
            Edit profile
          </RouterLink>
        </div>
        <p class="text-lg font-semibold">
          {{ userProfile.username }}
        </p>
        <p>
          {{ userProfile.Profile?.bio }}
        </p>
        <p class="flex items-center gap-1">
          <box-icon name="calendar"></box-icon> Joined {{ getDate(userProfile.createdAt) }}
        </p>
      </div>
    </div>
    <hr class="my-5" />
    <div class="px-5 w-full">
      <div class="w-[40vw] flex justify-between flex-wrap">
        <RouterLink
          :to="{
            name: 'postDetail',
            params: {
              username: userProfile.username,
              id: post.id
            }
          }"
          v-for="post in userProfile.Posts"
          :key="post.id"
        >
          <div class="wrapper cursor-pointer">
            <img class="w-[19vw] image" :src="post.image" :alt="post.prompt" />
            <div class="overlay">
              <div class="text flex gap-8">
                <div class="flex gap-2 items-center">
                  <box-icon color="white" name="like"></box-icon>
                  <p>{{ post.likes }}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <box-icon color="white" name="conversation"></box-icon>
                  <p>{{ post.Comments.length }}</p>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
<style scoped>
.wrapper {
  position: relative;
}

.image {
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.3);
}

.wrapper:hover .overlay {
  opacity: 1;
}

.text {
  color: white;
  font-size: 1.7rem;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
