const app = Vue.createApp({
    data() {
        return {
            searchQuery: '',
            newMessage: '',
            messages: [],
            filteredMessages: [],
            searched: false,
            description: '<strong>Note:</strong> You can search or add messages below.', // Raw HTML data
            lazyNumber: 0,
            metaInfo: {
                author: 'John Doe',
                timestamp: '2023-09-11'
            }
        };
    },
    computed: {
        // Computed property to count checked messages
        checkedMessagesCount() {
            return this.messages.filter(msg => msg.checked).length;
        },
        backgroundColor() {
            return this.messages.length > 5 ? 'lightgreen' : 'lightcoral';
        }
    },
    components: {
        SimpleItem: {
            props: ['itemNumber'],
            template: '<p>This is item {{ itemNumber }}</p>'
        }
    },
    watch: {
        // Watcher for searchQuery
        searchQuery(newVal, oldVal) {
            console.log(`Search query changed from ${oldVal} to ${newVal}`);
        }
    },
    methods: {
        search() {
            this.searched = true;
            if (this.searchQuery) {
                this.filteredMessages = this.messages.filter(msg => msg.text.includes(this.searchQuery));
            } else {
                this.filteredMessages = [...this.messages];
            }
        },
        addMessage() {
            this.messages.push({ text: this.newMessage, checked: false });
            this.filteredMessages.push({ text: this.newMessage, checked: false });
            this.newMessage = ''; // reset input
        },
        deleteMessage(index) {
            const messageToDelete = this.filteredMessages[index].text;
            this.messages = this.messages.filter(msg => msg.text !== messageToDelete);
            this.filteredMessages.splice(index, 1);
        }
    },
    mounted() {
        this.filteredMessages = [...this.messages];
    }
});

app.mount('#app');