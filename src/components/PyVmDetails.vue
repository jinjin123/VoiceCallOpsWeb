<template>
<div class="dashcontent">
    <input   placeholder="请输入物理机IP地址" icon="search"  class="search"  v-model="value"></input>
    <table class="table table-striped">
        <thead>
            <tr>
              <th>物理机名</th>
              <th>物理机IP</th>
              <th>虚拟机名</th>
              <th>虚拟机IP</th>
              <th>虚拟机硬件</th>
              <!-- <th>虚拟机序列号</th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value,idx) in libraryInfo">
                <!-- <td><a :href="'#/pydetail?hostname=' + value.hostname" v-bind:key="value.hostname" @click="showdetails(value.hostname)">{{value.hostname}}</a></td> -->
                <td>{{value.hostname}}</td>
                <td>{{value.ip}}</td>
                <td>{{value.vm_hostname}}</td>
                <td>{{value.vmip}}</td>
                <td>{{value.vmhd}}</td>
                <!-- <td>{{value.vm_num}}</td> -->
            </tr>
        </tbody>
     </table>
</div>
</template>

<script>
export default {
 name: "pyvmdetail",
 data() {
   return {
     libraryInfo: "",
     value: '',
   }
 },
 methods:{
   // fetchdata(){
   //   var self = this;
   //    this.$axios.get(process.env.BASE_URL + "/dashboard/getpyvm").then(function (data) {
   //        var json = data.data.data;
   //        console.log(json)
   //        self.libraryInfo = json["resultList"];
   //    }, function (response) {
   //        console.info(response);
   //    })
   // },
   fetchdata2(){
     var self = this;
      this.$axios.get(process.env.BASE_URL + "/dashboard/getpyvmdata?hostname=" + this.$route.query.hostname).then(function (data) {
        console.log(data)
          var json = data.data.data;
          self.libraryInfo = json["resultList"];
      }, function (response) {
          console.info(response);
      })
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
   this.fetchdata2();
   // console.log(this.$route.name)
 },
 watch:{
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
      this.fetchdata2();
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
