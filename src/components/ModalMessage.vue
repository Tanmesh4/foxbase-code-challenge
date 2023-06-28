<template>
    <div class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <div class="title-icon">
                    <div v-if="isSuccess" class="success-icon">
                        <font-awesome-icon :icon="['fas', 'check']" beat-fade style="{ color: theme('colors.success') }" />
                    </div>
                    <div v-else class="warning-icon">
                        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" shake
                            style="{ color: theme('colors.warning') }" />
                    </div>
                </div>
                <h2>{{ title }}</h2>
            </div>
            <div class="modal-body">
                <Loading :showText="false" />
            </div>
            <div class="modal-footer">
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Loading from './Loading.vue';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isSuccess: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        Loading,
    }
}
</script>
  
<style scoped>
.modal-header {
    display: flex;
    align-items: center;
    justify-content: center;
}

.title-icon {
    display: flex;
    align-items: center;
}

.success-icon,
.warning-icon {
    font-size: 3rem;
    margin-right: 1rem;
}

.modal-footer {
    margin-top: 1.5rem;
}

.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
}

.modal-content {
    background-color: theme('colors.background');
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 25rem;
    text-align: center;
    animation: modal-appear 0.3s ease-in-out;
}

.success-icon,
.warning-icon {
    font-size: 2rem;
}

.success-icon svg {
    color: theme('colors.success');
}

.warning-icon svg {
    color: theme('colors.warning');
}

@keyframes modal-appear {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>  