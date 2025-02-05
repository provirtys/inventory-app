export const transformElement = (el: HTMLElement,x: number, y: number) => {
  if (!el) return

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
};

export const getCoords = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + scrollX,
    y: rect.top + scrollY
  };
};