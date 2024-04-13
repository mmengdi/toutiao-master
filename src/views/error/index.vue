<template>
  <div class="error-page-container">
    <div class="error-content">
      <div class="image-container">
        <img src="@/assets/images/404.png" alt="404 Image" class="full-width">
        <div class="absolute-center">
          <img src="@/assets/images/yuque.png" alt="Yuque Image" class="yuque-image">
          <h3 class="error-title">糟糕，页面迷路了</h3>
          <p class="error-message">您访问的页面可能已失效或被删除</p>

          <router-link to="/">
            <span class="return-home">返回首页</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.error-page-container {
  min-width: 1200px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;

  .error-content {
    display: flex;
    background-color: #f5f5f7;
    width: 50%;
    border-radius: 15px;
    overflow: hidden;

    .image-container {
      position: relative;

      .full-width {
        width: 100%;
      }

      .absolute-center {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .yuque-image {
        width: 500px;
      }

      .error-title {
        font-size: 28px;
        margin: 10px 0;
        font-weight: 500;
        text-align: center;
      }

      .error-message {
        color: #8a8f8d;
        font-size: 16px;
        text-align: center;
      }

      .return-home {
        margin-top: 50px;
        font-size: 14px;
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--base);
      }
    }
  }
}
</style>
