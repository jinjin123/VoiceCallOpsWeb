<template>
<div class="dashcontent">
    <input   placeholder="请输入物理机IP地址" icon="search"  class="search"  v-model="value"></input>
    <table class="table table-striped">
        <thead>
            <tr>
              <th>物理机名</th>
              <th>物理机IP</th>
              <th>扩展IP</th>
              <th>外网IP</th>
              <th>机架名</th>
              <th>机位号</th>
              <th>虚拟机数量</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value,idx) in libraryInfo">
                <!-- <td><a :href="'#/pydetail?hostname=' + value.hostname" v-bind:key="value.hostname" @click="showdetails(value.hostname)">{{value.hostname}}</a></td> -->
                <td><a  v-bind:key="value.hostname" @click="showdetails(value.hostname)">{{value.hostname}}</a></td>
                <td>{{value.ip}}</td>
                <td>{{value.etip}}</td>
                <td>{{value.wanip}}</td>
                <td>{{value.rack}}</td>
                <td>{{value.pos}}</td>
                <td>{{value.vm_num}}</td>
            </tr>
        </tbody>
     </table>
</div>
</template>

<script>
export default {
 name: "pyvm",
 data() {
   return {
     libraryInfo: "",
     value: '',
   }
 },
 methods:{
   fetchdata(){
     var self = this;
      this.$axios.get(process.env.BASE_URL + "/dashboard/getpyvm").then(function (data) {
          var json = data.data.data;
          // console.log(json)
          self.libraryInfo = json["resultList"];
      }, function (response) {
          console.info(response);
      })
   },
   fetchdata2(){
     var self = this;
      this.$axios.get(process.env.BASE_URL + "/dashboard/getpyvmdata?hostname=" + this.$route.query.hostname).then(function (data) {
          var json = data.data.data;
          self.libraryInfo = json["resultList"];
      }, function (response) {
          console.info(response);
      })
   },
   showdetails: function(item) {
     this.$router.push({
       path: "/HelloWorld/PyvmDetails",
       query: {
         hostname: item
       }
     });
   },

 },
 created () {
   var ua = window.navigator.userAgent.toLowerCase();
   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
     // return true;
   } else {
     this.$router.push({
       path:"/error"
   })
 };
   this.fetchdata();
   // console.log(this.$route.name)
 },
 watch:{
   // "$route": "fetchdata2",
   value:function (Value,oldValue){
    let  self = this;
    if(Value != ''){
      self.libraryInfo.forEach(function(item,index){
        if(item.ip == Value){
          self.libraryInfo  = [item]
          console.log(item)
        }else{
          self.libraryInfo = self.libraryInfo
          console.log(self.libraryInfo)
        }
      })
    }else {
      this.fetchdata();
    }
   }
 }

}
</script>
<style>
.dashcontent {
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
