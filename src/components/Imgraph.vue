<template>
  <div class="dashcontent">
    <div v-for="(item,idx) in flowDtData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowDtLineData[idx]" :options="datong[idx]" ></line-chart>
    </div>
    <div v-for="(item,idx) in flowDtngxData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowDtngxLineData[idx]" :options="dtngxact[idx]" ></line-chart>
    </div>
    <div v-for="(item,idx) in flowBmData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowBmLineData[idx]"  ></line-chart>
    </div>
    <div v-for="(item,idx) in flowBmtgoneData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowBmtgoneLineData[idx]"  ></line-chart>
    </div>
    <div v-for="(item,idx) in flowBmtgtwoData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowBmtgtwoLineData[idx]"  ></line-chart>
    </div>
    <div v-for="(item,idx) in flowBmtgthreeData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowBmtgthreeLineData[idx]"  ></line-chart>
    </div>
    <div v-for="(item,idx) in flowBmtgfourData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowBmtgfourLineData[idx]"  ></line-chart>
    </div>
    <div v-for="(item,idx) in flowBmngxsesData">
      <divider>{{item.export_line_name}}</divider>
      <line-chart class="linechart" :chart-data="flowBmngxsesLineData[idx]"  ></line-chart>
    </div>
    <divider>大通nginx当前session数</divider>
    <pie-chart class="piechart" :chart-data="dtngxsesData"></pie-chart>
    <divider>大通49.10cpu负载</divider>
    <pie-chart class="piechart" :chart-data="dttencuData"></pie-chart>
    <divider>大通49.10使用内存情况</divider>
    <pie-chart class="piechart" :chart-data="dttenmemData"></pie-chart>
    <divider>大通49.11cpu负载</divider>
    <pie-chart class="piechart" :chart-data="dtelvcuData"></pie-chart>
    <divider>大通49.11使用内存情况</divider>
    <pie-chart class="piechart" :chart-data="dtelvmemData"></pie-chart>
    <divider>斑马nginx当前总session数</divider>
    <pie-chart class="piechart" :chart-data="bmngxsesData"></pie-chart>
  </div>
</template>

<script>
import { Divider, Card, Masker } from "vux";
import PieChart from "./PieChart.js";
import lineChart from "./LineChart.js";
const warnColor = ["#ff0000", "#fc6383", "#36a2eb", "#4ac0c0"];
const flowColor = ["#ff0200","#36a2eb"];
const pieColor = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "#ff9300",
  "#fffb00",
  "#ff40ff"
];
export default {
  name: "imgraph",
  components: {
    Card,
    Divider,
    Masker,
    PieChart,
    lineChart
  },
  data() {
    return {
      dtngxact: [
        {
          scales: {
            yAxes:[{
              ticks: {
                max: 10000,
                min:0
              }
            }]
          }
        },
      ],
      datong: [
        {
          scales: {
            yAxes:[{
              ticks: {
                max: 300,
                min:0
              }
            }]
          }
        },
      ],
      series: [
        {
          scales: {
            yAxes:[{
              ticks: {
                max: 400,
                min:0
              }
            }]
          }
        },
        {
          scales: {
            yAxes:[{
              ticks: {
                max: 300,
                min:0
              }
            }]
          }
        },
        {
          scales: {
            yAxes:[{
              ticks: {
                max: 300,
                min:0
              }
            }]
          }
        },
        {
          scales: {
            yAxes:[{
              ticks: {
                max: 100,
                min:0
              }
            }]
          }
        }
      ],
      warning:{
        scales: {
          yAxes:[{
            ticks: {
              max: 5000,
              min:0
            }
          }]
        }
      },
      flowData: [],
      flowLineData: [],
      flowDtData: [],
      flowDtLineData:[],
      flowDtngxData: [],
      flowDtngxLineData:[],
      flowBmData: [],
      flowBmLineData:[],
      flowBmtgoneData:[],
      flowBmtgoneLineData:[],
      flowBmtgtwoData:[],
      flowBmtgtwoLineData:[],
      flowBmtgthreeData:[],
      flowBmtgthreeLineData:[],
      flowBmtgfourData:[],
      flowBmtgfourLineData:[],
      flowBmngxsesData:[],
      flowBmngxsesLineData:[],
      tenantTopData: null,
      netdevicesData: null,
      dtngxsesData: null,
      dttencuData: null,
      dttenmemData: null,
      dtelvcuData: null,
      dtelvmemData: null,
      bmngxsesData: null,
      serverData: null,
      linedata: null,
      deviceInfo: {},
      keyTenant: [],
      warningDate: {
        x_time: [],
        series: []
      },
      flowDtData: {
        x_time:[],
        series:[]
      },
      flowDtngxData: {
        x_time:[],
        series:[]
      }
    };
  },
  mounted() {
    // this.fillPieData();
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
      // datong idc line
      this.$axios
        .get(process.env.BASE_URL + "/dashboard/getDtLineInfo/")
        .then(function(res) {
          self.flowDtData = res.data.data.data;
          self.fillDtFlowData();
        })
        .catch(function(error) {
          console.log(error);
        });
        // datong ngx act num line
        this.$axios
          .get(process.env.BASE_URL + "/dashboard/getDtngxact/")
          .then(function(res) {
            self.flowDtngxData = res.data.data.data;
            self.fillDtngxFlowData();
          })
          .catch(function(error) {
            console.log(error);
        });
        // nginx session  num
        this.$axios
          .get(process.env.BASE_URL + "/dashboard/DtngxsesPie")
          .then(function(res) {
            self.DtngxsesPieDate = res.data.data.resultList;
            self.fillngxsesPie();
          })
          .catch(function(error) {
            console.log(error);
          });
          // nginx session  num
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/DtcputenPie")
            .then(function(res) {
              self.DtcutenPieDate = res.data.data.resultList;
              self.filldtcutenPie();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/DtmemtenPie")
            .then(function(res) {
              self.DtmemtenPieDate = res.data.data.resultList;
              self.filldtmemtenPie();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/DtcpuelvPie")
            .then(function(res) {
              self.DtcuelvPieDate = res.data.data.resultList;
              self.filldtcuelvPie();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/DtmemelvPie")
            .then(function(res) {
              self.DtmemelvPieDate = res.data.data.resultList;
              self.filldtmemelvPie();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmlvscon/")
            .then(function(res) {
              self.flowBmData = res.data.data.data;
              self.fillBmFlowData();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmtgonetcp/")
            .then(function(res) {
              self.flowBmtgoneData = res.data.data.data;
              self.fillBmtgoneFlowData();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmtgtwotcp/")
            .then(function(res) {
              self.flowBmtgtwoData = res.data.data.data;
              self.fillBmtgtwoFlowData();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmtgthreetcp/")
            .then(function(res) {
              self.flowBmtgthreeData = res.data.data.data;
              self.fillBmtgthreeFlowData();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmtgfourtcp/")
            .then(function(res) {
              self.flowBmtgfourData = res.data.data.data;
              self.fillBmtgfourFlowData();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmngxLine/")
            .then(function(res) {
              self.flowBmngxsesData = res.data.data.data;
              self.fillBmngxsesFlowData();
            })
            .catch(function(error) {
              console.log(error);
          });
          this.$axios
            .get(process.env.BASE_URL + "/dashboard/getBmngxPie/")
            .then(function(res) {
              self.BmngxsesPieDate = res.data.data.resultList;
              self.fillBmngxsesPie();
            })
            .catch(function(error) {
              console.log(error);
          });
  },
  methods: {
    fillDtFlowData() {
      let self = this;
      self.flowDtData.forEach(function(item, index) {
        self.flowDtLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillDtngxFlowData() {
      let self = this;
      self.flowDtngxData.forEach(function(item, index) {
        self.flowDtngxLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillBmFlowData() {
      let self = this;
      self.flowBmData.forEach(function(item, index) {
        self.flowBmLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillBmtgoneFlowData() {
      let self = this;
      self.flowBmtgoneData.forEach(function(item, index) {
        self.flowBmtgoneLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillBmtgtwoFlowData() {
      let self = this;
      self.flowBmtgtwoData.forEach(function(item, index) {
        self.flowBmtgtwoLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillBmtgthreeFlowData() {
      let self = this;
      self.flowBmtgthreeData.forEach(function(item, index) {
        self.flowBmtgthreeLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillBmtgfourFlowData() {
      let self = this;
      self.flowBmtgfourData.forEach(function(item, index) {
        self.flowBmtgfourLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillBmngxsesFlowData() {
      let self = this;
      self.flowBmngxsesData.forEach(function(item, index) {
        self.flowBmngxsesLineData[index] = {
          labels: item.x_time,
          datasets: item.series.map(function(item, index) {
            return {
              label: `${item.name}(${item.unit})`,
              fill: false,
              backgroundColor: flowColor[index],
              borderColor: flowColor[index],
              data: item.data,
              borderWidth:2,
              pointRadius:0
            };
          }),
        };
      });
    },
    fillServerPie() {
      let self = this;
      this.serverData = {
        datasets: [
          {
            data: self.serverPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.serverPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.serverPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    fillTenantTopPie() {
      let self = this;
      this.tenantTopData = {
        datasets: [
          {
            data: self.tenantTopPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.tenantTopPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.tenantTopPieDate.map(function(item, index) {
          return item.tenant;
        })
      };
    },
    fillnetdevicesPie() {
      let self = this;
      this.netdevicesData = {
        datasets: [
          {
            data: self.netdevPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.netdevPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.netdevPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    fillngxsesPie() {
      let self = this;
      this.dtngxsesData = {
        datasets: [
          {
            data: self.DtngxsesPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.DtngxsesPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.DtngxsesPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    filldtcutenPie() {
      let self = this;
      this.dttencuData = {
        datasets: [
          {
            data: self.DtcutenPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.DtcutenPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.DtcutenPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    filldtcuelvPie() {
      let self = this;
      this.dtelvcuData = {
        datasets: [
          {
            data: self.DtcuelvPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.DtcuelvPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.DtcuelvPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    filldtmemtenPie() {
      let self = this;
      this.dttenmemData = {
        datasets: [
          {
            data: self.DtmemtenPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.DtmemtenPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.DtmemtenPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    filldtmemelvPie() {
      let self = this;
      this.dtelvmemData = {
        datasets: [
          {
            data: self.DtmemelvPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.DtmemelvPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.DtmemelvPieDate.map(function(item, index) {
          return item.location;
        })
      };
    },
    fillBmngxsesPie() {
      let self = this;
      this.bmngxsesData = {
        datasets: [
          {
            data: self.BmngxsesPieDate.map(function(item, index) {
              return item.count;
            }),
            backgroundColor: self.BmngxsesPieDate.map(function(item, index) {
              return pieColor[index];
            })
          }
        ],
        labels: self.BmngxsesPieDate.map(function(item, index) {
          return item.location;
        })
      };
    }
  }
};
</script>

<style>
.vux-masker {
  background-color: rgba(255, 255, 255, 0.3) !important;
}
.m-img {
  padding-bottom: 20%;
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
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  font-size: 18px;
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

.header {
  text-align: center;
  margin-top: 10px;
}
.dashcontent img {
  height: 30px;
}
.header strong {
  font-size: 2em;
}
.dashcontent {
  height: calc(100vh - 50px);
  overflow: auto;
}
.tenantCard {
  width: 90%;
  height: 150px;
  margin: 15px auto;
  box-shadow: #dfdfdf 0px 0px 10px;
  border-radius: 5px;
}
.piechart {
  width: 70%;
  margin: 0 auto;
}
.tenantCard img {
  height: 90px;
  margin: 0 auto;
}
.tenantCard p {
  font-weight: bold;
}
.logoArea {
  float: left;
  width: 50%;
  margin: 18px auto;
  text-align: center;
}
.infoArea {
  float: right;
  width: 50%;
  margin: 21px auto;
}
.linechart {
  width: 95%;
  margin: 0 auto;
}
.card-demo-flex {
  display: flex;
  flex-flow: row wrap;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 0 0 33.3%;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
#c1 {
  height: 600px;
  width: 300px;
}
</style>
