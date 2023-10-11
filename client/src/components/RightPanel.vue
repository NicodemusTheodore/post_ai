<script>
export default {
  name: 'RightPanel'
}
</script>
<template>
  <div class="p-5 w-[30vw] h-screen flex flex-col sticky top-0 border-l-[1px]">
    <div class="p-3 flex flex-col gap-3">
      <div class="flex justify-between">
        <p>Suggested for you</p>
        <a href="#">See all</a>
      </div>
      <!-- FOLLOWING LIST COMPONENT HERE -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            class="w-12 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            alt="owo"
          />
          <div class="mx-2 max-w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis">
            <p class="text-xs">Nicodemus Theodore</p>
            <p class="text-xs">nicodemusTheodore@gmail.com</p>
          </div>
        </div>
        <a class="text-sm" href="#">Follow</a>
      </div>
      <!-- FOLLOWING LIST COMPONENT HERE -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            class="w-12 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            alt="owo"
          />
          <div class="mx-2 max-w-[10rem] whitespace-nowrap overflow-hidden text-ellipsis">
            <p class="text-xs">Nicodemus Theodore</p>
            <p class="text-xs">nicodemusTheodore@gmail.com</p>
          </div>
        </div>
        <a class="text-sm" href="#">Follow</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.search-input {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: none;
}

.search-btn {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
