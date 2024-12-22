export class ImageLoader {
  constructor(images = []) {
    this.images = images
    this.loadedImages = new Set()
    this.loading = false
  }

  preload(callback) {
    if (this.loading) return

    this.loading = true
    let loaded = 0
    const total = this.images.length

    return new Promise((resolve, reject) => {
      this.images.forEach(src => {
        if (this.loadedImages.has(src)) {
          loaded++
          if (loaded === total) {
            this.loading = false
            resolve()
          }
          return
        }

        const img = new Image()
        
        img.onload = () => {
          this.loadedImages.add(src)
          loaded++
          if (callback) {
            callback(loaded / total)
          }
          if (loaded === total) {
            this.loading = false
            resolve()
          }
        }

        img.onerror = () => {
          loaded++
          if (loaded === total) {
            this.loading = false
            reject(new Error(`Failed to load image: ${src}`))
          }
        }

        img.src = src
      })
    })
  }

  isLoaded(src) {
    return this.loadedImages.has(src)
  }
} 