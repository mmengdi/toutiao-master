<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElNotification } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import vSlideIn from '@/utils/vSlideIn'

// 隐藏第一页的导航栏
const showHeader = ref(false);
const handleScroll = () => {
  const firstScreenBottom = document.querySelector('.first-screen')?.getBoundingClientRect().bottom;
  if (firstScreenBottom !== undefined) {
    showHeader.value = firstScreenBottom <= 0;
  }
};
// 点击按钮播放视频声音
const videoRef = ref<HTMLVideoElement | null>(null);
const isMuted = ref<boolean>(true);
// 点击静音图标切换有声音的图标
const isSecondSvg = ref(false);
const toggleMute = () => {
  isSecondSvg.value = !isSecondSvg.value;
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
    isMuted.value = videoRef.value.muted;
  }
};

// 滑动查看更多
const mouseRef = ref<HTMLElement | null>(null);
const animateScroll = () => {
  const mouse = mouseRef.value;
  if (mouse) {
    mouse.animate([
      { transform: 'translateY(0px)' },
      { transform: 'translateY(15px)' },
      { transform: 'translateY(0px)' }
    ], {
      duration: 2000,
      iterations: Infinity
    });
  }
};
const scrollToNextPage = () => {
  const nextPage = document.querySelector('.group-source');
  if (nextPage) {
    nextPage.scrollIntoView({ behavior: 'smooth' });
  }
};

// 登录
const login = () => {
  ElNotification({
    title: '恭喜您',
    message: '登录成功！',
    type: 'success',
  })
}

// 内容多平台分发 视频动画
const currentHoverIndex = ref<number | null>(null);
const currentPhoneContainerClass = ref('toutiao');
const changePhoneContainer = (index: number) => {
  currentHoverIndex.value = index;
  switch (index) {
    case 0:
      currentPhoneContainerClass.value = 'toutiao';
      break;
    case 1:
      currentPhoneContainerClass.value = 'xigua';
      break;
    case 2:
      currentPhoneContainerClass.value = 'dongchedi';
      break;
    case 3:
      currentPhoneContainerClass.value = 'wukong';
      break;
    default:
      break;
  }
};

// tab切换
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

onMounted(() => {
  const swiperWrapper = document.querySelector('.swiper-wrapper') as HTMLElement;
  const swiperSlides = document.querySelectorAll('.swiper-slide') as NodeListOf<HTMLElement>;
  let currentPosition = 0;
  const scrollSpeed = 5; // 滚动速度，可以根据需要调整
  let slideWidth = 0; // 单个图片宽度

  // 获取单个图片宽度，这里假设所有图片宽度相同
  if (swiperSlides.length > 0) {
    slideWidth = swiperSlides[0].offsetWidth;
  }

  const scrollInterval = setInterval(() => {
    currentPosition -= scrollSpeed;
    swiperWrapper.style.transition = 'none'; // 移除过渡效果
    swiperWrapper.style.transform = `translateX(${currentPosition}px)`;

    // 到达末尾时，立即返回到起始位置
    if (currentPosition <= -swiperWrapper.offsetWidth + slideWidth) {
      currentPosition = 0;
      swiperWrapper.style.transition = 'none'; // 移除过渡效果
      swiperWrapper.style.transform = `translateX(${currentPosition}px)`;
    }

    swiperSlides.forEach((slide,) => {
      const slideOffset = slide.offsetLeft;

      if (slideOffset <= swiperWrapper.offsetWidth / 2 && slideOffset + slideWidth >= swiperWrapper.offsetWidth / 2) {
        slide.style.transform = 'scale(1)';
      } else {
        slide.style.transform = 'scale(0.8)';
      }
    });
  }, 50); // 滚动间隔，可以根据需要调整

  window.addEventListener('scroll', handleScroll);
  animateScroll();
  // 当组件销毁时清除定时器
  onUnmounted(() => {
    clearInterval(scrollInterval);
    window.removeEventListener('scroll', handleScroll);
  });
});


// top-author切换
const content = ref('content1');

const toggleContent = () => {
  content.value = content.value === 'content1' ? 'content2' : 'content1';
};



</script>

<template>
  <div class="page-container">
    <div class="login-header" :class="{ 'show-header': showHeader }">
      <a class="logo" aria-label="今日头条徽标" href="/" rel="nofollow"></a>
      <div class="btn-wrapper">
        <div class="register-btn">
          <el-popover placement="bottom" :width="200" trigger="hover" content="系统维护中，暂时无法注册">
            <template #reference>
              <el-button disabled>
                注册
              </el-button>
            </template>
          </el-popover>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="login">
            登录
          </el-button>
        </div>
      </div>
    </div>
    <div class="first-screen">
      <div class="video-wrapper">
        <video autoplay preload="preload" loop :muted="isMuted" ref="videoRef"
          src="@/assets/images/video/welcome-video.mp4" poster="@/assets/images/welcome-video-poster-v2.png"
          class="video">
        </video>
      </div>
      <div class="first-screen-logo">
        <svg width="79" height="27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M78.848 12.644v3.133H61.736l-.576 2.014h16.76v1.828l-1.669 7.233H59.375V23.45h13.581l.522-2.259H56.594v-1.7l1.063-3.715h-3.845v-3.133h25.036zM41.42 13.843v1.934h10.507v3.401H41.42v7.674h-4.08v-7.674H26.891v-3.401H37.34v-1.934h4.08zM18.104.85c-.101 7.245-.24 11.578-1.329 14.927h8.26v3.401h-9.898c-1.58 2.383-4.039 4.58-7.89 7.674H.968l.791-.625c3.87-3.053 6.53-5.151 8.334-7.049H0v-3.401h12.509c1.397-3.018 1.505-7.325 1.609-14.927h3.987zm3.06 20.029l3.867 5.973h-4.81l-3.867-5.973h4.81zm26.895 0l3.867 5.973h-4.811l-3.867-5.973h4.811zm-12.492 0l-3.866 5.973H26.89l3.866-5.973h4.811zM31.374 0l3.771 1.7h15.391v3.958c-1.14.987-2.862 2.413-5.857 3.91a89.124 89.124 0 007.248 1.468v3.63c-5.362-.847-9.447-1.862-12.608-2.907-3.2 1.074-7.255 2.09-12.428 2.904v-3.628a90.857 90.857 0 007.106-1.425c-2.22-1.1-3.65-2.124-4.73-2.898-.165-.118-1.678-1.256-1.678-1.256L31.374 0zM2.314 8.125l8.869 1.226v3.797L2.315 11.92V8.125zM77.365 1.7v8.93H55.295V1.7h22.07zm-31.91 3.4h-12.12c1.39.874 3.292 1.886 6.1 2.896 2.814-1.01 4.692-2.023 6.02-2.895zm27.83 0H59.375V7.23h13.91V5.102zm-70.97-3.4l8.869 1.226v3.797L2.315 5.497V1.7z"
            fill="#fff"></path>
        </svg>
      </div>
      <div id="BD_Login_Form" class="login-wrap">
        <div class="web-login-container">
          <article class="web-login">
            <article class="web-login-union">
              <div class="web-login-union__login">
                <div class="web-login-union__login__form">
                  <div class="web-login-union__login__form__title">验证码登录</div>
                  <div class="web-login-union__login__form__content">
                    <article class="web-login-mobile-code">
                      <div class="web-login-mobile-code__mobile-input-wrapper">
                        <div class="web-login-normal-input">
                          <div class="web-login-area-code">
                            <div class="web-login-area-code__input-wrapper"><input type="text" size="3"
                                name="web-login-area-code-input" class="web-login-area-code__input-wrapper__input"
                                autocomplete="off" role="combobox" tabindex="0" aria-owns="select-ul"
                                aria-activedescendant="areacode_item_0" aria-label="国家/地区" value="+86"><i
                                class="web-login-area-code__input-wrapper__icon-arrow web-login-area-code__input-wrapper__icon-arrow__down"></i>
                            </div>
                          </div><input name="normal-input" type="tel" class="web-login-normal-input__input"
                            placeholder="手机号" autocomplete="tel" maxlength="50" tabindex="0" aria-label="请输入手机号"
                            value="">
                        </div>
                      </div>
                      <div class="web-login-mobile-code__code-input-wrapper">
                        <div class="web-login-button-input"><span class="web-login-button-input__button-text send-input"
                            tabindex="0" aria-live="off" role="button">获取验证码</span>
                          <div class="web-login-button-input__input-wrapper send-input"><input name="button-input"
                              type="tel" class="web-login-button-input__input" placeholder="验证码" autocomplete="off"
                              maxlength="50" tabindex="0" aria-label="请输入验证码" value=""></div>
                        </div>
                      </div>
                      <div class="web-login-error" role="alert" aria-relevant="all" tabindex="0" aria-live="assertive"
                        aria-atomic="true" aria-label="警告:无"></div>
                      <div class="web-login-confirm-info" tabindex="0" aria-label="我已阅读并同意《用户协议》和《隐私政策》"><span
                          class="web-login-confirm-info__checkbox" role="checkbox" aria-checked="false" tabindex="0"
                          aria-label="协议勾选框"></span><span class="web-login-confirm-info__before-text">我已阅读并同意</span><a
                          target="_blank" href="#" class="web-login-confirm-info__info" tabindex="0"
                          aria-label="《用户协议》">《用户协议》</a><span class="web-login-confirm-info__connect-text">和</span><a
                          target="_blank" href="#" class="web-login-confirm-info__info" tabindex="0"
                          aria-label="《隐私政策》">《隐私政策》</a></div>
                      <div class="web-login-mobile-code__button-wrapper"><button type="submit"
                          class="web-login-button web-login-button__disabled">登录</button></div>
                    </article>
                  </div>
                </div>
                <div class="web-login-union__login__scan-code">
                  <div class="web-login-union__login__scan-code__title">扫码登录</div>
                  <article class="web-login-scan-code">
                    <div class="web-login-scan-code__content">
                      <div class="web-login-scan-code__content__qrcode-wrapper">
                        <img alt="" src="@/assets/images/web-login-scan-code.png"
                          class="web-login-scan-code__content__qrcode-wrapper__qrcode" tabindex="0" aria-label="二维码">
                        <div class="web-login-scan-code__content__qrcode-wrapper__mask">
                          <div class="web-login-scan-code__content__qrcode-wrapper__mask__toast">
                            <p class="web-login-scan-code__content__qrcode-wrapper__mask__toast__icon refresh"></p>
                            <p class="web-login-scan-code__content__qrcode-wrapper__mask__toast__text refresh">点击刷新二维码
                            </p>
                          </div>
                        </div>
                      </div>
                      <p class="web-login-scan-desc">二维码已失效<span class="web-login-scan-desc__btn">点击刷新</span></p>
                    </div>
                  </article>
                </div>
              </div>
              <div class="web-login-union__footer">
                <div class="web-login-other-login-method">
                  <div class="web-login-other-login-method__text">其他登录方式</div>
                  <ul class="web-login-other-login-method__list">
                    <li class="web-login-other-login-method__list__item" tabindex="0" aria-label="抖音登录" role="button"><i
                        class="web-login-other-login-method__list__item__icon web-login-other-login-method__list__item__icon__aweme"></i><span>抖音登录</span>
                    </li>
                    <li class="web-login-other-login-method__list__item" tabindex="0" aria-label="QQ登录" role="button"><i
                        class="web-login-other-login-method__list__item__icon web-login-other-login-method__list__item__icon__qzone_sns"></i><span>QQ登录</span>
                    </li>
                    <li class="web-login-other-login-method__list__item" tabindex="0" aria-label="微信登录" role="button"><i
                        class="web-login-other-login-method__list__item__icon web-login-other-login-method__list__item__icon__weixin"></i><span>微信登录</span>
                    </li>
                    <li class="web-login-other-login-method__list__item" tabindex="0" aria-label="账密登录" role="button"><i
                        class="web-login-other-login-method__list__item__icon web-login-other-login-method__list__item__icon__account_pwd"></i><span>密码登录</span>
                    </li>
                  </ul>
                </div>
                <ul class="web-login-link-list">
                  <li class="web-login-link-list__item">
                    <div class="web-login-link-list__item__text" tabindex="0" aria-label="立即注册" role="button">立即注册</div>
                  </li>
                  <li class="web-login-link-list__item">
                    <div class="web-login-link-list__item__text" tabindex="0" aria-label="登录遇到问题" role="button">登录遇到问题
                    </div>
                  </li>
                </ul>
              </div>
            </article>
          </article>
        </div>
      </div>
      <div class="first-screen-muted" @click="toggleMute">
        <template v-if="!isSecondSvg">
          <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#fff" fill-opacity="0.3"></circle>
            <path clip-rule="evenodd"
              d="M17.352 8.843a.565.565 0 01.103.324v13.666a.566.566 0 01-.89.463l-4.09-3.186a3.394 3.394 0 00-2.086-.716H8.404a1.131 1.131 0 01-1.131-1.131v-4.526c0-.624.506-1.13 1.131-1.13l1.986-.001c.755 0 1.489-.252 2.085-.716l4.09-3.186a.566.566 0 01.787.139z"
              stroke="#fff" stroke-width="1.4"></path>
            <path d="M20.488 13.943l4.114 4.114M24.602 13.943l-4.114 4.114" stroke="#fff" stroke-width="1.4"
              stroke-linecap="round"></path>
          </svg>
        </template>
        <template v-else>
          <svg width="33" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#fff" fill-opacity="0.3"></circle>
            <path clip-rule="evenodd"
              d="M17.443 8.843a.565.565 0 01.102.324v13.666a.566.566 0 01-.89.463l-4.09-3.186a3.394 3.394 0 00-2.085-.716H8.495a1.131 1.131 0 01-1.132-1.131v-4.526c0-.624.507-1.13 1.132-1.13l1.985-.001c.756 0 1.49-.252 2.085-.716l4.09-3.186a.566.566 0 01.788.139z"
              stroke="#fff" stroke-width="1.4"></path>
            <path d="M21.563 20a5.978 5.978 0 001.527-4 5.978 5.978 0 00-1.527-4" stroke="#fff" stroke-width="1.4">
            </path>
          </svg>
        </template>
      </div>
      <div class="first-screen-mouse-hint">滑动查看更多</div>
      <div class="first-screen-mouse" ref="mouseRef" @click="scrollToNextPage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36"
          preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
          <defs>
            <clipPath id="__lottie_element_160">
              <rect width="36" height="36" x="0" y="0"></rect>
            </clipPath>
            <clipPath id="__lottie_element_163">
              <path d="M0,0 L36,0 L36,36 L0,36z"></path>
            </clipPath>
          </defs>
          <g clip-path="url(#__lottie_element_160)">
            <g clip-path="url(#__lottie_element_163)" transform="matrix(1,0,0,1,0,-6.962577819824219)" opacity="1"
              style="display: block;">
              <g transform="matrix(1,0,0,1,18,18)" opacity="1" style="display: block;">
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path fill="rgb(255,255,255)" fill-opacity="1"
                    d=" M1,-8.5 C1,-8.5 -1,-8.5 -1,-8.5 C-1,-8.5 -1,8.5 -1,8.5 C-1,8.5 1,8.5 1,8.5 C1,8.5 1,-8.5 1,-8.5z">
                  </path>
                </g>
              </g>
              <g transform="matrix(1,0,0,1,18,20)" opacity="1" style="display: block;">
                <g opacity="1"
                  transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,0,0)">
                  <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                    stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="2"
                    d=" M4.243000030517578,4.243000030517578 C4.243000030517578,4.243000030517578 -4.243000030517578,4.243000030517578 -4.243000030517578,4.243000030517578 C-4.243000030517578,4.243000030517578 -4.243000030517578,-4.243000030517578 -4.243000030517578,-4.243000030517578">
                  </path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>


    <div class="group-source show-content" v-slide-in>
      <div class="title">支持丰富的创作体裁</div>
      <div class="subtitle">包括文章、视频、微头条、问答、专栏、音频等体裁</div>
      <div class="group-source-wrapper" v-slide-in>
        <div class="group-source-item">
          <div class="group-source-item-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"
              preserveAspectRatio="xMidYMid meet"
              style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
              <defs>
                <clipPath id="__lottie_element_8">
                  <rect width="48" height="48" x="0" y="0"></rect>
                </clipPath>
                <mask id="__lottie_element_13" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                    <path fill="rgb(255,0,0)" fill-opacity="1"
                      d=" M13,-13 C13,-13 13,13 13,13 C13,14.103799819946289 12.103799819946289,15 11,15 C11,15 -11,15 -11,15 C-12.103799819946289,15 -13,14.103799819946289 -13,13 C-13,13 -13,-13 -13,-13 C-13,-14.103799819946289 -12.103799819946289,-15 -11,-15 C-11,-15 11,-15 11,-15 C12.103799819946289,-15 13,-14.103799819946289 13,-13z">
                    </path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_18">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
                <mask id="__lottie_element_27" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                    <path fill="rgb(255,0,0)" fill-opacity="1"
                      d=" M13,-13 C13,-13 13,13 13,13 C13,14.103799819946289 12.103799819946289,15 11,15 C11,15 -11,15 -11,15 C-12.103799819946289,15 -13,14.103799819946289 -13,13 C-13,13 -13,-13 -13,-13 C-13,-14.103799819946289 -12.103799819946289,-15 -11,-15 C-11,-15 11,-15 11,-15 C12.103799819946289,-15 13,-14.103799819946289 13,-13z">
                    </path>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_30">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_8)">
                <g mask="url(#__lottie_element_27)" style="display: block;">
                  <g clip-path="url(#__lottie_element_18)" transform="matrix(1,0,0,1,0,-24)" opacity="1">
                    <g transform="matrix(1,0,0,1,24,20.200000762939453)" opacity="1" style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M-6,0 C-6,-0.6600000262260437 -5.460000038146973,-1.2000000476837158 -4.800000190734863,-1.2000000476837158 C-4.800000190734863,-1.2000000476837158 4.800000190734863,-1.2000000476837158 4.800000190734863,-1.2000000476837158 C5.460000038146973,-1.2000000476837158 6,-0.6600000262260437 6,0 C6,0.6600000262260437 5.460000038146973,1.2000000476837158 4.800000190734863,1.2000000476837158 C4.800000190734863,1.2000000476837158 -4.800000190734863,1.2000000476837158 -4.800000190734863,1.2000000476837158 C-5.460000038146973,1.2000000476837158 -6,0.6600000262260437 -6,0z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,22,27.799999237060547)" opacity="1" style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M-4,0 C-4,-0.6600000262260437 -3.4600000381469727,-1.2000000476837158 -2.799999952316284,-1.2000000476837158 C-2.799999952316284,-1.2000000476837158 2.799999952316284,-1.2000000476837158 2.799999952316284,-1.2000000476837158 C3.4600000381469727,-1.2000000476837158 4,-0.6600000262260437 4,0 C4,0.6600000262260437 3.4600000381469727,1.2000000476837158 2.799999952316284,1.2000000476837158 C2.799999952316284,1.2000000476837158 -2.799999952316284,1.2000000476837158 -2.799999952316284,1.2000000476837158 C-3.4600000381469727,1.2000000476837158 -4,0.6600000262260437 -4,0z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
                <g mask="url(#__lottie_element_13)" style="display: block;">
                  <g clip-path="url(#__lottie_element_30)" transform="matrix(1,0,0,1,0,0)" opacity="1">
                    <g transform="matrix(1,0,0,1,24,20.200000762939453)" opacity="1" style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M-6,0 C-6,-0.6600000262260437 -5.460000038146973,-1.2000000476837158 -4.800000190734863,-1.2000000476837158 C-4.800000190734863,-1.2000000476837158 4.800000190734863,-1.2000000476837158 4.800000190734863,-1.2000000476837158 C5.460000038146973,-1.2000000476837158 6,-0.6600000262260437 6,0 C6,0.6600000262260437 5.460000038146973,1.2000000476837158 4.800000190734863,1.2000000476837158 C4.800000190734863,1.2000000476837158 -4.800000190734863,1.2000000476837158 -4.800000190734863,1.2000000476837158 C-5.460000038146973,1.2000000476837158 -6,0.6600000262260437 -6,0z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,22,27.799999237060547)" opacity="1" style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M-4,0 C-4,-0.6600000262260437 -3.4600000381469727,-1.2000000476837158 -2.799999952316284,-1.2000000476837158 C-2.799999952316284,-1.2000000476837158 2.799999952316284,-1.2000000476837158 2.799999952316284,-1.2000000476837158 C3.4600000381469727,-1.2000000476837158 4,-0.6600000262260437 4,0 C4,0.6600000262260437 3.4600000381469727,1.2000000476837158 2.799999952316284,1.2000000476837158 C2.799999952316284,1.2000000476837158 -2.799999952316284,1.2000000476837158 -2.799999952316284,1.2000000476837158 C-3.4600000381469727,1.2000000476837158 -4,0.6600000262260437 -4,0z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                      stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                      d=" M13,-13 C13,-13 13,13 13,13 C13,14.103799819946289 12.103799819946289,15 11,15 C11,15 -11,15 -11,15 C-12.103799819946289,15 -13,14.103799819946289 -13,13 C-13,13 -13,-13 -13,-13 C-13,-14.103799819946289 -12.103799819946289,-15 -11,-15 C-11,-15 11,-15 11,-15 C12.103799819946289,-15 13,-14.103799819946289 13,-13z">
                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="group-source-item-title">文章</div>
          <div class="group-source-item-desc">图片加文字的无数种排列，向世人表达你的所思所想</div>
        </div>
        <div class="group-source-item">
          <div class="group-source-item-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"
              preserveAspectRatio="xMidYMid meet"
              style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
              <defs>
                <clipPath id="__lottie_element_64">
                  <rect width="48" height="48" x="0" y="0"></rect>
                </clipPath>
                <mask id="__lottie_element_69" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(255,0,0)" fill-opacity="1"
                        d=" M0,-16 C8.830400466918945,-16 16,-8.830400466918945 16,0 C16,8.830400466918945 8.830400466918945,16 0,16 C-8.830400466918945,16 -16,8.830400466918945 -16,0 C-16,-8.830400466918945 -8.830400466918945,-16 0,-16z">
                      </path>
                    </g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_74">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
                <mask id="__lottie_element_80" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(255,0,0)" fill-opacity="1"
                        d=" M0,-16 C8.830400466918945,-16 16,-8.830400466918945 16,0 C16,8.830400466918945 8.830400466918945,16 0,16 C-8.830400466918945,16 -16,8.830400466918945 -16,0 C-16,-8.830400466918945 -8.830400466918945,-16 0,-16z">
                      </path>
                    </g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_83">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_64)">
                <g mask="url(#__lottie_element_80)" style="display: block;">
                  <g clip-path="url(#__lottie_element_74)" transform="matrix(1,0,0,1,24,0)" opacity="1">
                    <g transform="matrix(1,0,0,1,25,24)" opacity="1" style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path stroke-linecap="butt" stroke-linejoin="round" fill-opacity="0" stroke="rgb(239,65,66)"
                          stroke-opacity="1" stroke-width="2.4"
                          d=" M3,0 C3,0 -3,5 -3,5 C-3,5 -3,-5 -3,-5 C-3,-5 3,0 3,0z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
                <g mask="url(#__lottie_element_69)" style="display: block;">
                  <g clip-path="url(#__lottie_element_83)" transform="matrix(1,0,0,1,0,0)" opacity="1">
                    <g transform="matrix(1,0,0,1,25,24)" opacity="1" style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(239,65,66)"
                          stroke-opacity="1" stroke-width="2.4"
                          d=" M-2.4679999351501465,-4.557000160217285 C-1,-3.3329999446868896 3,0 3,0 C3,0 3,0 3,0 C3,0 -3,5 -3,5 C-3,5 -3,-5 -3,-5 C-3,-5 -2.7980000972747803,-4.831999778747559 -2.4679999351501465,-4.557000160217285">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                      stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                      d=" M0,-16 C8.830400466918945,-16 16,-8.830400466918945 16,0 C16,8.830400466918945 8.830400466918945,16 0,16 C-8.830400466918945,16 -16,8.830400466918945 -16,0 C-16,-8.830400466918945 -8.830400466918945,-16 0,-16z">
                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="group-source-item-title">视频</div>
          <div class="group-source-item-desc">用镜头捕捉光影，剪辑构建脉络，分享你的美好生活</div>
        </div>
        <div class="group-source-item">
          <div class="group-source-item-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48"
              height="48" preserveAspectRatio="xMidYMid meet"
              style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
              <defs>
                <clipPath id="__lottie_element_155">
                  <rect width="48" height="48" x="0" y="0"></rect>
                </clipPath>
                <clipPath id="__lottie_element_157">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_155)">
                <g clip-path="url(#__lottie_element_157)" transform="matrix(1,0,0,1,0,0)" opacity="1"
                  style="display: block;">
                  <g transform="matrix(1,0,0,1,18.231000900268555,21.068517684936523)" opacity="0.000602477478835084"
                    style="display: none;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                        stroke="rgb(239,65,66)" stroke-opacity="1" stroke-width="2.4"
                        d=" M9.229000091552734,-7.52400016784668 C9.229000091552734,-8.37399959564209 8.538999557495117,-9.064000129699707 7.689000129699707,-9.064000129699707 C7.689000129699707,-9.064000129699707 -7.690999984741211,-9.064000129699707 -7.690999984741211,-9.064000129699707 C-8.541000366210938,-9.064000129699707 -9.230999946594238,-8.37399959564209 -9.230999946594238,-7.52400016784668 C-9.230999946594238,-7.52400016784668 -9.230999946594238,8.295999526977539 -9.230999946594238,8.295999526977539 C-9.230999946594238,8.946000099182129 -8.470999717712402,9.305999755859375 -7.9710001945495605,8.88599967956543 C-7.9710001945495605,8.88599967956543 -5.4710001945495605,6.806000232696533 -5.4710001945495605,6.806000232696533 C-4.921000003814697,6.3460001945495605 -4.2210001945495605,6.085999965667725 -3.500999927520752,6.085999965667725 C-3.500999927520752,6.085999965667725 7.689000129699707,6.085999965667725 7.689000129699707,6.085999965667725 C8.538999557495117,6.085999965667725 9.229000091552734,5.406000137329102 9.229000091552734,4.556000232696533 C9.229000091552734,4.556000232696533 9.229000091552734,-7.52400016784668 9.229000091552734,-7.52400016784668z">
                      </path>
                    </g>
                  </g>
                  <g transform="matrix(1,0,0,1,27,14.14900016784668)" opacity="2.370466773982116e-9"
                    style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(255,255,255)" fill-opacity="1"
                        d=" M-12,-10.14900016784668 C-12,-11.24899959564209 -11.100000381469727,-12.14900016784668 -10,-12.14900016784668 C-10,-12.14900016784668 10,-12.14900016784668 10,-12.14900016784668 C11.100000381469727,-12.14900016784668 12,-11.24899959564209 12,-10.14900016784668 C12,-10.14900016784668 12,11.151000022888184 12,11.151000022888184 C12,12.081000328063965 10.84000015258789,12.50100040435791 10.239999771118164,11.800999641418457 C10.239999771118164,11.800999641418457 7.199999809265137,8.25100040435791 7.199999809265137,8.25100040435791 C6.440000057220459,7.361000061035156 5.329999923706055,6.85099983215332 4.159999847412109,6.85099983215332 C4.159999847412109,6.85099983215332 -10,6.85099983215332 -10,6.85099983215332 C-11.100000381469727,6.85099983215332 -12,5.951000213623047 -12,4.85099983215332 C-12,4.85099983215332 -12,-10.14900016784668 -12,-10.14900016784668z">
                      </path>
                      <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                        stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                        d=" M-12,-10.14900016784668 C-12,-11.24899959564209 -11.100000381469727,-12.14900016784668 -10,-12.14900016784668 C-10,-12.14900016784668 10,-12.14900016784668 10,-12.14900016784668 C11.100000381469727,-12.14900016784668 12,-11.24899959564209 12,-10.14900016784668 C12,-10.14900016784668 12,11.151000022888184 12,11.151000022888184 C12,12.081000328063965 10.84000015258789,12.50100040435791 10.239999771118164,11.800999641418457 C10.239999771118164,11.800999641418457 7.199999809265137,8.25100040435791 7.199999809265137,8.25100040435791 C6.440000057220459,7.361000061035156 5.329999923706055,6.85099983215332 4.159999847412109,6.85099983215332 C4.159999847412109,6.85099983215332 -10,6.85099983215332 -10,6.85099983215332 C-11.100000381469727,6.85099983215332 -12,5.951000213623047 -12,4.85099983215332 C-12,4.85099983215332 -12,-10.14900016784668 -12,-10.14900016784668z">
                      </path>
                    </g>
                  </g>
                  <g transform="matrix(1,0,0,1,18.231000900268555,28.56399917602539)" opacity="0.9999999976295333"
                    style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                        stroke="rgb(239,65,66)" stroke-opacity="1" stroke-width="2.4"
                        d=" M9.229000091552734,-7.52400016784668 C9.229000091552734,-8.37399959564209 8.538999557495117,-9.064000129699707 7.689000129699707,-9.064000129699707 C7.689000129699707,-9.064000129699707 -7.690999984741211,-9.064000129699707 -7.690999984741211,-9.064000129699707 C-8.541000366210938,-9.064000129699707 -9.230999946594238,-8.37399959564209 -9.230999946594238,-7.52400016784668 C-9.230999946594238,-7.52400016784668 -9.230999946594238,8.295999526977539 -9.230999946594238,8.295999526977539 C-9.230999946594238,8.946000099182129 -8.470999717712402,9.305999755859375 -7.9710001945495605,8.88599967956543 C-7.9710001945495605,8.88599967956543 -5.4710001945495605,6.806000232696533 -5.4710001945495605,6.806000232696533 C-4.921000003814697,6.3460001945495605 -4.2210001945495605,6.085999965667725 -3.500999927520752,6.085999965667725 C-3.500999927520752,6.085999965667725 7.689000129699707,6.085999965667725 7.689000129699707,6.085999965667725 C8.538999557495117,6.085999965667725 9.229000091552734,5.406000137329102 9.229000091552734,4.556000232696533 C9.229000091552734,4.556000232696533 9.229000091552734,-7.52400016784668 9.229000091552734,-7.52400016784668z">
                      </path>
                    </g>
                  </g>
                  <g transform="matrix(1,0,0,1,27,21.64900016784668)" opacity="0.9999999976295333"
                    style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(255,255,255)" fill-opacity="1"
                        d=" M-12,-10.14900016784668 C-12,-11.24899959564209 -11.100000381469727,-12.14900016784668 -10,-12.14900016784668 C-10,-12.14900016784668 10,-12.14900016784668 10,-12.14900016784668 C11.100000381469727,-12.14900016784668 12,-11.24899959564209 12,-10.14900016784668 C12,-10.14900016784668 12,11.151000022888184 12,11.151000022888184 C12,12.081000328063965 10.84000015258789,12.50100040435791 10.239999771118164,11.800999641418457 C10.239999771118164,11.800999641418457 7.199999809265137,8.25100040435791 7.199999809265137,8.25100040435791 C6.440000057220459,7.361000061035156 5.329999923706055,6.85099983215332 4.159999847412109,6.85099983215332 C4.159999847412109,6.85099983215332 -10,6.85099983215332 -10,6.85099983215332 C-11.100000381469727,6.85099983215332 -12,5.951000213623047 -12,4.85099983215332 C-12,4.85099983215332 -12,-10.14900016784668 -12,-10.14900016784668z">
                      </path>
                      <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                        stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                        d=" M-12,-10.14900016784668 C-12,-11.24899959564209 -11.100000381469727,-12.14900016784668 -10,-12.14900016784668 C-10,-12.14900016784668 10,-12.14900016784668 10,-12.14900016784668 C11.100000381469727,-12.14900016784668 12,-11.24899959564209 12,-10.14900016784668 C12,-10.14900016784668 12,11.151000022888184 12,11.151000022888184 C12,12.081000328063965 10.84000015258789,12.50100040435791 10.239999771118164,11.800999641418457 C10.239999771118164,11.800999641418457 7.199999809265137,8.25100040435791 7.199999809265137,8.25100040435791 C6.440000057220459,7.361000061035156 5.329999923706055,6.85099983215332 4.159999847412109,6.85099983215332 C4.159999847412109,6.85099983215332 -10,6.85099983215332 -10,6.85099983215332 C-11.100000381469727,6.85099983215332 -12,5.951000213623047 -12,4.85099983215332 C-12,4.85099983215332 -12,-10.14900016784668 -12,-10.14900016784668z">
                      </path>
                    </g>
                  </g>
                </g>
              </g>
            </svg></div>
          <div class="group-source-item-title">微头条</div>
          <div class="group-source-item-desc">只需要短短数百字，记录新鲜事，分享你此刻的想法</div>
        </div>
        <div class="group-source-item">
          <div class="group-source-item-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48"
              height="48" preserveAspectRatio="xMidYMid meet"
              style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
              <defs>
                <clipPath id="__lottie_element_101">
                  <rect width="48" height="48" x="0" y="0"></rect>
                </clipPath>
                <mask id="__lottie_element_106" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(0,0,0)" fill-opacity="1"
                        d=" M-5.050000190734863,9.5 C-5.050000190734863,1.3300000429153442 1.5800000429153442,-5.300000190734863 9.75,-5.300000190734863 C9.75,-5.300000190734863 0,-17.200000762939453 0,-17.200000762939453 C-9.5,-17.200000762939453 -17.200000762939453,-9.5 -17.200000762939453,0 C-17.200000762939453,0 -5.050000190734863,9.5 -5.050000190734863,9.5z M9.5,6.550000190734863 C1.3300000429153442,6.550000190734863 3.375,-1 -14.800000190734863,0 C-14.800000190734863,0 -17.200000762939453,0 -17.200000762939453,0 C-17.200000762939453,9.5 -9.5,17.200000762939453 0,17.200000762939453 C0,17.200000762939453 9.5,6.550000190734863 9.5,6.550000190734863z M0.6779999732971191,14.800000190734863 C0.6779999732971191,14.800000190734863 -0.0020000000949949026,14.800000190734863 -0.0020000000949949026,14.800000190734863 C-0.0020000000949949026,14.800000190734863 -0.0020000000949949026,17.200000762939453 -0.0020000000949949026,17.200000762939453 C-0.0020000000949949026,17.200000762939453 0.6779999732971191,17.200000762939453 0.6779999732971191,17.200000762939453 C0.6779999732971191,17.200000762939453 0.6779999732971191,14.800000190734863 0.6779999732971191,14.800000190734863z M12.625,12.862000465393066 C8.765000343322754,14.142000198364258 4.735000133514404,14.802000045776367 0.675000011920929,14.802000045776367 C0.675000011920929,14.802000045776367 0.675000011920929,17.20199966430664 0.675000011920929,17.20199966430664 C4.994999885559082,17.20199966430664 9.28499984741211,16.50200080871582 13.375,15.142000198364258 C13.375,15.142000198364258 12.625,12.862000465393066 12.625,12.862000465393066z M10.102999687194824,12.348999977111816 C10.102999687194824,12.348999977111816 12.072999954223633,14.758999824523926 12.072999954223633,14.758999824523926 C12.072999954223633,14.758999824523926 13.932999610900879,13.23900032043457 13.932999610900879,13.23900032043457 C13.932999610900879,13.23900032043457 11.963000297546387,10.829000473022461 11.963000297546387,10.829000473022461 C11.963000297546387,10.829000473022461 10.102999687194824,12.348999977111816 10.102999687194824,12.348999977111816z M14.795999526977539,0 C10.5,-0.8119999766349792 -3.7139999866485596,-3.4800000190734863 -6.544000148773193,-0.7799999713897705 C-6.544000148773193,-0.7799999713897705 11.866000175476074,12.460000038146973 11.866000175476074,12.460000038146973 C15.145999908447266,9.319999694824219 17.195999145507812,4.900000095367432 17.195999145507812,0 C17.195999145507812,0 14.795999526977539,0 14.795999526977539,0z M0,-14.800000190734863 C-3.125,-8.312000274658203 -6.074999809265137,-1.6080000400543213 -6.074999809265137,6.561999797821045 C-6.074999809265137,6.561999797821045 17.200000762939453,0 17.200000762939453,0 C17.200000762939453,-9.5 9.5,-17.200000762939453 0,-17.200000762939453 C0,-17.200000762939453 0,-14.800000190734863 0,-14.800000190734863z M13,14.001999855041504 C13,14.001999855041504 13.380000114440918,15.142000198364258 13.380000114440918,15.142000198364258 C13.75,15.01200008392334 14.039999961853027,14.711999893188477 14.149999618530273,14.331999778747559 C14.260000228881836,13.95199966430664 14.180000305175781,13.552000045776367 13.930000305175781,13.241999626159668 C13.930000305175781,13.241999626159668 13,14.001999855041504 13,14.001999855041504z M12.845999717712402,13.432000160217285 C12.845999717712402,13.432000160217285 8.704000473022461,6.811999797821045 8.704000473022461,6.811999797821045 C8.253999710083008,7.242000102996826 0.6100000143051147,15.263999938964844 1.0099999904632568,15.753999710083008 C1.0099999904632568,15.753999710083008 12.845999717712402,13.432000160217285 12.845999717712402,13.432000160217285z">
                      </path>
                    </g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_110">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
                <mask id="__lottie_element_125" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(0,0,0)" fill-opacity="1"
                        d=" M-5.050000190734863,9.5 C-5.050000190734863,1.3300000429153442 1.5800000429153442,-5.300000190734863 9.75,-5.300000190734863 C9.75,-5.300000190734863 0,-17.200000762939453 0,-17.200000762939453 C-9.5,-17.200000762939453 -17.200000762939453,-9.5 -17.200000762939453,0 C-17.200000762939453,0 -5.050000190734863,9.5 -5.050000190734863,9.5z M9.5,6.550000190734863 C1.3300000429153442,6.550000190734863 3.375,-1 -14.800000190734863,0 C-14.800000190734863,0 -17.200000762939453,0 -17.200000762939453,0 C-17.200000762939453,9.5 -9.5,17.200000762939453 0,17.200000762939453 C0,17.200000762939453 9.5,6.550000190734863 9.5,6.550000190734863z M0.6779999732971191,14.800000190734863 C0.6779999732971191,14.800000190734863 -0.0020000000949949026,14.800000190734863 -0.0020000000949949026,14.800000190734863 C-0.0020000000949949026,14.800000190734863 -0.0020000000949949026,17.200000762939453 -0.0020000000949949026,17.200000762939453 C-0.0020000000949949026,17.200000762939453 0.6779999732971191,17.200000762939453 0.6779999732971191,17.200000762939453 C0.6779999732971191,17.200000762939453 0.6779999732971191,14.800000190734863 0.6779999732971191,14.800000190734863z M12.625,12.862000465393066 C8.765000343322754,14.142000198364258 4.735000133514404,14.802000045776367 0.675000011920929,14.802000045776367 C0.675000011920929,14.802000045776367 0.675000011920929,17.20199966430664 0.675000011920929,17.20199966430664 C4.994999885559082,17.20199966430664 9.28499984741211,16.50200080871582 13.375,15.142000198364258 C13.375,15.142000198364258 12.625,12.862000465393066 12.625,12.862000465393066z M10.102999687194824,12.348999977111816 C10.102999687194824,12.348999977111816 12.072999954223633,14.758999824523926 12.072999954223633,14.758999824523926 C12.072999954223633,14.758999824523926 13.932999610900879,13.23900032043457 13.932999610900879,13.23900032043457 C13.932999610900879,13.23900032043457 11.963000297546387,10.829000473022461 11.963000297546387,10.829000473022461 C11.963000297546387,10.829000473022461 10.102999687194824,12.348999977111816 10.102999687194824,12.348999977111816z M14.795999526977539,0 C10.5,-0.8119999766349792 -3.7139999866485596,-3.4800000190734863 -6.544000148773193,-0.7799999713897705 C-6.544000148773193,-0.7799999713897705 11.866000175476074,12.460000038146973 11.866000175476074,12.460000038146973 C15.145999908447266,9.319999694824219 17.195999145507812,4.900000095367432 17.195999145507812,0 C17.195999145507812,0 14.795999526977539,0 14.795999526977539,0z M0,-14.800000190734863 C-3.125,-8.312000274658203 -6.074999809265137,-1.6080000400543213 -6.074999809265137,6.561999797821045 C-6.074999809265137,6.561999797821045 17.200000762939453,0 17.200000762939453,0 C17.200000762939453,-9.5 9.5,-17.200000762939453 0,-17.200000762939453 C0,-17.200000762939453 0,-14.800000190734863 0,-14.800000190734863z M13,14.001999855041504 C13,14.001999855041504 13.380000114440918,15.142000198364258 13.380000114440918,15.142000198364258 C13.75,15.01200008392334 14.039999961853027,14.711999893188477 14.149999618530273,14.331999778747559 C14.260000228881836,13.95199966430664 14.180000305175781,13.552000045776367 13.930000305175781,13.241999626159668 C13.930000305175781,13.241999626159668 13,14.001999855041504 13,14.001999855041504z M12.845999717712402,13.432000160217285 C12.845999717712402,13.432000160217285 8.704000473022461,6.811999797821045 8.704000473022461,6.811999797821045 C8.253999710083008,7.242000102996826 0.6100000143051147,15.263999938964844 1.0099999904632568,15.753999710083008 C1.0099999904632568,15.753999710083008 12.845999717712402,13.432000160217285 12.845999717712402,13.432000160217285z">
                      </path>
                    </g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_129">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_101)">
                <g mask="url(#__lottie_element_125)" style="display: block;">
                  <g clip-path="url(#__lottie_element_129)" transform="matrix(1,0,0,1,0,-24)"
                    opacity="0.000003897386947784299">
                    <g transform="matrix(1,0,0,1,23.700000762939453,21.576000213623047)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M-3.299999952316284,-0.8999999761581421 C-3.299999952316284,-2.7200000286102295 -1.8200000524520874,-4.199999809265137 0,-4.199999809265137 C1.8200000524520874,-4.199999809265137 3.299999952316284,-2.7200000286102295 3.299999952316284,-0.8999999761581421 C3.299999952316284,0.18000000715255737 2.7799999713897705,1.1399999856948853 1.9800000190734863,1.7400000095367432 C1.9700000286102295,1.75 1.9500000476837158,1.7599999904632568 1.940000057220459,1.7699999809265137 C1.899999976158142,1.7999999523162842 1.8700000047683716,1.8200000524520874 1.8300000429153442,1.840000033378601 C1.8300000429153442,1.840000033378601 1.840000033378601,1.850000023841858 1.840000033378601,1.850000023841858 C0.4399999976158142,2.9600000381469727 -0.5,4.610000133514404 -0.6700000166893005,6.489999771118164 C-0.6800000071525574,6.53000020980835 -0.6800000071525574,6.599999904632568 -0.6800000071525574,6.599999904632568 C-0.6800000071525574,6.599999904632568 1.7300000190734863,6.599999904632568 1.7300000190734863,6.599999904632568 C1.8700000047683716,5.420000076293945 2.4800000190734863,4.380000114440918 3.380000114440918,3.690000057220459 C4.789999961853027,2.6500000953674316 5.699999809265137,0.9800000190734863 5.699999809265137,-0.8999999761581421 C5.699999809265137,-4.050000190734863 3.1500000953674316,-6.599999904632568 0,-6.599999904632568 C-3.1500000953674316,-6.599999904632568 -5.699999809265137,-4.050000190734863 -5.699999809265137,-0.8999999761581421 C-5.699999809265137,-0.8999999761581421 -3.299999952316284,-0.8999999761581421 -3.299999952316284,-0.8999999761581421z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,24.229000091552734,28.174999237060547)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M0,-1.2050000429153442 C0.6650395393371582,-1.2050000429153442 1.2050000429153442,-0.6650395393371582 1.2050000429153442,0 C1.2050000429153442,0.6650395393371582 0.6650395393371582,1.2050000429153442 0,1.2050000429153442 C-0.6650395393371582,1.2050000429153442 -1.2050000429153442,0.6650395393371582 -1.2050000429153442,0 C-1.2050000429153442,-0.6650395393371582 -0.6650395393371582,-1.2050000429153442 0,-1.2050000429153442z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,24.229000091552734,31.78499984741211)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M0,-1.4665000438690186 C0.8093613982200623,-1.4665000438690186 1.4665000438690186,-0.8093613982200623 1.4665000438690186,0 C1.4665000438690186,0.8093613982200623 0.8093613982200623,1.4665000438690186 0,1.4665000438690186 C-0.8093613982200623,1.4665000438690186 -1.4665000438690186,0.8093613982200623 -1.4665000438690186,0 C-1.4665000438690186,-0.8093613982200623 -0.8093613982200623,-1.4665000438690186 0,-1.4665000438690186z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,19.204999923706055,20.665000915527344)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M0,-1.2050000429153442 C0.6650395393371582,-1.2050000429153442 1.2050000429153442,-0.6650395393371582 1.2050000429153442,0 C1.2050000429153442,0.6650395393371582 0.6650395393371582,1.2050000429153442 0,1.2050000429153442 C-0.6650395393371582,1.2050000429153442 -1.2050000429153442,0.6650395393371582 -1.2050000429153442,0 C-1.2050000429153442,-0.6650395393371582 -0.6650395393371582,-1.2050000429153442 0,-1.2050000429153442z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
                <g mask="url(#__lottie_element_106)" style="display: block;">
                  <g clip-path="url(#__lottie_element_110)" transform="matrix(1,0,0,1,0,0)" opacity="1">
                    <g transform="matrix(1,0,0,1,23.700000762939453,21.576000213623047)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M-3.299999952316284,-0.8999999761581421 C-3.299999952316284,-2.7200000286102295 -1.8200000524520874,-4.199999809265137 0,-4.199999809265137 C1.8200000524520874,-4.199999809265137 3.299999952316284,-2.7200000286102295 3.299999952316284,-0.8999999761581421 C3.299999952316284,0.18000000715255737 2.7799999713897705,1.1399999856948853 1.9800000190734863,1.7400000095367432 C1.9700000286102295,1.75 1.9500000476837158,1.7599999904632568 1.940000057220459,1.7699999809265137 C1.899999976158142,1.7999999523162842 1.8700000047683716,1.8200000524520874 1.8300000429153442,1.840000033378601 C1.8300000429153442,1.840000033378601 1.840000033378601,1.850000023841858 1.840000033378601,1.850000023841858 C0.4399999976158142,2.9600000381469727 -0.5,4.610000133514404 -0.6700000166893005,6.489999771118164 C-0.6800000071525574,6.53000020980835 -0.6800000071525574,6.599999904632568 -0.6800000071525574,6.599999904632568 C-0.6800000071525574,6.599999904632568 1.7300000190734863,6.599999904632568 1.7300000190734863,6.599999904632568 C1.8700000047683716,5.420000076293945 2.4800000190734863,4.380000114440918 3.380000114440918,3.690000057220459 C4.789999961853027,2.6500000953674316 5.699999809265137,0.9800000190734863 5.699999809265137,-0.8999999761581421 C5.699999809265137,-4.050000190734863 3.1500000953674316,-6.599999904632568 0,-6.599999904632568 C-3.1500000953674316,-6.599999904632568 -5.699999809265137,-4.050000190734863 -5.699999809265137,-0.8999999761581421 C-5.699999809265137,-0.8999999761581421 -3.299999952316284,-0.8999999761581421 -3.299999952316284,-0.8999999761581421z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,24.229000091552734,28.174999237060547)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M0,-1.2050000429153442 C0.6650395393371582,-1.2050000429153442 1.2050000429153442,-0.6650395393371582 1.2050000429153442,0 C1.2050000429153442,0.6650395393371582 0.6650395393371582,1.2050000429153442 0,1.2050000429153442 C-0.6650395393371582,1.2050000429153442 -1.2050000429153442,0.6650395393371582 -1.2050000429153442,0 C-1.2050000429153442,-0.6650395393371582 -0.6650395393371582,-1.2050000429153442 0,-1.2050000429153442z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,24.229000091552734,31.78499984741211)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M0,-1.4665000438690186 C0.8093613982200623,-1.4665000438690186 1.4665000438690186,-0.8093613982200623 1.4665000438690186,0 C1.4665000438690186,0.8093613982200623 0.8093613982200623,1.4665000438690186 0,1.4665000438690186 C-0.8093613982200623,1.4665000438690186 -1.4665000438690186,0.8093613982200623 -1.4665000438690186,0 C-1.4665000438690186,-0.8093613982200623 -0.8093613982200623,-1.4665000438690186 0,-1.4665000438690186z">
                        </path>
                      </g>
                    </g>
                    <g transform="matrix(1,0,0,1,19.204999923706055,20.665000915527344)" opacity="1"
                      style="display: block;">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path fill="rgb(239,65,66)" fill-opacity="1"
                          d=" M0,-1.2050000429153442 C0.6650395393371582,-1.2050000429153442 1.2050000429153442,-0.6650395393371582 1.2050000429153442,0 C1.2050000429153442,0.6650395393371582 0.6650395393371582,1.2050000429153442 0,1.2050000429153442 C-0.6650395393371582,1.2050000429153442 -1.2050000429153442,0.6650395393371582 -1.2050000429153442,0 C-1.2050000429153442,-0.6650395393371582 -0.6650395393371582,-1.2050000429153442 0,-1.2050000429153442z">
                        </path>
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,24,24)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path fill="rgb(0,0,0)" fill-opacity="1"
                      d=" M-14.800000190734863,0 C-14.800000190734863,-8.170000076293945 -8.170000076293945,-14.800000190734863 0,-14.800000190734863 C0,-14.800000190734863 0,-17.200000762939453 0,-17.200000762939453 C-9.5,-17.200000762939453 -17.200000762939453,-9.5 -17.200000762939453,0 C-17.200000762939453,0 -14.800000190734863,0 -14.800000190734863,0z M0,14.800000190734863 C-8.170000076293945,14.800000190734863 -14.800000190734863,8.170000076293945 -14.800000190734863,0 C-14.800000190734863,0 -17.200000762939453,0 -17.200000762939453,0 C-17.200000762939453,9.5 -9.5,17.200000762939453 0,17.200000762939453 C0,17.200000762939453 0,14.800000190734863 0,14.800000190734863z M0.6779999732971191,14.800000190734863 C0.6779999732971191,14.800000190734863 -0.0020000000949949026,14.800000190734863 -0.0020000000949949026,14.800000190734863 C-0.0020000000949949026,14.800000190734863 -0.0020000000949949026,17.200000762939453 -0.0020000000949949026,17.200000762939453 C-0.0020000000949949026,17.200000762939453 0.6779999732971191,17.200000762939453 0.6779999732971191,17.200000762939453 C0.6779999732971191,17.200000762939453 0.6779999732971191,14.800000190734863 0.6779999732971191,14.800000190734863z M12.625,12.862000465393066 C8.765000343322754,14.142000198364258 4.735000133514404,14.802000045776367 0.675000011920929,14.802000045776367 C0.675000011920929,14.802000045776367 0.675000011920929,17.20199966430664 0.675000011920929,17.20199966430664 C4.994999885559082,17.20199966430664 9.28499984741211,16.50200080871582 13.375,15.142000198364258 C13.375,15.142000198364258 12.625,12.862000465393066 12.625,12.862000465393066z M10.102999687194824,12.348999977111816 C10.102999687194824,12.348999977111816 12.072999954223633,14.758999824523926 12.072999954223633,14.758999824523926 C12.072999954223633,14.758999824523926 13.932999610900879,13.23900032043457 13.932999610900879,13.23900032043457 C13.932999610900879,13.23900032043457 11.963000297546387,10.829000473022461 11.963000297546387,10.829000473022461 C11.963000297546387,10.829000473022461 10.102999687194824,12.348999977111816 10.102999687194824,12.348999977111816z M14.795999526977539,0 C14.795999526977539,4.21999979019165 13.03600025177002,8.020000457763672 10.206000328063965,10.720000267028809 C10.206000328063965,10.720000267028809 11.866000175476074,12.460000038146973 11.866000175476074,12.460000038146973 C15.145999908447266,9.319999694824219 17.195999145507812,4.900000095367432 17.195999145507812,0 C17.195999145507812,0 14.795999526977539,0 14.795999526977539,0z M0,-14.800000190734863 C8.170000076293945,-14.800000190734863 14.800000190734863,-8.170000076293945 14.800000190734863,0 C14.800000190734863,0 17.200000762939453,0 17.200000762939453,0 C17.200000762939453,-9.5 9.5,-17.200000762939453 0,-17.200000762939453 C0,-17.200000762939453 0,-14.800000190734863 0,-14.800000190734863z M13,14.001999855041504 C13,14.001999855041504 13.380000114440918,15.142000198364258 13.380000114440918,15.142000198364258 C13.75,15.01200008392334 14.039999961853027,14.711999893188477 14.149999618530273,14.331999778747559 C14.260000228881836,13.95199966430664 14.180000305175781,13.552000045776367 13.930000305175781,13.241999626159668 C13.930000305175781,13.241999626159668 13,14.001999855041504 13,14.001999855041504z M11.034000396728516,11.588000297546387 C11.034000396728516,11.588000297546387 10.204000473022461,10.718000411987305 10.204000473022461,10.718000411987305 C9.753999710083008,11.14799976348877 9.704000473022461,11.857999801635742 10.104000091552734,12.347999572753906 C10.104000091552734,12.347999572753906 11.034000396728516,11.588000297546387 11.034000396728516,11.588000297546387z">
                    </path>
                  </g>
                </g>
              </g>
            </svg></div>
          <div class="group-source-item-title">问答</div>
          <div class="group-source-item-desc">提出你想要知道的问题，或帮助别人解答他们的问题</div>
        </div>
        <div class="group-source-item">
          <div class="group-source-item-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48"
              height="48" preserveAspectRatio="xMidYMid meet"
              style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
              <defs>
                <clipPath id="__lottie_element_144">
                  <rect width="48" height="48" x="0" y="0"></rect>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_144)">
                <g transform="matrix(1,0,0,1,24,19.5)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                      stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                      d=" M14,9.5 C14,9.5 14,4.5 14,4.5 C14,-3.2300000190734863 7.730000019073486,-9.5 0,-9.5 C0,-9.5 0,-9.5 0,-9.5 C-7.730000019073486,-9.5 -14,-3.2300000190734863 -14,4.5 C-14,4.5 -14,9.5 -14,9.5">
                    </path>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,14,32.5)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                      stroke="rgb(239,65,66)" stroke-opacity="1" stroke-width="2.4"
                      d=" M-4,-5.5 C-4,-5.5 -1.5,-5.5 -1.5,-5.5 C-0.10000000149011612,-5.5 0.5899999737739563,-5.5 1.159999966621399,-5.329999923706055 C2.440000057220459,-4.940000057220459 3.440000057220459,-3.940000057220459 3.8299999237060547,-2.6600000858306885 C4,-2.0899999141693115 4,-1.399999976158142 4,0 C4,0 4,1.5 4,1.5 C4,3.7100000381469727 2.2100000381469727,5.5 0,5.5 C0,5.5 0,5.5 0,5.5 C-2.2100000381469727,5.5 -4,3.7100000381469727 -4,1.5 C-4,1.5 -4,-5.5 -4,-5.5z">
                    </path>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,34,32.5)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                      stroke="rgb(239,65,66)" stroke-opacity="1" stroke-width="2.4"
                      d=" M4,-5.5 C4,-5.5 1.5,-5.5 1.5,-5.5 C0.10000000149011612,-5.5 -0.5899999737739563,-5.5 -1.159999966621399,-5.329999923706055 C-2.440000057220459,-4.940000057220459 -3.440000057220459,-3.940000057220459 -3.8299999237060547,-2.6600000858306885 C-4,-2.0899999141693115 -4,-1.399999976158142 -4,0 C-4,0 -4,1.5 -4,1.5 C-4,3.7100000381469727 -2.2100000381469727,5.5 0,5.5 C0,5.5 0,5.5 0,5.5 C2.2100000381469727,5.5 4,3.7100000381469727 4,1.5 C4,1.5 4,-5.5 4,-5.5z">
                    </path>
                  </g>
                </g>
              </g>
            </svg></div>
          <div class="group-source-item-title">音频</div>
          <div class="group-source-item-desc">用饱含情感的声音，将思想和情绪传达给所有的听众</div>
        </div>
        <div class="group-source-item">
          <div class="group-source-item-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48"
              height="48" preserveAspectRatio="xMidYMid meet"
              style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);">
              <defs>
                <clipPath id="__lottie_element_39">
                  <rect width="48" height="48" x="0" y="0"></rect>
                </clipPath>
                <mask id="__lottie_element_43" mask-type="alpha">
                  <g transform="matrix(1,0,0,1,24,24.545000076293945)" opacity="1" style="display: block;">
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                        stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                        d=" M-13,-12.545000076293945 C-13,-13.645000457763672 -12.100000381469727,-14.545000076293945 -11,-14.545000076293945 C-11,-14.545000076293945 11,-14.545000076293945 11,-14.545000076293945 C12.100000381469727,-14.545000076293945 13,-13.645000457763672 13,-12.545000076293945 C13,-12.545000076293945 13,12.545000076293945 13,12.545000076293945 C13,13.944999694824219 11.59000015258789,14.914999961853027 10.279999732971191,14.404999732971191 C10.279999732971191,14.404999732971191 0.7200000286102295,10.734999656677246 0.7200000286102295,10.734999656677246 C0.25999999046325684,10.555000305175781 -0.25999999046325684,10.555000305175781 -0.7200000286102295,10.734999656677246 C-0.7200000286102295,10.734999656677246 -10.279999732971191,14.404999732971191 -10.279999732971191,14.404999732971191 C-11.59000015258789,14.914999961853027 -13,13.944999694824219 -13,12.545000076293945 C-13,12.545000076293945 -13,-12.545000076293945 -13,-12.545000076293945z">
                      </path>
                      <path fill="rgb(255,0,0)" fill-opacity="1"
                        d=" M-13,-12.545000076293945 C-13,-13.645000457763672 -12.100000381469727,-14.545000076293945 -11,-14.545000076293945 C-11,-14.545000076293945 11,-14.545000076293945 11,-14.545000076293945 C12.100000381469727,-14.545000076293945 13,-13.645000457763672 13,-12.545000076293945 C13,-12.545000076293945 13,12.545000076293945 13,12.545000076293945 C13,13.944999694824219 11.59000015258789,14.914999961853027 10.279999732971191,14.404999732971191 C10.279999732971191,14.404999732971191 0.7200000286102295,10.734999656677246 0.7200000286102295,10.734999656677246 C0.25999999046325684,10.555000305175781 -0.25999999046325684,10.555000305175781 -0.7200000286102295,10.734999656677246 C-0.7200000286102295,10.734999656677246 -10.279999732971191,14.404999732971191 -10.279999732971191,14.404999732971191 C-11.59000015258789,14.914999961853027 -13,13.944999694824219 -13,12.545000076293945 C-13,12.545000076293945 -13,-12.545000076293945 -13,-12.545000076293945z">
                      </path>
                    </g>
                  </g>
                </mask>
                <clipPath id="__lottie_element_47">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
                <clipPath id="__lottie_element_52">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
                <clipPath id="__lottie_element_58">
                  <path d="M0,0 L48,0 L48,48 L0,48z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_39)">
                <g mask="url(#__lottie_element_43)" style="display: block;">
                  <g clip-path="url(#__lottie_element_47)" transform="matrix(1,0,0,1,0,0)" opacity="1">
                    <g clip-path="url(#__lottie_element_52)" transform="matrix(1,0,0,1,0,-24)" opacity="1"
                      style="display: block;">
                      <g transform="matrix(1,0,0,1,24,21)" opacity="1" style="display: block;">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(239,65,66)"
                            stroke-opacity="1" stroke-width="2.4" d=" M-4,0 C-4,0 4,0 4,0"></path>
                        </g>
                      </g>
                    </g>
                    <g clip-path="url(#__lottie_element_58)" transform="matrix(1,0,0,1,0,0)" opacity="1"
                      style="display: block;">
                      <g transform="matrix(1,0,0,1,24,21)" opacity="1" style="display: block;">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(239,65,66)"
                            stroke-opacity="1" stroke-width="2.4" d=" M-4,0 C-4,0 4,0 4,0"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,24,24.545000076293945)" opacity="1" style="display: block;">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"
                      stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="2.4"
                      d=" M-13,-12.545000076293945 C-13,-13.645000457763672 -12.100000381469727,-14.545000076293945 -11,-14.545000076293945 C-11,-14.545000076293945 11,-14.545000076293945 11,-14.545000076293945 C12.100000381469727,-14.545000076293945 13,-13.645000457763672 13,-12.545000076293945 C13,-12.545000076293945 13,12.545000076293945 13,12.545000076293945 C13,13.944999694824219 11.59000015258789,14.914999961853027 10.279999732971191,14.404999732971191 C10.279999732971191,14.404999732971191 0.7200000286102295,10.734999656677246 0.7200000286102295,10.734999656677246 C0.25999999046325684,10.555000305175781 -0.25999999046325684,10.555000305175781 -0.7200000286102295,10.734999656677246 C-0.7200000286102295,10.734999656677246 -10.279999732971191,14.404999732971191 -10.279999732971191,14.404999732971191 C-11.59000015258789,14.914999961853027 -13,13.944999694824219 -13,12.545000076293945 C-13,12.545000076293945 -13,-12.545000076293945 -13,-12.545000076293945z">
                    </path>
                  </g>
                </g>
              </g>
            </svg></div>
          <div class="group-source-item-title">专栏</div>
          <div class="group-source-item-desc">将图文、视频等内容组成专栏，自定价格向用户售卖</div>
        </div>
      </div>

    </div>
    <div class="distribute-platform show-content" v-slide-in>
      <div class="title">内容多平台分发</div>
      <div class="subtitle">粉丝数据全面打通，多渠道涨粉，全平台共享</div>
      <div class="distribute-platform-content">
        <div class="distribute-platform-text">
          <div class="distribute-platform-item" @mouseover="changePhoneContainer(0)">
            <div class="distribute-platform-item-content">
              <img class="distribute-platform-item-avatar" src="@/assets/images/logo-toutiao.png">
              <div class="distribute-platform-item-title">今日头条</div>
              <div>
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                  <path fill="#000" d="M0 7h16v2H0z"></path>
                  <path fill="#000" d="M9 0v16H7V0z"></path>
                </svg>
              </div>
            </div>
            <div class="distribute-platform-item-desc">
              今日头条是一个通用信息平台，致力于连接人与信息，让优质丰富的信息得到高效精准的分发，促使信息创造价值
            </div>
          </div>
          <div class="distribute-platform-item" @mouseover="changePhoneContainer(1)">
            <div class="distribute-platform-item-content"><img class="distribute-platform-item-avatar"
                src="@/assets/images/logo-xigua.png">
              <div class="distribute-platform-item-title">西瓜视频</div>
              <div><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                  <path fill="#000" d="M0 7h16v2H0z"></path>
                  <path fill="#000" d="M9 0v16H7V0z"></path>
                </svg></div>
            </div>
            <div class="distribute-platform-item-desc">西瓜视频是一个PUGC视频平台，为用户提供丰富的优质内容。同时鼓励多样化创作，帮助人们轻松地分享视频作品</div>
          </div>
          <div class="distribute-platform-item" @mouseover="changePhoneContainer(2)">
            <div class="distribute-platform-item-content"><img class="distribute-platform-item-avatar"
                src="@/assets/images/logo-dongchedi.png">
              <div class="distribute-platform-item-title">懂车帝</div>
              <div>
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                  <path fill="#000" d="M0 7h16v2H0z"></path>
                  <path fill="#000" d="M9 0v16H7V0z"></path>
                </svg>
              </div>
            </div>
            <div class="distribute-platform-item-desc">懂车帝是“看车、选车、买车”一站式汽车媒体和服务平台，产品基于个性化推荐引擎帮助用户发现感兴趣的汽车内容</div>
          </div>
          <div class="distribute-platform-item" @mouseover="changePhoneContainer(3)">
            <div class="distribute-platform-item-content"><img class="distribute-platform-item-avatar"
                src="@/assets/images/logo-wukong.png">
              <div class="distribute-platform-item-title">悟空问答</div>
              <div><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
                  <path fill="#000" d="M0 7h16v2H0z"></path>
                  <path fill="#000" d="M9 0v16H7V0z"></path>
                </svg></div>
            </div>
            <div class="distribute-platform-item-desc">悟空问答是一款靠谱的问答社区产品，专注分享知识、经验、观念。在这里，所有人都能找到答案、参与讨论</div>
          </div>
        </div>
        <div class="distribute-platform-phone">
          <div class="distribute-platform-phone-wrapper">
            <div class="distribute-platform-phone-container" :class="currentPhoneContainerClass">
              <div class="distribute-platform-video-item">
                <video class="distribute-platform-video" preload="preload" autoplay muted
                  src="@/assets/images/video/distribute-toutiao-v3.mp4">
                </video>
              </div>
              <div class="distribute-platform-video-item">
                <video class="distribute-platform-video" preload="preload" autoplay muted
                  src="@/assets/images/video/distribute-xigua-v3.mp4">
                </video>
              </div>
              <div class="distribute-platform-video-item">
                <video class="distribute-platform-video" preload="preload" autoplay muted
                  src="@/assets/images/video/distribute-dongchedi-v2.mp4">
                </video>
              </div>
              <div class="distribute-platform-video-item">
                <video class="distribute-platform-video" preload="preload" autoplay muted
                  src="@/assets/images/video/distribute-wukong-v2.mp4">
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="service-plan show-content" v-slide-in>
      <div class="title">服务包助力优质作者创作</div>
      <div class="subtitle">多渠道流量扶持，多种签约计划，助力优质内容快速完成 0 到 1 冷启动</div>
      <div class="plan-list" v-slide-in>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="粉丝推荐" name="first"></el-tab-pane>
          <el-tab-pane label="MCN签约" name="second"></el-tab-pane>
          <el-tab-pane label="智能加权推荐" name="third"></el-tab-pane>
          <el-tab-pane label="千人万元" name="fourth"></el-tab-pane>
        </el-tabs>
      </div>

      <div class="swiper-container" v-slide-in>
        <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(-989.375px, 0px, 0px);">
          <img class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
            src="@/assets/images/welcome-fans-v2.png" data-swiper-slide-index="0" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
            src="@/assets/images/welcome-mcn-v3.png" data-swiper-slide-index="1" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate" src="@/assets/images/welcome-weights-v3.png"
            data-swiper-slide-index="2" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
            src="@/assets/images/welcome-thousand-v2.png" data-swiper-slide-index="3" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-active" src="@/assets/images/welcome-fans-v2.png"
            data-swiper-slide-index="0" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-next" src="@/assets/images/welcome-mcn-v3.png"
            data-swiper-slide-index="1" style="width: 395.75px;">
          <img class="swiper-slide" src="@/assets/images/welcome-weights-v3.png" data-swiper-slide-index="2"
            style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate-prev" src="@/assets/images/welcome-thousand-v2.png"
            data-swiper-slide-index="3" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
            src="@/assets/images/welcome-fans-v2.png" data-swiper-slide-index="0" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
            src="@/assets/images/welcome-mcn-v3.png" data-swiper-slide-index="1" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate" src="@/assets/images/welcome-weights-v3.png"
            data-swiper-slide-index="2" style="width: 395.75px;">
          <img class="swiper-slide swiper-slide-duplicate" src="@/assets/images/welcome-thousand-v2.png"
            data-swiper-slide-index="3" style="width: 395.75px;">
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>

    </div>

    <div class="traffic-monetizing show-content" v-slide-in>
      <div class="title">六大工具助力内容变现</div>
      <div class="subtitle">未来一年，将推出“创作者收益计划”、“IP-UP计划”，让一万位创作者月薪过万，帮助创作者打造IP</div>
      <div class="traffic-monetizing-wrapper" v-slide-in>
        <div class="traffic-monetizing-item">
          <div class="traffic-monetizing-item-flex">
            <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23.906 14.51c0 5.57-4.446 10.065-9.906 10.065-5.46 0-9.906-4.495-9.906-10.066 0-2.838 1.155-5.4 3.013-7.228L8.2 6.283c1.6-1.46 3.578-2.44 5.708-2.828a.513.513 0 01.184 0A11.543 11.543 0 0119.8 6.283l1.093.998a10.112 10.112 0 013.013 7.228z"
                stroke="#000" stroke-width="1.6">
              </path>
              <path d="M10.606 14.65c.675-.857 1.707-1.07 2.562-.527l.832.527.832.528c.854.542 1.886.33 2.562-.528"
                stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
            <div class="traffic-monetizing-item-title">流量分成</div>
          </div>
          <div class="traffic-monetizing-item-desc">创作者发布文章时选择投放广告，或发布西瓜视频，即可获得创作收益分成，收益全部归创作者所有</div>
        </div>
        <div class="traffic-monetizing-item">
          <div class="traffic-monetizing-item-flex"><svg width="28" height="28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="5.25" y="5.25" width="17.5" height="17.5" rx="2" stroke="#000" stroke-width="1.478"></rect>
              <path d="M10.938 13.125h6.124M12.25 15.75h3.5M14 12.688v5.687M12.25 10.063L14 12.25l1.75-2.188"
                stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="traffic-monetizing-item-title">现金激励</div>
          </div>
          <div class="traffic-monetizing-item-desc">创作者参与平台创作活动所获的现金激励，包括不限于有奖创作活动、青云计划奖励、平台签约奖励</div>
        </div>
        <div class="traffic-monetizing-item">
          <div class="traffic-monetizing-item-flex"><svg width="28" height="29" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.499 23.252l6.372-7.965c.58-.726.87-1.09.98-1.49a1.999 1.999 0 00-.01-1.081c-.117-.4-.413-.757-1.007-1.473L18.92 6.531c-.353-.425-.529-.637-.745-.79a2 2 0 00-.633-.297c-.256-.069-.532-.069-1.084-.069h0-4.918 0c-.552 0-.828 0-1.084.069a2 2 0 00-.633.297c-.216.153-.392.365-.745.79l-3.913 4.712c-.594.716-.89 1.073-1.007 1.473a2 2 0 00-.01 1.08c.11.402.4.765.98 1.49l6.372 7.966c.854 1.067 1.281 1.601 1.797 1.794a2 2 0 001.404 0c.516-.193.943-.727 1.797-1.794z"
                stroke="#000" stroke-width="1.6"></path>
              <path d="M16.625 16.968l-1.99 2.488a.813.813 0 01-1.27 0l-1.99-2.488" stroke="#000" stroke-width="1.6"
                stroke-linecap="round"></path>
            </svg>
            <div class="traffic-monetizing-item-title">内容付费</div>
          </div>
          <div class="traffic-monetizing-item-desc">创作者创建优质专栏、圈子等付费内容，经平台推荐、用户付费后的收益，按比例分成归创作者所有</div>
        </div>
        <div class="traffic-monetizing-item">
          <div class="traffic-monetizing-item-flex"><svg width="28" height="28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.57 7.826c.08-1.04.121-1.56.35-1.955a2 2 0 01.864-.799c.41-.197.932-.197 1.976-.197h8.48c1.044 0 1.566 0 1.976.197a2 2 0 01.864.8c.229.393.27.913.35 1.954l.926 11.85c.093 1.198.14 1.797-.064 2.259a2 2 0 01-.88.95c-.444.24-1.045.24-2.247.24H8.835c-1.202 0-1.803 0-2.247-.24a2 2 0 01-.88-.95c-.204-.462-.157-1.061-.064-2.26l.926-11.85z"
                stroke="#000" stroke-width="1.6"></path>
              <path d="M10.794 9.45l.138.69A3.128 3.128 0 0014 12.657v0a3.128 3.128 0 003.067-2.515l.138-.691"
                stroke="#000" stroke-width="1.6" stroke-linecap="round"></path>
            </svg>
            <div class="traffic-monetizing-item-title">内容电商</div>
          </div>
          <div class="traffic-monetizing-item-desc">创作者可在全体裁内容中插入商品卡，用户实际购买并确认收到商品之后，作者可获得相应佣金收益</div>
        </div>
        <div class="traffic-monetizing-item">
          <div class="traffic-monetizing-item-flex"><svg width="28" height="28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 11.02a2 2 0 011.465-1.927l14-3.889A2 2 0 0123 7.131V18.87a2 2 0 01-2.535 1.927l-14-3.89A2 2 0 015 14.98v-3.96z"
                stroke="#000" stroke-width="1.6"></path>
              <path d="M17.375 23.375l-1.125-.313-2.25-.625-2.25-.625-1.125-.312" stroke="#000" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="traffic-monetizing-item-title">内容营销</div>
          </div>
          <div class="traffic-monetizing-item-desc">创作者为品牌主定制创作优质推广内容，交付内容之后，即可获得来自品牌主的酬劳，实现内容变现</div>
        </div>
        <div class="traffic-monetizing-item">
          <div class="traffic-monetizing-item-flex"><svg width="28" height="28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.642 14.814a1 1 0 010-1.628l4.715-3.363a1 1 0 011.58.814v6.726a1 1 0 01-1.58.814l-4.715-3.363z"
                stroke="#000" stroke-width="1.6"></path>
              <rect x="3.5" y="6.795" width="16.625" height="14.41" rx="2" fill="#fff" stroke="#000" stroke-width="1.6">
              </rect>
              <circle cx="7.305" cy="10.805" r="0.875" fill="#000" stroke="#000" stroke-width="0.6"></circle>
            </svg>
            <div class="traffic-monetizing-item-title">头条直播</div>
          </div>
          <div class="traffic-monetizing-item-desc">创作者通过直播，可与粉丝进行深度互动，赚取直播打赏，以优质内容获得更多粉丝关注和打赏收益</div>
        </div>

      </div>
    </div>

    <div class="top-author show-content" v-slide-in>
      <div class="title">180万+创作者共同创造</div>
      <div class="subtitle">在今日头条，与你一起看见更大的世界</div>
      <div class="icon-left switch-icon" @click="toggleContent">
        <svg width="122" height="122" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#author-left_svg__filter0_d)">
            <circle cx="61" cy="41" r="20" transform="rotate(-180 61 41)" stroke="#EFEFEF" stroke-width="2"></circle>
          </g>
          <path d="M62 45l-4-4 4-4" stroke="#F04142" stroke-width="1.4"></path>
          <defs>
            <filter id="author-left_svg__filter0_d" x="0" y="0" width="122" height="122" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
              <feOffset dy="20"></feOffset>
              <feGaussianBlur stdDeviation="20"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0.458507 0 0 0 0 0.51401 0 0 0 0 0.579167 0 0 0 0.06 0"></feColorMatrix>
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
      <div class="icon-right switch-icon" @click="toggleContent">
        <svg width="122" height="122" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#author-right_svg__filter0_d)">
            <circle cx="61" cy="41" r="20" stroke="#EFEFEF" stroke-width="2"></circle>
          </g>
          <path d="M60 37l4 4-4 4" stroke="#F04142" stroke-width="1.4"></path>
          <defs>
            <filter id="author-right_svg__filter0_d" x="0" y="0" width="122" height="122" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
              <feOffset dy="20"></feOffset>
              <feGaussianBlur stdDeviation="20"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0.458507 0 0 0 0 0.51401 0 0 0 0 0.579167 0 0 0 0.06 0"></feColorMatrix>
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
      <div class="content-wrapper" v-slide-in>
        <div class="content init" id="content1" v-if="content === 'content1'">
          <div class="author-item first-line" style="left: 114px;">
            <div class="author-item-bg"></div>
            <img class="author-item-avatar" src="@/assets/images/top-author-1.png">
            <div class="author-item-name">丁香医生</div>
            <div class="author-item-desc">知名健康领域创作者，专注于做有温度、有知识、有态度的优质大众健康内容。目前在头条拥有149万粉丝，青云计划多次获奖者。</div>
          </div>
          <div class="author-item first-line" style="left: 342px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-2.png">
            <div class="author-item-name">美食作家王刚</div>
            <div class="author-item-desc">知名美食领域创作者，因其在头条创作的视频风格利落生猛，开创了「硬核美食」流派，在头条拥有超过千万粉丝，爆红全网。</div>
          </div>
          <div class="author-item first-line" style="left: 570px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-3.png">
            <div class="author-item-name">混子曰</div>
            <div class="author-item-desc">优质科普领域创作者，擅长用有趣独特的漫画让复杂难懂的知识流行起来。深受大众喜爱，在头条拥有 139万粉丝。</div>
          </div>
          <div class="author-item first-line" style="left: 798px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-4.png">
            <div class="author-item-name">李永乐老师</div>
            <div class="author-item-desc">中国人民大学附属中学物理教师，优质科普创作者，头条系平台粉丝超千万，多条视频被央视、人民日报等转载。</div>
          </div>
          <div class="author-item  second-line" style="left: 114px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-5.png">
            <div class="author-item-name">巧妇9妹</div>
            <div class="author-item-desc">三农领域创作者，获2018年CCTV“中国三农人物奖”，帮助村里的滞销水果找到新销路，帮助家乡农户增收，间接带动就业。</div>
          </div>
          <div class="author-item  second-line" style="left: 342px;">
            <div class="author-item-bg"></div><img class="author-item-avatar bordered"
              src="@/assets/images/top-author-6.png">
            <div class="author-item-name">第一军情</div>
            <div class="author-item-desc">优质军事领域创作者，资深军事记者和著名党史、军史专家。始终用一丝不苟的精神提供及时、独家、深度的军事报道和评论分析。</div>
          </div>
          <div class="author-item  second-line" style="left: 570px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-7.png">
            <div class="author-item-name">我是郭杰瑞</div>
            <div class="author-item-desc">中外文化体验者，记录在中国的体验，对比中美文化，吐槽奇闻逸事，因视频风格幽默，性格有趣深受大众喜爱，全网粉丝超千万。</div>
          </div>
          <div class="author-item  second-line" style="left: 798px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-8.png">
            <div class="author-item-name">张之瀛大夫</div>
            <div class="author-item-desc">心内科医生，今日头条健康真相官。坚持用看诊的业余时间在头条上向百万人科普心脑血管知识，专业、靠谱的医学知识。</div>
          </div>
        </div>
        <div class="content hidden init" id="content2" v-else>
          <div class="author-item  first-line" style="left: 114px;">
            <div class="author-item-bg"></div>
            <img class="author-item-avatar" src="@/assets/images/top-author-9.png">
            <div class="author-item-name">脑洞历史观</div>
            <div class="author-item-desc">文史作家，历史问答专家，4 年时间图文累计阅读量达13亿，曾凭借一己之力将《DK博物大百科》这本书卖到全网断货。</div>
          </div>
          <div class="author-item  first-line" style="left: 342px;">
            <div class="author-item-bg"></div>
            <img class="author-item-avatar" src="@/assets/images/top-author-10.png">
            <div class="author-item-name">黎贝卡的异想世界</div>
            <div class="author-item-desc">时尚领域优质创作者，前《南方都市报》首席记者，人称“买买买教主”的她，用热爱打造自己的创作标签，在头条获赞无数。</div>
          </div>
          <div class="author-item  first-line" style="left: 570px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-11.png">
            <div class="author-item-name">张召忠</div>
            <div class="author-item-desc">原国防大学教授、退役海军少将、著名军事专家。研究范围涉及科学技术、武器装备、军事战略、国防建设、国际法规等多个学科领域。</div>
          </div>
          <div class="author-item  first-line" style="left: 798px;">
            <div class="author-item-bg"></div><img class="author-item-avatar bordered"
              src="@/assets/images/top-author-12.png">
            <div class="author-item-name">人民日报</div>
            <div class="author-item-desc">作为人民日报的官方头条号，已于2018年9月入驻发布内容。有品质的新闻，参与、沟通、记录时代。</div>
          </div>
          <div class="author-item  second-line" style="left: 114px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-13.png">
            <div class="author-item-name">新华社</div>
            <div class="author-item-desc">有新闻的地方就有新华社，这是来自国家通讯社的声音。作为新华通讯社的官方头条号，发布重大新闻、突发事件、重点报道。</div>
          </div>
          <div class="author-item  second-line" style="left: 342px;">
            <div class="author-item-bg"></div><img class="author-item-avatar" src="@/assets/images/top-author-14.png">
            <div class="author-item-name">央视新闻</div>
            <div class="author-item-desc">中央电视台新闻中心通过今日头条客户端发布内容的官方渠道。在 2018 年发起的直播中，有 78 场，观看人数超过 100 万。</div>
          </div>
          <div class="author-item  second-line" style="left: 570px;">
            <div class="author-item-bg"></div><img class="author-item-avatar bordered"
              src="@/assets/images/top-author-15.png">
            <div class="author-item-name">中国政府网</div>
            <div class="author-item-desc">作为中国政府网的官方头条号，第一时间，权威发布大政方针、政策解读、便民信息。国家大事早知道。</div>
          </div>
          <div class="author-item  second-line" style="left: 798px;">
            <div class="author-item-bg"></div><img class="author-item-avatar bordered"
              src="@/assets/images/top-author-16.png">
            <div class="author-item-name">中央政法委长安剑</div>
            <div class="author-item-desc">作为中央政法委官方账号，在各类社会热点事件中理性发声，定分止争，弘扬法治精神，影响力不断攀升。</div>
          </div>
        </div>
        <div class="welcome-footer">
          <div class="footer-2">
            <a target="__blank" href="#">关于今日头条</a>
            <span class="v-line"></span>
            <a target="__blank" href="#">用户协议</a>
            <span class="v-line"></span>
            <a target="__blank" href="#">隐私政策</a>
            <span class="v-line"></span>
            <a target="__blank" href="#">社区规范</a>
            <span class="v-line"></span>
            <a target="__blank" href="#">自律公约</a>
            <span class="v-line"></span>
            <a target="__blank" href="#">联系我们</a>
            <span class="v-line"></span>
            <span id="year">2024 toutiao.com. All Rights Reserved</span>
          </div>
          <div class="footer-1">客服邮箱：mp@toutiao.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-container {
  .login-header.show-header {
    opacity: 1;
    z-index: 100;
    pointer-events: auto;
  }

  .login-header {
    height: 64px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 60px rgba(117, 131, 148, .1);
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s cubic-bezier(.34, .69, .1, 1);

    .logo {
      flex-shrink: 0;
      width: 100px;
      height: 28px;
      background-image: url("@/assets/images/logo-title.svg");
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      top: 19px;
      left: calc(50% - 512px);
    }


    .btn-wrapper {
      position: absolute;
      top: 17px;
      right: calc(50% - 512px);
      display: flex;
      width: 155px;
      justify-content: space-between;
      font-size: 14px;

      .el-button {
        padding: 12px 20px;
      }
    }
  }

  .first-screen {
    position: relative;
    width: 100%;
    height: 100vh;
    min-width: 1024px;

    .video-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;

      .video {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: left;
        object-position: left;
      }
    }

    .first-screen-logo {
      position: absolute;
      top: 60px;
      left: calc(50% - 512px);
      width: 79px;
      height: 27px;
    }

    .login-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 8px;
    }

    .web-login-container {
      width: -webkit-min-content;
      width: -moz-min-content;
      width: min-content;
      -webkit-font-smoothing: antialiased;
    }

    .web-login {
      border-radius: 8px;
    }

    .web-login {
      width: 100%;
      position: relative;
      font-family: PingFang SC;
      background-color: #fff;
    }
.web-login article {
  display: block;
}
.web-login .web-login-union__login {
  display: flex;
  padding: 40px 0 44px;
}
.web-login .web-login-union__login__form {
  padding: 0 48px 0 40px;
}

.web-login .web-login-union__login__form__title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #222;
}
.web-login .web-login-union__login__form__content {
  width: 308px;
}
.web-login .web-login-mobile-code__mobile-input-wrapper {
  margin-top: 28px;
}

.web-login .web-login-button-input,
.web-login .web-login-normal-input {
  height: 40px;
  line-height: 24px;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
}

.web-login .web-login-normal-input {
  display: flex;
  width: 100%;
  box-sizing: border-box;
}

.web-login .web-login-area-code {
  display: flex;
  height: 100%;
  font-size: 14px;
  line-height: 22px;
  position: relative;
  margin-right: 8px;
}
.web-login .web-login-area-code__input-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}
.web-login .web-login-area-code__input-wrapper__input {
  min-width: 26px;
  max-width: 42px;
  height: 100%;
  font-size: 14px;
  line-height: 22px;
  color: #222;
  text-align: left;
}
.web-login input {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: none;
}
.web-login .web-login-area-code__input-wrapper__icon-arrow__down {
  transform: rotate(0);
  transition: transform .5s;
}

.web-login .web-login-area-code__input-wrapper__icon-arrow {
  display: block;
  width: 16px;
  height: 16px;
  background: url("@/assets/images/arrow.png") no-repeat 50%;
  background-size: 16px 16px;
}
.web-login .web-login-button-input__input,
.web-login .web-login-normal-input__input {
  background: #fff;
}

.web-login .web-login-normal-input__input {
    width: 100%;
    height: 100%;
    line-height: 100%;
    font-size: 14px;
}




    .first-screen-muted {
      position: absolute;
      bottom: 44px;
      right: 100px;
      cursor: pointer;
      height: 32px;
      width: 32px;
    }

    .first-screen-mouse-hint {
      position: absolute;
      bottom: 81px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 14px;
      line-height: 20px;
    }

    .first-screen-mouse {
      width: 28px;
      height: 31px;
      position: absolute;
      bottom: 42px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }

  .group-source {
    padding-top: 120px;

    .title {
      line-height: 40px;
      color: #222;
      text-align: center;
      font-size: 36px;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 20px;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #666;
    }



    .group-source-wrapper {
      width: 1024px;
      display: flex;
      margin: 40px auto 0;
      flex-wrap: wrap;
      justify-content: space-between;

      .group-source-item {
        position: relative;
        margin-top: 20px;
        box-shadow: 0 0 60px rgba(117, 131, 148, .1);
        border-radius: 8px;
        width: 328px;
        min-width: 328px;
        height: 260px;
        padding: 62px 24px 40px 32px;
        transition: box-shadow .35s ease, transform .35s ease;

        .group-source-item-svg {
          height: 48px;
          width: 48px;
        }

        .group-source-item-title {
          margin-top: 34px;
          margin-left: 8px;
          color: #222;
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
        }

        .group-source-item-desc {
          margin-top: 12px;
          margin-left: 8px;
          font-size: 14px;
          line-height: 20px;
          color: #666;
        }
      }

      .group-source-item:after {
        content: " ";
        height: 2px;
        width: 0;
        background-color: #f04142;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: width .35s ease;
      }

      .group-source-item:hover:after {
        width: 100%;
        transition: width .35s ease;
      }

      .group-source-item:hover {
        box-shadow: 0 10px 80px rgba(117, 131, 148, .24);
        transform: translateY(-8px);
      }

      .group-source-item:hover .group-source-item-svg svg {
        animation: shakeAnimation 0.5s ease-in-out forwards;
      }

      @keyframes shakeAnimation {
        0% {
          transform: rotate(0deg);
        }

        25% {
          transform: rotate(30deg);
        }

        50% {
          transform: rotate(-30deg);
        }

        75% {
          transform: rotate(30deg);
        }

        100% {
          transform: rotate(0deg);
        }
      }

    }
  }

  .show-content {
    /* -webkit-animation: showContent .5s; */
    animation: showContent .5s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-timing-function: cubic-bezier(.34, .69, .1, 1);
    animation-timing-function: cubic-bezier(.34, .69, .1, 1);
  }

  .distribute-platform {
    padding-top: 120px;
    overflow: hidden;

    .title {
      line-height: 40px;
      color: #222;
      text-align: center;
      font-size: 36px;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 20px;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #666;
    }

    .distribute-platform-content {
      width: 1210px;
      margin: 0 auto;
      display: flex;
      // transform: translateX(94px); // 有一些bug
      position: relative;
      left: 94px;

      .distribute-platform-text {
        width: 522px;
        box-shadow: inset 0 -1px 0 #ececec;
        height: -webkit-fit-content;
        height: -moz-fit-content;
        height: fit-content;
        margin-top: 110px;

        .distribute-platform-item {
          box-shadow: inset 0 1px 0 #ececec;
          padding: 36px 0;

          .distribute-platform-item-content {
            display: flex;
            align-items: center;

            .distribute-platform-item-avatar {
              width: 48px;
              height: 48px;
            }

            .distribute-platform-item-title {
              margin-left: 16px;
              font-size: 20px;
              font-weight: 500;
              flex-grow: 1;
            }

            svg {
              font-size: 16px;
              transition: transform .35s ease;
            }
          }

          .distribute-platform-item-desc {
            width: 360px;
            height: 0;
            margin-left: 64px;
            margin-top: 4px;
            font-size: 16px;
            line-height: 24px;
            color: #666;
            overflow: hidden;
            opacity: 0;
            transition: height 0.35s ease, opacity 0.35s ease;
          }
        }

        .distribute-platform-item:hover .distribute-platform-item-desc {
          height: 80px;
          opacity: 1;
        }
      }

      .distribute-platform-phone {
        width: 596px;
        height: 945px;
        background: url("@/assets/images/distribute-bg.png") no-repeat;
        background-size: contain;
        padding: 108px 0 0 108px;
        margin-left: 90px;
        margin-top: -40px;

        .distribute-platform-phone-wrapper {
          width: 300px;
          overflow: hidden;
          border-radius: 32px;
          height: 650px;

          .distribute-platform-phone-container {
            width: 1240px;
            transition: transform .35s ease;
            background-color: #000;

            .distribute-platform-video-item {
              width: 300px;
              height: 650px;
              margin-right: 10px;
              border-radius: 32px;
              overflow: hidden;
              display: inline-block;

              .distribute-platform-video {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }

    .distribute-platform-phone-container {
      transition: transform 0.3s ease;
    }

    .distribute-platform-phone-container.toutiao {
      transform: translateX(0);
    }

    .distribute-platform-phone-container.xigua {
      transform: translateX(-310px);
    }

    .distribute-platform-phone-container.dongchedi {
      transform: translateX(-620px);
    }

    .distribute-platform-phone-container.wukong {
      transform: translateX(-930px);
    }
  }

  .service-plan {
    padding-bottom: 120px;
    position: relative;
    opacity: 1;
    margin-top: -40px;

    .title {
      line-height: 40px;
      color: #222;
      text-align: center;
      font-size: 36px;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 20px;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #666;
    }

    .plan-list {
      margin: 52px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-container {
      margin-left: auto;
      margin-right: auto;
      position: relative;
      overflow: hidden;
      list-style: none;
      padding: 0;
      z-index: 1;
    }

    .swiper-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      transition-property: transform;
      box-sizing: content-box;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .3s;
      transform: scale(.8);
      flex-shrink: 0;
      align-self: flex-start;
      border-radius: 16px;
      cursor: pointer;
    }

    .swiper-slide.swiper-slide-active {
      transform: scale(1);
      cursor: auto;
    }


  }

  .traffic-monetizing {
    padding: 120px 0;
    background-color: #fbfbfb;
    opacity: 1;

    .title {
      line-height: 40px;
      color: #222;
      text-align: center;
      font-size: 36px;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 20px;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #666;
    }

    .traffic-monetizing-wrapper {
      width: 1024px;
      display: flex;
      margin: 45px auto 0;
      flex-wrap: wrap;
      justify-content: space-between;

      .traffic-monetizing-item {
        margin-top: 15px;
        background: #fff;
        border-radius: 8px;
        width: 330px;
        min-width: 330px;
        height: 134px;
        padding: 22px 20px 20px;
        transition: box-shadow .35s ease, transform .35s ease;

        .traffic-monetizing-item-flex {
          display: flex;

          .traffic-monetizing-item-title {
            margin-left: 6px;
            color: #222;
            font-size: 16px;
            line-height: 28px;
            font-weight: 500;
          }
        }

        .traffic-monetizing-item-desc {
          margin-top: 8px;
          margin-left: 34px;
          font-size: 14px;
          line-height: 20px;
          color: #666;
        }
      }

      .traffic-monetizing-item:hover {
        box-shadow: 0 10px 80px rgba(117, 131, 148, .24);
        transform: translateY(-8px);
      }

      .traffic-monetizing-item:hover .traffic-monetizing-item-flex svg {
        animation: shakeAnimation 0.5s ease-in-out forwards;
      }

      @keyframes shakeAnimation {
        0% {
          transform: rotate(0deg);
        }

        25% {
          transform: rotate(30deg);
        }

        50% {
          transform: rotate(-30deg);
        }

        75% {
          transform: rotate(30deg);
        }

        100% {
          transform: rotate(0deg);
        }
      }
    }
  }

  .top-author {
    padding: 120px 0 687px;
    position: relative;
    opacity: 1;

    .title {
      line-height: 40px;
      color: #222;
      text-align: center;
      font-size: 36px;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 20px;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #666;
    }

    .icon-left {
      left: calc(50% - 512px);
    }

    .switch-icon {
      position: absolute;
      bottom: 384px;
      width: 41px;
      height: 42px;
      z-index: 2;
      overflow: hidden;
      border-radius: 100%;

      svg {
        position: relative;
        top: -20px;
        left: -41px;
        cursor: pointer;
      }
    }

    .switch-icon:hover {
      box-shadow: 0 0 60px rgba(117, 131, 148, .28);
    }

    .icon-right {
      right: calc(50% - 512px);
    }

    .content-wrapper {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 687px;
      bottom: 0;
      left: 0;
      overflow: hidden;

      .content.show-left {
        -webkit-animation: showLeftPos .35s, showOpacity .7s;
        animation: showLeftPos .35s, showOpacity .7s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-timing-function: ease, cubic-bezier(.34, .69, .1, 1);
        animation-timing-function: ease, cubic-bezier(.34, .69, .1, 1);
      }

      .content {
        width: 1048px;
        left: calc(50% - 524px);
        opacity: 1;
        position: absolute;
        z-index: 1;

        .author-item.first-line {
          top: 60px;
          z-index: 1;
        }

        .author-item.second-line {
          top: 272px;
        }

        .author-item {
          width: 132px;
          display: inline-block;
          position: absolute;
          max-height: 168px;
          transition: max-height 0ms linear .45s, width 0ms linear .45s, transform 0ms linear .45s, top .4s ease;
          z-index: -1;
        }

        .author-item-bg {
          position: absolute;
          width: 100%;
          max-height: 100%;
          height: 100%;
          opacity: 0;
          border-radius: 8px;
          box-shadow: 0 0 60px rgba(117, 131, 148, .16);
          transition: opacity .4s ease;
        }

        .author-item-avatar {
          display: block;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 30px auto 16px;
        }

        .author-item-name {
          color: #222;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
        }

        .author-item-desc {
          color: #666;
          font-size: 13px;
          line-height: 20px;
          margin-top: 20px;
          padding: 0 20px 24px;
          opacity: 0;
          max-height: 0;
          z-index: 1;
          transition: max-height 0 linear .4s, opacity .4s ease;
          overflow: hidden;
          background-color: #fff;
        }

        .author-item:hover .author-item-bg {
          opacity: 1;
          transition: opacity .4s ease;
        }

        .author-item:hover {
          width: 240px;
          background: #fff;
          max-height: 400px;
          transform: translateX(-54px);
          transition: max-height .4s ease, width 0ms linear, transform 0ms linear, top .4s ease;
        }

        .author-item.first-line:hover {
          top: 52px;
        }

        .author-item:hover .author-item-desc {
          max-height: 232px;
          opacity: 1;
          transition: max-height .4s ease, opacity .4s ease;
        }

        .author-item.second-line:hover {
          top: 264px;
        }
      }

      .content.hidden {
        z-index: 0;
        opacity: 1;
      }

      .welcome-footer {
        text-align: center;
        color: #222;
        font-size: 12px;
        line-height: 16px;
        margin-top: 615px;
        padding-top: 16px;
        position: relative;

        .footer-2 {
          position: absolute;
          top: 0;
          width: 100%;

          a {
            color: #222;
          }

          .v-line {
            margin: 0 12px;
            background: #222;
            width: 1px;
            height: 10px;
            display: inline-block;
            transform: translateY(1px);
          }
        }

        .footer-1 {
          padding-top: 12px;
        }
      }
    }
  }

}

@media screen and (max-height: 656px) {
  .login-wrap {
    bottom: -102px;
    top: unset;
  }
}
</style>
