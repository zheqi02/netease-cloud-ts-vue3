<script setup lang="ts">
import HeaderVue from '@/components/Header/index.vue'
import FooterVue from '@/components/Footer/index.vue'
import AsideVue from '@/components/Aside/index.vue'
import ShowMusicPage from '@/components/ShowMusicPage/index.vue'
import { useShowMusic } from '@/store/modules/useShowMusic'

const store = useShowMusic()
</script>

<template>
  <div box-border h-full overflow-hidden relative>
    <header border-b-1 border-light-800 h-60px><HeaderVue /></header>
    <div h="[calc(100%-130px)]" overflow-hidden flex>
      <aside w="200px" overflow-x-hidden><AsideVue /></aside>
      <main border-l-1 border-light-800 w-full><RouterView /></main>
    </div>
    <ShowMusicPage v-if="store.isShowPlayPage" />
    <footer border-t-1 border-light-800 h-70px><FooterVue /></footer>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
