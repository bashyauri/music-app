<script setup>

import { useModalStore } from '@/stores/modal';

const store = useModalStore();



const toggleAuthModal = () => {
    store.isOpen = !store.isOpen
    console.log(store.isOpen);

};



</script>
<template>
    <!-- Header -->
    <header id="header" class="bg-gray-700">
        <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
            <!-- App Name -->
            <a class="mr-4 text-2xl font-bold text-white uppercase" href="#">Music</a>

            <div class="flex items-center flex-grow">
                <!-- Primary Navigation -->
                <ul class="flex flex-row mt-1">
                    <!-- Navigation Links -->
                    <li>
                        <a class="px-2 text-white" href="#" @click="toggleAuthModal">Login / Register</a>
                    </li>
                    <li>
                        <a class="px-2 text-white" href="#">Manage</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>