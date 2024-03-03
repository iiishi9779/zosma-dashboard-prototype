import { createApp, provide, ref } from 'vue'
import { Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'
import 'quasar/src/css/index.sass'
import App from './App.vue'

import quasarIconSet from 'quasar/icon-set/material-symbols-rounded'

// Import icon libraries
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import Dashboard from './views/Dashboard.vue'
import Branch from './views/Branch.vue'
import Generator from './views/Generator.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/', component: Dashboard, children: [
      {
        path: 'branch/:dashboardBranchId', component: Branch, children: [
          { path: 'generator/:dashboardGeneratorId', component: Generator }
        ]
      }
    ]
  }]
})


const myApp = createApp(App).use(router)

myApp.use(Quasar, {
  plugins: {
    iconSet: quasarIconSet
  },
})

myApp.mount('#app')