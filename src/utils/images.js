// 统一管理图片资源
export const images = {
  carousel: {
    skyline: '/src/img/hk-skyline.jpg',
    food: '/src/img/hk-food.jpg',
    shopping: '/src/img/hk-shopping.jpg'
  },
  categories: {
    explore: '/src/img/explore.jpg',
    food: '/src/img/food.jpg',
    transport: '/src/img/transport.jpg'
  },
  thumbnails: {
    skyline: '/src/img/hk-skyline-thumb.jpg',
    food: '/src/img/hk-food-thumb.jpg',
    shopping: '/src/img/hk-shopping-thumb.jpg'
  },
  hotSpots: {
    victoriaHarbour: '/src/img/victoria-harbour.jpg',
    mtr: '/src/img/mtr.jpg',
    michelin: '/src/img/michelin.jpg',
    shopping: '/src/img/shopping.jpg'
  }
}

// 获取图片路径的辅助函数
export const getImageUrl = (category, name) => {
  return images[category]?.[name] || ''
} 