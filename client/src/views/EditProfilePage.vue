<script>
import { useUserStore } from '../stores/user'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'EditProfilePage',
  data() {
    return {
      file: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUserProfile']),
    ...mapActions(useUserStore, ['changeProfileImage']),
    onFileChange() {
      this.file = this.$refs.file.files[0]
    },
    changeImage(file) {
      this.changeProfileImage(file).then(() => {
        this.fetchUserProfile(this.$route.params.username)
      })
    }
  },
  computed: {
    ...mapState(useUserStore, ['userProfile']),
    ...mapState(useUserStore, ['generatingImage'])
  },
  created() {
    this.fetchUserProfile(this.$route.params.username)
  }
}
</script>

<template>
  <section>
    <div class="flex gap-3 border-b-2 p-3 sticky top-0 bg-white">
      <RouterLink
        class="flex items-center"
        :to="{
          name: 'userProfile',
          params: {
            username: username
          }
        }"
        ><box-icon name="left-arrow-alt"></box-icon
      ></RouterLink>
      <p class="font-bold text-lg">Edit Profile</p>
    </div>
    <div class="pt-5 px-5 w-full">
      <form class="w-[40vw] flex flex-col" @submit.prevent="changeImage(file)">
        <div class="relative h-[15rem] w-[15rem] z-0 flex items-center m-auto top-10">
          <svg
            v-if="generatingImage"
            aria-hidden="true"
            class="w-[8rem] h-[8rem] m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
          <img
            :class="
              generatingImage ? 'loading opacity-[0.4] w-[20vw] absolute' : 'w-[20vw] absolute'
            "
            :src="userProfile.Profile?.image"
            alt=""
          />
        </div>
        <div class="flex flex-col mt-20 gap-4">
          <input v-on:change="onFileChange" ref="file" type="file" class="mx-auto w-56" />
          <button
            type="submit"
            class="w-56 mx-auto px-3 py-2 bg-emerald-400 text-white font-semibold hover:bg-emerald-500 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
