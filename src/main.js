import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUi from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import myEcharts from 'echarts'
import vueEcharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$bus = new Vue()

moment.locale('zh-cn');//需要汉化

Vue.use(elementUi);
Vue.use(myEcharts);
Vue.component('chart', vueEcharts)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
