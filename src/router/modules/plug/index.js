let layout = () => import("@/layout/index.vue")

import flow from "./flow.js"
import swiper from "./swiper.js"
import vueSuperFlow from "./vueSuperFlow.js"
export default { 
    path: '/plug',//修改
    name: 'plug',//修改
    component:  layout,
    meta: {
        title: 'plug',//修改
        icon: 'e62a;',
    },
    children: [
		flow,
		swiper,
		vueSuperFlow
    ]
}