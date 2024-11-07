<script setup>

</script>

<template>
  <div class="profile-container">
    <div class="id-card"></div>
    <div class="button-block blue-text-color">
      <div class="button">プロフィール</div>
      <div class="button">オリキャラ</div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
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
    height: 70vh;
    margin-left: 7vw;

    .button {
      background-color: white;
      width: 20vw;
      height: 8vh;
      margin-top: 3vh;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3.5vh;
    }
    .button:active {
      transform: scale(0.95);
    }
  }
}
</style>