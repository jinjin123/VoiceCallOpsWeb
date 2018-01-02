import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: function (resolve) {
        require(['@/components/HelloWorld'], resolve)
      },
      children: [
        {
          path: 'Dashboard',
          name: 'Dashboard',
          component: function (resolve) {
            require(['@/components/Dashboard'], resolve)
          }
        }, {
          path: 'DutyList',
          name: 'DutyList',
          component: function (resolve) {
            require(['@/components/DutyList'], resolve)
          }
        }, {
          path: 'AlarmList',
          name: 'AlarmList',
          component: function (resolve) {
            require(['@/components/AlarmList'], resolve)
          }
        }, {
          path: 'TenantList',
          name: 'TenantList',
          component: function (resolve) {
            require(['@/components/TenantList'], resolve)
          }
        }, {
          path: 'AlarmDetails',
          name: 'AlarmDetails',
          component: function (resolve) {
            require(['@/components/AlarmDetails'], resolve)
          }
        }, {
          path: 'CMDB',
          name: 'CMDB',
          component: function (resolve) {
            require(['@/components/CMDB'], resolve)
          }
        }
      ]
    },
  ]
})
