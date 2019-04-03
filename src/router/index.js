import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: function (resolve) {
               require(['@/components/Login'], resolve)
      },
    },
    {
      path: '/error',
      name: 'error',
      component: function (resolve) {
               require(['@/components/error'], resolve)
      },
    },
      {
        path: '/HelloWorld',
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
        },
        //  {
        //   path: 'CMDB',
        //   name: 'CMDB',
        //   component: function (resolve) {
        //     require(['@/components/CMDB'], resolve)
        //   }
        // },
        {
          path: 'Imgraph',
          name: 'Imgraph',
          component: function (resolve) {
            require(['@/components/Imgraph'], resolve)
          }
        },
        {
          path: 'pydetail',
          name: 'pydetail',
          component: function (resolve) {
            require(['@/components/pyvm'], resolve)
          }
        },
        {
          path: 'PyvmDetails',
          name: 'PyvmDetails',
          component: function (resolve) {
            require(['@/components/PyvmDetails'], resolve)
          }
        },
      ]
    },
  ]
})
