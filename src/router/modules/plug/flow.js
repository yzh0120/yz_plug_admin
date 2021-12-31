let blank = () => import("@/views/blank.vue")//二级菜单专属
export default { 
    path: 'flow',//修改
    name: 'flow',//修改
    // redirect: {name:"flow-base"},//修改
    component:  blank,
    meta: {
        title: '流程',//修改
        icon: 'e62a;',
    },
    children: [
        {
            path: 'base',//修改
            name: 'flow-base',//修改
            component: () => import(/* webpackChunkName: "flow-base" */ "@/views/plug/flow/index.vue"),//修改
            meta: {
                title: '基础流程',//修改
                icon: 'e627;',
            }
        }
    ]
}