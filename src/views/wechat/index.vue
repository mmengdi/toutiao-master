<script setup>

</script>

<template>
    <div id="tpl_for_page" class="web_qrcode_area" style="">
        <div class="web_qrcode_wrp">
            <!-- 默认 -->
            <div class="js_status js_wx_default_tip" id="wx_default_tip">
                <div class="web_qrcode_tips"><i class="web_qrcode_tips_logo"></i>使用微信扫一扫登录</div>
                <div class="web_qrcode_app_wrp">
                    「<strong class="web_qrcode_app">今日头条</strong>」
                </div>
                <img class="web_qrcode_img" src="@/assets/images/wechat.jpg">
            </div>

            <!-- 扫码成功 -->
            <div class="js_status js_wx_after_scan" style="display:none" id="wx_after_scan">
                <i class="web_qrcode_msg_icon web_qrcode_msg_icon_success"></i>
                <h1 class="web_qrcode_msg_title">扫描成功</h1>
                <p class="web_qrcode_msg_desc">在微信中轻触允许即可登录</p>
            </div>

            <!-- 取消登录 -->
            <div class="js_status js_wx_after_cancel" style="display:none" id="wx_after_cancel">
                <i class="web_qrcode_msg_icon web_qrcode_msg_icon_error"></i>
                <h1 class="web_qrcode_msg_title">你已取消此次登录</h1>
                <div class="web_qrcode_msg_opr">
                    <a href="javascript:;" class="weui-btn weui-btn_primary" id="js_web_qrcode_reload">重试</a>
                </div>
            </div>
        </div>
        <div class="weui-vertical-helper"></div>
    </div>
</template>

<style lang="scss" scoped>
.web_qrcode_area {
    width: 100%;
    height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.web_qrcode_wrp {
    text-align: center;
    line-height: 1.4;
    min-width: 200px;
    max-width: 75%;
    color: #000;
    color: rgba(0, 0, 0, .9);
}

.web_qrcode_wrp,
.weui-vertical-helper {
    display: inline-block;
    vertical-align: middle;
}

.web_qrcode_tips {
    margin-right: 10px;
    font-size: 17px;
    font-weight: 400;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.web_qrcode_tips_logo {
    display: inline-block;
    vertical-align: bottom;
    font-size: 24px;
    width: 1em;
    height: 1em;
    margin-right: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("@/assets/images/wechat.svg")
}

.web_qrcode_app_wrp {
    font-size: 22px;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 500;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    letter-spacing: 1px;
}

.web_qrcode_app {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    max-width: 7.32em;
}

.web_qrcode_img {
    width: 200px;
    height: 200px;
    border-radius: 4px;
}

.web_qrcode_msg_icon_success {
    background-image: url("@/assets/images/wechat-success.svg");
}

.web_qrcode_msg_icon {
    display: inline-block;
    vertical-align: bottom;
    font-size: 10px;
    width: 9.6em;
    height: 9.6em;
    background-size: cover;
    background-repeat: no-repeat;
}

.web_qrcode_msg_title {
    font-size: 22px;
    font-weight: 500;
    margin-top: 24px;
    letter-spacing: 1px;
}

.web_qrcode_msg_desc {
    font-size: 16px;
    margin-top: 8px;
}

.web_qrcode_msg_icon_error {
    background-image: url("@/assets/images/wechat-close.svg")
}

.web_qrcode_msg_icon {
    display: inline-block;
    vertical-align: bottom;
    font-size: 10px;
    width: 9.6em;
    height: 9.6em;
    background-size: cover;
    background-repeat: no-repeat;
}

.web_qrcode_msg_opr {
    margin-top: 24px;
}

.web_qrcode_type_page_self .weui-btn {
    font-weight: 500;
}

.weui-btn_primary {
    background-color: #07c160;
}

.weui-btn {
    position: relative;
    display: block;
    width: 184px;
    margin-left: auto;
    margin-right: auto;
    padding: 8px 24px;
    box-sizing: border-box;
    font-size: 17px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    line-height: 1.88235294;
    border-radius: 8px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.web_qrcode_wrp,
.weui-vertical-helper {
    display: inline-block;
    vertical-align: middle;
}

.weui-vertical-helper {
    width: 0;
    height: 100%;
    overflow: hidden;
}
</style>
