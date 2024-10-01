import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, usersCollection } from '@/includes/firebase'
import { addDoc } from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const registerationDetails = {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        uid: userCredentials.user.uid
      }
      await updateProfile(userCredentials.user, {
        displayName: registerationDetails.name
      })
      await addDoc(usersCollection, registerationDetails)
      this.userLoggedIn = true
    }
  }
})
