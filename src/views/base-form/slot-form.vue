<template>
	<page>
		<base-form :data="formData" ref="form" >
			<template #sss>
			  <el-input placeholder="请输入内容" v-model="formData.data.xxx">
			    <template slot="prepend">Http://</template>
			  </el-input>
			</template>
			<template #ssss>
			  <el-input placeholder="请输入内容" v-model="formData.data.xxx">
			    <template slot="prepend">Http://</template>
			  </el-input>
			</template>
		</base-form>
	</page>
</template>

<script>
	export default{
		data(){
			let self = this
			return {
				formData:{
					
					list:[
						
						{ type:"input",field:"__input",title:"输入框",rules:[
							{ required: true, message: "请输入", trigger: "blur" },
							{ validator: self.$check.demo, trigger: "blur" },
					      ]
						},
						{ slot: "sss",field:"xxx", title: "插槽" },//重点
						{ slot: "ssss",field:"xxx", title: "插槽" },//重点
						{ type:"treeselect",field:"__treeselect",title:"树选择",opt:[], 
						// props :(node) =>{return { id: node.key,label: node.name,children: node.subOptions,}},
						// id:'id',label:"label",
						// create:true,
						children:"subOptions",
						rules:[
							{ required: true, message: "请输入", trigger: "blur" },
						  ]
						},
						{ type:"input",field:"__input1",title:"输入框",btn:"搜索"},

						{type:"password",field:"__password",title:"密码框"},

						{type:"textarea",field:"__textarea",title:"文本域",row:4},

						{type:"select",field:"__select",title:"下拉框",opt:[{text1:"选项一",value1:1},{text1:"选项二",value1:2}],text:"text1",value:"value1"},

						{type:"select",field:"__selectFilter",title:"过滤下拉框",opt:[{text1:"选项一",value1:1},{text1:"选项二",value1:2}],text:"text1",value:"value1",filter:true},

						{type:"select",field:"__selectFilter",title:"远程过滤下拉框",opt:[{text1:"选项一",value1:1},{text1:"选项二",value1:2}],text:"text1",value:"value1",remote:self.remote},

						{type:"select",field:"__selectCrate",title:"多选下拉框",opt:[{text:"选项一",value:1},{text:"选项二",value:2}],create:true},

						{type:"radio",field:"__radio",title:"单选框",opt:[{text1:"单选一",value1:1},{text1:"单选二",value1:2}],text:"text1",value:"value1"},

						{type:"checkbox",field:"__checkbox",title:"多选框",opt:[{text1:"多选一",value1:1},{text1:"多选二",value1:2}],text:"text1",value:"value1"},

						{type:"date",field:"__date",title:"日期选择器"},

						{type:"daterange",field:"__daterange",title:"日期段选择器"},

						{type:"switch",field:"__switch",title:"开关",av:1,iav:0,avText:"同意",iavText:"否决"},

						{type:"auto",field:"__auto",title:"自动补全",filter: self.auto_filter,key:"value1"}
					],
					data:{__input:"初始值"},
					// titleWidth:"200px",
					// inline:true,
				}
			}
		},
		created() {
		},
		mounted() {
			let arr  =[ {
				id: 'a',
				label: 'a',
				subOptions: [ {
					id: 'aa',
					label: 'aa',
				}, {
					id: 'ab',
					label: 'ab',
				} ],
				}, {
				id: 'b',
				label: 'b',
				}, {
				id: 'c',
				label: 'c',
				} ]
				this._set(this.formData, "__treeselect",{opt:arr});
		},
		methods:{
			remote(query){
				let arr = [{text1:query+"选项一",value1:1},{text1:query+"选项二",value1:2}]
				this._set(this.formData, "__selectFilter",{opt:arr});
			},
			auto_filter(queryStr, cd) { //自动补全 
				let res = [{
						value1: "三全鲜食（北新泾店）",
						address: "长宁区新渔路144号"
					},
					{
						value1: "Hot honey 首尔炸鸡（仙霞路）",
						address: "上海市长宁区淞虹路661号",
					},
				];
				cd(res);
			},
		}
	}
</script>

<style lang="scsss" scoped>
	
</style>