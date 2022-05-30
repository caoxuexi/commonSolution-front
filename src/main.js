import { createApp } from 'vue'
import App from './App.vue'
import './style/index.scss'
import router from './router'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import 'virtual:svg-icons-register'
import store from './store'
import useTheme from './utils/theme'
import mDirectives from './directives'

// 初始化主题
useTheme()

createApp(App)
  .use(router)
  .use(mLibs)
  .use(store)
  .use(mDirectives)
  .mount('#app')

useREM()
