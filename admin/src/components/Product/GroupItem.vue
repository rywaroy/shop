<template>
  <div class="group-item f-cb">
    <el-select v-model="item1" placeholder="请选择" class="fl" style="margin-right:10px" :disabled="isAdd">
      <el-option v-for="(item,index) in items[0]" :key="item.value" :label="item.value" :value="index">
      </el-option>
    </el-select>
    <el-select v-model="item2" placeholder="请选择" v-if="items.length > 1" class="fl" style="margin-right:10px" :disabled="isAdd">
      <el-option v-for="(item,index) in items[1]" :key="item.value" :label="item.value" :value="index">
      </el-option>
    </el-select>
    <el-input v-model="price" placeholder="价格" class="fl" style="width:200px;margin-right:10px" :disabled="isAdd"></el-input>
    <el-input v-model="stock" placeholder="库存" class="fl" style="width:200px" :disabled="isAdd"></el-input>
    <el-button type="primary" @click="addGroup()" v-if="!isAdd">添加</el-button>
  </div>
</template>
<script>
  export default {
    props: ['items','num'],
    data(){
        return{
            item1:'',
            item2:'',
            price:'',
            stock:'',
            item1Data:{},
            item2Data:{},
            isAdd:false
        }
    },
    watch:{
      item1(){
        this.item1Data = this.items[0][this.item1]
      },
      item2(){
        this.item2Data = this.items[1][this.item2]
      },
    },
    methods:{
      addGroup(){
        if(this.item1 && this.price && this.stock){
          let json = {}
          json.items = []
          json.price = this.price;
          json.stock = this.stock;
          json.items[0] = this.item1Data;
          if(this.item2){
            json.items[1] = this.item2Data;
          }
          this.$emit('group',{data:json,index:this.num})
          this.isAdd = true
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
    .group-item{
        width:100%;
        margin-top: 10px;
    }
</style>