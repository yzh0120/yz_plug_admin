let layout = () => import("@/layout/index.vue")

import wangEdit from "./wangEdit.js"
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
    ]
}