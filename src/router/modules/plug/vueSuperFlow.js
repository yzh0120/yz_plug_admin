let blank = () => import("@/views/blank.vue")//二级菜单专属
export default { 
    path: 'vueSuperFlow',//修改
    name: 'vueSuperFlow',//修改
    // redirect: {name:"vueSuperFlow-base"},//修改
    component:  blank,
    meta: {
        title: 'vueSuperFlow流程',//修改
        icon: 'e62a;',
    },
    children: [
        {
            path: 'base',//修改
            name: 'vueSuperFlow-base',//修改
            component: () => import(/* webpackChunkName: "vueSuperFlow-base" */ "@/views/plug/vueSuperFlow/base.vue"),//修改
            meta: {
                title: '基础流程',//修改
                icon: 'e627;',
            }
        }
    ]
}