<script setup>

import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';

const userStore = useUserStore();
const useModal = useModalStore();
userStore.checkUserState();

const props = defineProps(['tab']);
const log_in_submission = ref(false);
const log_show_alert = ref(false);
const log_alert_variant = ref('bg-blue-500');
const log_alert_message = ref("Logged in");


const loginSchema = ref({

    email: "required",

    password: "required",

});



const login = async (values) => {
    log_show_alert.value = true;
    log_in_submission.value = true;
    log_alert_variant.value = 'bg-blue-500';
    log_alert_message.value = 'Login in..'
    try {
        await userStore.authenticate(values);
    } catch (error) {
        log_in_submission.value = false;
        log_alert_variant.value = 'bg-red-500';
        log_alert_message.value = 'Failed! Incorrect email or password'
        return;

    }

    log_alert_variant.value = 'bg-green-500';
    log_alert_message.value = 'Success! Logged in'


    useModal.isOpen = false;

};
</script>
<template>
    <!-- Login Form -->
    <div class="p-4 mb-4 font-bold text-center text-white rounded" v-if="log_show_alert" :class="log_alert_variant">{{
        log_alert_message }}</div>
    <VeeForm v-show="props.tab === 'login'" :validation-schema="loginSchema" @submit="login">
        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <VeeField type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            <ErrorMessage class="text-red-600" name="email" />
        </div>
        <!-- Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <VeeField type="password" name="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
            <ErrorMessage class="text-red-600" name="password" />
        </div>
        <button type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            :disabled="log_in_submission">
            Submit
        </button>
    </VeeForm>
</template>