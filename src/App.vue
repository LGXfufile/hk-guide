<template>
  <div class="app-container" :class="{ 'dark': isDark }">
    <!-- 修改加载状态显示 -->
    <div class="initial-loading" v-if="initialLoading">
      <div class="loading-content">
        <el-progress
          type="dashboard"
          :percentage="loadingProgress"
          :stroke-width="6"
          :width="120"
          :show-text="false"
        >
          <template #default>
            <div class="progress-label">
              <div class="progress-text">加载中</div>
              <div class="progress-value">{{ Math.round(loadingProgress) }}%</div>
            </div>
          </template>
        </el-progress>
      </div>
    </div>

    <el-config-provider :locale="locale" v-show="!initialLoading">
      <el-container>
        <el-header>
          <nav-header />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <el-footer>
          <nav-footer />
        </el-footer>
      </el-container>
      <back-to-top />
    </el-config-provider>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import NavHeader from './components/NavHeader.vue'
import NavFooter from './components/NavFooter.vue'
import BackToTop from './components/BackToTop.vue'

const locale = zhCn
const isDark = ref(false)
const initialLoading = ref(true)
const loadingProgress = ref(0)

// 提供全局加载状态控制
provide('setLoadingProgress', (progress) => {
  loadingProgress.value = progress
})

provide('setInitialLoading', (value) => {
  initialLoading.value = value
})

// 添加超时处理
onMounted(() => {
  // 如果 5 秒后还在加载，就强制结束加载状态
  setTimeout(() => {
    if (initialLoading.value) {
      initialLoading.value = false
      console.warn('Loading timeout, forcing completion')
    }
  }, 5000)

  // 模拟初始加载进度
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 20
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      setTimeout(() => {
        initialLoading.value = false
      }, 500)
    }
    loadingProgress.value = progress
  }, 200)
})
</script>

<style>
.app-container {
  min-height: 100vh;
}

.initial-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
}

.progress-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.progress-text {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.progress-value {
  font-size: 20px;
  font-weight: bold;
  color: var(--el-color-primary);
}

.el-header {
  padding: 0;
  height: auto;
}

.el-main {
  padding: 0;
  background-color: #f5f7fa;
}

.el-footer {
  padding: 0;
  height: auto;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 暗色主题 */
.dark {
  background: #1a1a1a;
  color: #fff;
}

.dark .initial-loading {
  background: #1a1a1a;
}

.dark .progress-text {
  color: #909399;
}

.dark .progress-value {
  color: var(--el-color-primary);
}
</style> 