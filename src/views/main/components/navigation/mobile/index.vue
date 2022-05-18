<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <!-- 添加ref -->
    <ul
      class="
        relative
        flex
        overflow-x-auto
        p-1
        text-xs text-zinc-600
        overflow-hidden
      "
      ref="ulTarget"
    >
      <!-- category item -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        :class="{
          'text-zinc-100': currentCategoryIndex === index
        }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>

      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- 汉堡按钮 添加点击事件-->
      <li
        class="
          z-20
          fixed
          top-0
          right-[-1px]
          h-4
          px-1
          flex
          items-center
          bg-white
          shadow-l-white
        "
        @click="onShowPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
    </ul>
    <m-popup v-model="isOpenPopup">
      <menu-vue :categorys="data" @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUpdate } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 选中的 item 下标
const currentCategoryIndex = ref(0)
// 获取填充的所有 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

//在数据发生改变之后，到DOM变化之前被触发
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
//x变量是x轴的滚动距离，x:后面的ulScrollLeft是对x起的别名
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 为 sliderStyle 设置属性
  sliderStyle.value = {
    // 滑块位置 = ul 横向滚动位置 + 当前元素的 left 偏移量 - 当前元素的padding
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})

// item 点击事件
const onItemClick = (index) => {
  currentCategoryIndex.value = index
  isOpenPopup.value = false
}

// popup 展示
const isOpenPopup = ref(false)
const onShowPopup = () => {
  isOpenPopup.value = true
}
</script>