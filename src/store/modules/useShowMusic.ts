import { defineStore } from 'pinia'
import { storeName } from '../storeName'
import request from '@/api'

export const useShowMusic = defineStore(storeName.SHOW_MUSIC, {
  state: () => ({
    isPlay: false, // 是否播放
    loopMode: '', // 循环模式
    songList: [] as Array<{
      id: number
      name: string
      url: string
    }>, // 歌曲列表
    isShowPlayPage: false, // 是否显示播放页面
    musicDom: new Audio(), // 歌曲dom
    currentIndex: 0, // 当前播放歌曲索引
    currentTime: 0, // 当前播放时间
    duration: 0, // 歌曲总时长
    timer: null as any, // 定时器
    comTime: 0, // 当前播放进度
    comTimes: '00:00', // 播放时间
    totalTime: '00:00', // 歌曲总时长
    cKey: 0
  }),
  actions: {
    async getSong(id: number, name: string) {
      const { code, data } = await request({
        url: '/song/url',
        data: {
          id
        }
      })
      if (this.songList.some((item) => item.name === name)) return
      code === 200 &&
        this.songList.unshift({
          id,
          name,
          url: data[0].url
        })
      this.currentIndex = 0
      this.init()
    },
    init(index?: number) {
      if (index) {
        this.currentIndex = index
      }
      this.musicDom.src = this.songList[this.currentIndex]?.url
      this.musicDom.play()
      this.isPlay = true
      this.timer = setInterval(() => {
        this.currentTime = this.musicDom.currentTime
        this.duration = this.musicDom.duration
        if (this.currentTime === this.duration) {
          this.next()
        }
        this.comTime = Math.round((this.currentTime / this.duration) * 100)
        const minu = isNaN(Math.round(this.currentTime / 60))
          ? 0
          : Math.round(this.currentTime / 60)
        const sec = isNaN(Math.round(this.currentTime % 60)) ? 0 : Math.round(this.currentTime % 60)
        const totalMinu = isNaN(Math.round(this.duration / 60)) ? 0 : Math.round(this.duration / 60)
        const totalSec = isNaN(Math.round(this.duration % 60)) ? 0 : Math.round(this.duration % 60)
        this.comTimes = `${minu < 10 ? '0' + minu : minu}:${sec < 10 ? '0' + sec : sec}`
        this.totalTime = `${totalMinu < 10 ? '0' + totalMinu : totalMinu}:${
          totalSec < 10 ? '0' + totalSec : totalSec
        }`
      }, 1000)
    },
    play() {
      this.musicDom.play()
      this.isPlay = true
    },
    pause() {
      this.musicDom.pause()
      this.isPlay = false
      clearInterval(this.timer)
    },
    next() {
      this.currentIndex++
      if (this.currentIndex >= this.songList.length) this.currentIndex = 0
      this.musicDom.src = this.songList[this.currentIndex].url
      this.musicDom.play()
    },
    prev() {
      this.songList.length > 1 && this.currentIndex--
      this.musicDom.src = this.songList[this.currentIndex].url
      this.musicDom.play()
    }
  }
})
