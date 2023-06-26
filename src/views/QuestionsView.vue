
<template>
    <div class="container mx-auto mt-20">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div class="mt-10">
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
                    <h2 class="text-warning mt-10">Please select an option to continue!</h2>
                </div>
                <button type="button"
                    :class="['mt-6 mr-2 px-4 py-2 rounded bg-white-500 text-black hover:bg-hover border border-primary hover:text-white', { 'border-secondary cursor-not-allowed opacity-50': currentPageIndex === 0 }]"
                    :disabled="currentPageIndex === 0" @click="goBack">
                    Back
                </button>
                <button type="submit" :disabled="isNextButtonDisabled"
                    :class="['mt-6 px-4 py-2 rounded', isNextButtonDisabled ? 'bg-secondary text-black opacity-50 cursor-not-allowed' : 'bg-primary text-white hover:bg-hover']">
                    {{ isLastQuestion ? 'Get Recommendation' : 'Next' }}
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
import {
    submitFormData,
    handleData,
    getNextPageId,
    getPageIndex,
} from "../utils/formutils";
import { addFormData } from '../data/queries';
import Loading from '../components/Loading.vue';
import { ICreateFormData } from "../interface/questionsTypings";

export default {
    components: {
        RadioInput,
        CheckboxInput,
        RangeInput,
        Loading
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

        const addFormDataQuery = useMutation(addFormData);
        const formData = ref<{
            colorLocation: string;
            underground: string[];
            opacityKnowledge: boolean | string;
            hue: string;
            opacityStrength: string | null;
            palette: string | null;
            [key: string]: any;
        }>({
            colorLocation: "",
            underground: [],
            opacityKnowledge: "",
            hue: "",
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
                    return formData.value[inputId] === undefined;
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
            console.log("Data is:", formData.value);
            const nextPageId = getNextPageId(currentPage.value, formData.value);
            if (nextPageId) {
                currentPageIndex.value = getPageIndex(nextPageId);
            } else {
                isLoading.value = true;
                console.log("Questionnaire completed!");
                const data = handleData(formData.value);
                await submitFormData(data, addFormDataQuery);
                router.replace('/products');
                isLoading.value = false;
            }
        };

        const goBack = () => {
            if (currentPageIndex.value > 0) {
                const currentPage = pages[currentPageIndex.value];
                const previousPageIndex = currentPageIndex.value - 1;
                if (currentPage.id.toString().includes("-")) {
                    const [mainPageId] = currentPage.id.toString().split("-");
                    currentPageIndex.value = parseInt(mainPageId) - 2;
                } else {
                    currentPageIndex.value = previousPageIndex;
                }
            }
        };

        return {
            formData,
            currentPage,
            isNextButtonDisabled,
            currentPageIndex,
            isLoading,

            submitForm,
            goBack,
        };
    },
};
</script>
  
<style scoped></style>../interface/questionsTypings