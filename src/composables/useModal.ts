import { ref } from 'vue';

export const useModal = (initialState: boolean = false) => {
  const showModalState = ref<boolean>(initialState);

  const openModal = () => {
    showModalState.value = true;
  };

  const closeModal = () => {
    showModalState.value = false;
  };

  return {
    isOpen: showModalState,
    openModal,
    closeModal
  };
};
