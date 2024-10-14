<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { songsCollection } from '@/includes/firebase';
import { getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import SongItem from '@/components/SongItem.vue';



const pendingRequest = ref(false);
const maxPerPage = ref(3);
const state = reactive({
  songs: [],
});

onMounted(async () => {
  await getSongs();
  window.addEventListener('scroll', handleScroll)


});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)

});


const handleScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight, } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
  if (bottomOfWindow) {
    getSongs();
    console.log('Bottom reached');
  }

}
const getSongs = async () => {
  if (pendingRequest.value) {
    return;
  }
  pendingRequest.value = true;
  let lastVisible = null;

  // Check if there are songs in state
  if (state.songs.length > 0) {
    const lastSong = state.songs[state.songs.length - 1];
    lastVisible = lastSong.modified_name; // Assuming 'createdAt' is your ordering field
  }

  // Create the query based on whether or not there is a lastVisible document
  let q;
  if (lastVisible) {
    q = query(
      songsCollection,
      orderBy("modified_name"), // Order by your field (e.g., 'createdAt')
      startAfter(lastVisible), // Start after the last visible document
      limit(maxPerPage.value)
    );
  } else {
    q = query(
      songsCollection,
      orderBy("modified_name"),
      limit(maxPerPage.value)
    );
  }

  // Fetch the documents with the defined query
  const snapshots = await getDocs(q);

  // Stop further fetching if no documents are returned
  if (snapshots.empty) {
    console.log('No more songs to fetch');
    return;
  }

  // Loop through the documents and push them to state
  snapshots.forEach(doc => {
    state.songs.push({ docID: doc.id, ...doc.data() });
  });
  pendingRequest.value = false;

  // If the number of documents fetched is less than the limit, stop further fetching
  if (snapshots.size < maxPerPage.value) {
    return console.log('Reached the last song');
    // No more songs to fetch, stop further pagination
  }
};






</script>

<template>
  <!-- Introduction -->
  <section class="relative py-20 mb-8 text-center text-white">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
        <p class="w-full mx-auto md:w-8/12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img class="relative block w-auto max-w-full mx-auto mt-5 -mb-20" src="/assets/img/introduction-music.png" />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="relative flex flex-col bg-white border border-gray-200 rounded">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="float-right text-xl text-green-400 fa fa-headphones-alt"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">

        <SongItem v-for="song in state.songs" :song="song" :key="song.docID" />
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>
