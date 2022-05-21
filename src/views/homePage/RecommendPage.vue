<script setup lang="ts" name="RecommendPage">
import { reactive, onMounted } from 'vue'
import request from '@/api'
import type { SongListData, Res } from '@/views/types'

const list: string[] = [
  '/swiperList/1.png',
  '/swiperList/2.png',
  '/swiperList/3.png',
  '/swiperList/4.png',
  '/swiperList/5.png',
  '/swiperList/6.png',
  '/swiperList/7.png',
  '/swiperList/8.png',
  '/swiperList/9.png',
  '/swiperList/10.png'
]

const recom = reactive<SongListData>({
  name: '每日推荐',
  picUrl: '/recommend/1.png',
  id: 0,
  playCount: 0,
  isShow: false
})
const songListData = reactive<SongListData[]>([])

const res = await request<any, Res>({
  url: '/personalized?limit=9',
  method: 'GET'
})

res.result &&
  res.result.forEach((item: any) => {
    songListData.push({
      name: item.name,
      picUrl: item.picUrl,
      id: item.id,
      playCount: item.playCount,
      isShow: false
    })
  })
songListData.forEach((item) => {
  if (item.playCount > 10000 && typeof item.playCount === 'number') {
    // 判断如果有小数则保留一位小数否则不保留小数直接在后面加上万
    item.playCount =
      item.playCount / 10000 > 10
        ? `${(item.playCount / 10000).toFixed(1)}万`
        : `${item.playCount / 10000}万`
  }
  if (item.playCount > 100000000 && typeof item.playCount === 'number') {
    item.playCount =
      item.playCount / 100000000 > 10
        ? `${(item.playCount / 100000000).toFixed(1)}亿`
        : `${item.playCount / 100000000}亿`
  }
})
</script>

<template>
  <div mr-8 mt-3 md:block hidden>
    <el-carousel :interval="4000" type="card" height="200px" w-full>
      <el-carousel-item v-for="item in list" :key="item" w-full h-full rounded-3>
        <img h-full w-full :src="item" alt="网络错误" />
      </el-carousel-item>
    </el-carousel>
    <div
      class="flex text-2xl hover:text-slate-500 cursor-pointer text-slate-600 mb-5"
      select="none"
    >
      推荐歌单
      <div text-4xl text-slate-400 i-ic-round-keyboard-arrow-right></div>
    </div>
    <div w-full flex flex-wrap h-160 justify-between mb>
      <div
        w="[calc(20%-1rem)]"
        h-60
        relative
        cursor-pointer
        mb
        @mouseenter="recom.isShow = !recom.isShow"
        @mouseleave="recom.isShow = !recom.isShow"
      >
        <transition>
          <div
            v-show="recom.isShow"
            w-5
            h-5
            md:w-10
            md:h-10
            absolute
            z-50
            bg-slate-100
            rounded-full
            ml="73%"
            mt="73%"
          >
            <div
              text-2xl
              absolute
              top-0
              left-0
              right-0
              bottom-0
              m-auto
              text-red-500
              i-ic-sharp-play-arrow
            ></div>
          </div>
        </transition>
        <div absolute w-full mx-auto inset-0>
          <img recommend-img rounded-2 overflow-hidden w-full :src="recom.picUrl" alt="" />
          <p mt-1>{{ recom.name }}</p>
        </div>
      </div>
      <div
        v-for="item in songListData"
        :key="item.id"
        w="[calc(20%-1rem)]"
        h-60
        relative
        mb-10
        cursor-pointer
        @mouseenter="item.isShow = !item.isShow"
        @mouseleave="item.isShow = !item.isShow"
      >
        <transition>
          <div
            v-show="item.isShow"
            md:w-10
            md:h-10
            h-5
            w-5
            absolute
            z-50
            bg-slate-100
            rounded-full
            ml="73%"
            mt="73%"
          >
            <div
              text-2xl
              absolute
              top-0
              left-0
              right-0
              bottom-0
              m-auto
              text-red-500
              i-ic-sharp-play-arrow
            ></div>
          </div>
        </transition>
        <div absolute top-2 right-2 z-10 flex items-center justify-between text-white>
          <div mr-1 text-xl i-ic-sharp-slow-motion-video></div>
          <div>{{ item.playCount }}</div>
        </div>
        <div absolute w-full mx-auto inset-0>
          <img recommend-img rounded-2 overflow-hidden w-full :src="item.picUrl" alt="" />
          <p mt-1>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <div md:hidden block>用电脑打开好吗,非要用就搜索吧</div>
</template>

<style scoped lang="scss">
.recommend-img {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
    z-index: 9;
    border-radius: 0.3125rem;
  }
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    border-radius: 0.3125rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 1.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
