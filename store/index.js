import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import { CARTKEY } from '@/utils/contants.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: uni.getStorageSync(CARTKEY) || [],
    userInfo: {}
  },

  mutations: {
    ADD2CART (state, id) {
      const { cartList } = state
      const index = cartList.findIndex(item => item.goods_id === id)
      if (index === -1) {
        cartList.push({ goods_id: id, num: 1, checked: true })
      } else {
        cartList[index].num++
        cartList[index].checked = true
      }
    },
    SYNCCART (state, completeCartInfo) {
      state.cartList = completeCartInfo
    },
    SETUSERINFO (state, userInfo) {
      state.userInfo = userInfo
    },
    DELPAYCART (state) {
      state.cartList = state.cartList.filter(
        item => !item.checked || item.num === 0
      )
    }
  },

  actions: {},

  plugins: [createLogger()]
})

export default store

// 1、uniapp开发微信小程序，在微信开发者工具中进行预览
// 2、微信开发者工具无法使用devtools，只能使用vuex内置logger插件查看vuex状态变化
// 3、加入到购物车的商品数据格式 cartList: [{ id: '商品id', mum: 1, checked: true },{...}]
// 4、cartList内部对象id字段名必须参考实际的接口返回，此处只是示范加入到购物车商品的数据形式
// 5、vuex官网提供的导入方式不适用于uniapp项目，因此导入方式必须更改为 import { createLogger } from 'vuex' 否则在uniapp项目中会报错"文件查找失败"
// 6、在uniapp项目中使用vuex无需安装，uniapp已经内置vuex，直接导入即可使用，但与常规vue项目不同的是，在uniapp项目中使用vuex需要手动将store对象挂载到vue原型对象上
// 7、mutations对象的方法第二参数形参可以随意命名，但数组遍历时item点出的那个必须是state.cartList数组中存在的字段名，此处为了说明并没有命名成一致的进行简写
// 8、DELPAYCART 删除参与预支付结算的购物车商品，反向思维就是只保留不参与预支付结算的购物车商品
