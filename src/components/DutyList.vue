<template>
  <div class="duty-content">
    <div v-for="(rd,idx) in records" class="plan_item" v-bind:class="isToday(idx)?'active':''">
      <div class="item_date">
        <p class="p1">{{getDayOfWeek(idx)}}</p>
        <p class="p2">{{getDate(idx)}}</p>
        <p class="p3">{{toDate(idx)}}</p>
      </div>
      <div class="item_content">
        <p>
          <Icon type="ios-sunny"></Icon>
          <span>{{rd.day}}</span>
        </p>
        <p>
          <Icon type="ios-moon"></Icon>
          <span>{{rd.night}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DutyList",
  data() {
    return {
      dayOfWeek: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      records: []
    };
  },
  created() {
    var self = this;
    this.$axios
      .get(process.env.BASE_URL + "/duty/range.json")
      .then(function(res) {
        self.records = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    toDate: function(idx) {
      var tmp = this.records[idx].date;
      var dt = new Date();
      dt.setTime(tmp);
      return dt.toLocaleDateString();
    },
    getDate: function(idx) {
      var tmp = this.records[idx].date;
      var dt = new Date();
      dt.setTime(tmp);
      return dt.getDate();
    },
    getDayOfWeek: function(idx) {
      var tmp = this.records[idx].date;
      var dt = new Date();
      dt.setTime(tmp);
      return this.dayOfWeek[dt.getDay()];
    },
    isToday: function(idx) {
      var td = new Date();
      var tmp = this.records[idx].date;
      var dt = new Date();
      dt.setTime(tmp);
      return (
        td.getYear() == dt.getYear() &&
        td.getMonth() == dt.getMonth() &&
        td.getDate() == dt.getDate()
      );
    },
    handleReachEdge: function(dir) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (dir > 0) {
            console.log("----------" + dir);
          } else {
            console.log("-------xxx---x" + dir);
          }
          resolve();
        }, 2000);
      });
    }
  }
};
</script>

<style scoped>
.duty-content {
  height: calc(100vh - 53px);
  overflow: auto;
}
.plan_item {
  display: block;
  zoom: 1;
  overflow: hidden;
  border-bottom: 1px solid #aaa;
}
.item_date {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  padding: 0.5em 2em 0.5em 2em;
}
.item_date .p1,
.item_date .p3 {
  font-size: 0.8em;
}
.item_date .p2 {
  font-size: 2em;
  font-weight: 800;
}
.item_content {
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
  zoom: 1;
  width: 10000px;
  padding-left: 1em;
}
.item_content p {
  display: table;
  vertical-align: middle;
  margin: 0.5em 0em;
}
.item_content p i {
  display: table-cell;
  width: 1em;
  height: 1em;
  font-size: 2em;
  text-align: center;
  vertical-align: middle;
}
.item_content p span {
  padding-left: 1em;
  font-size: 1.2em;
  display: table-cell;
  vertical-align: middle;
}
.active {
  color: #fff;
  background-color: #43a047;
}
</style>
