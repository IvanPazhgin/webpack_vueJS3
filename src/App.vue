<template>
  <navbar></navbar>
  <div class="fullApp">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fullApp {
  padding: 20px;
}
</style>
