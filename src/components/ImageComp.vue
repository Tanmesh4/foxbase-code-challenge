<template>
    <div class="image-card" @click="handleCardClick" :class="{ 'selected': isChecked }">
        <div v-if="requireImage">
            <ImageLoader :image-url="imageUrl" :alt-text="cardText" :handle-style="true" />
        </div>
        <div v-else-if="requireBlock">
            <div :style="{ backgroundColor: cardColor }" class="card-color"></div>
        </div>
        <div class="card-content">
            <input v-if="type === 'radio'" type="radio" :name="inputName" :value="cardText" :checked="isChecked"
                @change="handleCardClick" />
            <input v-if="type === 'checkbox'" type="checkbox" :value="cardText" :checked="isChecked"
                @change="handleCardClick" />
            <div class="card-text">{{ cardText }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import ImageLoader from './ImageLoader.vue';
export default {
    components: {
        ImageLoader,
    },
    props: {
        requireImage: {
            type: Boolean,
            required: true,
        },
        requireBlock: {
            type: Boolean,
            required: true,
        },
        cardColor: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        cardText: {
            type: String,
            required: true,
        },
        type: {
            type: String,
        },
        isChecked: {
            type: Boolean,
            default: false,
        },
        inputName: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleCardClick() {
            if (this.type === 'radio') {
                this.$emit('change', this.cardText);
            } else if (this.type === 'checkbox') {
                this.$emit('change', !this.isChecked);
            }
        },
    },
};
</script>
  
<style scoped>
.image-card {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 1.25rem;
    border-radius: 1.25rem;
    box-shadow: 0 2px 4px theme('colors.shadow');
    transition: all 0.3s ease;
    flex-direction: column;
    padding: 1.5rem;
}

.image-card:hover {
    transform: translateY(-1rem);
    box-shadow: 0 4px 4px theme('colors.dark');
}

.image-card.selected {
    border: 0.3rem solid theme('colors.primary');
}

.card-text {
    text-align: center;
    padding: 1.5rem;
}

.card-content {
    display: flex;
    padding: 1.5rem;
}

.card-color {
    width: 10rem;
    height: 10rem;
    border: 0.1rem solid theme('colors.dark');
}
</style>
  