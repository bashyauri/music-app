import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user'
import VeeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import icon from './directives/icon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.directive('icon', icon)

app.mount('#app')
const userStore = useUserStore()

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, update the store with user info

    userStore.userLoggedIn = true
  } else {
    // User is not logged in, clear user info

    userStore.userLoggedIn = false
  }
})
