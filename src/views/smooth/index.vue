<script setup lang="ts">
import vSlideIn from '@/utils/vSlideIn';
</script>

<template>
    <div class="container">
        <div class="item" v-slide-in>1</div>
        <div class="item" v-slide-in>2</div>
        <div class="item" v-slide-in>3</div>
        <div class="item" v-slide-in>4</div>
        <div class="item" v-slide-in>5</div>
        <div class="item" v-slide-in>6</div>
        <div class="item" v-slide-in>7</div>
        <div class="item" v-slide-in>8</div>
        <div class="item" v-slide-in>9</div>
        <div class="item" v-slide-in>10</div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin: 1em auto;
    width: 80%;

    .item {
        width: 100%;
        height: 100vh;
        background: rgb(223, 223, 109);
        margin-bottom: 50px;
        font-size: 100px;
        color: #fff;
        line-height: 100vh;
        font-weight: 600;
        text-align: center;
    }
}
</style>
