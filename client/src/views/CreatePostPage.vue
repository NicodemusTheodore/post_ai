<script>
import { usePostStore } from '../stores/post'
import { mapActions, mapState } from 'pinia'
export default {
  name: 'CreatePostPage',
  data() {
    return {
      prompt: '',
      caption: ''
    }
  },
  computed: {
    ...mapState(usePostStore, ['generatedImage']),
    ...mapState(usePostStore, ['generatingImage'])
  },
  methods: {
    ...mapActions(usePostStore, ['generateImage']),
    ...mapActions(usePostStore, ['createPost'])
  }
}
</script>
<template>
  <section>
    <div class="flex gap-3 border-b-2 p-3 sticky top-0 bg-white z-10">
      <p class="font-bold text-lg">Create Post</p>
    </div>
    <div class="pt-5 px-5 w-full">
      <div class="w-[40vw] h-full">
        <section class="flex justify-center py-2">
          <div class="w-full flex flex-col gap-5">
            <form
              class="gap-2 flex flex-col w-full"
              @submit.prevent="createPost(prompt, generatedImage, caption)"
            >
              <div class="flex flex-col gap-3">
                <label class="font-semibold">Prompt</label>
                <input
                  class="border-2 p-2 focus:outline-none"
                  type="text"
                  placeholder="A knight fighting a dragon"
                  v-model="prompt"
                />
              </div>

              <div class="w-max">
                <div
                  :class="
                    !generatedImage
                      ? 'relative'
                      : 'relative  h-[20rem] w-[20rem] z-0 flex items-center'
                  "
                >
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
                    v-if="generatedImage"
                    :class="
                      generatingImage ? 'loading opacity-[0.4] w-full absolute' : 'w-full absolute'
                    "
                    :src="`data:image/jpeg;base64,${generatedImage}`"
                    alt="broken-img"
                  />
                </div>
                <div>
                  <button
                    @click.prevent="generateImage(prompt)"
                    class="mt-2 border-none w-52 bg-emerald-400 text-white py-2 focus:outline-none"
                    type="button"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div class="flex flex-col gap-3">
                <label class="font-semibold">Caption</label>
                <textarea
                  v-model="caption"
                  cols="30"
                  rows="10"
                  class="border-2 p-2 focus:outline-none"
                  placeholder="Say something about this image..."
                ></textarea>
                <button
                  class="mt-2 border-none w-full bg-emerald-400 text-white py-2 focus:outline-none"
                  type="submit"
                >
                  Post
                </button>
                <i>
                  Posting your post took a minute or two, please wait a moment until you were
                  redirected.
                </i>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
<style scoped>
.loading {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
