<script setup>
const props = defineProps({
  welcomeText: String,
  otherOption: String,
  pathToOtherPage: String,
})
</script>
<!-- Create a new account -->
<template>
  
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
      {{ props.welcomeText }}
    </h2>
    <p class="mt-2 text-center text-sm leading-5 text-gray-500 max-w">

      <router-link
        :to="props.pathToOtherPage"
        class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
      >
        {{ props.otherOption }}
      </router-link>
    </p>
  </div>
</template>
