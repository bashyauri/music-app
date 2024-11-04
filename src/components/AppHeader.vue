<script setup>

import { useRouter, useRoute } from 'vue-router'
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n'
import { computed } from 'vue';

const { locale } = useI18n()

const store = useModalStore();

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();



const toggleAuthModal = () => {
    store.isOpen = !store.isOpen

};
const currentLocale = computed(() => locale.value === 'fr' ? 'Français' : 'English')

const changeLocale = () => {
    locale.value = locale.value === 'fr' ? 'en' : 'fr'
}
const signOut = () => {
    userStore.signOut();
    if (route.meta.requiresAuth) {
        store.isOpen = false;
        router.push({ name: "home" })

    }

};


</script>
<template>
    <!-- Header -->
    <header id="header" class="bg-gray-700">
        <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
            <!-- App Name -->
            <RouterLink exact-active-class="no-active" class="mr-4 text-2xl font-bold text-white uppercase"
                :to="{ name: 'home' }">Music</RouterLink>

            <div class="flex items-center flex-grow">
                <!-- Primary Navigation -->
                <ul class="flex flex-row mt-1">
                    <!-- Navigation Links -->
                    <li>
                        <RouterLink class="px-2 text-white" :to="{ name: 'about' }">About</RouterLink>
                    </li>
                    <li v-if="!userStore.userLoggedIn">
                        <a class="px-2 text-white" href="#" @click="toggleAuthModal">Login / Register</a>
                    </li>
                    <template v-else>
                        <li>
                            <RouterLink class="px-2 text-white" :to="{ name: 'manage' }">Manage</RouterLink>
                        </li>
                        <li>
                            <a class="px-2 text-white hover:cursor-pointer" @click="signOut">Logout</a>
                        </li>
                    </template>

                </ul>
                <ul class="ml-auto">
                    <li>
                        <a class="px-2 text-white" href="#" @click="changeLocale">
                            {{ currentLocale }}
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    </header>
</template>