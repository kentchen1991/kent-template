/*
* 此文件读取views下所有一级目录并自动注册index.js
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const requireStore = require.context('../views', true, /vx.js/)
const module = {}
requireStore.keys().forEach(fileName => {
  module[fileName.split('/')[1]] = requireStore(fileName).default
})
console.log(module);
let store = new Vuex.Store({
  modules: module
})
export default store
