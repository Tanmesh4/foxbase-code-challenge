<template>
    <div class="container mx-auto px-4 py-8 mt-12">
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else>
            <ModalMessage :title="modalTitle" :message="modalMessage" v-if="showModalMessage"
                :is-success="isModalSuccess" />
            <h1 class="text-3xl font-bold px-4 pt-4 mb-6">{{ title }}</h1>
            <template v-if="product && product.length > 0">
                <div class="flex flex-wrap">
                    <div v-for="(item, index) in product" :key="item.id" :class="[index === 0 ? 'mr-10' : 'mr-10']">
                        <div v-if="index === 0">
                            <RibbonForProduct />
                        </div>
                        <DisplayCard :product="item" :is-first-product="index === 0"
                            :class="[index === 0 ? 'border-2 border-hover rounded p-4' : 'p-4']" />
                    </div>
                </div>
            </template>
            <div class="mt-4">
                <button @click="redirectToHome" class="bg-primary text-white py-2 px-4 rounded hover:bg-hover">
                    {{ homeButton }}
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Loading from '../components/Loading.vue';
import DisplayCard from '../components/DisplayCard.vue';
import { useProductData } from '../utils/productData';
import { useRouter } from "vue-router";
import { type Ref, onMounted, ref, watch } from 'vue';
import UIText from "../nls/UItext.json";
import { showModalMessage, modalTitle, modalMessage, isModalSuccess, openModal, closeModal } from "../utils/modalutils";
import ModalMessage from '../components/ModalMessage.vue';
import RibbonForProduct from '../components/RibbonForProduct.vue';
import modalMessageText from "../nls/modalMessageText.json";

export default {
    components: {
        DisplayCard,
        Loading,
        ModalMessage,
        RibbonForProduct
    },

    setup() {
        const productData = useProductData();
        const loading = ref(productData.recommendedProductLoading.value || productData.latestColorChoiceLoading.value || productData.recommendedProductLoading.value);
        const product = ref(productData.product.value);
        const router = useRouter();
        const title = UIText.displayproductTitle;
        const homeButton = UIText.displayproductHomeButtonText;

        const redirectToHome = () => {
            router.replace('/');
        }

        const loadingTimeout: Ref<NodeJS.Timeout | null> = ref(null);

        onMounted(() => {
            // Start the loading timeout
            loadingTimeout.value = setTimeout(() => {
                openModal(
                    modalMessageText.connectToTheDatabase,
                    modalMessageText.somethingWentWrongMessage,
                    false
                );
                setTimeout(() => {
                    closeModal();
                    router.replace("/");
                }, 2000);
            }, 5000);
        });

        watch(
            () => [
                productData.recommendedProductLoading.value,
                productData.latestColorChoiceLoading.value,
                productData.recommendedProductLoading.value
            ],
            () => {
                loading.value = productData.recommendedProductLoading.value || productData.latestColorChoiceLoading.value || productData.recommendedProductLoading.value;
                if (!loading.value) {
                    clearTimeout(loadingTimeout.value as unknown as number);
                }
            }
        );

        watch(productData.product, (newValue) => {
            product.value = newValue;
        });

        return {
            product,
            loading,
            title,
            homeButton,
            showModalMessage,
            modalTitle,
            modalMessage,
            isModalSuccess,

            redirectToHome,
        };
    },
};
</script>