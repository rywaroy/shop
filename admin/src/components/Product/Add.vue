<template>
  <div class="add">
    <div class="add-title">主图：</div>
    <div class="add-img bg-cover" :style="{backgroundImage:'url('+photo+')'}">
      <input type="file" @change="addPhoto($event)" multiple>
    </div>
    <div class="add-title">轮播图：</div>
    <div class="add-imgs">
      <div class="add-img bg-cover" v-for="(item,index) in imgs" :key="index" :style="{backgroundImage:'url('+item+')'}"></div>
      <div class="add-img">
        <input type="file" @change="addPhoto($event)">
      </div>
    </div>
    <div class="add-box">
      <el-input v-model="name" placeholder="商品名称"></el-input>
    </div>
    <div class="add-box">
      <el-input v-model="price" placeholder="商品价格"></el-input>
    </div>
    <div class="add-box">
      <el-select v-model="classId" placeholder="请选择商品分类">
      <el-option
        v-for="item in classList"
        :key="item.value"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    </div>
    <div class="add-box">
      <el-input placeholder="商品总库存" v-model="stock" :disabled="true"></el-input>
    </div>
    <div class="add-title">选择分类：</div>
    <el-checkbox-group v-model="checkList" :max="2" :min="1">
      <el-checkbox :label="item.id" v-for="(item,index) in attrList" :key="index" :disabled="disabled">{{item.value}}</el-checkbox>
      <el-button type="primary" @click="selectAttr()">确定</el-button>
    </el-checkbox-group>
    <div v-if="disabled">
      <div class="add-title">添加规格：</div>
        <div class="add-group-box">
          <el-button type="primary" @click="addGroup()">新增</el-button>
          <GroupItem v-for="(item,index) in groupList" :key="index" :num="index" :items="attrItemList" @group="group"></GroupItem>
        </div>
    </div>
    <quill-editor ref="myTextEditor"
                  v-model="intro"
                  style="height: 400px;margin-top:30px;">
    </quill-editor>
    <el-button type="primary" style="margin:40px 0 60px 0" @click="sub()">提交</el-button>
  </div>
</template>
<script>
import GroupItem from './GroupItem.vue'
import { quillEditor } from 'vue-quill-editor';
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      price: '',
      stock: 0,
      photo: '',
      disabled: false,
      checkList: [],
      attrList: [],
      groupList: [],
      attrItemList: [],
      intro: '',
      photo: '',
      imgs: [],
      classList: [],
      classId: ''
    }
  },
  components: {
    GroupItem,
    quillEditor
  },
  mounted() {
    this.getAttr();
    this.getClass();
  },
  methods: {
    getAttr() {
      this.$http.get('/attr/list')
        .then(res => {
          this.attrList = res.data.data
        })
    },
    getClass() {
      this.$http.get('/product/classlist')
        .then(res => {
          this.classList = res.data.data
        })
    },
    selectAttr() {
      if (this.checkList.length > 0) {
        this.disabled = true
        for (let i = 0; i < this.checkList.length; i++) {
          this.getItem(this.checkList[i])
        }
      }
    },
    getItem(id) {
      this.$http.get('/attr/item?id=' + id)
        .then(res => {
          this.attrItemList.push(res.data.data)
        })
    },
    addGroup() {
      this.groupList.push({})
    },
    group(data) {
      this.groupList[data.index] = data.data;
      let sum = 0
      for (let i = 0; i < this.groupList.length; i++) {
        sum += Number(this.groupList[i].stock)
      }
      this.stock = sum
    },
    addPhoto: function (imgFile) {
      // var filextension = imgFile.target.value.substring(imgFile.target.value.lastIndexOf("."), imgFile.target.value.length);
      // filextension = filextension.toLowerCase();
      var file = imgFile.target.files[0]
      var _this = this;
      var fd = new FormData();
      fd.append("photos", file);
      axios({
        method: 'post',
        url: _this.plus.path + '/file/photos',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: fd
      }).then(function (res) {
        _this.photo = res.data.data.filename
      })
    },
    sub() {
      if (!this.photo) {
        this.$message.error('请上传主图')
        return
      }
      if (this.imgs.length == 0) {
        this.$message.error('请上传轮播图')
        return
      }
      if (!this.name) {
        this.$message.error('请输入商品名字')
        return
      }
      if (!this.price) {
        this.$message.error('请输入商品价格')
        return
      }
      if (!this.classId) {
        this.$message.error('请选择商品分类')
        return
      }
      if (this.checkList.length == 0) {
        this.$message.error('请选择规格分类')
        return
      }
      if (this.groupList.length == 0) {
        this.$message.error('请选择规格项目')
        return
      }
      if (!this.intro) {
        this.$message.error('请输入商品简介')
        return
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.add-title {
  font-size: 18px;
  line-height: 40px;
}

.add-img {
  width: 100px;
  height: 100px;
  position: relative;
  border: 1px dashed #999;
  input {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
  }
}

.add-box {
  width: 300px;
  margin-top: 20px;
}
</style>
