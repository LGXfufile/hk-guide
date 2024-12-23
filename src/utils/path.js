export const getImageUrl = (imageName) => {
  const baseUrl = import.meta.env.MODE === 'production' ? '/hk-guide/' : '/'
  return `${baseUrl}img/${imageName}`
} 