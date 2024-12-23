const getBaseUrl = () => {
  return import.meta.env.MODE === 'production' ? '/hk-guide' : ''
}

export const getImageUrl = (path) => {
  return `${getBaseUrl()}/img/${path}`
}

export const IMAGES = {
  carousel: [
    { image: getImageUrl('Snipaste_2024-12-23_01-10-33.jpg') },
    { image: getImageUrl('Snipaste_2024-12-23_01-09-01.jpg') },
    { image: getImageUrl('Snipaste_2024-12-23_01-10-49.jpg') }
  ],
  categories: [
    { image: getImageUrl('169777163853104339_0_ainote_new.jpg') },
    { image: getImageUrl('Snipaste_2024-12-23_01-09-51.jpg') }
  ]
} 