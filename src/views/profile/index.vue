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
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
      border: 1px solid #b6c0c8;
    }
    .button:active {
      transform: scale(0.95);
    }
  }
}
</style>