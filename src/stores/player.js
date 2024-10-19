import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    current_song: {}
  }),
  actions: {
    async newSong(song) {
      this.current_song = song
    }
  }
})
