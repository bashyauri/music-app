<script setup>
import AppUpload from '@/components/AppUpload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { onBeforeMount, reactive, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';


const state = reactive({
    songs: []
});
const unsavedFlag = ref(false);


const fetchSongData = async () => {
    try {
        const q = query(songsCollection, where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        // Clear current songs array to avoid duplicating
        state.songs = [];

        querySnapshot.forEach((doc) => {
            const song = {
                ...doc.data(),
                docID: doc.id,
            };
            state.songs.push(song);
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
};
const updateUnsavedFlag = (value) => {
    unsavedFlag.value = value;
}



// Fetch songs when the component is mounted
onBeforeMount(() => {
    fetchSongData();
});
onBeforeRouteLeave((to, from, next) => {
    if (unsavedFlag.value) {

        confirm('Your changes have not been saved. Do you want to leave this page?');
    }
    next();


});

</script>

<template>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1">
                <AppUpload :addSong="fetchSongData" />
            </div>
            <div class="col-span-2">
                <div class="relative flex flex-col bg-white border border-gray-200 rounded">
                    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                        <span class="card-title">My Songs</span>
                        <i class="float-right text-2xl text-green-400 fa fa-compact-disc"></i>
                    </div>
                    <div class="p-6">
                        <!-- Composition Items -->
                        <CompositionItem v-for="song in state.songs" :key="song.docID" :song="song"
                            @updated="fetchSongData" :updateUnsavedFlag="updateUnsavedFlag" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
