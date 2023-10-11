<script>
import { useAuthStore } from '../stores/auth'
import { mapActions } from 'pinia'
export default {
  name: 'RegisterPage',
  data() {
    return {
      regisUsername: '',
      regisEmail: '',
      regisPassword: '',
      regisConfirmPassword: ''
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['register'])
  }
}
</script>
<template>
  <div class="flex w-full justify-end h-screen bg-color">
    <section class="min-w-[30rem] my-auto mr-44">
      <div class="p-7 border-[1px] border-gray-600 rounded-md">
        <h1 class="text-3xl text-emerald-400 font-semibold mb-10">Register</h1>
        <form
          class="flex flex-col"
          @submit.prevent="register(regisUsername, regisEmail, regisPassword, regisConfirmPassword)"
        >
          <input
            class="border-b-[1px] border-gray-600 text-white py-3 focus:outline-none placeholder:text-gray-400 placeholder:font-semibold bg-inherit"
            type="text"
            placeholder="Username"
            v-model="regisUsername"
          />
          <input
            class="border-b-[1px] border-gray-600 text-white py-3 focus:outline-none placeholder:text-gray-400 placeholder:font-semibold bg-inherit"
            type="text"
            placeholder="Email"
            v-model="regisEmail"
          />
          <input
            class="border-b-[1px] border-gray-600 text-white py-3 focus:outline-none placeholder:text-gray-400 placeholder:font-semibold bg-inherit"
            type="password"
            placeholder="Password"
            v-model="regisPassword"
          />
          <input
            class="border-b-[1px] border-gray-600 text-white py-3 focus:outline-none placeholder:text-gray-400 placeholder:font-semibold bg-inherit"
            type="password"
            placeholder="Confirm Password"
            v-model="regisConfirmPassword"
          />
          <button
            class="bg-emerald-400 text-white min-h-[2.7rem] rounded-md my-10 hover:bg-emerald-300 transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <p class="text-white text-center">
          Already have an account?
          <RouterLink class="text-emerald-400" to="/login">Login</RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>
<style scoped>
input {
  margin: 0.5rem 0;
}

.bg-color {
  background: rgb(52, 211, 153);
  background: -moz-linear-gradient(120deg, rgba(52, 211, 153, 1) 42%, rgba(0, 0, 0, 1) 42%);
  background: -webkit-linear-gradient(120deg, rgba(52, 211, 153, 1) 42%, rgba(0, 0, 0, 1) 42%);
  background: linear-gradient(120deg, rgba(52, 211, 153, 1) 42%, rgba(0, 0, 0, 1) 42%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#34d399",endColorstr="#000000",GradientType=1);
}
.line {
  display: block;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}

.line > span {
  position: relative;
  display: inline-block;
}

.line > span:before,
.line > span:after {
  content: '';
  position: absolute;
  top: 50%;
  width: 9999px;
  height: 1px;
  background: lightgray;
}

.line > span:before {
  right: 100%;
  margin-right: 15px;
}

.line > span:after {
  left: 100%;
  margin-left: 15px;
}
</style>
