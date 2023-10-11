<script>
import { mapActions, mapState } from 'pinia'
import { usePostStore } from '../stores/post'
import PostCard from '../components/PostCard.vue'
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    ...mapActions(usePostStore, ['fetchAllPosts'])
  },
  computed: {
    ...mapState(usePostStore, ['posts'])
  },
  created() {
    this.fetchAllPosts()
  },
  components: { PostCard }
}
</script>
<template>
  <section>
    <div class="border-b-2 p-3 sticky top-0 bg-white">
      <p class="font-bold text-lg mb-3">Home</p>
      <!-- SEARCH PANEL -->
      <div>
        <form class="flex" @submit.prevent="fetchAllPosts(searchQuery)">
          <input
            class="w-full p-3 border-2 focus:outline-none search-input"
            type="text"
            placeholder="Do you know da sauce?"
            v-model="searchQuery"
          />
          <button class="border-2 w-14 flex justify-center items-center search-btn">
            <box-icon name="search-alt"></box-icon>
          </button>
        </form>
      </div>
    </div>
    <div class="pt-5 px-5 w-full">
      <div v-if="posts.length > 0" class="w-[40vw]">
        <!-- POST PANEL -->
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <div v-if="posts.length <= 0" class="w-[40vw]">
        <p class="text-xl font-semibold text-center">No Post yet</p>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
