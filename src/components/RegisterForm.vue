<script setup>



import { useUserStore } from '@/stores/user';
import { ref } from 'vue';




const store = useUserStore()
const props = defineProps(['tab']);
const reg_in_submission = ref(false);
const reg_show_alert = ref(false);
const reg_alert_variant = ref('bg-blue-500');
const reg_alert_message = ref("Please wait... your account is being created ");
const schema = ref({
    name: "required|min:3|max:100|alpha_spaces",
    email: "required|email|min:3|max:100",
    age: "required|min_value:18|max_value:100",
    password: "required|min:9|excluded:password",
    confirm_password: "passwords_mismatch:@password",
    country: "required|country_excluded:Antarctica",
    tos: "tos"
});


const register = async (values) => {
    reg_in_submission.value = true; // Disable submit button

    try {
        store.register(values);
        reg_show_alert.value = true;
        reg_alert_variant.value = 'bg-green-600';
        reg_alert_message.value = 'User Created Successfully';




    } catch (error) {
        console.error('Error creating user:', error);
        reg_alert_variant.value = 'bg-red-500';
        reg_alert_message.value = 'Error creating user: Please try again later';
        reg_show_alert.value = true;
        return;
    } finally {
        reg_in_submission.value = false; // Enable submit button after submission finishes
    }



};
const userData = ref({
    country: 'USA',
});

</script>
<template>
    <!-- Registration Form -->
    <div class="p-4 mb-4 font-bold text-center text-white rounded" v-if="reg_show_alert" :class="reg_alert_variant">{{
        reg_alert_message }}</div>
    <VeeForm v-show="props.tab === 'register'" :validation-schema="schema" @submit="register"
        :initial-values="userData">
        <!-- Name -->
        <div class="mb-3">
            <label class="inline-block mb-2">Name</label>
            <VeeField type="text" name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
            <ErrorMessage class="text-red-600" name="name" />
        </div>

        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <VeeField type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            <ErrorMessage class="text-red-600" name="email" />
        </div>

        <!-- Age -->
        <div class="mb-3">
            <label class="inline-block mb-2">Age</label>
            <VeeField type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                name="age" />
            <ErrorMessage class="text-red-600" name="age" />
        </div>

        <!-- Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <VeeField name="password" :bails="false" v-slot="{ field, errors }">
                <input
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Password" type="password" v-bind="field" />
                <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                </div>
            </VeeField>

        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Confirm Password</label>
            <VeeField type="password" name="confirm_password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
            <ErrorMessage class="text-red-600" name="confirm_password" />
        </div>
        <!-- Country -->
        <div class="mb-3">
            <label class="inline-block mb-2">Country</label>
            <VeeField as="select" name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>

            </VeeField>
            <ErrorMessage class="text-red-600" name="country" />
        </div>
        <!-- TOS -->
        <div class="pl-6 mb-3">
            <VeeField type="checkbox" name="tos" value="1" class="float-left w-4 h-4 mt-1 -ml-6 rounded" />
            <i18n-t class="inline-block" keypath="register.accept" tag="label"><a href="#">{{ $t('register.tos')
                    }}</a></i18n-t>
            <ErrorMessage class="block text-red-600" name="tos" />
        </div>
        <button type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            :disabled="reg_in_submission">
            Submit
        </button>
    </VeeForm>
</template>