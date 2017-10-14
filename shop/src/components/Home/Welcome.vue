<template>
    <div class="scroll-box">
        <div class="banner">
            <van-swipe :autoplay="3000" style="height:4rem">
                <van-swipe-item style="background:red"></van-swipe-item>
                <van-swipe-item style="background:green"></van-swipe-item>
                <van-swipe-item style="background:blue"></van-swipe-item>
                <van-swipe-item style="background:gray"></van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.banner{
    width: 100%;
    height: 4rem;
}
</style>
