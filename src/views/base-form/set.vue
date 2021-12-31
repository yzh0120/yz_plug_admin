<template>
	<page>
		<el-button @click="check">提交</el-button><el-button @click="reset">重置</el-button>
		<base-form :data="formData" ref="form"></base-form>
	</page>
</template>

<script>
	export default{
		data(){
			let self = this
			return {
				formData:{
					// titleWidth:"200px",
					list:[
						{ type:"input",field:"__input",title:"输入框",rules:[
							{ required: true, message: "请输入", trigger: "blur" },
							{ validator: self.$check.demo, trigger: "blur" },
					      ]
						},
						{type:"password",field:"__password",title:"密码框"},
						{type:"textarea",field:"__textarea",title:"文本域",row:4},
						{type:"select",field:"__select",title:"下拉框",opt:[{text1:"选项一",value1:1},{text1:"选项二",value1:2}],text:"text1",value:"value1"},
						{type:"select",field:"__selectFilter",title:"过滤下拉框",opt:[{text:"选项一",value:1},{text:"选项二",value:2}],filter:self.filter},
						{type:"select",field:"__selectCrate",title:"多选下拉框",opt:[{text:"选项一",value:1},{text:"选项二",value:2}],create:true},
						{type:"radio",field:"__radio",title:"单选框",opt:[{text1:"单选一",value1:1},{text1:"单选二",value1:2}],text:"text1",value:"value1"},
						{type:"checkbox",field:"__checkbox",title:"多选框",opt:[{text1:"多选一",value1:1},{text1:"多选二",value1:2}],text:"text1",value:"value1"},
						{type:"date",field:"__date",title:"日期选择器"},
						{type:"daterange",field:"__daterange",title:"日期段选择器"},
						{type:"switch",field:"__switch",title:"开关",av:1,iav:0,avText:"同意",iavText:"否决"},
						{type:"auto",field:"__auto",title:"自动补全",filter: self.auto_filter,}
					],
					data:{},//__input:1
					// dom:null,
				}
			}
		},
		created() {
			this.formData.data.__input = "created修改"
		},
		mounted() {
			this.formData.data.__input = "mounted修改"
			// setTimeout(()=>{
				
			// },2000)
		},
		methods:{
			filter(query){
				let arr = [{text:query+"选项一",value:1},{text:query+"选项二",value:2}]
				this._set(this.formData, "__selectFilter",{opt:arr});
			},
			auto_filter(queryStr, cd) { //自动补全 
				let res = [{
						value: "三全鲜食（北新泾店）",
						address: "长宁区新渔路144号"
					},
					{
						value: "Hot honey 首尔炸鸡（仙霞路）",
						address: "上海市长宁区淞虹路661号",
					},
				];
				cd(res);
			},
			check(){
				this.formData.data.__input = "延迟修改"
				if(this.$refs.form.check()){
					this.$message.success("成功")
				}else{
					this.$message.error("失败")
				}
			},
			reset(){
				this.$refs.form.reset()
			}
		}
	}
</script>

<style lang="scsss" scoped>
	
</style>