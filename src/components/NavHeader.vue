<template>
  <div class="nav-header" :class="{ 'nav-scrolled': scrolled }">
    <el-menu mode="horizontal" router :background-color="menuBg" text-color="#333">
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        香港指南
      </el-menu-item>
      
      <div class="flex-grow" />
      
      <el-menu-item index="/travel">
        <el-icon><Ticket /></el-icon>
        旅游攻略
      </el-menu-item>
      <el-menu-item index="/life">
        <el-icon><Service /></el-icon>
        生活指南
      </el-menu-item>
      <el-menu-item index="/shopping">
        <el-icon><ShoppingBag /></el-icon>
        购物指南
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuBg = ref('transparent')

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  menuBg.value = scrolled.value ? '#fff' : 'transparent'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.el-menu {
  border: none !important;
}

.flex-grow {
  flex-grow: 1;
}

:deep(.el-menu-item) {
  font-size: 1.1rem;
}
</style> 