<template>
  <van-tabbar v-model="active" fixed route @change="handleChange">
    <van-tabbar-item
      v-for="(item, index) in data"
      :key="index"
      :to="item.to"
      :icon="item.icon"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: 'TabBar',
    components: {},
    props: {
      defaultActive: {
        type: Number,
        default: 0,
      },
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data() {
      return { active: this.defaultActive }
    },
    created() {},
    mounted() {},
    methods: {
      handleChange(value) {
        this.$emit('change', value)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
