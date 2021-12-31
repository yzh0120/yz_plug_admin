	<!-- 一个最基础的上传 -->
<template>
	<div>
		<el-upload :action="api">
			<!-- @click="import1"    click  比action 先执行 -->
		            <el-button size="small" type="primary" :headers="headers" >导入</el-button>
		          </el-upload>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				api: process.env.VUE_APP_BASE_API + "/v1/data/blacklist/importTemplate",
			}
		}
	}
</script>

<style>
</style>
