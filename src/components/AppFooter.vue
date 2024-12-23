<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 关于我们 -->
      <div class="footer-section">
        <h3>关于我们</h3>
        <p>提供最全面的香港生活、旅游、购物指南</p>
      </div>

      <!-- 快速链接 -->
      <div class="footer-section">
        <h3>快速链接</h3>
        <ul>
          <li><router-link to="/travel">旅游攻略</router-link></li>
          <li><router-link to="/life">生活指南</router-link></li>
        </ul>
      </div>

      <!-- 联系方式 -->
      <div class="footer-section">
        <h3>联系方式</h3>
        <div class="contact-list">
          <div class="contact-item">
            <el-icon><Message /></el-icon>
            <span>fufilever@163.com</span>
          </div>
          <div class="contact-item">
            <el-icon><Phone /></el-icon>
            <span>19357673662</span>
          </div>
        </div>
      </div>

      <!-- 关注我们 -->
      <div class="footer-section">
        <h3>关注我们</h3>
        <div class="social-icons">
          <div class="social-icon">
            <el-icon><Monitor /></el-icon>
          </div>
          <div class="social-icon">
            <el-icon><ChatDotRound /></el-icon>
          </div>
          <a href="https://www.xiaohongshu.com/user/profile/616422bc000000000202730a" 
             target="_blank" 
             rel="noopener noreferrer"
             class="social-icon social-link"
             title="访问小红书主页">
            <el-icon><Promotion /></el-icon>
          </a>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">
      <p>© 2024 香港指南. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { Message, Phone, Monitor, ChatDotRound, Promotion } from '@element-plus/icons-vue'
</script>

<style scoped>
.footer {
  background: #f8f9fa;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 0 20px;
}

.footer-section h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-section p {
  color: #666;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: var(--el-color-primary);
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.contact-item .el-icon {
  color: var(--el-color-primary);
}

.social-icons {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-icon .el-icon {
  font-size: 20px;
  color: #666;
}

.social-link {
  text-decoration: none;
}

.social-icon:hover {
  background: var(--el-color-primary);
  transform: translateY(-2px);
}

.social-icon:hover .el-icon {
  color: white;
}

.copyright {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #999;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style> 