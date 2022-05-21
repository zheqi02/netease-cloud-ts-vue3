<script setup lang="ts">
import { reactive } from 'vue'
import { Search, Microphone, UserFilled, ArrowDown } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import request from '@/api'
import { useRouter, useRoute } from 'vue-router'

import type { Options } from '@/components/types'

const router = useRouter()
const route = useRoute()
const options = reactive<Options[]>([])
let userName = $ref<string>('_未登录')
let value = $ref<string>('')
let showOptions = $ref<boolean>(false)

const getSearchList = () => {
  return request<any, any>({
    url: `/search/suggest?keywords=${value}`,
    method: 'get',
    interceptors: {
      requestInterceptors: (config: any) => {
        return config
      },
      responseInterceptors: (response: any) => {
        return response?.result?.songs
      }
    }
  })
}
const searchData = useDebounceFn(async () => {
  const data = await getSearchList()
  if (data) {
    data.forEach((item: any, index: number) => {
      options[index] = {
        id: item.id,
        name: item.name
      }
    })
  }
}, 300)
document.addEventListener('resize', searchData)
const toMusicPage = (name?: string) => {
  if (name) value = name
  router.push({
    name: 'musicSearchPage',
    params: {
      name: value
    }
  })
}
const focusout = () => {
  setTimeout(() => {
    showOptions = false
  }, 200)
}
</script>

<template>
  <div flex class="home-header pl-2 justify-between h-full items-center" pr-4>
    <div class="left-header flex items-center">
      <div class="logo">
        <div text-white mt-1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="iconify iconify--ri"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.421 11.375c-.294 1.028.012 2.064.784 2.653c1.061.81 2.565.3 2.874-.995c.08-.337.103-.722.027-1.056c-.23-1.001-.52-1.988-.792-2.996c-1.33.154-2.543 1.172-2.893 2.394zm5.548-.287c.273 1.012.285 2.017-.127 3c-1.128 2.69-4.721 3.14-6.573.826c-1.302-1.627-1.28-3.961.06-5.734c.78-1.032 1.804-1.707 3.048-2.054l.379-.104c-.084-.415-.188-.816-.243-1.224c-.176-1.317.512-2.503 1.744-3.04c1.226-.535 2.708-.216 3.53.76c.406.479.395 1.08-.025 1.464c-.412.377-.996.346-1.435-.09c-.247-.246-.51-.44-.877-.436c-.525.006-.987.418-.945.937c.037.468.173.93.3 1.386c.022.078.216.135.338.153c1.334.197 2.504.731 3.472 1.676c2.558 2.493 2.861 6.531.672 9.44c-1.529 2.032-3.61 3.168-6.127 3.409c-4.621.44-8.664-2.53-9.7-7.058c-.945-4.144 1.38-8.568 5.335-10.149c.586-.234 1.143-.031 1.371.498c.232.537-.019 1.086-.61 1.35c-2.368 1.06-3.817 2.855-4.215 5.424c-.533 3.433 1.656 6.776 5 7.72c2.723.77 5.658-.166 7.308-2.33c1.586-2.08 1.4-5.099-.427-6.873a3.979 3.979 0 0 0-1.823-1.013c.198.716.389 1.388.57 2.062z"
            ></path>
          </svg>
        </div>
        <p
          md:text-2xl
          text-lg
          class="logo-font text-center overflow-ellipsis w-10 md:w-40 font-serif whitespace-nowrap"
        >
          网抑云音乐
        </p>
      </div>
      <div class="search md:ml-14 ml--24 relative">
        <input
          v-model="value"
          type="text"
          class="outline-none border-none w-55 h-9"
          text-white
          text-xs
          @focus="showOptions = !showOptions"
          @focusout="focusout"
          @keyup.enter="toMusicPage()"
          @input="searchData"
        />
        <el-icon absolute left-3 top-2 text-xl text-white opacity-70 @click="toMusicPage">
          <search />
        </el-icon>
        <ul v-if="showOptions" class="options absolute z-99 list-none m-0 p-0">
          <li
            v-for="(item, index) in options"
            :key="index"
            list-none
            m-0
            h-10
            hover:bg-light-700
            @click="toMusicPage(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <el-button text-white class="voice" border-0 ml-3 mt-1 :icon="Microphone" circle />
    </div>
    <div class="right-header flex items-center md:mr-20" ml-5 md:ml-0>
      <div class="cursor-pointer">
        <el-avatar :icon="UserFilled" />
      </div>
      <el-dropdown trigger="click" class="ml-3">
        <span class="el-dropdown-link text-white cursor-pointer select-none">
          {{ userName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div class="dynamic"></div>
            </el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 14.375rem;
  height: 2.5rem;
  display: flex;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
  & .logo-font {
    line-height: 2.5rem;
    font-weight: 500;
    text-shadow: rgba(0, 0, 0, 0.05) 1px 0 10px;
    color: white;
  }
}
.home-header {
  border-bottom: 1px solid #e6e6e6;
  background-color: #ec4141;
}
.search {
  position: relative;
  box-sizing: border-box;
  input {
    border-radius: 1.25rem;
    padding-left: 2.5rem;
    box-shadow: none;
    background: rgba(166, 24, 24, 0.2);
  }
  ul {
    padding: 0.1875rem 0.3125rem 0;
  }
  ul > li {
    border-bottom: 1px solid #ccc;
  }
  ul > li:last-child {
    border-bottom: none;
  }
}
.options {
  width: 13.75rem;
  border: none;
  background-color: white;
  border-radius: 0.3125rem;
}
.voice {
  background-color: rgba(166, 24, 24, 0.2);
}
</style>
