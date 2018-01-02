<template>
  <div>
    <div v-transfer-dom>
      <popup v-model="show" position="right">
        <div style="width:80vw;">
          <div class="item_content">
            <div class="item">
              <p>一级业务</p>
              <Select v-model="modulefirst" style="width:85%">
                <Option v-for="item in module_choose" :value="item.id" :key="item.name">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="item">
              <p>告警级别</p>
              <checker v-model="level" default-item-class="name-item" selected-item-class="name-item-selected">
                <checker-item v-for="i in level_choose" :key="i.id" :value="i.id">{{i.name}}</checker-item>
              </checker>
            </div>
            <div class="item">
              <p>告警来源</p>
              <checker v-model="origin" default-item-class="type-item" selected-item-class="name-item-selected">
                <checker-item v-for="i in origin_choose" :key="i.id" :value="i.id">{{i.name}}</checker-item>
              </checker>
            </div>
            <div class="item">
              <p>告警指标</p>
              <checker v-model="indicator" default-item-class="type-item" selected-item-class="name-item-selected">
                <checker-item v-for="i in indicator_choose" :key="i.id" :value="i.id">{{i.name}}</checker-item>
              </checker>
            </div>
            <div class="item">
              <p>告警状态</p>
              <checker v-model="status" default-item-class="type-item" selected-item-class="name-item-selected">
                <checker-item v-for="i in status_choose" :key="i.id" :value="i.id">{{i.name}}</checker-item>
              </checker>
            </div>
          </div>
          <div class="footer">
            <flexbox>
              <flexbox-item>
                <x-button @click.native="reset" type="default">重置</x-button>
              </flexbox-item>
              <flexbox-item>
                <x-button type="warn" @click.native="filter">确定</x-button>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </popup>
    </div>
    <div class="list_content">
      <div v-for="(rd,idx) in records" class="alarm_item" v-bind:key="rd.id" @click="showdetails(rd.id)">
        <div class="alarm_item_title">
          <div class="align_left">
            <span class="icon_align">
              <Icon type="android-alert" v-bind:style="{color:flags[rd.level],'paddingRight':'10px'}"></Icon>
              <span>{{rd.level_des}} | {{rd.indicator_des}}</span>
            </span>
          </div>
          <div class="align_right">
            <span>{{rd.status_des}}</span>
          </div>
        </div>
        <div class="alarm_content">
          {{rd.module}}
        </div>
        <div class="alarm_tail">
          <div class="align_left">{{rd.create_time}}</div>
          <div class="align_right">{{rd.ops_principal}}</div>
        </div>
      </div>
    </div>
    <div style="padding:1em; text-align:center">
      <Page :total="total" size="small" :page-size="10" @on-change="pagechange"></Page>
    </div>
    <div class="search-menu" @click="shows">
      <Icon type="funnel"></Icon>
    </div>
    <BackTop :bottom="24" :right="6">
      <div class="top">
        <Icon type="chevron-up"></Icon>
      </div>
    </BackTop>
  </div>
</template>

<script>
import {
  TransferDom,
  Popup,
  XHeader,
  Checker,
  CheckerItem,
  FlexboxItem,
  Flexbox,
  XButton
} from "vux";
export default {
  name: "AlarmList",
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XHeader,
    Checker,
    CheckerItem,
    FlexboxItem,
    Flexbox,
    XButton
  },
  data() {
    return {
      show: false,
      indicator: [],
      level: null,
      origin: null,
      status: null,
      modulefirst: null,
      modal: false,
      total: 0,
      flags: ["#ed3f14", "#ed3f14", "#ff9900", "#ff9900"],
      formItem: {
        level_choose: [{ id: 0, name: "致命" }, { id: 1, name: "致命" }]
      },
      records: [
        {
          id: 3,
          level_des: "警告",
          indicator_des: "程序",
          ip: "10.128.64.100",
          ops_principal: "xiaohong",
          status_des: 3,
          module: "斑马汽车-Inkanet2-RVM2_0_AppServer",
          create_time: "2017-11-17 17:22:57"
        }
      ],
      level_choose: [],
      origin_choose: [],
      indicator_choose: [],
      status_choose: [],
      module_choose: [{ name: "网络", id: 0 }, { name: "程序", id: 1 }]
    };
  },
  created() {
    var self = this;
    this.$axios
      .get(process.env.BASE_URL + "/alarm/alarmLevel")
      .then(function(res) {
        self.level_choose = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$axios
      .get(process.env.BASE_URL + "/alarm/alarmStatus")
      .then(function(res) {
        self.status_choose = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$axios
      .get(process.env.BASE_URL + "/alarm/alarmOrigin")
      .then(function(res) {
        self.origin_choose = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$axios
      .get(process.env.BASE_URL + "/alarm/alarmIndicator")
      .then(function(res) {
        self.indicator_choose = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$axios
      .get(process.env.BASE_URL + "/alarm/alarmModule")
      .then(function(res) {
        self.module_choose = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$axios
      .get(
        process.env.BASE_URL +
          "/alarm/alarmQuery?start=0&length=10&origin=null&status=null&module_id_one=null&level=null"
      )
      .then(function(res) {
        self.records = res.data.data.resultList;
        self.total = res.data.data.total;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    shows: function() {
      this.show = true;
    },
    pagechange: function(page) {
      var self = this;
      this.$axios
        .get(
          process.env.BASE_URL +
            `/alarm/alarmQuery?start=${(page - 1) *
              10}&length=10&origin=${self.origin}&status=${self.status}&module_id_one=${self.modulefirst}&level=${self.level}`
        )
        .then(function(res) {
          self.records = res.data.data.resultList;
          self.total = res.data.data.total;
          self.show = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showdetails: function(item) {
      this.$router.push({
        path: "/AlarmDetails",
        query: {
          id: item
        }
      });
    },
    filter: function() {
      var self = this;
      self.$vux.loading.show({
        text: "Loading"
      });
      this.$axios
        .get(
          process.env.BASE_URL +
            `/alarm/alarmQuery?start=0&length=10&origin=${self.origin}&status=${self.status}&module_id_one=${self.modulefirst}&level=${self.level}`
        )
        .then(function(res) {
          self.records = res.data.data.resultList;
          self.total = res.data.data.total;
          self.$vux.loading.hide();
          self.show = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reset: function() {
      this.indicator = [];
      this.level = [];
      this.origin = [];
      this.status = [];
      this.modulefirst = [];
    }
  }
};
</script>

<style scoped>
.item_content {
  height: calc(100vh - 103px);
  overflow: auto;
}
.list_content {
  height: calc(100vh - 101px);
  overflow: auto;
}
.alarm_item {
  display: block;
  padding: 0.5em 1em;
  border-bottom: 1px solid gray;
}
.alarm_item_title {
  display: table;
  width: 100%;
}
.align_left {
  display: table-cell;
  width: 80%;
}
.align_right {
  display: table-cell;
  width: 20%;
  text-align: right;
  vertical-align: middle;
}
.alarm_content {
  display: block;
  overflow: hidden;
  padding: 0.2em;
}
.alarm_tail {
  display: table;
  width: 100%;
}

.icon_align {
  display: table;
}
.icon_align i {
  display: table-cell;
  width: 1em;
  height: 1em;
  font-size: 1.2em;
  vertical-align: middle;
}
.icon_align span {
  display: table-cell;
  vertical-align: middle;
  font-size: 1.5em;
}

.search-menu {
  width: 3em;
  height: 3em;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 5px;
  position: fixed;
  top: 30px;
  right: 0.5em;
  display: table;
}
.search-menu i {
  font-size: 1.5em;
  display: table-cell;
  vertical-align: middle;
}

.top {
  width: 3em;
  height: 3em;
  bottom: 30px;
  right: 0.5em;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  display: table;
}
.top i {
  font-size: 1.5em;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 0px;
}
.item {
  /* height: 20vh; */
  padding-left: 20px;
}
.item p {
  padding: 10px 0;
}
.footer {
  position: fixed;
  /*border-top: 2px solid grey;*/
  width: 80%;
  bottom: 1px;
}
.vux-checker-item {
  margin-top: 10px;
  background-color: #eee;
}
.vux-popup-dialog {
  background: white;
}
.type-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 30vw;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-right: 6px;
}
.name-item {
  width: 20vw;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-right: 6px;
}
.name-item-selected {
  /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
  border-color: #ff4a00;
  background: white;
  color: #ff4a00;
}
</style>
