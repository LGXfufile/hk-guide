<template>
  <div class="category-page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ categoryData.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 分类头部 -->
    <div class="category-header" :style="{ backgroundImage: `url(${categoryData.image})` }">
      <div class="header-content">
        <el-icon :size="40"><component :is="categoryData.icon"/></el-icon>
        <h1>{{ categoryData.title }}</h1>
      </div>
    </div>

    <!-- 分类内容 -->
    <div class="category-content">
      <el-row :gutter="20">
        <el-col v-for="item in categoryData.items" 
                :key="item.title" 
                :xs="24" 
                :sm="12" 
                :md="8">
          <el-card class="item-card" shadow="hover">
            <template #header>
              <div class="item-header">
                <span>{{ item.title }}</span>
                <el-button type="primary" text>查看详情</el-button>
              </div>
            </template>
            <div class="item-content">
              <!-- 这里可以添加更多内容 -->
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categories } from '../data/categories'

const route = useRoute()
const categoryData = computed(() => categories[route.name.toLowerCase()])
</script>

<style scoped>
.category-page {
  max-width: 1200px;
  margin: 0 auto;
}

.category-header {
  height: 200px;
  background-size: cover;
  background-position: center;
  margin: 20px 0;
  border-radius: 8px;
  position: relative;
}

.header-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 8px;
}

.header-content h1 {
  margin-top: 10px;
}

.item-card {
  margin-bottom: 20px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-content {
  min-height: 100px;
}
</style> 