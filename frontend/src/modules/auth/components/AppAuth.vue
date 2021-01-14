<template>
  <div class="app-auth">
    <button @click="getWhoAmI">Кто я</button>

    <div class="form">
      <label>
        <span>Имя</span>

        <input
          type="text"
          v-model="form.name"
        >
      </label>

      <label>
        <span>Пароль</span>

        <input
          type="password"
          v-model="form.password"
        >
      </label>

      <button @click="logIn">Войти</button>
    </div>

    <button @click="logOut">Выйти</button>
  </div>
</template>

<script>
import { get, post } from '@net/tools/http'

export default {
  name: 'AppAuth',
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    getWhoAmI() {
      get('whoami')
    },
    logIn() {
      post('log-in', { body: this.form })
    },
    logOut() {
      post('log-out')
    },
  },
}
</script>
