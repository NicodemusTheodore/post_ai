<script>
export default {
  name: 'WelcomePage'
}
</script>
<template>
  <section class="h-[96vh]">
    <div class="h-full flex justify-center items-center">
      <div class="w-[20vw] flex flex-col gap-5 text-center items-center justify-center p-5">
        <div class="bg-emerald-400 p-5 text-white font-semibold">
          <h1>Account has been verified!</h1>
          <p>Please login to continue</p>
        </div>

        <RouterLink
          class="bg-emerald-400 p-4 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-300"
          to="/login"
          >Go back to Login</RouterLink
        >
      </div>
    </div>
  </section>
</template>
