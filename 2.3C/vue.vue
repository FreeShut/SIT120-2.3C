<template>
    <div>
        <div class="navbar">
            <a href="index.html">Search</a>
            <a href="testing.html">Add / Type Something</a>
        </div>
        <div id="app">
            <p v-html="description"></p>
            <ul :style="{ backgroundColor: backgroundColor }">
                <message-component v-for="(message, index) in messages" :key="index" :message="message"></message-component>
            </ul>
            <input v-model="searchQuery" placeholder="Search...">
            <button @click="search">Search</button>
            <input v-model.trim="newMessageText" placeholder="Type a message...">
            <button @click="addMessage">Send</button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import Message from './test.vue';

export default {
  name: 'App',
  components: {
    Message
  },
  setup() {
    const searchQuery = ref('');
    const newMessageText = ref('');
    const messages = ref([]);
    const description = ref('<strong>Note:</strong> You can search or add messages below.');
    const backgroundColor = computed(() => messages.value.length > 5 ? 'lightgreen' : 'lightcoral');

    const CustomInput = {
        props: ['label', 'modelValue', 'type'],
        emits: ['update:modelValue', 'input-changed'],
        template: `
            <div>
                <label>{{ label }}</label>
                <slot name="prefix"></slot>
                <input 
                    :type="type"
                    :value="modelValue" 
                    @input="$emit('update:modelValue', $event.target.value); $emit('input-changed', $event.target.value)"
                />
            </div>
        `
    };

    const filteredMessages = computed(() => {
        if (!searchQuery.value) return messages.value;
        return messages.value.filter(msg => msg.text.includes(searchQuery.value));
    });
    
    const search = () => {
        messages.value = filteredMessages.value;
    };

    const addMessage = () => {
        messages.value.push({ text: newMessageText.value, checked: false });
        newMessageText.value = '';
    };

    return {
        searchQuery, newMessageText, messages, description, backgroundColor, search, addMessage
    };
  }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 40px;
}
input,
button {
    margin: 10px;
}
ul {
    list-style-type: none;
}
.checked {
    text-decoration: line-through;
    color: gray;
}
.navbar {
    background-color: blue;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navbar a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
}
.navbar a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
ul {
    transition: background-color 0.3s;
}
</style>
