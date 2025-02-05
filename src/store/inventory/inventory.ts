import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { IInventoryItem } from './types';

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<(IInventoryItem | null)[]>([]);

  const cells = Array(25).fill(null);
  const startItems: IInventoryItem[] = [
    { id: 1, previewImg: 'item-green-preview', detailImg: 'item-green',  quantity: 4, position: 1},
    { id: 2, previewImg: 'item-brown-preview', detailImg: 'item-brown-preview', quantity: 2, position: 2},
    { id: 3, previewImg: 'item-blue-preview', detailImg: 'item-blue-preview', quantity: 5, position: 3},
  ]
  let savedItems:IInventoryItem[] = JSON.parse(localStorage.getItem('inventory')!) || startItems;
  
  const updateItems = () => {
    
    items.value = cells.map((_, idx) => savedItems.find(item => item.position - 1 === idx) || null);
  }

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

  const resetItems = () => {
    localStorage.removeItem('inventory');
    savedItems = JSON.parse(JSON.stringify(startItems));
    selectedItem.value = null
    updateItems()
  }

  watch(items, (newItems) => {
    const filteredItems = newItems.reduce<IInventoryItem[]>((acc, item) => {
      if (item) {
        acc.push(item);
      }
      return acc;
    }, []);
    
    localStorage.setItem('inventory', JSON.stringify(filteredItems));
  }, { deep: true });

  updateItems()

  return {
    items,
    selectedItem,
    decreaseItemQuantity,
    resetItems,
  };
});