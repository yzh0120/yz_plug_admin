let blank = () => import("@/views/blank.vue")//二级菜单专属
export default { 
    path: 'wangEdit',//修改
    name: 'wangEdit',//修改
    // redirect: {name:"wangEdit-base"},//修改
    component:  blank,
    meta: {
        title: 'wangEdit',//修改
        icon: 'e62a;',
    },
    children: [
        {
            path: 'base',//修改
            name: 'wangEdit-base',//修改
            component: () => import(/* webpackChunkName: "wangEdit-base" */ "@/views/plug/wangEdit/base.vue"),//修改
            meta: {
                title: '基础wangEdit',//修改
                icon: 'e627;',
            }
        }
    ]
}