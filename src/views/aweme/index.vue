<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import awemeLogoUrl from '@/assets/images/base64/aweme-logo.dataurl?raw'
import awemeQrUrl from '@/assets/images/base64/aweme-qr.dataurl?raw'
import awemeGrayUrl from '@/assets/images/base64/aweme-icon-gray.dataurl?raw'
import awemeTipsUrl from '@/assets/images/base64/aweme-tips.dataurl?raw'
import awemeselectUrl from '@/assets/images/base64/aweme-select.dataurl?raw'
import awemeloginUrl from '@/assets/images/base64/aweme-login.dataurl?raw'
import { areaCodes } from '@/utils/areaCodes';

// 快捷安全登录和手机验证码登录切换
const authLogin = ref(false);
const isAuthLogin = () => {
    authLogin.value = !authLogin.value
}
// 是否显示国家地区代码
const isShowAreaCode = ref<boolean>(false);
const handleAreaCode = () => {
    isShowAreaCode.value = !isShowAreaCode.value;
}

// 当前选定的区号
const selectedArea = ref('+86');
const selectAreaCode = (code: string) => {
    selectedArea.value = code;
    isShowAreaCode.value = false; // 关闭国家地区代码列表
}







// 显示隐藏 Tips
const tipsVisible = ref(false);
const showTips = () => {
    tipsVisible.value = true;
}
const hideTips = () => {
    tipsVisible.value = false;
}

onUnmounted(() => {
});

</script>

<template>
    <div class="page-container">
        <div class="header-container">
            <div class="logo-wrapper">
                <img class="aweme-logo" :src=awemeLogoUrl alt="抖音">
            </div>
        </div>
        <div class="content-container">
            <div class="auth-container" v-if="!authLogin">
                <div class="auth-qr-container">
                    <p class="hint-title">
                        <span>快捷安全登录</span>
                    </p>
                    <div class="hint-download">
                        <span>使用 </span>
                        <a href="https://www.douyin.com/" target="_blank" rel="noopener noreferrer">
                            抖音APP
                        </a>
                        <span>，打开「首页 - 扫一扫」</span>
                        <div style="display: inline-block;" @mouseover="showTips" @mouseout="hideTips">
                            <div :style="{ position: 'relative', visibility: tipsVisible ? 'visible' : 'hidden' }">
                                <div class="tip-content" style="top: -112px; left: -67px;">
                                    <div class="overlap-wrap">
                                        <img class="guide-img" src="@/assets/images/guide-img.svg">
                                        <span class="guide-txt">首页点击左上角「扫一扫」</span>
                                    </div>
                                    <div class="tip-arrow"
                                        style="top: 103px; left: 63px; transform: rotate(0deg); width: 24px; height: 8px;">
                                        <svg width="24" height="8" xmlns="http://www.w3.org/2000/svg"
                                            class="popover-icon-arrow top">
                                            <path
                                                d="M0 0.5L0 1.5C4 1.5, 5.5 3, 7.5 5S10,8 12,8S14.5 7, 16.5 5S20,1.5 24,1.5L24 0.5L0 0.5z"
                                                fill="rgba(255,255,255,.08)" opacity="1"></path>
                                            <path
                                                d="M0 0L0 1C4 1, 5.5 2, 7.5 4S10,7 12,7S14.5  6, 16.5 4S20,1 24,1L24 0L0 0z"
                                                fill="rgba(255,255,255,1)"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <img alt="tips" :src=awemeTipsUrl class="icon-tips-grey">
                        </div>
                    </div>
                    <div class="qr-container">
                        <img class="qr" :src="awemeQrUrl" alt="二维码图片">
                    </div>
                    <div class="tips-container">
                        <span class="tips-content"></span>
                    </div>
                </div>
                <div class="login-type" @click="isAuthLogin">
                    <span class="linkblue">
                        <span>手机验证码登录</span>
                    </span>
                </div>
            </div>
            <div class="auth-container" v-else>
                <div class="auth-phone-container">
                    <div class="auth-phone-title">手机验证码登录</div>
                    <div class="block-container phone-container">
                        <div class="district-container input-bg" @click="handleAreaCode">
                            <span>{{ selectedArea }}</span>
                            <img class="icon-select" :src=awemeselectUrl alt="国家和地区">
                        </div>
                        <input type="text" id="phone-num" name="phone" class="input-bg" placeholder="请输入手机号" value=""
                            maxlength="11">
                    </div>
                    <div class="district-list" v-if="isShowAreaCode">
                        <div class="district-item" v-for="(item, index) in areaCodes" :key="index"
                            @click="selectAreaCode(item.value)">{{ item.label }} ({{ item.value }})</div>
                    </div>





                    <div class="block-container code-container ">
                        <input class="input-bg" type="text" id="code" name="code" placeholder="请输入验证码" maxlength="4"
                            value="">
                        <div class="countdown input-bg disable">获取验证码</div>
                    </div>
                    <div class="tips-container">
                        <span class="tips-content"></span>
                    </div>
                    <div class="btn-login">
                        <img :src="awemeloginUrl" alt="抖音">抖音授权登录
                    </div>
                    <div class="hint-privacy">
                        <div style="display: inline-block;">
                            <div style="position: relative; visibility: hidden;">
                                <div class="tip-content" style="top: 0px; left: 0px;">
                                    <div class="text-wrap">
                                        <span class="guide-txt">请勾选用户协议和隐私政策</span>
                                    </div>
                                    <div class="tip-arrow"
                                        style="top: 0px; left: 0px; transform: rotate(0deg); width: 24px; height: 8px;">
                                        <svg width="24" height="8" xmlns="http://www.w3.org/2000/svg"
                                            class="popover-icon-arrow top">
                                            <path
                                                d="M0 0.5L0 1.5C4 1.5, 5.5 3, 7.5 5S10,8 12,8S14.5 7, 16.5 5S20,1.5 24,1.5L24 0.5L0 0.5z"
                                                fill="rgba(255,255,255,.08)" opacity="1">
                                            </path>
                                            <path
                                                d="M0 0L0 1C4 1, 5.5 2, 7.5 4S10,7 12,7S14.5  6, 16.5 4S20,1 24,1L24 0L0 0z"
                                                fill="#252632">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="checkbox-wrap">
                                <!-- <span class="privacy-check-wrap"></span> -->
                                <el-checkbox class="privacy-check-wrap" />
                            </div>
                        </div>
                        <div class="content">
                            <span>已阅读并同意</span>
                            <a href="/agreement/" target="_blank" rel="noopener noreferrer">
                                <span class="privacy"> 用户协议 </span></a>
                            <span>与</span>
                            <a href="/privacy/" target="_blank" rel="noopener noreferrer">
                                <span class="privacy">
                                    <span> 隐私政策 </span>
                                </span>
                            </a>
                        </div>
                        <div style="display: inline-block;">
                            <div style="position: relative; visibility: hidden;">
                                <div class="tip-content" style="top: 0px; left: 0px;">
                                    <div class="tip-arrow"
                                        style="top: 0px; left: 0px; transform: rotate(0deg); width: 8px; height: 24px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="login-type" @click="isAuthLogin">
                    <span class="linkblue">
                        <span>快捷安全登录</span>
                    </span>
                </div>
            </div>




            <div class="scope-container">
                <div class="client-info ">
                    <span class="client-name">头条号</span>
                    <span> 将获得以下权限</span>
                </div>
                <div class="scope-list-wrap">
                    <div class="client-scope">
                        <div class="scope-item ">
                            <div class="icon-scope icon-gray" :style="{ backgroundImage: 'url(' + awemeGrayUrl + ')' }">
                            </div>
                            <span class="text-left">获取你的抖音头像、昵称</span>
                        </div>
                        <div class="scope-item ">
                            <div class="icon-scope icon-gray" :style="{ backgroundImage: 'url(' + awemeGrayUrl + ')' }">
                            </div>
                            <span class="text-left">获得你的手机号码</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-container {
    width: 100%;
    height: 100%;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.header-container {
    background-color: #161823;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
}

.header-container .logo-wrapper {
    width: 800px;
    height: 36px;
    margin: 0 auto;
    text-align: left;
}

.header-container .logo-wrapper .aweme-logo {
    width: 86px;
    height: 36px;
}

img {
    border-style: none;
}

.content-container {
    position: relative;
    max-width: 800px;
    height: 414px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin: 96px auto;
    border: 1px solid rgba(22, 24, 35, .12);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 12px;
    background: radial-gradient(16.94% 22.31% at 92.06% 92.63%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(63% 56.89% at 78.19% -21.62%, rgba(255, 255, 255, 0.8) 0%, rgba(247, 252, 252, 0.8) 34.14%, rgba(255, 255, 255, 0) 100%), radial-gradient(38.69% 102.05% at 36.88% 102.05%, #f6fdfa 0%, #fff 29.12%, rgba(255, 255, 255, 0) 100%), url("@/assets/images/aweme-bg.png"), linear-gradient(180deg, rgba(253, 219, 234, 0.2) 0%, rgba(190, 253, 254, 0.2) 100%);
}

.content-container .auth-container {
    width: 400px;
    height: 390px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-top: 64px;
}

.auth-qr-container {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.auth-qr-container .hint-title {
    font-size: 18px;
    text-align: center;
    color: #2f3035;
    font-weight: 500;
    line-height: 26px;
    margin: 0 0 8px;
}

.auth-qr-container .hint-download {
    font-size: 14px;
    text-align: center;
    color: rgba(47, 48, 53, .4);
    position: relative;
    line-height: 22px;
}

.auth-qr-container .hint-download a,
.auth-qr-container .hint-download a:visited,
.auth-qr-container .hint-download a:hover,
.auth-qr-container .hint-download a:active {
    color: #fe2c55;
    text-decoration: none;
}

a {
    background-color: transparent;
}

.tip-content {
    position: absolute;
    display: block;
    overflow: visible;
    background: #fff;
    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    border-radius: 6px;
    padding: 12px;
    white-space: nowrap;
    z-index: 999;
}

.overlap-wrap {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 10px;
    line-height: 20px;
}

.overlap-wrap .guide-img {
    width: 126px;
    height: 60px;
}

.overlap-wrap .guide-txt {
    font-size: 10px;
    line-height: 20px;
    letter-spacing: .5px;
    color: rgba(47, 48, 53, .7);
}

.tip-content .tip-arrow {
    position: absolute;
    color: unset;
}

.tip-content .popover-icon-arrow {
    position: absolute;
    top: 0;
    left: 0;
}

.icon-tips-grey {
    vertical-align: text-bottom;
}

img {
    border-style: none;
}

.auth-qr-container .qr-container {
    position: relative;
    width: 160px;
    height: 160px;
    background: #fff;
    border: 1px solid rgba(22, 24, 35, .12);
    box-sizing: border-box;
    border-radius: 8px;
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-qr-container .qr-container .qr {
    width: 155px;
    height: 155px;
}

.auth-qr-container .qr-container .qr-expired {
    cursor: pointer;
    position: absolute;
    width: 154px;
    height: 154px;
    background-color: #fff;
    opacity: .96;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 2px;
    left: 2px;
}

.auth-qr-container .qr-container .qr-expired .qr-expired-img {
    width: 24px;
    height: 24px;
    margin-bottom: 16px;
}

.auth-qr-container .qr-container .hint-refresh {
    color: rgba(23, 26, 28, .65);
    font-size: 14px;
    line-height: 22px;
}

.auth-qr-container .tips-container {
    width: 320px;
    min-height: 20px;
    display: flex;
    color: #fe2c55;
    margin: 0 0 4px;
    align-items: center;
    justify-content: center;
}

.tips-container {
    font-size: 14px;
}

.content-container .auth-container .login-type {
    flex: 1 1;
    cursor: pointer;
}

.linkblue {
    color: #04498d;
    font-size: 14px;
}

.scope-container {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1 1;
    height: 358px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    border-left: 1px solid rgba(47, 48, 53, .06);
    margin-top: 32px;
    padding-top: 32px;
    padding-left: 30px;
    padding-right: 50px;
    font-size: 14px;
    text-align: left;
}

.scope-container .client-info {
    margin-bottom: 16px;
}

.scope-container .client-info .client-name {
    font-weight: 500;
    color: #2f3035;
}

.scope-container .client-info span {
    color: rgba(47, 48, 53, .4);
}

.scope-container .scope-list-wrap {
    height: 100%;
    overflow: hidden;
}

.scope-container .scope-list-wrap .client-scope {
    height: 100%;
    overflow-y: scroll;
    width: calc(100% + 17px);
}

.scope-container .scope-item {
    display: flex;
    margin-bottom: 16px;
    color: #2f3035;
    width: calc(100% - 17px);
}

.scope-container .scope-item .icon-gray {
    background-position: 0 -2px;
}

.scope-container .scope-item .icon-scope {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    background-size: 100% auto;
}



.auth-phone-container {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    font-size: 14px !important;
    margin-bottom: 24px;
}
.auth-phone-container .auth-phone-title {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #2f3035;
}
.auth-phone-container .phone-container {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.auth-phone-container .block-container {
    width: 272px;
    height: 40px;
    margin-top: 12px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.auth-phone-container .phone-container .district-container {
    width: 70px;
    height: 40px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 4px;
}
.auth-phone-container .phone-container .district-container {
    width: 70px;
    height: 40px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 4px;
}

.auth-phone-container .input-bg {
    background: rgba(46, 50, 56, .05);
    border-radius: 3px;
    height: 40px;
}
.auth-phone-container .phone-container .district-container .icon-select {
    height: 16px;
    width: 16px;
    margin-left: 8px;
}
.auth-phone-container .phone-container #phone-num {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1 1;
}

.auth-phone-container .block-container input {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0;
    border-width: 0;
    padding: 10px;
    background-color: rgba(46, 50, 56, .05);
}

.auth-phone-container .input-bg {
    background: rgba(46, 50, 56, .05);
    border-radius: 3px;
    height: 40px;
}
.auth-phone-container .code-container {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.auth-phone-container .block-container {
    width: 272px;
    height: 40px;
    margin-top: 12px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.auth-phone-container .code-container #code {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1 1;
    min-width: 150px;
    border-radius: 3px 0 0 3px;
}

.auth-phone-container .block-container input {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0;
    font: 400 14px;
    border-width: 0;
    padding: 10px;
    background-color: rgba(46, 50, 56, .05);
}

.auth-phone-container .input-bg {
    background: rgba(46, 50, 56, .05);
    height: 40px;
}

.auth-phone-container .code-container .countdown {
    padding: 10px;
    color: rgba(47, 48, 53, .7);
    text-align: right;
    cursor: pointer;
    border-radius: 0 3px 3px 0;
}

.auth-phone-container .input-bg {
    background: rgba(46, 50, 56, .05);
    border-radius: 3px;
    height: 40px;
}
.auth-phone-container .tips-container {
    width: 272px;
    height: auto;
    text-align: left;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    color: #fe2c55;
    margin: 4px 0 0;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.tips-container {
    font-size: 14px;
    min-height: 20px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    color: #fe2c55;
    margin: 14px 0 6px;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}

.auth-phone-container .btn-login {
    border-radius: 3px;
    background-color: #fe2c55;
    color: #fff;
    width: 272px;
    height: 40px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
}
.auth-phone-container .btn-login img {
    margin-right: 4px;
}
.auth-phone-container .hint-privacy {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: end;
    -ms-flex-align: end;
    align-items: end;
    margin-top: 8px;
    width: 272px;
}
.auth-phone-container .hint-privacy .tip-content {
    background-color: #252632;
    padding: 8px 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}

.tip-content {
    position: absolute;
    display: block;
    overflow: visible;
    background: #fff;
    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    border-radius: 6px;
    padding: 12px;
    white-space: nowrap;
    z-index: 999;
}
.auth-phone-container .hint-privacy .text-wrap {
    background: #252632;
    color: #fff;
}
.tip-content .tip-arrow {
    position: absolute;
    color: unset;
}

.tip-content .popover-icon-arrow {
    position: absolute;
    top: 0;
    left: 0;
}
.auth-phone-container .hint-privacy .checkbox-wrap {
    height: 27px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: end;
    -ms-flex-align: end;
    align-items: end;
    padding-bottom: 3px;
}
.privacy-check-wrap {
    width: 16px;
    height: 16px;
    border: 1px solid #e4e4e6;
    border-radius: 3px;
    display: inline-block;
    position: relative;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    cursor: pointer;
}
.auth-phone-container .hint-privacy .content {
    line-height: 22px;
    color: rgba(47, 48, 53, .4);
    text-align: left;
    margin-left: 4px;
}
.auth-phone-container .hint-privacy .content a {
    text-decoration: none;
}
.auth-phone-container .hint-privacy .content .privacy {
    color: #2f3035;
}
.auth-phone-container .hint-privacy .tip-content {
    background-color: #252632;
    padding: 8px 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}

.tip-content {
    position: absolute;
    display: block;
    overflow: visible;
    background: #fff;
    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    border-radius: 6px;
    padding: 12px;
    white-space: nowrap;
    z-index: 999;
}

.tip-content .tip-arrow {
    position: absolute;
    color: unset;
}
.content-container .auth-container .login-type {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1 1;
    cursor: pointer;
}
.linkblue {
    color: #04498d;
    font-size: 14px;
}
 .district-list {
    position: absolute;
    top: 76px;
    left: 80px;
    width: 200px;
    height: 188px;
    background: #fff;
    -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    box-shadow: 0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1);
    border-radius: 6px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #fff;
    font-size: 12px;
    z-index: 2;
    cursor: pointer;
    padding: 12px 0;
}
 .district-list .district-item {
    text-align: center;
    height: 25px;
    padding: 4px 0 4px 8px;
}




</style>
