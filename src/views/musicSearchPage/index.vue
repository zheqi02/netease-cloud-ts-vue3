<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const SearchPage = defineAsyncComponent(() => import('./SearchPage.vue'))

const route = useRoute()
</script>

<template>
  <el-scrollbar class="main w-full h-full block">
    <div class="flex">
      <div class="left-side h-full w-1/6 overflow-hidden"></div>
      <div class="content w-2/3 pl-2">
        <Suspense>
          <template #default>
            <SearchPage :name="(route.params.name as string)" />
          </template>
          <template #fallback> loding... </template>
        </Suspense>
      </div>
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
</style>
