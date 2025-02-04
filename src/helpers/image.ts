export const getImageUrl = (filename: string) => {
  const url = new URL(`@assets/images/items`, import.meta.url).href
  return `${url}/${filename}.png`;
}