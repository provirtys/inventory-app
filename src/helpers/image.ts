const images = import.meta.glob('@assets/images/items/*.{png,jpg,jpeg,webp}', { eager: true });

export const getImageUrl = (filename: string) => {
  return (images[`/src/assets/images/items/${filename}.png`] as { default: string })?.default || '';
};
