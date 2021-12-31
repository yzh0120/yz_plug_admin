<template>
	<page>
		<el-button type="success" @click="go">点我</el-button>
		
		<alert :data="alertData" @event="event">
			<workFlow :data.sync="shceme"></workFlow>
		</alert>
		
		
	</page>
</template>

<script>
	import workFlow from "./flow.vue";
	export default{
		components:{
			workFlow
		},
		data(){
			return {
				shceme:{
					lines:[
						// {
						// 	ep: "top"
						// 	from: "0041b4e9-745b-45e3-8637-e26055484ef2"
						// 	id: "1ee14510-ee02-42d5-a548-19cc2a2220f7"
						// 	name: （…）
						// 	sp: "bottom"
						// 	to: "3d8ea170-5f56-4eb4-a1a6-2729316d2507"
						// 	type: "sl"
						// 	wftype: "1"
						// },
					],
					nodes:[
						// {
						// 	height: 52
						// 	id: "898e2f7b-3dd7-4cdf-8de0-b950dea0eb9c"
						// 	left: 704
						// 	name: "结束"
						// 	top: 385
						// 	type: "endround"
						// 	width: 52
						// }
					]
				},
				alertData:{
				    field:false,
				    width:"800px",
				    height:"600px",
				    title: "基础弹窗",
				}
			}
		},
		methods:{
			go(){
				this.alertData.field = true
			},
			event(e){
			    if (e.event == "alert") {
						this.alertData.field = false
			    }
			    if (e.event == "cancel") {
			        this.alertData.field = false
			    }
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
