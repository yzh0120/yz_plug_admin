
let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")

export default { 
    path: 'css',//修改
    name: 'css',//修改
    redirect: {name:"css-three"},//修改
    component:  blank,
	meta:{
        title: 'css',//修改
        icon: 'e64f;',
    },
    children: [
        {
            path: 'three',//修改
            name: 'css-three',//修改
            component: () => import(/* webpackChunkName: "css-base" */ "@/views/css/three.vue"),//修改
            meta: {
                title: '三角形',//修改
                icon: 'e64f;',
            }
        },
		{
		    path: '0.5px',//修改
		    name: 'css-0.5px',//修改
		    component: () => import(/* webpackChunkName: "css-base" */ "@/views/css/0.5px.vue"),//修改
		    meta: {
		        title: '0.5px',//修改
		        icon: 'e64f;',
		    }
		},
		{
		    path: 'filter',//修改
		    name: 'css-filter',//修改
		    component: () => import(/* webpackChunkName: "css-base" */ "@/views/css/filter.vue"),//修改
		    meta: {
		        title: 'filter',//修改
		        icon: 'e64f;',
		    }
		}
    ]
}