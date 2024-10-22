<script setup>
import { usePlayerStore } from '@/stores/player';




const playerStore = usePlayerStore();



</script>
<template>
    <!-- Player -->
    <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
        <!-- Track Info -->
        <div class="text-center" v-if="playerStore.current_song.modified_name">
            <span class="font-bold song-title">{{ playerStore.current_song.modified_name }}</span> by
            <span class="song-artist">{{ playerStore.current_song.display_name }}</span>
        </div>
        <div class="flex items-center gap-4 flex-nowrap">
            <!-- Play/Pause Button -->
            <button type="button" @click="playerStore.toggleAudio">
                <i class="text-xl text-gray-500 fa "
                    :class="{ 'fa-play': !playerStore.isPlaying, 'fa-pause': playerStore.isPlaying }"></i>
            </button>
            <!-- Current Position -->
            <div class="player-currenttime">{{ playerStore.seek }}</div>
            <!-- Scrub Container  -->
            <div @click="playerStore.updateSeek" class="relative w-full h-2 bg-gray-200 rounded cursor-pointer">
                <!-- Player Ball -->
                <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
                    :style="{ left: playerStore.playerProgress }">
                    <i class="fas fa-circle"></i>
                </span>
                <!-- Player Progress Bar-->
                <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
                    :style="{ width: playerStore.playerProgress }"></span>
            </div>
            <!-- Duration -->
            <div class="player-duration">{{ playerStore.duration }}</div>
        </div>
    </div>
</template>