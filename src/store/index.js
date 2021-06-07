import Vue from "vue";
import Vuex from "vuex";
import rootModule from "./rootModule";
import modules from "./modules/index";

Vue.use(Vuex);

rootModule.modules = modules;

let store = new Vuex.Store(rootModule);

export default store;
