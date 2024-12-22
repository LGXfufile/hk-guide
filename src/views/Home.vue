<template>
  <div class="home">
    <!-- 全屏轮播图 -->
    <el-carousel height="100vh" :interval="5000" arrow="always" indicator-position="none">
      <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
        <div class="carousel-content" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="carousel-overlay"></div>
          <div class="carousel-text">
            <h1>{{ item.title }}</h1>
            <p class="subtitle">{{ item.description }}</p>
            <el-button type="primary" size="large" round>了解更多</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <div class="nav-container">
        <div v-for="(item, index) in quickNavItems" :key="index" class="nav-item">
          <el-icon :size="32"><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>

    <!-- 分类展示区 -->
    <div v-for="(category, index) in mainCategories" 
         :key="index"
         class="category-section"
         :class="{ 'dark-bg': index % 2 === 0 }">
      <div class="category-content" :class="{ 'reverse': index % 2 === 0 }">
        <div class="category-text">
          <span class="category-label">{{ category.label }}</span>
          <h2>{{ category.title }}</h2>
          <p class="category-description">{{ category.description }}</p>
          <div class="feature-list">
            <div v-for="(feature, fIndex) in category.features" :key="fIndex" class="feature-item">
              <el-icon><component :is="feature.icon" /></el-icon>
              <span>{{ feature.text }}</span>
            </div>
          </div>
          <el-button type="primary" class="learn-more">
            了解更多
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
        <div class="category-image">
          <lazy-image :src="category.image" :alt="category.title" height="400px" />
        </div>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="recommendations-section">
      <div class="section-header">
        <h2 class="section-title">热门推荐</h2>
        <p class="section-subtitle">精选香港最受欢迎的景点、美食与体验</p>
      </div>

      <div class="recommendations-grid">
        <!-- 主推荐位 -->
        <div class="main-recommendation">
          <lazy-image :src="hotItems[0].image" :alt="hotItems[0].title" height="400px" />
          <div class="recommendation-content">
            <div class="recommendation-tag">必游景点</div>
            <h3>{{ hotItems[0].title }}</h3>
            <p>{{ hotItems[0].description }}</p>
            <el-button type="primary" round>查看详情</el-button>
          </div>
        </div>

        <!-- 次要推荐位 -->
        <div class="sub-recommendations">
          <div v-for="(item, index) in hotItems.slice(1)" 
               :key="index" 
               class="recommendation-card">
            <lazy-image :src="item.image" :alt="item.title" height="200px" />
            <div class="card-content">
              <div class="card-tags">
                <el-tag size="small" :type="item.tagType">{{ item.tag }}</el-tag>
                <el-tag size="small" effect="plain">{{ item.category }}</el-tag>
              </div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
              <div class="card-footer">
                <span class="price" v-if="item.price">¥{{ item.price }}起</span>
                <el-button link type="primary">
                  了解更多
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { IMAGES } from '../constants/images'
import LazyImage from '../components/LazyImage.vue'

// 快速导航数据
const quickNavItems = ref([
  { title: '景点门票', icon: 'Ticket' },
  { title: '美食推荐', icon: 'Food' },
  { title: '交通指南', icon: 'Location' },
  { title: '购物指南', icon: 'ShoppingBag' }
])

// 轮播图数据
const carouselItems = ref([
  {
    title: '探索香港',
    description: '体验东方之珠的独特魅力',
    image: IMAGES.carousel[0].image
  },
  {
    title: '美食天堂',
    description: '感受地道港式美食文化',
    image: IMAGES.carousel[1].image
  },
  {
    title: '购物胜地',
    description: '尽情享受购物乐趣',
    image: IMAGES.carousel[2].image
  }
])

// 主要分类数据
const mainCategories = ref([
  {
    label: '探索香港',
    title: '独特的旅行体验',
    description: '从繁华都市到自然风光，香港处处充满惊喜',
    features: [
      { icon: 'Ticket', text: '景点门票' },
      { icon: 'Guide', text: '当地向导' },
      { icon: 'Camera', text: '摄影圣地' }
    ],
    image: IMAGES.categories[0].image
  },
  {
    label: '美食推荐',
    title: '舌尖上的香港',
    description: '探索米其林星级餐厅到地道街边小食',
    features: [
      { icon: 'Food', text: '特色美食' },
      { icon: 'Shop', text: '推荐餐厅' },
      { icon: 'Star', text: '米其林推荐' }
    ],
    image: IMAGES.categories[1].image
  }
])

// 热门推荐数据
const hotItems = ref([
  {
    title: '维多利亚港',
    description: '感受香港最标志性的海港风光，欣赏举世闻名的维港夜景',
    image: IMAGES.carousel[0].image,
    tag: '必看夜景',
    tagType: 'success',
    category: '景点'
  },
  {
    title: '香港迪士尼乐园',
    description: '亚洲首个迪士尼乐园，体验奇妙刺激的主题游乐设施',
    image: IMAGES.carousel[1].image,
    tag: '主题乐园',
    tagType: 'warning',
    category: '娱乐',
    price: 639
  },
  {
    title: '米其林星级餐厅',
    description: '品味香港顶级美食，感受独特的饮食文化',
    image: IMAGES.carousel[2].image,
    tag: '美食',
    tagType: 'danger',
    category: '餐厅'
  }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* 轮播图样式 */
.carousel-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.carousel-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  width: 80%;
  max-width: 800px;
}

.carousel-text h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

/* 快速导航样式 */
.quick-nav {
  background: white;
  padding: 40px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-item:hover {
  transform: translateY(-5px);
}

/* 分类展示区样式 */
.category-section {
  padding: 100px 0;
}

.dark-bg {
  background: #f8f9fa;
}

.category-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
  padding: 0 20px;
}

.category-content.reverse {
  flex-direction: row-reverse;
}

.category-text {
  flex: 1;
}

.category-label {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(64, 158, 255, 0.1);
  color: var(--el-color-primary);
  border-radius: 20px;
  margin-bottom: 20px;
}

.category-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.category-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-image {
  flex: 1;
}

/* 热门推荐样式 */
.recommendations-section {
  padding: 100px 20px;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--el-color-primary), #36cfc9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  color: #666;
  font-size: 1.2rem;
}

.recommendations-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.main-recommendation {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  grid-row: span 2;
}

.recommendation-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.recommendation-tag {
  display: inline-block;
  padding: 6px 12px;
  background: var(--el-color-primary);
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.sub-recommendations {
  display: grid;
  gap: 20px;
}

.recommendation-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 20px;
}

.card-tags {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f56c6c;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-text h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .nav-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-content {
    flex-direction: column;
    gap: 30px;
  }

  .category-content.reverse {
    flex-direction: column;
  }

  .recommendations-grid {
    grid-template-columns: 1fr;
  }

  .main-recommendation {
    grid-row: span 1;
  }

  .feature-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .carousel-text h1 {
    font-size: 2rem;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }
}
</style> 