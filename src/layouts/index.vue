<template>
  <div class="layout-container">
    <div class="layout-content">
      <transition mode="out-in" name="fade-transform">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </transition>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabBar" @change="handleChange" />
    </div>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'

  export default {
    name: 'Layouts',
    components: { TabBar },
    data() {
      return {
        tabBar: [
          {
            title: '首页',
            to: {
              name: 'Home',
            },
            icon: 'home-o',
          },
          {
            title: '关于我',
            to: {
              name: 'My',
            },
            icon: 'user-o',
          },
        ],
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleChange(v) {
        console.log('tab value:', v)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .layout-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .layout-content {
      flex: 1;
      width: 100%;
    }

    .layout-footer {
      flex: 0 50px;
      height: 50px;
      width: 100%;
    }
  }
</style>
