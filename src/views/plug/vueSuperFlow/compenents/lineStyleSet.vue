<template>
	<alert :data="alertData" @event="event" >
	  <div>
	    <el-form class="link-base-style-form" ref="activeLineForm" label-width="160px" @submit.native.prevent :model="activeLineForm">
	      <h4>线条设置</h4>
	      <el-row :gutter="10">
	        <el-col :span="12">
	          <el-form-item label="线条颜色">
	            <el-color-picker v-model="activeLineForm.color">
	            </el-color-picker>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="线条悬浮时的颜色">
	            <el-color-picker v-model="activeLineForm.hover">
	            </el-color-picker>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="文字颜色">
	            <el-color-picker v-model="activeLineForm.textColor">
	            </el-color-picker>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="文字悬浮时的颜色">
	            <el-color-picker v-model="activeLineForm.textHover">
	            </el-color-picker>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="字体">
	            <el-select size="medium" v-model="activeLineForm.font">
	              <el-option v-for="item in fontList" :key="item" :label="item" :value="item">
	              </el-option>
	            </el-select>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="是否虚线">
	            <el-switch v-model="activeLineForm.dotted" active-color="#13ce66" inactive-color="#ff4949">
	            </el-switch>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="虚线时生效">
	            <!-- 虚线长度 -->
	            <el-select size="medium" style="width: 80px" v-model="activeLineForm.lineDash[0]">
	              <el-option v-for="item in [1,2,3,4,5,6,7,8]" :key="item" :label="item" :value="item">
	              </el-option>
	            </el-select>
	            <!-- 虚线之间的距离 -->
	            <el-select size="medium" style="width: 80px" v-model="activeLineForm.lineDash[1]">
	              <el-option v-for="item in [1,2,3,4,5,6,7,8]" :key="item" :label="item" :value="item">
	              </el-option>
	            </el-select>
	          </el-form-item>
	        </el-col>
	        <el-col :span="12">
	          <el-form-item label="背景">
	            <el-color-picker v-model="activeLineForm.background">
	            </el-color-picker>
	          </el-form-item>
	        </el-col>
	      </el-row>
	    </el-form>
	  </div>
	</alert>
</template>

<script>
	export default{
		data(){
			return {
				
				//字体列表
				fontList: ["14px Arial", "italic small-caps bold 12px arial"],
			}
		},
		props:{
			alertData:{
				
			},
			activeLineObj: {

			},
			activeLineForm:{
				
			}
		},
		methods:{
			//自定义弹窗事件(线条样式)
			event(e) {
			  if(e.event == "confirm"){
			    this.activeLineObj.meta = this.$fn.deepClone(this.activeLineForm);
				//之所以给他复制就能改变颜色 是因为 在弹出窗的时候 用的是浅拷贝
			    this.$emit("update:activeLineObj",this.activeLineObj.meta )
			  }
			  this.resetFields();
			  this.alertData.field = false
			},
			resetFields() {
			  this.$emit("update:activeLineForm",this.$fn.deepClone( this.$parent.$parent.$options.data().activeLineForm ))
			},
		}
	}
</script>

<style>
</style>
