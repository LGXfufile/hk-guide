import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    currentTheme: 'default',
    themes: {
      default: {
        primary: '#409EFF',
        secondary: '#79bbff',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399',
        background: '#ffffff',
        textPrimary: '#303133',
        textSecondary: '#606266',
      },
      dark: {
        primary: '#409EFF',
        secondary: '#79bbff',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399',
        background: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#909399',
      }
    }
  }),
  
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
      this.currentTheme = this.isDark ? 'dark' : 'default'
      this.applyTheme()
    },
    
    applyTheme() {
      const theme = this.themes[this.currentTheme]
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
      document.documentElement.classList.toggle('dark', this.isDark)
    }
  }
}) 