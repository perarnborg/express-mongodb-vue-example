<template>
  <div class="app">
    <main class="app__main">
      Sign in user: {{ user }}
      <hr />
      Messages: {{ messages }}
    </main>
  </div>
</template>

<script>
import { getCurrentUser, getMessages } from '@/services/api-service'

export default {
  name: 'App',
  data() {
    return {
      user: null,
      messages: null
    }
  },
  async created() {
    try {
      this.user = await getCurrentUser()
      this.messages = await getMessages()
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
