<script setup>
import AppUpload from '@/components/AppUpload.vue';
import { songsCollection, auth, query } from '@/includes/firebase';
import { getDocs, where } from 'firebase/firestore';
import { onBeforeMount } from 'vue';


onBeforeMount(async () => {
    const q = query(songsCollection, where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });


});



</script>
<template>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1">
                <AppUpload />

            </div>
            <div class="col-span-2">
                <div class="relative flex flex-col bg-white border border-gray-200 rounded">
                    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                        <span class="card-title">My Songs</span>
                        <i class="float-right text-2xl text-green-400 fa fa-compact-disc"></i>
                    </div>
                    <div class="p-6">
                        <!-- Composition Items -->
                        <div class="p-3 mb-4 border border-gray-200 rounded">
                            <div>
                                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded">
                                    <i class="fa fa-times"></i>
                                </button>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded">
                                    <i class="fa fa-pencil-alt"></i>
                                </button>
                            </div>
                            <div>
                                <form>
                                    <div class="mb-3">
                                        <label class="inline-block mb-2">Song Title</label>
                                        <input type="text"
                                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                            placeholder="Enter Song Title" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="inline-block mb-2">Genre</label>
                                        <input type="text"
                                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                            placeholder="Enter Genre" />
                                    </div>
                                    <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
                                        Submit
                                    </button>
                                    <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600">
                                        Go Back
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div class="p-3 mb-4 border border-gray-200 rounded">
                            <div>
                                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded">
                                    <i class="fa fa-times"></i>
                                </button>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded">
                                    <i class="fa fa-pencil-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-3 mb-4 border border-gray-200 rounded">
                            <div>
                                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded">
                                    <i class="fa fa-times"></i>
                                </button>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded">
                                    <i class="fa fa-pencil-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-3 mb-4 border border-gray-200 rounded">
                            <div>
                                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded">
                                    <i class="fa fa-times"></i>
                                </button>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded">
                                    <i class="fa fa-pencil-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-3 mb-4 border border-gray-200 rounded">
                            <div>
                                <h4 class="inline-block text-2xl font-bold">Song Name</h4>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded">
                                    <i class="fa fa-times"></i>
                                </button>
                                <button class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded">
                                    <i class="fa fa-pencil-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
