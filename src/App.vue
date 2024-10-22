<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppAuth from '@/components/AppAuth.vue';
import AppPlayer from './components/AppPlayer.vue';
</script>
<template>
  <AppHeader />


  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />

    </transition>

  </router-view>
  <AppPlayer />

  <AppAuth />


</template>
<style scoped>
.fade-enter-from {
  opacity: 0;

}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-enter-to {
  transition: all 0.5s ease;
  opacity: 0;
}
</style>
