<template>
  <div class="lazy-image" :style="{ height }">
    <img
      :src="src"
      :alt="alt"
      @load="handleLoad"
      :class="{ loaded: isLoaded }"
    />
    <div class="loading-placeholder" v-if="!isLoaded">
      <el-icon class="loading"><Loading /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Loading } from '@element-plus/icons-vue'

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
    default: 'auto'
  }
})

const isLoaded = ref(false)

const handleLoad = () => {
  isLoaded.value = true
}
</script>

<style scoped>
.lazy-image {
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
  width: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

img.loaded {
  opacity: 1;
}

.loading-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading {
  font-size: 24px;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 