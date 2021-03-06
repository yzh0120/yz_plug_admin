let layout = () => import("@/layout/index.vue")

import wangEdit from "./wangEdit.js"
import swiper from "./swiper.js"
import map from "./map.js"


export default { 
    path: '/plug',//修改
    name: 'plug',//修改
    component:  layout,
    meta: {
        title: 'plug',//修改
        icon: 'e62a;',
    },
    children: [
		wangEdit,
		swiper,
		map,
    ]
}