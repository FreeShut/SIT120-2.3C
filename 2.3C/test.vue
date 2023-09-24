<template>
    <li :class="{ checked: message.checked }">
      <input type="checkbox" v-model="message.checked" />
      {{ message.text }}
    </li>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Message',
    props: {
      message: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const message = ref(props.message);
      return { message };
    }
  };
  </script>
  
  <style scoped>
  .checked {
    text-decoration: line-through;
    color: gray;
  }
  </style>
  