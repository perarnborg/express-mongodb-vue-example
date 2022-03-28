<template>
  <div class="app">
    <main class="app__main">
      Sign in user: {{ user }}
      <hr />
      Messages: {{ messages }}
      <hr />
      <form @submit.prevent="createMessage">
        <textarea v-model="messageText"></textarea>
        <button type="subit">Skicka meddelande</button>
      </form>
    </main>
  </div>
</template>

<script>
import {
  getCurrentUser,
  getMessages,
  createMessage
} from '@/services/api-service'

export default {
  name: 'App',
  data() {
    return {
      user: null,
      messages: null,
      messageText: ''
    }
  },
  async created() {
    try {
      this.user = await getCurrentUser()
      this.messages = await getMessages()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async createMessage() {
      if (!this.messageText) {
        return
      }
      const message = await createMessage(this.messageText)
      this.messages = [...this.messages, message]
    }
  }
}
</script>
