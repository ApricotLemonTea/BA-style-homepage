<script setup>

</script>

<template>
  <div class="profile-container">
    <div class="id-card"></div>
    <div class="button-block">
      <div class="button"></div>
      <div class="button"></div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  background-color: #c0ffbb;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  .id-card {
    background-color: white;
    width: 60vw;
    height: 70vh;
    margin-left: 7vw;
  }

  .button-block {
    background-color: #ffbeaf;
    height: 70vh;
    margin-left: 7vw;

    .button {
      background-color: #fcd3ff;
      width: 20vw;
      height: 10vh;
      margin-top: 3vh;
    }
  }
}
</style>