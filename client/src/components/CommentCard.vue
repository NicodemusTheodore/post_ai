<script>
import { format } from 'timeago.js'
export default {
  name: 'CommentCard',
  props: ['comment'],
  methods: {
    formatDate(input) {
      return format(new Date(input))
    }
  }
}
</script>
<template>
  <section>
    <div class="py-5 px-5">
      <div class="w-[40vw]">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img
                class="w-8 rounded-full"
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt="owo"
              />
              <div>
                <p class="text-sm">{{ comment.User.username }}</p>
              </div>
              <hr class="border-2 border-gray-400 rounded-full" />
              <p class="text-gray-400 text-sm">{{ formatDate(comment.createdAt) }}</p>
            </div>
            <button class="flex gap-1">
              <hr class="border-2 border-black rounded-full" />
              <hr class="border-2 border-black rounded-full" />
              <hr class="border-2 border-black rounded-full" />
            </button>
          </div>
          <p>
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </div>
    <hr />
  </section>
</template>
