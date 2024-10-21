<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppAuth from '@/components/AppAuth.vue';
import AppPlayer from './components/AppPlayer.vue';
</script>
<template>
  <AppHeader />


  <router-view></router-view>
  <AppPlayer />

  <AppAuth />


</template>
