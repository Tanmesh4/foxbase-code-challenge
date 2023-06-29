<template>
    <div class="ribbon-container">
        <div class="ribbon">
            <span class="ribbon-text">{{ ribbonTitle }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import UIText from "../nls/UItext.json";
export default {
    data() {
        return {
            ribbonTitle: UIText.displayproductTopRecommendation,
        };
    },
}

</script>

<style scoped>
.ribbon-container {
    position: relative;
}

.ribbon {
    position: absolute;
    top: -0.6rem;
    left: -0.6rem;
    background-color: theme('colors.hover');
    width: 12.5rem;
    height: 2.5rem;
    border-radius: 3rem;
}

.ribbon-text {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: uppercase;
    white-space: nowrap;
    width: 20rem;
}
</style>