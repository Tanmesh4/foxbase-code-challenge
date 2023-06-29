<template>
    <div>
        <div v-if="isLoading">
            <Loading :show-text="false" />
        </div>
        <div>
            <img :src="imageUrl" class="image-card" :class="{ 'question-card': handleStyle }" :alt="altText"
                @load="handleImageLoad" @error="handleImageError" />
        </div>
    </div>
</template>
  
<script lang="ts">
import Loading from './Loading.vue';

export default {
    components: {
        Loading
    },
    props: {
        imageUrl: {
            type: String,
        },
        altText: {
            type: String,
        },
        handleStyle: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            isLoading: true,
            isError: false,
        };
    },
    methods: {
        handleImageLoad() {
            this.isLoading = false;
        },
        handleImageError() {
            this.isLoading = false;
            this.isError = true;
            console.error("Image could not be fetched:", this.imageUrl);
        },
    },
};
</script>

<style scoped>
.image-card {
    display: flex;
    align-items: center;
    border-radius: 1.25rem;
    box-shadow: 0 2px 4px theme('colors.dark');
    transition: all 0.3s ease;
    flex-direction: column;
    padding: 1.5rem;
    width: 25rem;
    height: 20rem;
}

.question-card {
    padding: 0.5rem;
    width: 18rem;
    height: 15rem;
}
</style>
  