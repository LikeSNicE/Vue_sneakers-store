<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { authState } from '@/services/auth'
import { fetchUser } from '@/services/api'
import ProfileAvatar from '../components/ProfileAvatar.vue'
import ProfileHomeSkeleton from '@/components/ProfileHomeSkeleton.vue'
import { useLoadingStore } from '@/stores/loadingStore'

const router = useRouter()
const userData = ref({})
const loadingStore = useLoadingStore()

onMounted(async () => {
  if (!authState.isAuthenticated) {
    router.push('/auth') // Перенаправляем на страницу авторизации
  }
  await fetchUser(userData)
})
</script>
<template>
  <div v-if="userData">
    <h1 class="text-xl mt-4" v-if="userData">Привет, {{ userData.userName }}!</h1>
    <p class="mt-4">Рады видеть тебя снова! Проверь новинки, и любимые модели в каталоге</p>
  </div>
</template>
