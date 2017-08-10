// webpack entry client, 客户端的入口除了负责创建一个渲染实例, 还要将实例
// 挂载到dom上进行vue的客户端交互
import { createApp } from './app'

const { app } = createApp()

app.$mount('#app')