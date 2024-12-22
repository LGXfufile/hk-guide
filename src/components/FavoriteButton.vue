<template>
  <div class="favorite-button">
    <el-button
      :type="isFavorite ? 'danger' : 'default'"
      :icon="isFavorite ? 'Star' : 'StarFilled'"
      circle
      @click="toggleFavorite"
      v-loading="loading"
      :class="{ 'is-favorite': isFavorite }"
    />
    <span class="favorite-count" v-if="showCount">{{ favoriteCount }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  itemId: {
    type: String,
    required: true
  },
  showCount: {
    type: Boolean,
    default: true
  }
})

const isFavorite = ref(false)
const favoriteCount = ref(0)
const loading = ref(false)

const toggleFavorite = async () => {
  if (!isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  loading.value = true
  try {
    // 实际应用中这里需要调用API
    await new Promise(resolve => setTimeout(resolve, 500))
    isFavorite.value = !isFavorite.value
    favoriteCount.value += isFavorite.value ? 1 : -1
    
    ElMessage({
      type: 'success',
      message: isFavorite.value ? '收藏成功' : '已取消收藏',
      duration: 1500
    })
  } catch (error) {
    ElMessage.error('操作失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.favorite-button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.is-favorite {
  animation: favorite 0.3s ease;
}

.favorite-count {
  font-size: 14px;
  color: var(--text-color-secondary);
}

@keyframes favorite {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style> 