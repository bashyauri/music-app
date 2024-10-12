<script setup>

import { songsCollection, storage, storageRef } from '@/includes/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import { ref } from 'vue';

const emit = defineEmits(['updated'])
const in_submission = ref(false);
const show_alert = ref(false);
const alert_variant = ref('bg-blue-500');
const alert_message = ref('Please wait! Updating song info')
const schema = ref({
    modified_name: "required",
    genre: "alpha_spaces",
});
const showForm = ref(false)
const props = defineProps({
    song: {
        type: Object,
        required: true,
    }
});

const deleteSong = async () => {
    const deleteRef = storageRef(storage, `songs/${props.song.original_name}`);


    try {
        await deleteObject(deleteRef);

        await deleteDoc(doc(songsCollection, props.song.docID))
        emit('updated');
        console.log('File deleted successfully');
    } catch (error) {
        alert_message.value = 'Something went wrong try again later';
        in_submission.value = false;
        console.error(error);

        switch (error.code) {
            case 'storage/unauthorized':
                console.error('An error occurred:');
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
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
        return
    }
};
const edit = async (values) => {
    in_submission.value = true;
    show_alert.value = true;
    alert_variant.value = 'bg-blue-500';
    alert_message.value = 'Please wait! Updating song info...';

    try {
        const songRef = doc(songsCollection, props.song.docID);

        await updateDoc(songRef, {
            modified_name: values.modified_name,
            genre: values.genre,
            modified_at: new Date(),
        })
        emit('updated');

        in_submission.value = false;
        alert_variant.value = 'bg-green-500';
        alert_message.value = 'Song info updated successfully!';



    } catch (error) {
        alert_variant.value = 'bg-red-500';
        alert_message.value = 'Something went wrong try again later';
        in_submission.value = false;
        console.log(error)
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

    }

};

</script>
<template>
    <div class="p-3 mb-4 border border-gray-200 rounded">
        <div v-show="!showForm">
            <h4 class="inline-block text-2xl font-bold">{{ props.song.modified_name }}</h4>
            <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded" @click="deleteSong">
                <i class="fa fa-times"></i>
            </button>
            <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded"
                @click.prevent="showForm = !showForm">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-show="showForm">
            <div class="p-4 mb-4 font-bold text-center text-white" v-if="show_alert" :class="alert_variant">{{
                alert_message }}</div>
            <VeeForm :validation-schema="schema" :initial-values="props.song" @submit="edit">
                <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <VeeField type="text" name="modified_name"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song Title" />
                    <ErrorMessage class="text-red-600" name="modified_name" />
                </div>
                <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <VeeField name="genre" type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Genre" />
                    <ErrorMessage class="text-red-600" name="genre" />
                </div>
                <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600" :disabled="in_submission">
                    Submit
                </button>
                <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600" :disabled="in_submission"
                    @click="showForm = false">
                    Go Back
                </button>
            </VeeForm>
        </div>
    </div>

</template>
