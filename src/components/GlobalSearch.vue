<template>
  <div class="global-search">
    <div class="search-header">
      <el-input
        v-model="searchQuery"
        placeholder="搜索任何内容..."
        :prefix-icon="Search"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
      <el-button class="close-btn" circle @click="$emit('close')">
        <el-icon><Close /></el-icon>
      </el-button>
    </div>

    <div class="search-content" v-if="searchQuery">
      <div class="search-results" v-loading="loading">
        <template v-if="results.length">
          <div 
            v-for="(result, index) in results" 
            :key="index"
            class="result-item"
            @click="handleResultClick(result)"
          >
            <el-icon><component :is="result.icon" /></el-icon>
            <div class="result-info">
              <h3>{{ result.title }}</h3>
              <p>{{ result.description }}</p>
            </div>
            <el-icon><ArrowRight /></el-icon>
          </div>
        </template>
        <el-empty v-else description="没有找到相关内容" />
      </div>

      <div class="quick-links">
        <h3>快速链接</h3>
        <div class="links-grid">
          <el-button 
            v-for="(link, index) in quickLinks" 
            :key="index"
            :icon="link.icon"
            @click="handleQuickLink(link)"
          >
            {{ link.text }}
          </el-button>
        </div>
      </div>
    </div>

    <div class="search-suggestions" v-else>
      <h3>热门搜索</h3>
      <div class="tag-cloud">
        <el-tag
          v-for="(tag, index) in hotSearches"
          :key="index"
          :type="tag.type"
          class="mx-1"
          effect="plain"
          @click="searchQuery = tag.text"
        >
          {{ tag.text }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Close, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const loading = ref(false)
const results = ref([])

const quickLinks = [
  { text: '旅游攻略', icon: 'Ticket', path: '/travel' },
  { text: '美食推荐', icon: 'Food', path: '/food' },
  { text: '交通指南', icon: 'Location', path: '/transport' },
  { text: '购物指南', icon: 'ShoppingCart', path: '/shopping' }
]

const hotSearches = [
  { text: '维多利亚港', type: '' },
  { text: '地铁路线', type: 'info' },
  { text: '米其林餐厅', type: 'success' },
  { text: '海洋公园', type: 'warning' },
  { text: '购物中心', type: 'danger' }
]

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  // 模拟搜索请求
  setTimeout(() => {
    results.value = [
      {
        title: '搜索结果1',
        description: '描述文本...',
        icon: 'Document',
        path: '/result1'
      },
      // ... 更多结果
    ]
    loading.value = false
  }, 1000)
}

const handleResultClick = (result) => {
  router.push(result.path)
  emit('close')
}

const handleQuickLink = (link) => {
  router.push(link.path)
  emit('close')
}

defineEmits(['close'])
</script>

<style scoped>
.global-search {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
}

.search-content {
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-time) ease;
}

.result-item:hover {
  background: var(--page-background);
}

.result-info {
  flex: 1;
}

.result-info h3 {
  margin: 0 0 5px 0;
}

.result-info p {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 0.9em;
}

.quick-links {
  border-left: 1px solid var(--border-color);
  padding-left: 30px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .search-content {
    grid-template-columns: 1fr;
  }

  .quick-links {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
  }
}
</style> 