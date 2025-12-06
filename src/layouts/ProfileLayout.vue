<script setup lang="ts">
import ProfileSiderbar from '@/components/ProfileSiderbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import TitleBaseSlot from '@/components/TitleBaseSlot.vue'
import ButtonNavigation from '@/components/ButtonNavigation.vue'
import { useGoBack } from '@/utils/useGoBack.vue'

const route = useRoute()
const { goBack } = useGoBack()

const currentPageTitle = computed(() => {
  return route.meta.title || 'Профиль'
})
</script>

<template>
  <div class="profile">
    <div class="flex items-center gap-5 mb-6">
      <ButtonNavigation @click="goBack"></ButtonNavigation>
      <TitleBaseSlot>{{ currentPageTitle }}</TitleBaseSlot>
    </div>

    <div class="flex gap-6 items-start max-[1050px]:flex-col">
      <!-- Боковая панель -->
      <ProfileSiderbar />
      <div class="bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] p-5 rounded-3xl w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
