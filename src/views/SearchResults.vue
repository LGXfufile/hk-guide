<template>
  <div class="search-results">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="results-header">
      <h2>搜索结果: "{{ query }}"</h2>
      <p>找到 {{ filteredResults.length }} 个结果</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="24" v-for="result in filteredResults" :key="result.link">
        <el-card class="result-card" shadow="hover">
          <h3>{{ result.title }}</h3>
          <p class="category-tag">
            <el-tag size="small">{{ result.category }}</el-tag>
          </p>
          <el-button type="primary" link @click="router.push(result.link)">
            查看详情
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories } from '../data/categories'

const route = useRoute()
const router = useRouter()
const query = computed(() => route.query.q || '')

const filteredResults = computed(() => {
  const results = []
  const searchQuery = query.value.toLowerCase()
  
  Object.entries(categories).forEach(([categoryKey, category]) => {
    category.items.forEach(item => {
      if (item.title.toLowerCase().includes(searchQuery)) {
        results.push({
          ...item,
          category: category.title
        })
      }
    })
  })
  
  return results
})
</script>

<style scoped>
.search-results {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.results-header {
  margin: 20px 0;
}

.result-card {
  margin-bottom: 20px;
}

.category-tag {
  margin: 10px 0;
}
</style> 