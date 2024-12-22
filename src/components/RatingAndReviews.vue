<template>
  <div class="rating-reviews">
    <!-- 评分部分 -->
    <div class="rating-section">
      <div class="rating-overview">
        <div class="average-rating">
          <span class="rating-number">{{ averageRating }}</span>
          <el-rate
            v-model="averageRating"
            disabled
            show-score
            text-color="#ff9900"
          />
          <span class="total-reviews">{{ totalReviews }}条评价</span>
        </div>
        <div class="rating-distribution">
          <div v-for="(count, stars) in ratingDistribution" 
               :key="stars" 
               class="rating-bar">
            <span>{{ stars }}星</span>
            <el-progress 
              :percentage="(count / totalReviews) * 100"
              :stroke-width="12"
              :show-text="false"
            />
            <span>{{ count }}</span>
          </div>
        </div>
      </div>
      
      <!-- 添加评价按钮 -->
      <el-button 
        type="primary" 
        @click="showReviewDialog = true"
        :disabled="!isLoggedIn"
      >
        写评���
      </el-button>
    </div>

    <!-- 评论列表 -->
    <div class="reviews-section">
      <div v-for="review in reviews" 
           :key="review.id" 
           class="review-item"
           :class="{ 'review-animate': true }"
      >
        <div class="review-header">
          <el-avatar :src="review.userAvatar" />
          <div class="review-info">
            <span class="reviewer-name">{{ review.userName }}</span>
            <el-rate
              v-model="review.rating"
              disabled
              size="small"
            />
          </div>
          <span class="review-date">{{ formatDate(review.date) }}</span>
        </div>
        <div class="review-content">{{ review.content }}</div>
        <div class="review-actions">
          <el-button 
            text 
            size="small" 
            @click="handleLike(review)"
            :class="{ 'liked': review.isLiked }"
          >
            <el-icon><ThumbsUp /></el-icon>
            {{ review.likes }}
          </el-button>
          <el-button 
            text 
            size="small" 
            @click="handleReply(review)"
          >
            <el-icon><ChatDotRound /></el-icon>
            回复
          </el-button>
        </div>
        <!-- 回复列表 -->
        <div v-if="review.replies && review.replies.length" class="review-replies">
          <div v-for="reply in review.replies" 
               :key="reply.id" 
               class="reply-item">
            <span class="reply-user">{{ reply.userName }}</span>
            <span class="reply-content">{{ reply.content }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 评价对话框 -->
    <el-dialog
      v-model="showReviewDialog"
      title="写评价"
      width="500px"
    >
      <el-form :model="newReview" label-width="80px">
        <el-form-item label="评分">
          <el-rate
            v-model="newReview.rating"
            show-text
            :texts="['很差', '较差', '一般', '较好', '很好']"
          />
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input
            v-model="newReview.content"
            type="textarea"
            :rows="4"
            placeholder="分享您的体验..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showReviewDialog = false">取消</el-button>
        <el-button type="primary" @click="submitReview">提交评价</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const props = defineProps({
  itemId: {
    type: String,
    required: true
  }
})

const isLoggedIn = ref(true) // 实际应用中需要从用户状态获取
const showReviewDialog = ref(false)
const averageRating = ref(4.5)
const totalReviews = ref(128)
const ratingDistribution = ref({
  5: 80,
  4: 30,
  3: 10,
  2: 5,
  1: 3
})

const reviews = ref([
  {
    id: 1,
    userName: '游客A',
    userAvatar: 'https://placeholder.com/50',
    rating: 5,
    content: '非常棒的体验！景色很美，服务很好。',
    date: new Date('2024-01-20'),
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 1,
        userName: '客服小王',
        content: '感谢您的好评！'
      }
    ]
  },
  // ... 更多评论
])

const newReview = ref({
  rating: 5,
  content: ''
})

const formatDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: zhCN })
}

const handleLike = (review) => {
  review.isLiked = !review.isLiked
  review.likes += review.isLiked ? 1 : -1
}

const handleReply = (review) => {
  // 实现回复功能
}

const submitReview = () => {
  // 实现提交评价功能
  showReviewDialog.value = false
  ElMessage.success('评价提交成功！')
}
</script>

<style scoped>
.rating-reviews {
  padding: 20px;
}

.rating-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.rating-overview {
  flex: 1;
  margin-right: 40px;
}

.average-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.rating-number {
  font-size: 36px;
  font-weight: bold;
  color: #ff9900;
}

.total-reviews {
  color: var(--text-color-secondary);
}

.rating-distribution {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-bar :deep(.el-progress) {
  width: 200px;
}

.review-item {
  border-bottom: 1px solid var(--border-color);
  padding: 20px 0;
  opacity: 0;
  transform: translateY(20px);
}

.review-animate {
  animation: slideIn 0.5s ease forwards;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.review-info {
  flex: 1;
}

.reviewer-name {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.review-date {
  color: var(--text-color-secondary);
  font-size: 0.9em;
}

.review-content {
  margin: 10px 0;
  line-height: 1.6;
}

.review-actions {
  display: flex;
  gap: 20px;
}

.liked {
  color: var(--primary-color);
}

.review-replies {
  margin-left: 50px;
  margin-top: 10px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.reply-item {
  padding: 5px 0;
}

.reply-user {
  font-weight: 500;
  margin-right: 10px;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .rating-section {
    flex-direction: column;
  }

  .rating-overview {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .rating-bar :deep(.el-progress) {
    width: 150px;
  }
}
</style> 