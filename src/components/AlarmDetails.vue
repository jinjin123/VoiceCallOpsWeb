<template>
  <div id="details">
    <ul>
      <li>
        <h3>服务器ip：</h3>
        <span>{{recorddetial.ip}}</span>
      </li>
      <li>
        <h3>告警级别：</h3>
        <span>{{recorddetial.level_des}}</span>
      </li>
      <li>
        <h3>告警指标：</h3>
        <span>{{recorddetial.indicator_des}}</span>
      </li>
      <li>
        <h3>告警来源：</h3>
        <span>{{recorddetial.origin_des}}</span>
      </li>
      <li>
        <h3>运维负责人：</h3>
        <span>{{recorddetial.ops_principal}}</span>
      </li>
      <li>
        <h3>时间：</h3>
        <span>{{recorddetial.create_time+' / '+recorddetial.modify_time}}</span>
      </li>
      <li>
        <h3>通知方式：</h3>
        <span>{{recorddetial.notify_type_des}}</span>
      </li>
      <li>
        <h3>告警状态：</h3>
        <span>{{recorddetial.status_des}}</span>
      </li>
      <li>
        <h3>告警内容：</h3>
        <p>{{recorddetial.content}}</p>
      </li>
      <li>
        <h3>业务名称：</h3>
        <p>{{recorddetial.module}}</p>
      </li>
    </ul>
    <div class="table-content" >
      <Input v-model="value" placeholder="请输入内容" style="width: 100%"></Input>
    </div>
    <div>
      <Button class="button" type="primary" size="small" @click="subWarn">确认告警</Button>
      <Button class="button" type="primary" size="small" @click="historyView">查看记录</Button>
    </div>
    <div class="table-content" v-if="showtable">
      <Table size="small" :columns="columns1" :data="recorddetial.historys_list"></Table>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlarmDetails",

  data() {
    return {
      value:"",
      showtable: false,
      recorddetial: {
        level_des: "警告",
        indicator_des: "程序",
        ops_principal: "xiaohong",
        status_des: 3,
        module: "斑马汽车-Inkanet2-RVM2_0_AppServer",
        create_time: "2017-11-17 17:22:57",
        content: "",
        notify_type_des: "sms"
      },
      columns1: [
        {
          title: "操作人",
          key: "username",
          width: 80
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "时间",
          key: "create_time",
          width: 100
        }
      ]
    };
  },
  created() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      // return true;
    } else {
      this.$router.push({
        path:"/error"
    })
  };
    var self = this;
    this.$axios
      .get(
        process.env.BASE_URL + "/alarm/alarmDetail?id=" + self.$route.query.id
      )
      .then(function(res) {
        self.recorddetial = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    subWarn() {
      let self = this;
      let url = process.env.BASE_URL + "/alarm/alarmAffirm";
      let payload = {
        id: self.recorddetial.id,
        content: self.value,
        openid: self.recorddetial.iam_openid
      };
      this.$axios
        .post(url, payload)
        .then(function(res) {
          self.value = "";
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    historyView() {
      this.showtable = !this.showtable;
    }
  }
};
</script>
<style>
.table-content {
  margin-top: 15px;
}
.button {
  margin-top: 10px;
  margin-right: 10px;
}
.subbutton {
  background-color: aqua !important;
}
#details {
  padding: 5vw;
  height: calc(100vh - 53px);
  overflow: auto;
}
#details li {
  line-height: 1.5rem;
}
#details h3 {
  display: inline;
}
</style>
