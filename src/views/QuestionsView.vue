
<template>
    <div class="container mx-auto mt-20">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div class="mt-10">
                <ModalMessage :title="modalTitle" :message="modalMessage" v-if="showModalMessage"
                    :is-success="isModalSuccess" />
                <div class="bg-secondary h-1 rounded">
                    <div class="bg-hover h-full rounded" :style="{ width: progressPercentage }"></div>
                </div>
            </div>
            <h1 class="text-2xl font-bold mt-5">{{ currentPage.title }}</h1>
            <form @submit.prevent="submitForm">
                <div v-for="input in currentPage.inputs" :key="input.id">
                    <label class="mt-4 block font-medium">{{ input.label }}</label>
                    <div class="mt-2">
                        <template v-if="input.type === 'radio'">
                            <RadioInput :input="input" :formData="formData"></RadioInput>
                        </template>
                        <template v-else-if="input.type === 'checkbox'">
                            <CheckboxInput :input="input" :formData="formData"></CheckboxInput>
                        </template>
                        <template v-else-if="input.type === 'range'">
                            <RangeInput :input="input" :formData="formData"></RangeInput>
                        </template>
                    </div>
                </div>
                <div v-show="isNextButtonDisabled">
                    <h2 class="text-warning mt-10">{{ warningMessage }}</h2>
                </div>
                <button type="button"
                    :class="['mt-6 mr-2 px-4 py-2 rounded bg-white-500 text-black hover:bg-hover border border-primary hover:text-white', { 'border-secondary cursor-not-allowed opacity-50': currentPageIndex === 0 }]"
                    :disabled="currentPageIndex === 0" @click="goBack">
                    {{ backButton }}
                </button>
                <button type="submit" :disabled="isNextButtonDisabled"
                    :class="['mt-6 px-4 py-2 rounded', isNextButtonDisabled ? 'bg-secondary text-black opacity-50 cursor-not-allowed' : 'bg-primary text-white hover:bg-hover']">
                    {{ isLastQuestion ? getRecommendationButton : nextButton }}
                </button>
            </form>
        </div>
    </div>
</template> 

<script lang="ts">
import { pages } from "../data/questions";
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { computed, ref } from "vue";
import RadioInput from "../components/RadioInput.vue";
import CheckboxInput from "../components/CheckboxInput.vue";
import RangeInput from "../components/RangeInput.vue";
import fromutils from "../utils/formutils";
import { addFormData } from '../data/queries';
import Loading from '../components/Loading.vue';
import ModalMessage from "../components/ModalMessage.vue";
import modalMessageText from "../nls/modalMessageText.json";
import UIText from "../nls/UItext.json";
import { showModalMessage, modalTitle, modalMessage, isModalSuccess, openModal, closeModal } from "../utils/modalutils";
import { type ICreateFormData } from "../interface/dataTypings";


export default {
    components: {
        RadioInput,
        CheckboxInput,
        RangeInput,
        Loading,
        ModalMessage
    },

    computed: {
        progressPercentage() {
            return ((this.currentPageIndex + 1) / pages.length) * 100 + "%";
        },

        isLastQuestion() {
            return this.currentPageIndex === pages.length - 1;
        },
    },

    setup() {
        const backButton = UIText.questionsBackButtonText;
        const getRecommendationButton = UIText.questionsGetRecommendationButtonText;
        const nextButton = UIText.questionsNextButtonText;
        const warningMessage = UIText.questionsWarningMessage;

        const addFormDataQuery = useMutation(addFormData);

        const formData = ref<ICreateFormData>({
            colorLocation: "Outside",
            underground: [],
            opacityKnowledge: "",
            hue: "Red",
            opacityStrength: null,
            palette: null
        });

        const currentPageIndex = ref<number>(0);

        const isLoading = ref<boolean>(false);

        const router = useRouter();

        const currentPage = computed(() => {
            return pages[currentPageIndex.value];
        });

        const isNextButtonDisabled = computed(() => {
            return currentPage.value.inputs.some((input) => {
                if (input.type === 'radio') {
                    const inputId = input.id;
                    return formData.value[inputId] === undefined || formData.value[inputId] === '';
                } else if (input.type === 'checkbox') {
                    const inputId = input.id;
                    return !Array.isArray(formData.value[inputId]) || formData.value[inputId].length === 0;
                } else {
                    const inputId = input.id;
                    return formData.value[inputId] === undefined || formData.value[inputId] === '';
                }
            });
        });

        const submitForm = async () => {
            const nextPageId = fromutils.getNextPageId(currentPage.value, formData.value);
            if (nextPageId) {
                currentPageIndex.value = fromutils.getPageIndex(nextPageId);
            } else {
                isLoading.value = true;
                console.log("Questionnaire completed!");
                const data = fromutils.handleData(formData.value);
                const result = await fromutils.submitFormData(data, addFormDataQuery);

                if (result) {
                    openModal(modalMessageText.dataSubmittedTitle, modalMessageText.dataSubmittedMessage, true);
                    setTimeout(() => {
                        closeModal();
                        router.replace('/products');
                    }, 1000);
                } else {
                    openModal(modalMessageText.somethingWentWrongTitle, modalMessageText.somethingWentWrongMessage, false);
                    setTimeout(() => {
                        closeModal();
                        router.go(0);
                    }, 1000);
                };
                isLoading.value = false;
            }
        };

        const goBack = () => {
            fromutils.goBackInForm(currentPageIndex);
        }

        return {
            formData,
            currentPage,
            isNextButtonDisabled,
            currentPageIndex,
            isLoading,
            showModalMessage,
            modalTitle,
            modalMessage,
            isModalSuccess,
            backButton,
            getRecommendationButton,
            nextButton,
            warningMessage,

            openModal,
            closeModal,
            submitForm,
            goBack
        };
    },
};
</script>
  
<style scoped></style>