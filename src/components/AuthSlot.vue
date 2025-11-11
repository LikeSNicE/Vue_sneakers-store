<template>
  <div class="flex flex-col justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
    <div class="bg-white p-6 sm:p-10 shadow sm:rounded-lg w-full max-w-2xl mx-auto">
      <h1 class="text-center font-bold text-3xl sm:text-4xl mb-7">
        <slot name="title-form"></slot>
      </h1>

      <slot name="form"></slot>
      <slot name="link"></slot>
    </div>
  </div>
</template>
