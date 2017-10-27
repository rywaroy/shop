<template>
  <div class="class">
      <el-button type="primary" @click="addClass()">添加分类</el-button>
      <div class="class-box" v-for="(item,index) in list" :key="index">
          <div class="class-box-title" @click="deleteClass(item.id)">{{item.value}}</div>
          <div class="class-box-item">
              <el-button type="text" v-for="(items,indexs) in item.items" :key="indexs" @click="deleteItem(items.aid)">{{items.item_value}}</el-button>
              <el-button type="primary" @click="addItem(item.id)">添加</el-button>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getClass();
  },
  methods: {
    getClass() {
      this.$http.get("/attr/all").then(res => {
        this.list = res.data.data;
      });
    },
    addClass() {
      this.$prompt("输入添加的分类名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        this.$http
          .post("/attr/addclass", {
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
    },
    addItem(id) {
      this.$prompt("输入添加的分类项目名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        this.$http
          .post("/attr/additem", {
            value: value,
            id: id
          })
          .then(res => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.getClass();
          });
      });
    },
    deleteItem(id) {
      this.$alert("确定删除分类项目？", "删除", {
        confirmButtonText: "确定",
        callback: action => {
          if (action == 'confirm') {
            this.$http
              .post("/attr/deleteitem", {
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
    deleteClass(id) {
      this.$alert("确定删除分类？", "删除", {
        confirmButtonText: "确定",
        callback: action => {
          this.$http
            .post("/attr/deleteclass", {
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
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.class-box {
  margin-top: 10px;
}
</style>
