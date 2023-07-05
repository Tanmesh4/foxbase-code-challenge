<template>
    <div class="container mx-auto flex justify-center items-center h-screen">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div class="card p-8">
            <ModalMessage :title="modalTitle" :message="modalMessage" v-if="showModalMessage"
                :is-success="isModalSuccess" />
            <h2 class="text-2xl font-semibold mb-4">Create Display Product</h2>
            <form @submit.prevent="createDisplayProduct">
                <div class="mb-4">
                    <label for="productName" class="block text-gray-700 font-medium mb-1">Product Name</label>
                    <input v-model="productName" type="text" id="productName"
                        class="w-full border border-gray-300 rounded-md px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label for="shortDescription" class="block text-gray-700 font-medium mb-1">Short Description</label>
                    <textarea v-model="shortDescription" id="shortDescription"
                        class="w-full border border-gray-300 rounded-md px-3 py-2" required></textarea>
                </div>
                <div class="mb-4">
                    <label for="benefits" class="block text-gray-700 font-medium mb-1">Benefits</label>
                    <textarea v-model="benefits" id="benefits" class="w-full border border-gray-300 rounded-md px-3 py-2"
                        required></textarea>
                </div>
                <div class="mb-4">
                    <label for="imageUrl" class="block text-gray-700 font-medium mb-1">Image URL</label>
                    <input v-model="imageUrl" type="url" id="imageUrl"
                        class="w-full border border-gray-300 rounded-md px-3 py-2" required />
                    <p v-if="imageUrl && !isImageUrlValid" class="text-warning text-sm mt-1">Please enter a valid image URL.
                    </p>
                    <p v-if="imageUrl && isImageUrlValid && !isImageValid" class="text-warning text-sm mt-1">Invalid image
                        URL.</p>
                </div>
                <div class="mb-4">
                    <label for="scoringMatrix" class="block text-gray-700 font-medium mb-1">Scoring Matrix</label>
                    <input v-model="scoringMatrix" type="text" id="scoringMatrix"
                        class="w-full border border-gray-300 rounded-md px-3 py-2" required />
                    <p v-if="scoringMatrix && !isScoringMatrixValid" class="text-warning text-sm mt-1">Please enter a valid
                        scoring matrix with 6 comma-separated numbers between 0 and 1.</p>
                </div>
                <button type="submit" class="bg-primary text-white py-2 px-4 rounded hover:bg-hover">Create</button>
            </form>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, computed } from 'vue';
import { showModalMessage, modalTitle, modalMessage, isModalSuccess, openModal, closeModal } from "../utils/modalutils";
import getDisplayProduct from "../utils/getDisplayProduct";
import { addNewProduct } from '../data/queries';
import modalMessageText from "../nls/modalMessageText.json";
import ModalMessage from "../components/ModalMessage.vue";
import Loading from '../components/Loading.vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';

export default {
    components: {
        ModalMessage,
        Loading
    },
    setup() {
        const productName = ref('');
        const shortDescription = ref('');
        const benefits = ref('');
        const imageUrl = ref('');
        const scoringMatrix = ref('');
        const isLoading = ref<boolean>(false);
        const router = useRouter();
        const createProductQuery = useMutation(addNewProduct);

        const isImageUrlValid = computed(() => {
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(imageUrl.value);
        });

        const isImageValid = ref(true);
        const isScoringMatrixValid = computed(() => {
            const matrixRegex = /^((0\.\d+)|(1(\.0+)?))(,(0\.\d+)|(1(\.0+)?)){5}$/;
            return matrixRegex.test(scoringMatrix.value);
        });

        const validateFormData = () => {
            return (
                productName.value &&
                shortDescription.value &&
                benefits.value &&
                imageUrl.value &&
                scoringMatrix.value &&
                isImageUrlValid.value
            );
        };

        const handleImageLoad = async () => {
            const productData = {
                productName: productName.value,
                shortDescription: shortDescription.value,
                benefits: benefits.value,
                imageUrl: imageUrl.value,
                scoringMatrix: scoringMatrix.value.split(',').map(parseFloat),
            };

            const result = await getDisplayProduct.createProduct(productData, createProductQuery);
            if (result) {
                openModal(modalMessageText.dataSubmittedTitle, modalMessageText.dataSubmittedMessage, true);
                setTimeout(() => {
                    closeModal();
                    router.replace('/');
                }, 1000);
            } else {
                openModal(modalMessageText.somethingWentWrongTitle, modalMessageText.somethingWentWrongMessage, false);
                setTimeout(() => {
                    closeModal();
                    router.go(0);
                }, 2000);
            }
        };

        const handleImageError = () => {
            isImageValid.value = false;
        };

        const createDisplayProduct = () => {
            if (!validateFormData()) {
                return;
            }

            const image = new Image();
            image.src = imageUrl.value;
            image.addEventListener('load', () => {
                isLoading.value = true;
                handleImageLoad();
                isLoading.value = false;
            });
            image.addEventListener('error', handleImageError);
        };

        return {
            productName,
            shortDescription,
            benefits,
            imageUrl,
            scoringMatrix,
            isImageUrlValid,
            isImageValid,
            isScoringMatrixValid,
            isLoading,
            showModalMessage,
            modalTitle,
            modalMessage,
            isModalSuccess,

            createDisplayProduct,
        };
    },
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    max-width: 50rem;
    width: 100%;
    background-color: theme('colors.background');
    border-radius: 1.5rem;
    box-shadow: 0 1rem 2rem theme('colors.shadow');
}

input[type='text'],
input[type='url'],
textarea {
    transition: border-color 0.2s ease-in-out;
}

input[type='text']:focus,
input[type='url']:focus,
textarea:focus {
    outline: none;
    border-color: theme('colors.hover');
    box-shadow: 0 0 0 3px theme('colors.primary');
}

button {
    background-color: theme('colors.primary');
    transition: background-color 0.2s ease-in-out;
}

button:hover {
    background-color: theme('colors.hover');
}
</style>  