<template>
  <div>

    <div class='tenant-item'>
      <div class="tenant-title">
        <img src="../assets/logo.png" alt="" style="width: 10vw">
        <p>斑马汽车</p>
      </div>
      <div class="tenant-message">
        <ul>
          <li>物理机
            <span>12台</span>
          </li>
          <li>虚机
            <span></span>
          </li>
          <li>CPU
            <span></span>
          </li>
          <li>内存
            <span></span>
          </li>
          <li>存储
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TenantList",
  data() {
    return {
      records: []
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
      .get(process.env.BASE_URL + "/duty/range.json")
      .then(function(res) {
        self.records = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {}
};
</script>
<style>
.tenant-item {
  background: white;
  border: 2px solid #a1a1a1;
  border-radius: 3px;
  padding: 2vw 1vw;
  margin: 1vw;
  display: flex;
  align-items: center;
}
.tenant-item div {
  display: inline-block;
}
.tenant-title {
  padding: 0px 2vw 0px 1vw;
  width: 20vw;
  text-align: center;
}
.tenant-message {
  width: 72vw;
}
.tenant-message span {
  float: right;
}
</style>
