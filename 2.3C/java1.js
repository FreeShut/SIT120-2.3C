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


const app2 = Vue.createApp({
    data() {
        return {
            inputLabel: 'Enter Text:',
            customInputValue: '',
            confirmedInput: '',
            inputType: 'password'
        };
    },
    components: {
        CustomInput
    },
    methods: {
        handleInputChange(value) {
            console.log(`Input changed to: ${value}`);
        },
        confirmInput() {
            this.confirmedInput = this.customInputValue;
            this.inputType = 'text';
        }
    }
});
app2.mount('#app2');