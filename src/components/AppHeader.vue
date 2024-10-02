<script setup>

import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const store = useModalStore();

const userStore = useUserStore();



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
                    <li v-if="!userStore.userLoggedIn">
                        <a class="px-2 text-white" href="#" @click="toggleAuthModal">Login / Register</a>
                    </li>
                    <template v-else>
                        <li>
                            <a class="px-2 text-white" href="#">Manage</a>
                        </li>
                        <li>
                            <a class="px-2 text-white hover:cursor-pointer"
                                @click.prevent="userStore.signOut">Logout</a>
                        </li>
                    </template>

                </ul>
            </div>
        </nav>
    </header>
</template>