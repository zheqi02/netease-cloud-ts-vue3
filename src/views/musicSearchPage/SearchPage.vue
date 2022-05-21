<script setup lang="ts">
import request from '@/api'
import { reactive, ref, watchEffect } from 'vue'
import { useShowMusic } from '@/store/modules/useShowMusic'

const store = useShowMusic()
const props = defineProps<{
  name: string
}>()

const getMusicList = (value: any) => {
  return request<any, any>({
    url: `/cloudsearch?keywords=${value}`,
    method: 'get'
  })
}

let { musicList } = $(
  reactive<any>({
    musicList: []
  })
)
watchEffect(async () => {
  musicList = (await getMusicList($$(props.name)))?.result?.songs ?? []
})

const playMusic = (pName: string, pID: number) => {
  store.getSong(pID, pName)
}
</script>

<template>
  <div border select-none>
    <ul>
      <li
        v-for="item in musicList"
        :key="item.id"
        hover:bg-gray-500
        cursor="pointer"
        @click="playMusic(item.name, item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
