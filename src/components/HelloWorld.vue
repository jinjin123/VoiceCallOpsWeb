<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <tabbar :v-model="tabid">
      <tabbar-item v-for="(item,index) in tabs" :key="index" :link="item.link">
        <img slot="icon" :src="index != tabid?item.baseIcon:item.colorIcon">
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
    <!-- <el-form :rules="rules" :class="show" label-position="left"
             label-width="0px" >
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
    </el-form> -->
  </div>
</template>
<script>
import dashboard from "../assets/dashboard.png";
import cmdb from "../assets/cmdb.png";
import alarm from "../assets/alarm.png";
import duty from "../assets/duty.png";
import dashboardcolor from "../assets/dashboardcolor.png";
import cmdbcolor from "../assets/cmdbcolor.png";
import alarmcolor from "../assets/alarmcolor.png";
import dutycolor from "../assets/dutycolor.png";
import imgraph from "../assets/graph.png";
import pydetail from "../assets/calander.png";
import {
  TransferDom,
  Popup,
  XHeader,
  Checker,
  CheckerItem,
  FlexboxItem,
  Flexbox,
  XButton,
  Masker,
  Tabbar,
  TabbarItem
} from "vux";
export default {
  name: "HelloWorld",
  components: {
    Tabbar,
    TabbarItem,
    Popup,
    XHeader,
    Checker,
    CheckerItem,
    FlexboxItem,
    Flexbox,
    XButton,
    Masker
  },
  data() {
    return {
      tabid: 0,
      tabs: [
        {
          label: "仪表盘",
          baseIcon: dashboard,
          colorIcon: dashboardcolor,
          link: "./Dashboard"
        },
        // {
        //   label: "CMDB",
        //   baseIcon: cmdb,
        //   colorIcon: cmdbcolor,
        //   link: "./CMDB"
        // },
        {
          label: "告警",
          baseIcon: alarm,
          colorIcon: alarmcolor,
          link: "./AlarmList"
        },
        {
          label: "值班",
          baseIcon: duty,
          colorIcon: dutycolor,
          link: "./DutyList"
        },
        {
          label: "重点租户状态图",
          baseIcon: imgraph,
          colorIcon: imgraph,
          link: "./Imgraph"
        },
        {
          label: "物理机详情",
          baseIcon: pydetail,
          colorIcon: pydetail,
          link: "./pydetail"
        }
      ],
      msg: "欢迎来到运维平台！"
    };
  },
  methods: {
    dutylist: function() {
      this.$router.push({
        path: "/DutyList"
      });
    },
    alarmList: function() {
      this.$router.push({
        path: "/AlarmList"
      });
    },
    dashboard: function() {
      this.$router.push({
        path: "/Dashboard"
      });
    },
    cmdb: function() {
      this.$router.push({
        path: "/CMDB"
      });
    },
    today: function() {
      var td = new Date();
      return td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  fill: #369;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
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
.login_show{
  display: block;
}
</style>
