import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { IInventoryItem } from './types';

export const useInventoryStore = defineStore('inventory', () => {

  const emptyGrid = Array(25).fill(null);
  
  const savedItems:IInventoryItem[] = JSON.parse(localStorage.getItem('inventory')!) || [
    { id: 1, previewImg: 'item-green-preview', detailImg: 'item-green',  quantity: 4, position: 1},
    { id: 2, previewImg: 'item-brown-preview', detailImg: 'item-brown-preview', quantity: 2, position: 2},
    { id: 3, previewImg: 'item-blue-preview', detailImg: 'item-blue-preview', quantity: 5, position: 4},
  ];
  
  const items = ref(emptyGrid.map((_, idx) => savedItems.find(item => item.position - 1 === idx) || null));

  const selectedItem = ref<IInventoryItem | null>(null)

  const decreaseItemQuantity = (itemId: number, quantity: number) => {
    items.value = items.value.map(item => {
      if (item?.id === itemId) {
        if (item.quantity! < quantity) {
          alert('Слишком большое число')
          throw new Error('Слишком большое число')
        }
        return { ...item, quantity: item.quantity! - quantity };
      }
      return item;
    });
  };

  watch(items, (newItems) => {
    const filteredItems = newItems.map((item, index) => item ? { ...item, index } : null).filter(Boolean);
    localStorage.setItem('inventory', JSON.stringify(filteredItems));
  }, { deep: true });

  return {
    items,
    selectedItem,
    decreaseItemQuantity
  };
});