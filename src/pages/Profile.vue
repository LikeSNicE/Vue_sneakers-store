<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { isAuthenticated } from '@/services/auth';

const router = useRouter();

onMounted(() => {
  if (!isAuthenticated()) {
    router.push('/auth'); 
  }
});


</script>

<template>
  <div>
    <h1 class="texl-lg mb-4">Профиль LikesNice:</h1>
    <button class="bg-gray-800 text-slate-50 p-2">Выйти с профиля</button>
  </div>
</template>
