import Vue from 'vue'
import Router from 'vue-router'
import Apply from '@/components/apply'
import Result from '@/components/result'
// import GoodAt from '@/components/goodAt'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Apply
    },
    {
      path: '/Apply',
      component: Apply
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result
    }
  ]
})
