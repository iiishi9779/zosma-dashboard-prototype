import { createApp, provide, ref } from 'vue'
import { Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'
import 'quasar/src/css/index.sass'
import App from './App.vue'

import quasarIconSet from 'quasar/icon-set/material-symbols-rounded'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'

import 'quasar/src/css/index.sass'

import dashboardData from './assets/all-generator-status-report.json'
import report from './assets/report.json'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/', component: () => import('./views/Dashboard.vue'), children: [
      {
        path: 'branch/:dashboardBranchId', component: () => import('./views/Branch.vue'), children: [
          { path: 'generator/:dashboardGeneratorId', component: () => import('./views/Generator.vue') }
        ]
      }
    ]
  }]
})

const myApp = createApp(App)

myApp.use(router)

myApp.provide('dashboard-data', dashboardData)
myApp.provide('report', report[0])

myApp.use(Quasar, {
  plugins: {
    iconSet: [quasarIconSet]
  },
})

myApp.mount('#app')