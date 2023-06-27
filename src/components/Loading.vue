<template>
    <div class="flex flex-col items-center justify-center h-32 mt-20">
        <span class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></span>
        <div v-show="showText">
            <h2 class="mt-5">{{ modalMessageText }}</h2>
        </div>
    </div>
</template>
  
<style scoped></style>

<script lang="ts">
import modalMessageText from "../nls/modalMessageText.json";
export default {
    props: {
        showText: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            modalMessageText: modalMessageText.loadingMessage,
        };
    },
};
</script>