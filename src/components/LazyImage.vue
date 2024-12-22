<template>
  <div class="lazy-image-container" :style="{ height }">
    <!-- 加载占位 -->
    <div v-if="loading" class="image-placeholder">
      <el-skeleton-item variant="image" :style="{ width: '100%', height }" />
    </div>
    
    <!-- 错误显示 -->
    <div v-if="error" class="image-error">
      <el-icon><PictureFilled /></el-icon>
      <span>图片加载失败</span>
    </div>

    <!-- 实际图片 -->
    <img
      v-show="!loading && !error"
      :src="currentSrc"
      :alt="alt"
      class="lazy-image"
      @load="handleLoad"
      @error="handleError"
      :style="imageStyle"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '200px'
  },
  objectFit: {
    type: String,
    default: 'cover'
  }
})

const loading = ref(true)
const error = ref(false)
const currentSrc = ref('')
const imageRef = ref(null)

const imageStyle = computed(() => ({
  objectFit: props.objectFit,
  width: '100%',
  height: props.height
}))

const handleLoad = () => {
  loading.value = false
}

const handleError = () => {
  loading.value = false
  error.value = true
}

const loadImage = () => {
  const img = new Image()
  img.src = props.src
  currentSrc.value = props.src
}

// 使用 Intersection Observer 实现懒加载
const { stop } = useIntersectionObserver(
  imageRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadImage()
      stop()
    }
  },
  { threshold: 0.1 }
)

onMounted(() => {
  if ('loading' in HTMLImageElement.prototype) {
    // 原生懒加载支持
    imageRef.value?.setAttribute('loading', 'lazy')
    loadImage()
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}

.lazy-image {
  transition: opacity 0.3s ease;
}
</style> 