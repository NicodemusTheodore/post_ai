<script>
import { mapActions, mapState } from 'pinia'
import { useBookmarkStore } from '../stores/bookmark'
export default {
  name: 'BookmarkPage',
  methods: {
    ...mapActions(useBookmarkStore, ['fetchAllBookmarks'])
  },
  computed: {
    ...mapState(useBookmarkStore, ['bookmarks'])
  },
  created() {
    this.fetchAllBookmarks()
  }
}
</script>
<template>
  <section>
    <div class="flex gap-3 border-b-2 p-3 sticky top-0 bg-white">
      <p class="font-bold text-lg">Bookmarks</p>
    </div>
    <div class="pt-5 px-5 w-full">
      <div class="w-[40vw] flex justify-between flex-wrap">
        <RouterLink
          :to="{
            name: 'postDetail',
            params: {
              username: bookmark.Post.User.username,
              id: bookmark.Post.id
            }
          }"
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
        >
          <div class="wrapper my-5 cursor-pointer">
            <img class="w-[19vw] image" :src="bookmark.Post.image" :alt="bookmark.Post.prompt" />
            <div class="overlay">
              <div class="text flex gap-8">
                <div class="flex gap-2 items-center">
                  <box-icon color="white" name="like"></box-icon>
                  <p>{{ bookmark.Post.likes }}</p>
                </div>
                <div class="flex gap-2 items-center">
                  <box-icon color="white" name="conversation"></box-icon>
                  <p>{{ bookmark.Post.Comments.length }}</p>
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
