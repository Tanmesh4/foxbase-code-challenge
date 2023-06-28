<template>
    <div v-if="input" class="mt-4">
        <div v-if="input.requireImage" class="flex flex-wrap">
            <ImageComp v-for="option in input.options" :key="option.text" :imageUrl="option.imageUrl"
                :cardText="option.text" :type="input.type" :isChecked="isChecked(option)"
                :requireBlock="!input.requireImage" :requireImage="input.requireImage"
                @change="handleCheckboxChange(option)" class="m-8"></ImageComp>
        </div>
        <div v-else>
            <div v-for="option in input.options" :key="option.text" class="mt-2 flex items-center">
                <input type="checkbox" :value="option" :checked="isChecked(option)" @change="handleCheckboxChange(option)"
                    class="mr-2" />
                <span>{{ option.text }}</span>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { type IInputData } from "../interface/dataTypings";
import ImageComp from "./ImageComp.vue";

export default {
    props: {
        input: {
            type: Object as () => IInputData,
            required: true,
        },
        formData: {
            type: Object as () => Record<string, any>,
            required: true,
        },
    },
    components: {
        ImageComp,
    },
    methods: {
        isChecked(option: { text: string; imageUrl?: string }) {
            return Array.isArray(this.formData[this.input.id]) && this.formData[this.input.id].includes(option);
        },
        handleCheckboxChange(option: { text: string; imageUrl?: string }) {
            if (!Array.isArray(this.formData[this.input.id])) {
                this.formData[this.input.id] = [];
            }
            const selectedOptions = this.formData[this.input.id];
            const optionIndex = selectedOptions.indexOf(option);
            if (optionIndex > -1) {
                selectedOptions.splice(optionIndex, 1);
            } else {
                selectedOptions.push(option);
            }
        },
    },
};
</script>
  
<style scoped>
.checkbox-input {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.checkbox-input .checkbox-option {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
}

.checkbox-input .checkbox-option input[type="checkbox"] {
    margin-right: 0.5rem;
}

.checkbox-input .image-option {
    margin-right: 1rem;
    margin-bottom: 1rem;
}

.checkbox-input .image-option img {
    width: 6.25rem;
    height: auto;
    margin-bottom: 0.5rem;
    border: 0.125rem solid transparent;
    border-radius: 50%;
    transition: border-color 0.3s ease;
}

.checkbox-input .image-option img.checked {
    border-color: theme('colors.primary');
}
</style>