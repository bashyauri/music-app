<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppAuth from '@/components/AppAuth.vue';
import AppPlayer from './components/AppPlayer.vue';
</script>

<template>
  <AppHeader />

  <transition name="fade" mode="out-in">
    <router-view />
  </transition>

  <AppPlayer />
  <AppAuth />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>
