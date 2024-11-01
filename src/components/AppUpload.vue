<script setup>
import { auth, storage, getDownloadURL, storageRef, uploadBytesResumable, songsCollection } from '@/includes/firebase';
import { addDoc } from 'firebase/firestore';


import { onBeforeUnmount, reactive, ref } from 'vue';

const props = defineProps({
    addSong: {
        type: Function,
        required: true
    }
})



const is_dragover = ref(false);
const progress = ref(null);
const state = reactive({
    uploads: []
});

const upload = ($event) => {
    is_dragover.value = false;

    const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];
    files.forEach((file) => {
        if (file.type !== "audio/mpeg") {
            return console.error(`${file.name} is not a valid audio file.`);

        }
        if (!navigator.onLine) {
            state.uploads.push({
                task: {},
                current_progress: 100,
                name: file.name,
                variant: 'bg-red-400',
                icon: 'fas fa-times',
                text_class: 'text-red-400',
            })
            return;
        }
        // music-app-8d394.appspot.com
        // Reference to the file path in Firebase Storage
        const metadata = {
            contentType: 'audio/mpeg'
        };
        const fileRef = storageRef(storage, `songs/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file, metadata);
        const uploadIndex = state.uploads.push({
            uploadTask,
            name: file.name,
            current_progress: 0,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            text_class: '',
        }) - 1;

        // Upload the file
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                state.uploads[uploadIndex].current_progress = progress.value;
                console.log('Upload is ' + progress.value + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                state.uploads[uploadIndex].variant = 'bg-red-400';
                state.uploads[uploadIndex].icon = 'fas fa-times';
                state.uploads[uploadIndex].text_class = 'text-red-400';
                console.error('An error occurred:', error.code);
                switch (error.code) {

                    case 'storage/unauthorized':
                        console.error('An error occurred:')
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log('Upload cancelled');
                        break;

                    case 'storage/retry-limit-exceeded':
                        console.log("Retry limit exceeded");
                        break;
                    case 'storage/max-size-exceeded':
                        console.log("Max size exceeded");
                        // File size is larger than the maximum allowed size
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        console.error('An unknown error occurred:', error);
                        break;
                }
            },
            async () => {
                const song = {
                    uid: auth.currentUser.uid,
                    display_name: auth.currentUser.displayName,
                    original_name: uploadTask.snapshot.ref.name,
                    modified_name: uploadTask.snapshot.ref.name,
                    genre: "",
                    comment_count: 0,
                    created_at: new Date(),
                    updated_at: new Date(),
                    url: "",
                }
                try {

                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    song.url = downloadURL;
                    const songRef = await addDoc(songsCollection, song)
                    props.addSong(songRef);






                } catch (error) {
                    console.error('Error fetching the download URL', error);
                }

                state.uploads[uploadIndex].variant = 'bg-green-400';
                state.uploads[uploadIndex].icon = 'fas fa-check';
                state.uploads[uploadIndex].text_class = 'text-green-400';





            }
        );

    })

};
onBeforeUnmount(() => {
    state.uploads.forEach((upload) => {
        upload.uploadTask.cancel();

    })
});
</script>
<template>
    <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">Upload</span>
            <i class="float-right text-2xl text-green-400 fas fa-upload"></i>
        </div>
        <div class="p-6">
            <!-- Upload Dropbox -->
            <div class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
                :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }" @drag.prevent.stop=""
                @dragstart.prevent.stop="" @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true" @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false" @drop.prevent.stop="upload($event)">
                <h5>Drop your files here</h5>
            </div>
            <input type="file" multiple @change="upload($event)" />
            <hr class="my-6" />
            <!-- Progess Bars -->
            <div class="mb-4" v-for="upload in state.uploads" :key="upload.name">
                <!-- File Name -->
                <div class="text-sm font-bold" :class="upload.text_class"><i :class="upload.icon"></i> {{ upload.name }}
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <!-- Inner Progress Bar -->
                    <div class="transition-all progress-bar" :class="upload.variant"
                        :style="{ width: upload.current_progress + '%' }">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>