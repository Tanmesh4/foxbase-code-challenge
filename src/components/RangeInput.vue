<template>
    <div v-if="input && formData">
        <input type="range" :min="input.min" :max="input.max" :step="input.step" v-model="formData[input.id]"
            class="range-input" />
        <div class="range-labels">
            <div class="range-label bg-secondary text-dark py-1 px-2 rounded-lg" v-for="rangeLabel in input.options"
                :key="rangeLabel">
                {{ rangeLabel.text }}
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
export default {
    props: {
        input: Object,
        formData: Object,
    },
};
</script>
  
<style scoped>
.range-input {
    width: 100%;
    height: 0.5rem;
    background-color: theme('colors.background');
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    border-radius: 9999px;
}

.range-input:hover {
    opacity: 1;
}

.range-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
}
</style>
  