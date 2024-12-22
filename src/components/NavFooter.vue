<template>
  <footer class="footer">
    <div class="footer-content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="6">
          <h3>关于我们</h3>
          <p>提供最全面的香港生活、旅游、购物指南</p>
        </el-col>
        <el-col :xs="24" :sm="6">
          <h3>快速链接</h3>
          <ul>
            <li v-for="(category, key) in categories" :key="key">
              <router-link :to="`/${key}`">{{ category.title }}</router-link>
            </li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="6">
          <h3>联系方式</h3>
          <ul>
            <li><el-icon><Message /></el-icon> contact@hkguide.com</li>
            <li><el-icon><Phone /></el-icon> +852 1234 5678</li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="6">
          <h3>关注我们</h3>
          <div class="social-icons">
            <el-button circle><el-icon><Platform /></el-icon></el-button>
            <el-button circle><el-icon><ChatDotRound /></el-icon></el-button>
            <el-button circle><el-icon><Share /></el-icon></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} 香港指南. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { categories } from '../data/categories'
</script>

<style scoped>
.footer {
  background-color: #f5f7fa;
  padding: 40px 0 20px;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h3 {
  margin-bottom: 20px;
  color: #303133;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #606266;
  text-decoration: none;
}

a:hover {
  color: #409EFF;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.footer-bottom {
  margin-top: 40px;
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #dcdfe6;
}
</style> 