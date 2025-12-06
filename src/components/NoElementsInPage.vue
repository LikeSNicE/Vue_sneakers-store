<template>
  <div class="flex justify-center items-center flex-col gap-2">
    <span class="text-6xl">
      <slot name="emoji"></slot>
    </span>
    <h4 class="text-xl font-bold">
      <slot name="title"></slot>
    </h4>
    <p class="text-gray-500 text-sm">
      <slot name="text"></slot>
    </p>

    <slot name="button-back"></slot>
  </div>
</template>
