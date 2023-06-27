
<template>
    <div v-if="input && formData">
        <div v-if="input.requireImage" class="flex flex-wrap mt-8">
            <ImageComp v-for="option in input.options" :key="option.text" :imageUrl="option.imageUrl"
                :cardText="option.text" :type="input.type" :isChecked="isChecked(option.text)" :inputName="input.id"
                :requireImage="input.requireImage" :requireBlock="!input.requireImage"
                @change="handleRadioSelection(option.text)" class="m-8"></ImageComp>
        </div>
        <div v-else-if="input.id === 'hue'" class="flex flex-wrap mt-8">
            <ImageComp v-for="option in input.options" :key="option.text" :cardText="option.text" :type="input.type"
                :isChecked="isChecked(option.text)" :inputName="input.id" :requireImage="input.requireImage"
                :requireBlock="input.id === 'hue'" :cardColor="option.text" @change="handleRadioSelection(option.text)"
                class="m-8"></ImageComp>
        </div>
        <div v-else>
            <div v-for="option in input.options" :key="option.text" class="mt-2 flex items-center">
                <input type="radio" :value="option.text" v-model="formData[input.id]" class="mr-2" />
                <div>
                    <span>{{ option.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { type IInputData } from "../interface/dataTypings";
import ImageComp from "./ImageComp.vue";

export default {
    props: {
        input: Object as () => IInputData,
        formData: Object
    },
    components: {
        ImageComp
    },
    methods: {
        isChecked(option: string) {
            return this.formData![this.input!.id] === option;
        },
        handleRadioSelection(option: string) {
            this.formData![this.input!.id] = option;
        }
    }
};
</script>