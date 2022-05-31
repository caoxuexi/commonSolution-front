/**
 * 创建 `confirm` 方法，接收四个参数
 * @param {*} title 标题 （如果 没有title，那么content会作为第一个参数被传入）
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
import { h, ref } from 'vue'
import confirmComponent from './index.vue'
import { render } from 'vue'

export const confirm = (
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
) => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }
    // 关闭弹层事件
    const close = () => {
      render(null, document.body)
    }

    // 取消按钮事件
    const cancelHandler = () => {
      //处理.catch()按钮
      reject(new Error('取消按钮点击'))
    }

    // 确定按钮事件
    const confirmHandler = () => {
      //处理.then()的逻辑
      resolve()
    }

    // 1. vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })
    // 2. render
    render(vnode, document.body)
  })
}
