<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: String,
  width: String,
  height: String,
  isEditing: Boolean,
})

const emit = defineEmits(['update:src'])

const avatar = ref(props.src || '../../public/profile/avatar.jpg')

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) {
      avatar.value = newSrc
    }
  },
)

const loadFile = (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    avatar.value = reader.result
    emit('update:src', reader.result)
  }

  reader.readAsDataURL(file)
}
</script>

<template>
  <!-- <div class="size-[150px]">
    <img
      class="rounded-[50%] border overflow-hidden object-cover"
      :style="{
        width: props.width ? props.width : '150px',
        height: props.height ? props.height : '150px',
      }"
      :src="avatar"
      alt="avatar profile"
    />

    <label v-if="isEditing" class="mt-3 cursor-pointer text-blue-500 hover:underline">
      Изменить фото
      <input type="file" @change="loadFile" accept="image/*" class="hidden" />
    </label>
  </div> -->
</template>
