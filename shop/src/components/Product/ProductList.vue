<template>
  <div class="product-list">
      <my-header :title="title"></my-header>
      <div class="scroll-box">
          
      </div>
  </div>
</template>
<script>
import Header from '../Common/Header'
export default {
  data(){
      return{
          title:''
      }
  },
  components:{
      'my-header':Header
  },
  mounted(){
      this.title = this.$route.query.title
  }
}
</script>

<style lang="scss" scoped>
  .product-list {
    padding-top: 0.88rem;
  }

</style>
