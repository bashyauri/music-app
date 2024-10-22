<script setup>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase';
import { addDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';

import { usePlayerStore } from '@/stores/player';

import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { ErrorMessage } from 'vee-validate';

const store = useUserStore();
const playerStore = usePlayerStore();
const route = useRoute();
const router = useRouter();
const state = reactive({
    song: {},
    comments: [],
});

const sort = ref("1");
const schema = ref({
    comment: "required|min:3|max:100",
});

const comment_in_submission = ref(false);
const comment_show_alert = ref(false);
const comment_alert_variant = ref('bg-blue-500');
const comment_alert_message = ref('Please wait! Your comment is being submitted');

onMounted(async () => {
    const docRef = doc(songsCollection, route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        // Check if the query has a `sort` parameter and set it.
        sort.value = route.query.sort === "1" || route.query.sort === "2" ? route.query.sort : "1";
        state.song = docSnap.data();
        getComments();
    } else {
        return router.push({ name: 'home' });
    }
});

// Watch for changes in `sort` and update the URL query parameter accordingly.
watch(sort, (newValue) => {
    if (newValue !== route.query.sort) {
        router.push({
            query: { ...route.query, sort: newValue },
        });
    }
});

const sortedComments = computed(() => {
    return state.comments.slice().sort((a, b) => {
        if (sort.value === '1') {
            return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
    });
});

const getComments = async () => {
    try {
        const q = query(commentsCollection, where("sid", "==", route.params.id));
        const querySnapshot = await getDocs(q);
        state.comments = [];

        querySnapshot.forEach((doc) => {
            const comment = {
                ...doc.data(),
                docID: doc.id,
            };
            state.comments.push(comment);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
};

const addComment = async (values, { resetForm }) => {
    comment_in_submission.value = true;
    comment_show_alert.value = true;
    comment_alert_variant.value = 'bg-blue-500';
    comment_alert_message.value = 'Please wait! Your comment is being submitted';

    const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
    };
    await addDoc(commentsCollection, comment);
    state.song.comment_count += 1;


    const songRef = doc(songsCollection, route.params.id);
    await updateDoc(songRef, {
        comment_count: state.song.comment_count,
    });
    getComments();
    comment_in_submission.value = false;
    comment_alert_variant.value = 'bg-green-500';
    comment_alert_message.value = 'Your comment has been submitted successfully!';
    resetForm();
};

</script>

<template>
    <main>
        <!-- Music Header -->
        <section class="relative w-full mb-8 text-center text-white py-14">
            <div class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
                style="background-image: url(/assets/img/song-header.png)"></div>
            <div class="container flex items-center mx-auto">
                <!-- Play/Pause Button -->
                <button type="button"
                    class="z-50 w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none"
                    @click="playerStore.newSong(state.song)">
                    <i class="fas fa-play"></i>
                </button>
                <div class="z-50 ml-8 text-left">
                    <!-- Song Info -->
                    <div class="text-3xl font-bold">{{ state.song.modified_name }}</div>
                    <div>{{ state.song.genre }}</div>
                </div>
            </div>
        </section>
        <!-- Form -->
        <section class="container mx-auto mt-6" id="comments">
            <div class="relative flex flex-col bg-white border border-gray-200 rounded">
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                    <!-- Comment Count -->
                    <span class="card-title">Comments ({{ state.song.comment_count }})</span>
                    <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
                </div>
                <div class="p-6">
                    <div class="p-4 mb-4 font-bold text-center text-white" v-if="comment_show_alert"
                        :class="comment_alert_variant">
                        {{ comment_alert_message }}
                    </div>
                    <VeeForm v-if="store.userLoggedIn" :validation-schema="schema" @submit="addComment">
                        <VeeField as="textarea" name="comment"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                            placeholder="Your comment here..."></VeeField>
                        <ErrorMessage class="text-red-600" name="comment" />
                        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
                            Submit
                        </button>
                    </VeeForm>
                    <!-- Sort Comments -->
                    <select v-model="sort"
                        class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                        <option value="1">Latest</option>
                        <option value="2">Oldest</option>
                    </select>
                </div>
            </div>
        </section>
        <!-- Comments -->
        <ul class="container mx-auto">
            <li class="p-6 border border-gray-200 bg-gray-50" v-for="comment in sortedComments" :key="comment.docID">
                <!-- Comment Author -->
                <div class="mb-5">
                    <div class="font-bold">{{ comment.name }}</div>
                    <time>{{ comment.datePosted }}</time>
                </div>

                <p>
                    {{ comment.content }}
                </p>
            </li>

        </ul>
    </main>

</template>