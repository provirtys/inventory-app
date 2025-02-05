import {getCoords, transformElement} from '@helpers/position'
import { type Ref, ref } from 'vue';

export const useDrag = (image: Ref<HTMLElement | null>) => {
  const isDragging = ref(false);
  const dropTarget = ref<Element | null>(null)
  const isMoving = ref(false);
  
  let shiftX = 0;
  let shiftY = 0;
  let isTouch = false;

  const getEvent = (event: Event) => {
    return isTouch ? (event as TouchEvent).touches[0] : event as MouseEvent;
  }

  const onDrag = (event: Event) => {
    const baseEvent = getEvent(event)

    isMoving.value = true
    isDragging.value = true
  
    document.body.classList.add('dragging');
  
    transformElement(image.value!, baseEvent.clientX - shiftX, baseEvent.clientY - shiftY);
  };

  const onDragEnd = (event: Event) => {
    
    const touchEvent = event as TouchEvent;
  
    if (isTouch && touchEvent.changedTouches.length > 0) {
      const touch = touchEvent.changedTouches[0];
      dropTarget.value = document.elementFromPoint(touch.clientX, touch.clientY);
    } else {
      dropTarget.value = event.target as Element;
    }

    isDragging.value = false;
  
    document.body.classList.remove('dragging');
  
    cleanupListeners()
  }

  const onDragStart = (event: Event) => {
    isTouch = event.type === 'touchstart';

    const baseEvent = getEvent(event)
    const elementCoords = getCoords(baseEvent.target as HTMLElement);

    isMoving.value = false
    image.value!.ondragstart = () => false
    image.value!.classList.add('dragging');
  
    shiftX = baseEvent.pageX - elementCoords.x;
    shiftY = baseEvent.pageY - elementCoords.y;
  
    transformElement(image.value!, baseEvent.clientX - shiftX, baseEvent.clientY - shiftY);
    addListeners()
  };

  const cleanupListeners = () => {
    document.body.classList.remove('dragging');
    if (isTouch) {
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', onDragEnd);
    } else {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragEnd);
    }
  };

  const addListeners = () => {
    if (isTouch) {
      document.addEventListener('touchmove', onDrag);
      document.addEventListener('touchend', onDragEnd);
    } else {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragEnd);
    }
  }

  return {
    isDragging,
    dropTarget,
    isMoving,
    onDragStart,
    onDragEnd,
    onDrag
  };
};
