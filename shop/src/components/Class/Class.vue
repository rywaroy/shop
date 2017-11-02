<template>
  <div class="scroll-box">
      <router-link tag="div" :to="{name:'productlist',query:{id:item.id,title:item.value}}" class="class-item" v-for="(item,index) in list" :key="index">{{item.value}}</router-link>
  </div>
</template>
<script>
  export default {
      data(){
          return{
              list:[]
          }
      },
      mounted(){
        this.getClass()
      },
      methods:{
          getClass(){
              this.$http.get('/product/classlist')
              .then(res => {
                  this.list =  res.data.data
              })
          }
      }
  }

</script>
<style lang="scss" scoped>
    .class{
        &-item{
            margin: .3rem;
            background: #38f;
            color: #fff;
            height: 1.5rem;
            text-align: center;
            line-height: 1.5rem;
            font-size: .4rem;
            border-radius: .2rem
        }
    }

</style>
