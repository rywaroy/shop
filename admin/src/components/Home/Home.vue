<template>
    <div id="home">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="user">用户列表</el-menu-item>
            <el-menu-item index="class">商品分类</el-menu-item>
            <el-menu-item index="attribute">商品规格分类</el-menu-item>
            <el-menu-item index="product">商品列表</el-menu-item>
        </el-menu>
        <router-view class="main"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: 'user'
        }
    },
    methods: {
        handleSelect(index) {
            this.$router.push({name:index})
        }
    }
}
</script>
