<script setup>
import { RouterLink } from 'vue-router';




const props = defineProps({
    song: {
        type: Object,
        required: true
    }
});
</script>
<template>
    <li class="flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50">
        <div>
            <RouterLink :to="{ name: 'song', params: { id: song.docID } }" class="block font-bold text-gray-600">{{
                props.song.modified_name
            }}
            </RouterLink>
            <span class="text-sm text-gray-500">{{ props.song.display_name }}</span>
        </div>

        <div class="text-lg text-gray-600">
            <RouterLink custom :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
                v-slot="{ navigate }">
                <span class="comments" @click="navigate">
                    <i class="text-gray-600 fa fa-comments"></i>
                    {{ props.song.comment_count }}
                </span>
            </RouterLink>
        </div>
    </li>
</template>