// webpack entry server
// server端也会创建新的app实例, 但是只会进行
import { createApp } from './app'

export default context => {
  const { app } = createApp()
  return app
}