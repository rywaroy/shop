<template>
  <div class="class">
      <el-button type="text" v-for="(item,index) in list" :key="index" @click="deleteItem(item.id)">{{item.value}}</el-button>
      <el-button type="primary" @click="addItem()">添加</el-button>  
  </div>
</template>
<script>
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getClass();
    },
    methods: {
        getClass() {
            this.$http.get("/product/classlist").then(res => {
                this.list = res.data.data;
            });
        },
        deleteItem(id) {
            this.$alert("确定删除分类？", "删除", {
                confirmButtonText: "确定",
                callback: action => {
                    if (action == 'confirm') {
                        this.$http
                            .post("/product/deleteclass", {
                                id: id
                            })
                            .then(res => {
                                this.$message({
                                    type: "success",
                                    message: "删除成功"
                                });
                                this.getClass();
                            });
                    }

                }
            });
        },
        addItem() {
            this.$prompt("输入添加的分类名字", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(({ value }) => {
                this.$http
                    .post("/product/addclass", {
                        value: value
                    })
                    .then(res => {
                        this.$message({
                            type: "success",
                            message: "添加成功"
                        });
                        this.getClass();
                    });
            });
        }
    }
}

</script>
