<template>
    <div  style="height: 100%;">
        <el-container  style="height: 100%;">
            <Nav/>
             <el-container>
                 <el-header>
                     <!-- 头部组件（面包屑） -->
                     <Header/>
                 </el-header>
                <el-main>
                    <!-- 内容显示 -->
                   <router-view>
                  </router-view>
                </el-main>
                  </el-container>
                       </el-container>
   </div>
</template>

<script>
import Header from "../components/Header";
import Nav from "../components/Nav";
import {checktoken} from '../api/login.js'
import { setTimeout } from 'timers';
export default {
  data(){
    return{

    }
  },
  components: {
    Nav,
    Header
  },
  created(){


  },
  mounted(){
     this.checkToken()
  },
  methods:{
     checkToken(){
      this.token = localStorage.token
      checktoken(this.token).then((res)=>{
        if(res.data.code==0){
              console.log('token有效');

        }else{
             this.$message.error('登陆失效请重新登陆')
             setTimeout(()=>{
               this.$router.push('/')
             })

        }
      })

    }
  }

};
</script>


<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;

}

.el-main {
  background-color: #eceef1;
}
</style>
