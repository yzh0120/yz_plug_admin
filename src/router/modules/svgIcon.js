let layout = () => import("@/layout/index.vue")
export default { 
    path: '/svgIcon',//修改
    name: 'svgIcon',//修改
    redirect: {name:"svgIcon-base"},//修改
    component:  layout,
    meta: {
        title: '封装svgIcon',//修改
        icon: 'e62a;',
    },
    children: [
        {
            path: 'base',//修改
            name: 'svgIcon-base',//修改
            component: () => import(/* webpackChunkName: "svgIcon-base" */ "@/views/svgIcon/base.vue"),//修改
            meta: {
                title: '基础svgIcon',//修改
                icon: 'e627;',
            }
        },
        // {
        //     path: 'msg',//修改
        //     name: 'alert-msg',//修改
        //     component: () => import(/* webpackChunkName: "alert-msg" */ "@/views/alert/msg.vue"),//修改
        //     meta: {
        //         title: '信息弹窗',//修改
        //         icon: 'e627;',
        //     }
        // }
    ]
}