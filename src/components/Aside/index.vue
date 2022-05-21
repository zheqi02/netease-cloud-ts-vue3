<script setup lang="ts">
import { reactive } from 'vue'
import type { SongList } from '../types'
import { useRouter } from 'vue-router'
const router = useRouter()

const aList = reactive<SongList[]>([
  {
    name: '发现音乐',
    active: true
  },
  {
    name: '播客',
    active: false
  },
  {
    name: '视频',
    active: false
  },
  {
    name: '关注',
    active: false
  },
  {
    name: '直播',
    active: false
  },
  {
    name: '私人FM',
    active: false
  }
])

const bList = reactive<SongList[]>([
  {
    name: '本地与下载',
    active: false,
    icon: 'i-ic-round-download'
  },
  {
    name: '最近播放',
    active: false,
    icon: 'i-ic-round-alarm'
  },
  {
    name: '我的音乐云盘',
    active: false,
    icon: 'i-ic-round-cloud-done'
  },
  {
    name: '我的播客',
    active: false,
    icon: 'i-ic-twotone-queue-music'
  },
  {
    name: '我的收藏',
    active: false,
    icon: 'i-ic-round-star-border-purple500'
  }
])
const cList = reactive<SongList>({
  name: '我喜欢的音乐',
  active: false,
  icon: 'i-ic-outline-beach-access'
})
const dList = reactive<SongList[]>([
  {
    name: '我的收藏',
    active: false
  },
  {
    name: '我的收藏',
    active: false
  },
  {
    name: '我的收藏',
    active: false
  },
  {
    name: '我的收藏',
    active: false
  },
  {
    name: '我的收藏',
    active: false
  },
  {
    name: '我的收藏',
    active: false
  }
])

// 切换a菜单路由
const changeAItem = (index: number) => {
  // 重置所有菜单
  aList.forEach((item) => {
    item.active = false
  })
  bList.forEach((item) => {
    item.active = false
  })
  cList.active = false
  dList.forEach((item) => {
    item.active = false
  })
  // 切换当前菜单
  aList[index].active = !aList[index].active
}
// 切换b菜单路由
const changeBItem = (index: number) => {
  // 重置所有菜单
  aList.forEach((item) => {
    item.active = false
  })
  bList.forEach((item) => {
    item.active = false
  })
  cList.active = false
  dList.forEach((item) => {
    item.active = false
  })
  // 切换当前菜单
  bList[index].active = !bList[index].active
}
// 切换c菜单路由
const changeCItem = () => {
  // 重置所有菜单
  aList.forEach((item) => {
    item.active = false
  })
  bList.forEach((item) => {
    item.active = false
  })
  cList.active = false
  dList.forEach((item) => {
    item.active = false
  })
  // 切换当前菜单
  cList.active = !cList.active
}
// 切换d菜单路由
const changeDItem = (index: number) => {
  // 重置所有菜单
  aList.forEach((item) => {
    item.active = false
  })
  bList.forEach((item) => {
    item.active = false
  })
  cList.active = false
  dList.forEach((item) => {
    item.active = false
  })
  // 切换当前菜单
  dList[index].active = !dList[index].active
}

// 添加收藏歌单
const addSongList = () => {}

// 路由跳转
const routerSkip = (index: string) => {
  switch (index) {
    case '1-0':
      router.push({ name: 'homePage' })
      break
    case '1-1':
      router.push({ name: 'podcast' })
      break
    case '1-2':
      router.push({ name: 'videoPage' })
      break
    case '1-3':
      router.push({ name: 'followPage' })
      break
    case '1-4':
      router.push({ name: 'livePage' })
      break
    case '1-5':
      router.push({ name: 'personalFM' })
      break
    default:
      break
  }
}
</script>

<template>
  <el-scrollbar height="100%" w-full p-l-1 p-t-1>
    <el-menu
      :default-openeds="['3']"
      background-color="rgb(255, 255, 255)"
      default-active="2"
      class="el-menu-vertical-demo h-full w-full select-none overflow-hidden"
      active-text-color="none"
      @select="routerSkip"
    >
      <el-menu-item
        v-for="(item, index) in aList"
        :key="item.name"
        class="rounded menuItem"
        :class="{ activeBG: item.active }"
        :index="`1-${index}`"
        @click="changeAItem(index)"
        ><span :class="{ active: item.active }">{{ item.name }}</span>
      </el-menu-item>
      <el-menu-item-group title="我的音乐"></el-menu-item-group>
      <el-menu-item
        v-for="(item, index) in bList"
        :key="item.name"
        :class="{ activeBG: item.active }"
        class="rounded menuItem"
        :index="`2-${index}`"
        @click="changeBItem(index)"
      >
        <div flex items-center>
          <div :class="item.icon" mr-2 text-lg mt-1></div>
          {{ item.name }}
        </div>
      </el-menu-item>
      <el-sub-menu index="3" class="rounded relative">
        <template #title>
          <span>
            <p class="text-xs text-gray-400">创建的歌单</p>
          </span>
          <div class="z-10" @click.stop="addSongList">
            <div i-ic-outline-add-box absolute right-2 mt--9px hidden md:block w-5 h-5 border></div>
          </div>
        </template>
        <el-menu-item
          index="3-a"
          :class="{ activeBG: cList.active }"
          class="ml--22px rounded menuItem"
          @click="changeCItem()"
        >
          <div :class="cList.icon" mr-2></div>
          <span>{{ cList.name }}</span>
        </el-menu-item>
        <el-menu-item
          v-for="(item, index) in dList"
          :key="index"
          :class="{ activeBG: item.active }"
          class="ml--22px rounded menuItem"
          :index="`3-${index}`"
          @click="changeDItem(index)"
          ><div flex items-center>
            <div i-ic-twotone-catching-pokemon mr-2></div>
            {{ item.name }}
          </div></el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.active {
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 700;
}
.activeBG {
  background-image: -o-linear-gradient(top left, var(--tw-gradient-stops));
  background-image: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(var(--tw-gradient-stops))
  );
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
  --tw-gradient-from: rgba(167, 243, 208, var(--tw-from-opacity, 1));
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0));
  --tw-gradient-stops: var(--tw-gradient-from), rgba(252, 231, 243, var(--tw-via-opacity, 1)),
    var(--tw-gradient-to, rgba(255, 255, 255, 0));
  --tw-gradient-to: rgba(199, 210, 254, var(--tw-to-opacity, 1));
}
// 控制上下小箭头
:deep(.el-sub-menu > .el-sub-menu__title > .el-sub-menu__icon-arrow) {
  margin-right: 40px;
  display: none;
  @media (min-width: 768px) {
    & {
      display: block;
    }
  }
}
.menuItem:hover {
  background: none;
  background-image: -o-linear-gradient(top left, var(--tw-gradient-stops));
  background-image: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(var(--tw-gradient-stops))
  );
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
  --tw-gradient-from: rgba(167, 243, 208, var(--tw-from-opacity, 1));
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0));
  --tw-gradient-stops: var(--tw-gradient-from), rgba(252, 231, 243, var(--tw-via-opacity, 1)),
    var(--tw-gradient-to, rgba(255, 255, 255, 0));
  --tw-gradient-to: rgba(199, 210, 254, var(--tw-to-opacity, 1));
}
</style>
