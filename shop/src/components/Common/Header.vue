<template>
    <div :class="['header',fix?'fix':'',border?'border':'']">
        <div class="header__back" @click="back()"></div>
        <div class="header__title text-ovh">{{title}}</div>
        <slot name="right">{{right}}</slot>
    </div>
</template>
<script>
export default {
    props: {
        fix: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: false
        },
        title: String,
        url: String,
        right:String
    },
    methods: {
        back() {
            if (this.url) {
                this.$router.push({ name: this.url })
            } else {
                this.$router.go(-1)
            }

        }
    }
}
</script>

<style scoped lang="scss">
.header {
    height: .88rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    &.fix {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 20;
    }
    &.border{
        border-bottom: 1px solid #e1e1e1
    }
    &__title {
        width: 5rem;
        font-size: .34rem;
        line-height: 1;
        text-align: center;
        color: #333;
    }
    &__back {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: .27rem;
        left: .23rem;
        background: url('../../assets/img/header_black_back.png') no-repeat center center;
        background-size: .15rem .25rem;
    }
}
</style>

