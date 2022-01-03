let blank = () => import("@/views/blank.vue")//二级菜单专属
export default { 
    path: 'swiper',//修改
    name: 'swiper',//修改
    // redirect: {name:"swiper-base"},//修改
    component:  blank,
    meta: {
        title: '轮播图',//修改
        icon: 'e62a;',
    },
    children: [
        {
            path: 'base',//修改
            name: 'swiper-base',//修改
            component: () => import(/* webpackChunkName: "swiper-base" */ "@/views/plug/swiper/index.vue"),//修改
            meta: {
                title: '轮播元素',//修改
                icon: 'e627;',
            }
        },
		{
		    path: 'two',//修改
		    name: 'swiper-two',//修改
		    component: () => import(/* webpackChunkName: "swiper-two" */ "@/views/plug/swiper/two.vue"),//修改
		    meta: {
		        title: '当前元素变大',//修改
		        icon: 'e627;',
		    }
		},
		{
		    path: 'three',//修改
		    name: 'swiper-three',//修改
		    component: () => import(/* webpackChunkName: "swiper-three" */ "@/views/plug/swiper/three.vue"),//修改
		    meta: {
		        title: '垂直播放',//修改
		        icon: 'e627;',
		    }
		}
    ]
}