let layout = () => import(/* webpackChunkName: "layout" */"@/layout/index.vue")

// let view = () => import("@/views/blank.vue")




// import confirm from "./modules/confirm.js"
import baseTable from "./modules/base-table.js"
import baseForm from "./modules/base-form.js"
import element from "./modules/element.js"
import alert from "./modules/alert.js"
import svgIcon from "./modules/svgIcon.js"
import panel from "./modules/panel.js"
import VCharts from "./modules/VCharts.js"
import pageLayout from "./modules/pageLayout.js"
import file from "./modules/file.js"
import base from "./modules/base.js"
import axios from "./modules/axios.js"
import tabsView from "./modules/tabsView.js"

import {status} from "./modules/status.js"
const routes = [
	// 
	
	//每个路由必须有name和meta, 而children可选，一个路由有children 才会显示 层级菜单
	//先 展示本身的meta 的信息
	
	//meta 里面的自定义 
	
	//hidden: 权重最高 在父一子一需要写在父meta
	//fixed  固定页面的fullPath 被手动设置 和path一样,所以含有query的页面避免fixed,在vuex的permission.js的getFixed函数
	
	{
		path: '/blank',
		name: 'blank',
		component: layout,
		meta:{
			hidden: true,
		}
	},
	{
		path: '/',
		name: '/',
		redirect: '/base',
		component: layout,
		meta:{
			title: '首页',
			icon: 'shouye',
		},
		children: [{
			path: 'base',
			name: 'base',
			component: () => import( /* webpackChunkName: "base" */ "@/views/base.vue"),
			meta: {
				title: '首页',
				// hidden:true,
				icon: 'shouye',
				fixed: true//"/base"//fullPath
			}
		}]
	},
	...status,//状态和登录页
	
	


	baseTable,//封装表格
	baseForm,//封装表单
	alert,//弹窗
	svgIcon,//svgIcon
	panel,//折叠框
	VCharts,//图表
	file, //文件
	axios,//axios
	
	pageLayout,//页面布局
	
	tabsView,//tabsView
	element,//element
	
	base,//基础
	

]

export default routes
