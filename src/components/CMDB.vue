  <template>
  <div>
    <tab v-model="tab" prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>服务器</tab-item>
      <tab-item>网络设备</tab-item>
    </tab>
    <swiper v-model="tab" :show-dots="false" height="100%" class="swiper_content">
      <swiper-item>
        <div>
          <div v-transfer-dom>
            <popup v-model="showserver" position="right">
              <div style="width:80vw;">
                <div class="item">
                  <p>服务器ip</p>
                  <Input v-model="serverip" placeholder="请输入ip" style="width: 85%" @on-blur="serverReTest"></Input>
                </div>
                <div class="item">
                  <p>业务</p>
                  <Select v-model="firstBussiness" class="business_select" placeholder="一级业务" @on-change="getSecondModuleId">
                    <Option v-for="item in firstBussinessList" :value="item.id" :key="item.name">{{ item.name }}</Option>
                  </Select>
                  <Select v-model="secondBussiness" class="business_select" placeholder="二级业务" @on-change="getThirdModuleId">
                    <Option v-for="item in secondBussinessList" :value="item.id" :key="item.name">{{ item.name }}</Option>
                  </Select>
                  <Select v-model="thirdBussiness" class="business_select" placeholder="三级业务" @on-change="choseThirdModuleId">
                    <Option v-for="item in thirdBussinessList" :value="item.id" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>负责人</p>
                  <Select v-model="chosenuser" style="width:85%">
                    <Option v-for="item in userlist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>IDC</p>
                  <Select v-model="chosenidc" style="width:85%">
                    <Option v-for="item in idclist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>逻辑区</p>
                  <Select v-model="chosenlogic" style="width:85%">
                    <Option v-for="item in logiclist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>运营状态</p>
                  <Select v-model="chosenstate" style="width:85%">
                    <Option v-for="item in statelist" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="footer">
                  <flexbox>
                    <flexbox-item>
                      <x-button @click.native="reset" type="default">重置</x-button>
                    </flexbox-item>
                    <flexbox-item>
                      <x-button type="warn" @click.native="filterserver">确定</x-button>
                    </flexbox-item>
                  </flexbox>
                </div>
              </div>
            </popup>
          </div>
          <div class="list_content">
            <div v-for="(rd,idx) in serverrecords" class="alarm_item" v-bind:key="rd.id">
              <div class="alarm_item_title">
                <div class="align_left">
                  <p class="icon_align">
                    <span>{{rd.inner_ip}}</span>
                    <Icon type="ios-flag" v-bind:style="{color:flags[2],'paddingLeft':'10px'}"></Icon>
                  </p>
                </div>
              </div>
              <div class="alarm_content">
                {{rd.module}}
              </div>
              <div class="alarm_tail">
                <div class="align_left">{{rd.asset_no}}</div>
                <div class="align_right">{{rd.ops_principal}}</div>
              </div>
            </div>
          </div>
          <div style="padding:1em; text-align:center">
            <Page :total="servercount" size="small" :page-size="10" @on-change="serverpagechange"></Page>
          </div>
          <div class="search-menu" @click="showserverfun">
            <Icon type="funnel"></Icon>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div>
          <div v-transfer-dom>
            <popup v-model="shownet" position="right">
              <div style="width:80vw;">
                <div class="item">
                  <p>服务器ip</p>
                  <Input v-model="netip" placeholder="请输入ip" style="width: 85%" @on-blur="netReTest"></Input>
                </div>
                <div class="item">
                  <p>IDC</p>
                  <Select v-model="chosennetidc" style="width:85%;padding-bottom:15px">
                    <Option v-for="item in netidclist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>设备类型</p>
                  <Select v-model="chosentype" style="width:85%">
                    <Option v-for="item in typelist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>设备用途</p>
                  <Select v-model="chosenusage" style="width:85%">
                    <Option v-for="item in usagelist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>设备厂家</p>
                  <Select v-model="chosenvender" style="width:85%">
                    <Option v-for="item in venderlist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="item">
                  <p>设备型号</p>
                  <Select v-model="chosenmodel" style="width:85%">
                    <Option v-for="item in modellist" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </div>
                <div class="footer">
                  <flexbox>
                    <flexbox-item>
                      <x-button @click.native="reset" type="default">重置</x-button>
                    </flexbox-item>
                    <flexbox-item>
                      <x-button type="warn" @click.native="filternet">确定</x-button>
                    </flexbox-item>
                  </flexbox>
                </div>
              </div>
            </popup>
          </div>
          <div class="list_content">
            <div v-for="(rd,idx) in netrecords" class="alarm_item" v-bind:key="rd.id">
              <div class="alarm_item_title">
                <div class="align_left">
                  <p class="icon_align">
                    <span>{{rd.netdev_admin_ip}}</span>
                    <Icon type="ios-flag" v-bind:style="{color:flags[3],'paddingLeft':'10px'}"></Icon>
                  </p>
                </div>
              </div>
              <div class="alarm_content">
                {{rd.netdev_type}}
              </div>
              <div class="alarm_tail">
                <div class="align_left">{{rd.netdev_asset_id}}</div>
                <div class="align_right">{{rd.netdev_maintainer}}</div>
              </div>
            </div>
          </div>
          <div style="padding:1em; text-align:center">
            <Page :total="netcount" size="small" :page-size="10" @on-change="netpagechange"></Page>
          </div>
          <div class="search-menu" @click="shownetfun">
            <Icon type="funnel"></Icon>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  TransferDom,
  Popup,
  XHeader,
  Checker,
  CheckerItem,
  FlexboxItem,
  Flexbox,
  XButton
} from "vux";
const re = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
export default {
  name: "CMDB",

  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
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
      tab: 0,
      servercount: 0,
      netcount: 0,
      show: false,
      showserver: false,
      shownet: false,
      userlist: null,
      serverip: null,
      netip: null,
      idclist: null,
      logiclist: null,
      statelist: null,
      firstBussiness: null,
      secondBussiness: null,
      thirdBussiness: null,
      usagelist: null,
      netidclist: null,
      modellist: null,
      venderlist: null,
      typelist: null,
      flags: ["#ed3f14", "#ed3f14", "#ff9900", "#ff9900"],
      serverrecords: [],
      netrecords: [],
      chosenuser: [],
      chosenidc: [],
      chosenlogic: [],
      chosenstate: [],
      chosenbussiness: null,
      chosennetidc: null,
      chosentype: null,
      chosenusage: null,
      chosenvender: null,
      chosenmodel: null,
      firstBussinessList: [],
      secondBussinessList: [],
      thirdBussinessList: []
    };
  },
  created() {
    this.initServers();
  },
  methods: {
    netReTest() {
      if (!re.test(this.netip)) {
        this.netip = null;
      } else {
        return;
      }
    },
    serverReTest() {
      if (!re.test(this.serverip)) {
        this.serverip = null;
      } else {
        return;
      }
    },
    getSecondModuleId(id) {
      var self = this;
      this.$axios
        .get(process.env.BASE_URL + `/cmdb/cmdbModule?module_id=${id}`)
        .then(function(res) {
          self.secondBussinessList = res.data.data;
          self.chosenbussiness = id;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getThirdModuleId(id) {
      var self = this;
      this.$axios
        .get(process.env.BASE_URL + `/cmdb/cmdbModule?module_id=${id}`)
        .then(function(res) {
          self.thirdBussinessList = res.data.data;
          self.chosenbussiness = id;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    choseThirdModuleId(id) {
      self.chosenbussiness = id;
    },
    switchTabItem(index) {
      this.$vux.loading.show({
        text: "loading"
      });
      this.$vux.loading.hide();
      this.tab = index;
      if (index == 1) {
        this.initNetworkDevices();
      } else {
        this.initServers();
      }
    },
    initServers() {
      var self = this;
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/cmdbModule")
        .then(function(res) {
          self.firstBussinessList = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/cmdbUser")
        .then(function(res) {
          self.userlist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/cmdbIdc")
        .then(function(res) {
          self.idclist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/cmdbLogic")
        .then(function(res) {
          self.logiclist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/cmdbState")
        .then(function(res) {
          self.statelist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(
          process.env.BASE_URL +
            "/cmdb/cmdbServer/?page=1&length=10&principal=null&idc=null&logic_area=null&state=null&module_id_one=null"
        )
        .then(function(res) {
          self.serverrecords = res.data.data.resultList;
          self.servercount = res.data.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initNetworkDevices() {
      let self = this;
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/netdevicesFunc")
        .then(function(res) {
          self.usagelist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/netdevicesIdc")
        .then(function(res) {
          self.netidclist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/netdevicesModel")
        .then(function(res) {
          self.modellist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/netdevicesPro")
        .then(function(res) {
          self.venderlist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(process.env.BASE_URL + "/cmdb/netdevicesType")
        .then(function(res) {
          self.typelist = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .get(
          process.env.BASE_URL +
            "/cmdb/cmdbNetdevices/?page=1&length=10&netdev_idc=null&netdev_type=null&netdev_func=null&netdev_pro=null&netdev_model=null"
        )
        .then(function(res) {
          self.netrecords = res.data.data.resultList;
          self.netcount = res.data.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showserverfun: function() {
      this.showserver = true;
    },
    shownetfun: function() {
      this.shownet = true;
    },
    serverpagechange: function(page) {
      var self = this;
      this.$axios
        .get(
          process.env.BASE_URL +
            `/cmdb/cmdbServer/?page=${page}&length=10&principal=${self.chosenuser}&idc=${self.chosenidc}&logic_area=${self.chosenlogic}&state=${self.chosenstate}&module_id=${self.chosenbussiness}&inner_ip=${self.serverip}`
        )
        .then(function(res) {
          self.serverrecords = res.data.data.resultList;
          self.servercount = res.data.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    netpagechange: function(page) {
      var self = this;
      this.$axios
        .get(
          process.env.BASE_URL +
            `/cmdb/cmdbNetdevices/?page=${page}&length=10&netdev_idc=${self.chosennetidc}&netdev_type=${self.chosentype}&netdev_func=${self.chosenusage}&netdev_pro=${self.chosenvender}&netdev_model=${self.chosenmodel}&netdev_admin_ip=${self.netip}`
        )
        .then(function(res) {
          self.netrecords = res.data.data.resultList;
          self.netcount = res.data.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterserver: function() {
      var self = this;
      self.$vux.loading.show({
        text: "Loading"
      });
      this.$axios
        .get(
          process.env.BASE_URL +
            `/cmdb/cmdbServer/?page=1&length=10&principal=${self.chosenuser}&idc=${self.chosenidc}&logic_area=${self.chosenlogic}&state=${self.chosenstate}&module_id=${self.chosenbussiness}&inner_ip=${self.serverip}`
        )
        .then(function(res) {
          self.serverrecords = res.data.data.resultList;
          self.servercount = res.data.data.total;
          self.$vux.loading.hide();
          self.showserver = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filternet: function() {
      var self = this;
      self.$vux.loading.show({
        text: "Loading"
      });
      this.$axios
        .get(
          process.env.BASE_URL +
            `/cmdb/cmdbNetdevices/?page=1&length=10&netdev_idc=${self.chosennetidc}&netdev_type=${self.chosentype}&netdev_func=${self.chosenusage}&netdev_pro=${self.chosenvender}&netdev_model=${self.chosenmodel}&netdev_admin_ip=${self.netip}`
        )
        .then(function(res) {
          self.netrecords = res.data.data.resultList;
          self.netcount = res.data.data.total;
          self.$vux.loading.hide();
          self.shownet = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reset: function() {
      (this.chosenuser = null),
        (this.chosenidc = null),
        (this.chosenlogic = null),
        (this.chosenstate = null),
        (this.chosennetidc = null),
        (this.chosentype = null),
        (this.chosenusage = null),
        (this.chosenvender = null),
        (this.chosenmodel = null),
        (this.firstBussiness = null),
        (this.secondBussiness = null),
        (this.thirdBussiness = null);
      (this.chosenbussiness = null),
        (this.secondBussinessList = []),
        (this.thirdBussinessList = []);
    }
  }
};
</script>
<style scoped>
.business_select {
  width: 85%;
  padding-bottom: 15px;
}
.swiper_content {
  height: calc(100vh - 97px);
}
.list_content {
  height: calc(100vh - 145px);
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
  padding: 0.5em 0;
  font-size: 14px;
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
  position: absolute;
  /*border-top: 2px solid grey;*/
  width: 100%;
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
