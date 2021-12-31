<template>
    <page :show="true">
		<div class="top hidden-md-and-down">
			<div class="item item1">
				
					<el-image :src="img404" class="img"></el-image>
					<!-- <img :src="img404" alt=""> -->
					<div class="text">
						<div class="name">欢迎</div>
						<div class="scope">xxx</div>
					</div>
			</div>
			<div class="item item2">
				<i class="iconfont positionIcon">&#xe620;</i>
				<div class="card">
					<div>今日访问人数</div>
					<div>962811 </div>
					<div>在场人数</div>
					<div>536</div>
				</div>
			</div>
			<div class="item item3">
				<i class="iconfont positionIcon">&#xe70a;</i>
				<div class="card">
					<div>实验室总数</div>
					<div>7,962</div>
					<div>使用中</div>
					<div>882</div>
				</div>
			</div>
			<div class="item item4">
				<i class="iconfont positionIcon">&#xe620;</i>
				<div class="card">
					<div>实验室总数</div>
					<div>{{demo | split(5)}}</div>
					<div>通过人数</div>
					<div>884</div>
				</div>
			</div>
		</div>
		
		<!-- <div class="eye"> -->
	    <el-card class="eye">
			<div slot="header" >
			    <span>数据可视化</span>
			  </div>
			<el-tabs v-model="activeName" >
			    <el-tab-pane label="流量趋势" name="1">
					<ve-line :data="chartData" :settings="chartSettings_stack" ref="chart1"></ve-line>
				</el-tab-pane>
			    <el-tab-pane label="访问量" name="2">
					<ve-histogram :data="chartData" :settings="chartSettings" ref="chart2"></ve-histogram>
				</el-tab-pane>
			</el-tabs>
	    </el-card>
		<!-- </div> -->
		
				
    </page>
</template>

<script>
import keepAlive from "@/native/Mixins/keepAlive.js";
export default{
    name:"",
	mixins: [keepAlive],
    data(){
		this.chartSettings_stack = {
		  stack: { 用户: ["访问用户", "下单用户"] }, //设置堆叠的指标,从左往右堆叠
		  area: true, //显示面积
		};
		this.chartSettings = {
		  showLine: ["下单用户"], //在柱状图的基础上加折线图的指标
		};
        return {
			demo:1231231231231231,
			activeNames: ['1'],
			img404:require("@/assets/imgs/404.png"),
			activeName:"1",
            chartData: {
              columns: ["日期", "访问用户", "下单用户"],
              rows: [
                { 日期: "2018-01-01", 访问用户: 1393, 下单用户: 1093},
                { 日期: "2018-01-02", 访问用户: 3530, 下单用户: 3230 },
                { 日期: "2018-01-03", 访问用户: 2923, 下单用户: 2623 },
                { 日期: "2018-01-04", 访问用户: 1723, 下单用户: 1423 },
                { 日期: "2018-01-05", 访问用户: 3792, 下单用户: 349},
                { 日期: "2018-01-06", 访问用户: 4593, 下单用户: 4293 },
				{ 日期: "2018-01-07", 访问用户: 1393, 下单用户: 1093},
				{ 日期: "2018-01-08", 访问用户: 3530, 下单用户: 3230 },
				{ 日期: "2018-01-09", 访问用户: 2923, 下单用户: 2623 },
				{ 日期: "2018-01-10", 访问用户: 1723, 下单用户: 1423 },
				{ 日期: "2018-01-11", 访问用户: 3792, 下单用户: 349},
				{ 日期: "2018-01-12", 访问用户: 4593, 下单用户: 4293 },
              ],
            },
        }
    },
    methods:{
        handleChange(val) {
                console.log(val);
              }
    },
	mounted() {
		console.log(this.$fn.date.diff(new Date(),'2018-01-01'),'1111111111----')
	},
	watch: {
		/* 
		 在一个初始宽度未知的容器内绘制图表时，因为无法获取宽度，所以图表会绘制失败，
		 解决的办法是在容器宽度已知后， 调用echarts的resize方法。
		 */
		activeName (v) {
			this.$nextTick(_ => {
			  this.$refs[`chart${v}`].echarts.resize()
			})
		}
	}
}

</script>

<style lang="scss" scoped>
    .top{
		height: 110px;
		// border: 1px solid red;
		display: flex;
		justify-content: space-between;
		
		.item{
			width: 23%;
			height: 100%;
			border: 1px solid #ebeef5;
			transition: all .3s;
			border-radius: 6px;
			position: relative;
			&:hover .positionIcon{
				right: 16px;
				bottom: 16px;
			}
			.card{
				color: white;
				padding-left: 20px;
				div:nth-child(1){
					font-size: 13px;
				}
				div:nth-child(2){
					margin-bottom: 8px;
					font-size: 18px;
				}
				div:nth-child(3){
					font-size: 13px;
				}
			}
			.positionIcon{
				    position: absolute;
				    right: 6px;
				    bottom: 6px;
				    font-size: 50px;
				    transform: rotate(-30deg);
				    transition: all ease .3s;
					
			}
		}
		.item1{
			background-color: white;
			display: flex;
			// justify-content: center;
			align-items: center;
			&:hover{
				box-shadow: #ccc 0px 0px 10px;
			}
			.text{
				    font-weight: 400;
					display: flex;
					flex-direction: column;
					justify-content: center;
					// align-items: center;
					.scope{
						font-size: 13px;
						color: gray;
					}
			}
			.img{
				margin-left: 10%;
				margin-right: 20px;
				width: 60px;
				 height: 60px;
				border-radius: 50%;
				border: 1px solid #409EFF;
			}
		}
		.item2{
			background-color: rgb(249, 89, 89);
			display: flex;
			align-items: center;
			.positionIcon{
				color: rgb(248, 108, 107);
			}
			
		}
		.item3{
			background-color: rgb(133, 149, 244);
			display: flex;
			align-items: center;
			.positionIcon{
				color: rgb(146, 161, 244);
			}
		}
		.item4{
			background-color: rgb(254, 187, 80);
			display: flex;
			align-items: center;
			.positionIcon{
				color: rgb(253, 197, 102);
			}
			
		}
	}
	.eye{
		margin-top: 30px;
		background-color: white;
	}
	

</style>
