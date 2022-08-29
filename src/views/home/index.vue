<template>
  <div class="home-container">
    <van-image round fit="cover" :src="avatar" class="head-img" />
    <p>{{ username }}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    created() {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .head-img {
      height: 100px;
      width: 100px;
    }

    p {
      margin-top: 10px;
      font-size: 30px;
      font-weight: bold;
    }
  }
</style>
