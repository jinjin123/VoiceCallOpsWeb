<template>
  <div>
  <el-form :rules="rules" :class="show" label-position="left"
           label-width="0px">
    <h3 class="login_title">移动AIOPS登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
  export default{
    data(){
      return {
        show:"login-container",
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'admin',
          password: '123'
        },
      }
    },
    methods: {
      submitClick: function () {
        if(this.loginForm.username == 'admin' && this.loginForm.password == '123'){
          // this.show = "login_hidden"
          this.$router.push({
            path: "/HelloWorld/Dashboard"
          })
        }else{
          this.$router.push({
            path: "/Login"
          })
        }
      },
    },
    created(){
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // return true;
      } else {
        this.$router.push({
          path:"/error"
        })
      }
    }

  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  .login_hidden{
    display: none;
  }
</style>
