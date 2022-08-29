<template>
  <div class="my-container">
    keep-alive测试
    <button @click="counter += 1">Add 1</button>
    <p>The button above has been clicked {{ counter }} times.</p>
  </div>
</template>

<script>
  export default {
    name: 'My',
    components: {},
    data() {
      return {
        counter: 0,
      }
    },
    created() {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
