<script setup lang="ts">
import { useShowMusic } from '@/store/modules/useShowMusic'
import { isRef, onMounted, reactive, watchEffect } from 'vue'
import request from '@/api'
const store = useShowMusic()

const { lyricList } = $(
  reactive<{ lyricList: Map<number, string> }>({
    lyricList: new Map()
  })
)

const getLyric = (id: number) => {
  return request<any, any>({
    url: `/lyric?id=${id}`,
    method: 'get'
  })
}

onMounted(async () => {
  if (store.songList.length < 1) return
  const {
    code,
    lrc: { lyric }
  } = await getLyric(store.songList[store.currentIndex]?.id)
  const lyricArr = lyric.split('\n')
  lyricArr.forEach((item: any) => {
    const idx = item.indexOf(']')
    if (idx > 0) {
      const time = item.substring(1, idx)
      const text = item.substring(idx + 1)
      const times = time.split(':')
      const min = parseInt(times[0]) * 60
      const sec = parseInt(times[1])
      const timeNum = min + sec
      lyricList.set(timeNum, text)
    }
  })
})

let nowLyr = $ref<string>('')
let count = $ref<number>(0)

watchEffect(() => {
  if (lyricList.get(Math.round(store.currentTime))) {
    nowLyr = lyricList.get(Math.round(store.currentTime))!
    count += 2
  }
})
</script>

<template>
  <div absolute w-full h="[calc(100%-70px)]" bg-white top-0 z-998 flex justify-around>
    <div w-200 h-200 border></div>
    <div w-200 h-200 border text-center>
      <ul mt-40 h-100 border overflow-hidden>
        <li
          v-for="(item, index) in lyricList.values()"
          :key="index"
          :style="{
            color: nowLyr === item ? 'red' : 'black',
            transform: `translateY(-${count}rem)`
          }"
          mt
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
