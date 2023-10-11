<script>
import { format } from 'timeago.js'
import { RouterLink } from 'vue-router'
import { usePostStore } from '../stores/post'
import { useBookmarkStore } from '../stores/bookmark'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'PostCard',
  props: ['post'],
  computed: {
    ...mapState(usePostStore, ['comments'])
  },
  methods: {
    ...mapActions(usePostStore, ['likePost']),
    ...mapActions(usePostStore, ['fetchAllPosts']),
    ...mapActions(usePostStore, ['increasePostView']),
    ...mapActions(usePostStore, ['fetchComments']),
    ...mapActions(useBookmarkStore, ['addPostToBookmark']),
    ...mapActions(useBookmarkStore, ['removeFromBookmark']),
    formatDate(input) {
      return format(new Date(input))
    },
    likeThePost(id) {
      this.likePost(id).then(() => {
        this.fetchAllPosts()
      })
    },
    increaseTheViews(id) {
      this.increasePostView(id)
    },
    bookmarkPost(id) {
      this.addPostToBookmark(id).then(() => {
        this.fetchAllPosts()
      })
    },
    removeBookmark(id) {
      this.removeFromBookmark(id).then(() => {
        this.fetchAllPosts()
      })
    }
  },
  created() {
    this.fetchComments(this.post.id)
  },
  components: { RouterLink }
}
</script>
<template>
  <section class="flex justify-center py-2">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <!-- PROFILE -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img class="w-8 h-8 rounded-full" :src="post.User.Profile.image" alt="owo" />
            <div>
              <p class="text-sm">{{ post.User.username }}</p>
            </div>
            <hr class="border-2 border-gray-400 rounded-full" />
            <p class="text-gray-400 text-sm">
              {{ formatDate(post.createdAt) }}
            </p>
          </div>
          <button class="flex gap-1">
            <hr class="border-2 border-black rounded-full" />
            <hr class="border-2 border-black rounded-full" />
            <hr class="border-2 border-black rounded-full" />
          </button>
        </div>
        <!-- POST CAPTION -->
        <RouterLink
          :to="{
            name: 'postDetail',
            params: {
              username: post.User.username,
              id: post.id
            }
          }"
          @click="increaseTheViews(post.id)"
        >
          <div class="my-3">
            <p>
              {{ post.caption }}
            </p>
          </div>
          <!-- POST IMAGE -->
          <div class="border-[1px] rounded-lg">
            <img :src="post.image" :alt="post.prompt" />
          </div>
        </RouterLink>
        <div class="flex justify-between">
          <div class="flex gap-5">
            <div class="flex items-center gap-1 cursor-pointer">
              <box-icon name="conversation"></box-icon>
              <p>
                {{ post.Comments.length }}
              </p>
            </div>
            <div @click="likeThePost(post.id)" class="flex items-center gap-1 cursor-pointer">
              <box-icon name="like"></box-icon>
              <p>{{ post.likes }}</p>
            </div>
            <RouterLink
              :to="{
                name: 'postDetail',
                params: {
                  username: post.User.username,
                  id: post.id
                }
              }"
              @click="increaseTheViews(post.id)"
            >
              <div class="flex items-center gap-1 cursor-pointer">
                <box-icon name="show-alt"></box-icon>
                <p>{{ post.views }}</p>
              </div>
            </RouterLink>
          </div>
          <div class="flex items-center gap-3">
            <box-icon
              v-if="post.Bookmarks[0]?.status === 'Bookmarked'"
              type="solid"
              class="cursor-pointer"
              name="bookmark"
              @click="removeBookmark(post.id)"
            ></box-icon>
            <box-icon
              v-if="post.Bookmarks[0]?.status !== 'Bookmarked'"
              class="cursor-pointer"
              name="bookmark"
              @click="bookmarkPost(post.id)"
            ></box-icon>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </section>
</template>
