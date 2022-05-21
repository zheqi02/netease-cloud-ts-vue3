<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'
import { useShowMusic } from '@/store/modules/useShowMusic'
import { useDebounceFn } from '@vueuse/core'

import type { LoopMode } from '../types'

const showPlayList = $ref<boolean>(false)
const store = useShowMusic()
const picHover = $ref<boolean>(false)
const isWord = $ref<boolean>(false)
const loopModeList = reactive<LoopMode[]>([
  {
    dataIcon: 'i-ic-sharp-playlist-add-check',
    dataInline: false,
    isShow: true,
    title: '顺序播放'
  },
  {
    dataIcon: 'i-ic-round-loop',
    dataInline: false,
    isShow: false,
    title: '列表循环'
  },
  {
    dataIcon: 'i-ic-outline-looks-one',
    dataInline: false,
    isShow: false,
    title: '单曲循环'
  },
  {
    dataIcon: 'i-ic-round-manage-history',
    dataInline: false,
    isShow: false,
    title: '随机播放'
  }
])

const handleClickLoopModeIcon = (index: number) => {
  loopModeList[index].isShow = false
  if (index === loopModeList.length - 1) {
    loopModeList[0].isShow = true
    store.loopMode = loopModeList[0].title
  } else {
    loopModeList[index + 1].isShow = true
    store.loopMode = loopModeList[index + 1].title
  }
}
const showMusic = () => {
  store.isShowPlayPage = !store.isShowPlayPage
}

const airborne = useDebounceFn((val) => {
  store.musicDom.currentTime = (store.musicDom.duration * val) / 100
}, 100)
document.addEventListener('resize', airborne)

const play = () => {
  store.isPlay = true
  store.play()
}

const pause = () => {
  store.isPlay = false
  store.pause()
}
</script>

<template>
  <div class="flex justify-between items-center h-full w-full" overflow-hidden>
    <div class="footer-left">
      <div flex ml-2>
        <div
          class="song-pic relative select-none"
          w-20
          @mouseenter="picHover = !picHover"
          @mouseleave="picHover = !picHover"
          @click="showMusic"
        >
          <img
            w-full
            :class="{ picDim: picHover }"
            src="https://s3.bmp.ovh/imgs/2022/04/30/f4e7235e4e053fa8.jpg"
          />
          <div
            v-show="picHover"
            title="展开歌曲详情页"
            class="song-pic-hover absolute top-0 left-0 text-xl text-white text-center"
          >
            <el-icon>
              <arrow-up />
            </el-icon>
          </div>
        </div>
        <div class="lyric ml-3 mt-2 whitespace-nowrap overflow-ellipsis">
          <p class="songName text-base">素颜</p>
          <p class="singer text-xs">许嵩<span class="mx-1">/</span>何曼婷</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--mdi"
          width="23"
          height="23"
          mt-2
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="w-1/3 footer-mid box-border">
      <div class="flex overflow-hidden justify-center box-border select-none items-center mt-2">
        <template v-for="(item, index) in loopModeList" :key="index">
          <div
            v-show="item.isShow"
            hidden
            md:block
            :title="item.title"
            @click="handleClickLoopModeIcon(index)"
          >
            <div
              class="iconify mt-2 mr-10 hover:text-red-500 cursor-pointer block"
              :class="item.dataIcon"
            ></div>
          </div>
        </template>
        <div
          title="上一首"
          class="text-2xl md:mr-10 mt-2 cursor-pointer hover:text-red-500"
          i-ic-round-skip-previous
          @click="store.prev()"
        ></div>
        <div class="play mt-2">
          <div
            v-show="!store.isPlay"
            title="播放"
            class="hover:bg-slate-200 relative text-2xl cursor-pointer border border-light-800 w-10 h-10 rounded-full"
            @click="play"
          >
            <div
              class="text-gray-500 absolute top-0 bottom-0 left-0 right-0 iconify m-auto"
              i-ic-baseline-play-arrow
            ></div>
          </div>
          <div
            v-show="store.isPlay"
            title="暂停"
            class="hover:bg-slate-200 relative text-2xl cursor-pointer border-light-800 border w-10 h-10 rounded-full"
            @click="pause"
          >
            <div
              class="text-gray-500 absolute top-0 bottom-0 left-0 right-0 iconify m-auto"
              i-ic-baseline-pause
            ></div>
          </div>
        </div>
        <div
          title="下一首"
          class="iconify text-2xl md:ml-10 mt-2 cursor-pointer hover:text-red-500"
          i-ic-round-skip-next
          @click="store.next()"
        ></div>
        <span
          class="hidden md:block ml-10 mt-2 hover:text-red-500 cursor-pointer"
          :class="{ isWord: isWord }"
          @click="isWord = !isWord"
          >词</span
        >
      </div>
      <div class="slider-demo-block flex items-center" w-180 h-6 overflow-hidden mt="-5px">
        <span class="demonstration text-xs mr-5">{{ store.comTimes }}</span>
        <el-slider v-model="store.comTime" :show-tooltip="false" @input="airborne" />
        <span class="demonstration text-xs ml-5">{{ store.totalTime }}</span>
      </div>
    </div>
    <div class="footer-right">
      <div class="flex justify-around w-60 mr-8">
        <div class="hidden md:block text-red-500 lossless cursor-pointer h-5" cursor-pointer>
          无损
        </div>
        <div i-ic-round-record-voice-over text-2xl cursor-pointer></div>
        <div
          i-ic-round-playlist-play
          text-3xl
          cursor-pointer
          @click="showPlayList = !showPlayList"
        ></div>
        <teleport to="body">
          <ul
            v-show="showPlayList"
            top-15
            right-0
            absolute
            h="[calc(100%-130px)]"
            w-50
            bg-sky-200
            z-999
            p-2
          >
            <li
              v-for="(item, index) in store.songList"
              :key="index"
              h-10
              text-center
              leading-10
              w-full
              border
              mt
              cursor-pointer
              hover:bg-gray-200
              @click="store.init(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </teleport>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.song-pic {
  & > img {
    width: 3.75rem;
    height: 3.75rem;
    object-fit: cover;
    border-radius: 0.4375rem;
    z-index: 1;
    display: block;
  }
  & > .song-pic-hover {
    width: 3.75rem;
    height: 3.75rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.4375rem;
    z-index: 2;
    cursor: pointer;
    line-height: 3.75rem;
  }
}
.picDim {
  filter: blur(1px);
}
.isWord {
  color: red;
  position: relative;
  z-index: 1;
  &::after {
    content: '√';
    width: 10px;
    height: 10px;
    border: 1px solid rgba(255, 0, 0, 0.8);
    border-radius: 50%;
    position: absolute;
    text-align: center;
    line-height: 10px;
    font-size: 12px;
    transform: scale(0.9);
    bottom: -1px;
    right: -4px;
    z-index: 0;
    font-weight: 600;
  }
}
.lossless {
  border: 1px solid red;
  padding: 1px 4px 1px;
  font-size: 12px;
  border-radius: 5px;
}
</style>
