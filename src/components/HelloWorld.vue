<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <tabbar v-model="tabid">
      <tabbar-item v-for="(item,index) in tabs" :key="index" :link="item.link">
        <img slot="icon" :src="index != tabid?item.baseIcon:item.colorIcon">
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
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
          label: "Dashboard",
          baseIcon: dashboard,
          colorIcon: dashboardcolor,
          link: "./Dashboard"
        },
        {
          label: "CMDB",
          baseIcon: cmdb,
          colorIcon: cmdbcolor,
          link: "./CMDB"
        },
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
</style>
