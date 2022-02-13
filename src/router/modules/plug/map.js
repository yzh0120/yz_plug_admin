let blank = () => import("@/views/blank.vue")//二级菜单专属
export default { 
    path: 'map',//修改
    name: 'map',//修改
    // redirect: {name:"swiper-base"},//修改
    component:  blank,
    meta: {
        title: '地图',//修改
        icon: 'e62a;',
    },
    children: [
        {
            path: 'baidu',//修改
            name: 'map-baidu',//修改
            component: blank,
            meta: {
                title: '百度地图',//修改
                icon: 'e627;',
            },
			children:[
				{
				    path: 'base',//修改
				    name: 'map-baidu-base',//修改
				    component: () => import(/* webpackChunkName: "swiper-two" */ "@/views/plug/map/baidu/base.vue"),//修改
				    meta: {
				        title: '百度地图基础',//修改
				        icon: 'e627;',
				    }
				},
				{
				    path: 'BmMarker',//修改
				    name: 'map-baidu-BmMarker',//修改
				    component: () => import(/* webpackChunkName: "swiper-two" */ "@/views/plug/map/baidu/BmMarker.vue"),//修改
				    meta: {
				        title: '百度地图-点',//修改
				        icon: 'e627;',
				    }
				},
				{
				    path: 'BmCircle',//修改
				    name: 'map-baidu-BmCircle',//修改
				    component: () => import(/* webpackChunkName: "swiper-two" */ "@/views/plug/map/baidu/BmCircle.vue"),//修改
				    meta: {
				        title: '百度地图-圆',//修改
				        icon: 'e627;',
				    }
				},
			]
        },
		
		// {
		//     path: 'three',//修改
		//     name: 'swiper-three',//修改
		//     component: () => import(/* webpackChunkName: "swiper-three" */ "@/views/plug/swiper/three.vue"),//修改
		//     meta: {
		//         title: '垂直播放',//修改
		//         icon: 'e627;',
		//     }
		// }
    ]
}