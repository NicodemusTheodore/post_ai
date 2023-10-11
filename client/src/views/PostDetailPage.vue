<script>
import { useBookmarkStore } from '../stores/bookmark'
import { usePostStore } from '../stores/post'
import { mapActions, mapState } from 'pinia'
import CommentCard from '../components/CommentCard.vue'
import Swal from 'sweetalert2'
export default {
  name: 'PostDetailPage',
  data() {
    return {
      inputtedComment: ''
    }
  },
  methods: {
    ...mapActions(usePostStore, ['fetchPostById']),
    ...mapActions(usePostStore, ['likePost']),
    ...mapActions(usePostStore, ['addComments']),
    ...mapActions(usePostStore, ['fetchComments']),
    ...mapActions(useBookmarkStore, ['addPostToBookmark']),
    ...mapActions(useBookmarkStore, ['removeFromBookmark']),
    likeThePost(id) {
      this.likePost(id).then(() => {
        this.fetchPostById(id)
      })
    },
    sendComment(id, comment) {
      this.addComments(id, comment).then(() => {
        this.fetchComments(id)
      })
    },
    bookmarkPost(id) {
      this.addPostToBookmark(id).then(() => {
        this.fetchPostById(id)
      })
    },
    removeBookmark(id) {
      this.removeFromBookmark(id).then(() => {
        this.fetchPostById(id)
      })
    },
    getDate(inputDate) {
      const date = new Date(inputDate)

      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
      const newDate = date.toLocaleDateString('en-US', options)

      return newDate
    },
    getTime(inputDate) {
      const date = new Date(inputDate)
      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric'
      }
      const newTime = date.toLocaleDateString('en-US', timeOptions).split(',')[1]
      return newTime
    },
    getShareLink(postUser, postId) {
      Swal.fire({
        title: `http://localhost:3000/${postUser}/${postId}`,
        text: 'You can share this post with either links or QR Code!',
        imageUrl: this.postQrCode,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image'
      })
    }
  },
  computed: {
    ...mapState(usePostStore, ['post']),
    ...mapState(usePostStore, ['comments']),
    ...mapState(usePostStore, ['bookmark']),
    ...mapState(usePostStore, ['postQrCode'])
  },
  created() {
    this.fetchPostById(this.$route.params.id)
    this.fetchComments(this.$route.params.id)
  },
  components: {
    CommentCard
  }
}
</script>
<template>
  <section>
    <div class="flex gap-3 border-b-2 p-3 sticky top-0 bg-white">
      <RouterLink class="flex items-center" to="/home"
        ><box-icon name="left-arrow-alt"></box-icon
      ></RouterLink>
      <p class="font-bold text-lg">Post</p>
    </div>
    <div class="pt-5 px-5 w-full">
      <div class="w-[40vw]">
        <!-- CONTENT -->
        <section class="flex justify-center py-2">
          <div class="flex flex-col gap-4 w-full">
            <div class="flex flex-col gap-3">
              <!-- PROFILE -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img class="w-10 h-10 rounded-full" :src="post.User?.Profile.image" alt="owo" />
                  <div>
                    <p class="text-sm">{{ post.User?.username }}</p>
                  </div>
                </div>
                <button class="flex gap-1">
                  <hr class="border-2 border-black rounded-full" />
                  <hr class="border-2 border-black rounded-full" />
                  <hr class="border-2 border-black rounded-full" />
                </button>
              </div>
              <div>
                <p>
                  {{ post.caption }}
                </p>
              </div>
              <div class="border-[1px] rounded-lg">
                <img :src="post.image" :alt="post.prompt" />
              </div>
              <div class="flex items-center gap-2">
                <p>
                  {{ getDate(post.createdAt) }}
                </p>
                <hr class="border-2 border-gray-400 rounded-full" />
                <p>
                  {{ getTime(post.createdAt) }}
                </p>
                <hr class="border-2 border-gray-400 rounded-full" />
                <p>
                  <span class="font-bold">{{ post.views }}</span> Views
                </p>
              </div>
              <hr />
              <div class="flex justify-between">
                <div class="flex gap-5">
                  <div class="flex items-center gap-1 cursor-pointer">
                    <box-icon name="conversation"></box-icon>
                    <p>
                      {{ comments.count }}
                    </p>
                  </div>
                  <div @click="likeThePost(post.id)" class="flex items-center gap-1 cursor-pointer">
                    <box-icon name="like"></box-icon>
                    <p>
                      {{ post.likes }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <box-icon
                    v-if="bookmark?.status === 'Bookmarked'"
                    type="solid"
                    class="cursor-pointer"
                    name="bookmark"
                    @click="removeBookmark(post.id)"
                  ></box-icon>
                  <box-icon
                    v-if="bookmark?.status !== 'Bookmarked'"
                    class="cursor-pointer"
                    name="bookmark"
                    @click="bookmarkPost(post.id)"
                  ></box-icon>
                  <box-icon
                    class="cursor-pointer"
                    name="share"
                    @click="getShareLink(post.User?.username, post.id)"
                  ></box-icon>
                </div>
              </div>
              <hr />

              <form
                class="flex justify-between gap-4"
                @submit.prevent="sendComment(post.id, inputtedComment), (inputtedComment = '')"
              >
                <div class="flex items-center flex-grow gap-3">
                  <img
                    class="w-8 rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    alt="owo"
                  />
                  <textarea
                    v-model="inputtedComment"
                    class="w-full focus:outline-none h-6"
                    type="text"
                    placeholder="Post your comment"
                  />
                </div>
                <button
                  class="bg-emerald-400 text-white font-semibold py-2 px-5 rounded-3xl"
                  type="submit"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
    <hr />
    <!-- COMMENT SECTION -->
    <CommentCard v-for="comment in comments.rows" :key="comment.id" :comment="comment" />
  </section>
</template>
<style></style>
