<script setup lang="ts" name="HomePage">
import { defineAsyncComponent } from 'vue'

const RecommendPage = defineAsyncComponent(() => import('@/views/homePage/RecommendPage.vue'))
</script>

<template>
  <el-scrollbar class="main w-full h-full block">
    <div class="flex">
      <!-- 左留白 -->
      <div class="left-side h-full w-1/6 overflow-hidden"></div>
      <!-- 主要代码从这里开始，中间内容部分 -->
      <div class="content w-2/3">
        <el-tabs class="demo-tabs mt-2 h-full ml-8">
          <el-tab-pane label="个性推荐">
            <Suspense>
              <template #default>
                <RecommendPage />
              </template>
              <template #fallback> loading... </template>
            </Suspense>
          </el-tab-pane>
          <el-tab-pane label="专属定制">Config</el-tab-pane>
          <el-tab-pane label="歌单">Role</el-tab-pane>
          <el-tab-pane label="排行榜">Task</el-tab-pane>
          <el-tab-pane label="歌手">Task</el-tab-pane>
          <el-tab-pane label="最新音乐">Task</el-tab-pane>
        </el-tabs>
      </div>
      <!-- 右留白 -->
      <div class="right-side h-full w-1/6 overflow-hidden"></div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -1;
  }
}
.content {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: rgba(0, 0, 0, 0.05);
}
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}
:deep(.el-tabs__active-bar) {
  background-color: #ec4141;
}
:deep(.is-active) {
  color: #ec4141;
  font-weight: 800;
  font-size: large;
}
:deep(.el-tabs__item:hover) {
  color: #ec4141;
}
</style>
