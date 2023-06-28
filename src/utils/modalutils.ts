import { ref } from "vue";

export const showModalMessage = ref(false);
export const modalTitle = ref("");
export const modalMessage = ref("");
export const isModalSuccess = ref(false);

export function openModal(title: string, message: string, isSuccess: boolean) {
  modalTitle.value = title;
  modalMessage.value = message;
  showModalMessage.value = true;
  isModalSuccess.value = isSuccess;
}

export function closeModal() {
  showModalMessage.value = false;
}
