<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppAuth from '@/components/AppAuth.vue';
import { useUserStore } from '@/stores/user';
import { auth } from './includes/firebase';
import { onAuthStateChanged } from 'firebase/auth';



const userStore = useUserStore();


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, update the store with user info

    userStore.userLoggedIn = true;
  } else {
    // User is not logged in, clear user info

    userStore.userLoggedIn = false;
  }
});



</script>
<template>
  <AppHeader />


  <router-view></router-view>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
    <!-- Track Info -->
    <div class="text-center">
      <span class="font-bold song-title">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex items-center gap-4 flex-nowrap">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="text-xl text-gray-500 fa fa-play"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="relative w-full h-2 bg-gray-200 rounded cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" style="width: 50%"></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
  <AppAuth />


</template>
