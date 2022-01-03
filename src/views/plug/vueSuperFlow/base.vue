<!--
 * User: CHT
 * Date: 2020/6/28
 * Time: 17:48
-->
<template>
	<table-page :noPadding="true">
		

		<div class="super-flow-demo1">
			<!-- 左边的 -->
			<div class="node-container">
				<span class="node-item" v-for="(item,index) in nodeItemList" :key="index"
					@mousedown="evt => nodeItemMouseDown(evt, item.value)"
					:style="{backgroundImage:`url(${item.key})`}"> </span>
			</div>
			<!-- 右边的 -->
			<div class="flow-container" ref="flowContainer">
				<div class="superFlow-ins" :style="{backgroundImage:`url(${wallbgImg})`}">
					<super-flow ref="superFlow" :enter-intercept="enterIntercept" :output-intercept="outputIntercept"
						:graph-menu="graphMenuList" :node-menu="nodeMenu" :link-menu="linkMenu"
						:link-base-style="linkBaseStyle" :link-style="linkStyle" :link-desc="linkDesc">
						<template v-slot:node="{meta}" @mouseup="nodeMouseUp" @click="nodeClick">
							<!-- <div > -->

							<!-- 开始节点 -->
							<div v-if="meta.prop == 'start'" class="start">
								开始
							</div>
							<!-- 结束节点 -->
							<div v-else-if="meta.prop == 'end'" class="end">
								结束
							</div>
							<!-- 审批节点 -->
							<div v-else-if="meta.prop == 'ShenPi'" class="ShenPi">
								<div :style="{backgroundImage:`url(${ShenPiImg})`}" class="img"></div>
								<div class="text">{{meta.obj.name}}</div>
							</div>
							<!-- 会签节点 -->
							<div v-else-if="meta.prop == 'HuiQian'" class="HuiQian">
								<div :style="{backgroundImage:`url(${HuiQianImg})`}" class="img"></div>
								<div class="text">{{meta.obj.name}}</div>
							</div>

							<!-- 条件节点 -->
							<div v-else-if="meta.prop == 'TiaoJian'" class="TiaoJian"
								:style="{backgroundImage:`url(${TiaoJianImg})`}">
								<div class="text">{{meta.obj.name}}</div>
							</div>

							<!-- </div> -->
						</template>
					</super-flow>
				</div>

			</div>
		</div>
		<baseAlert ref="baseAlert" :alertFormConfig="alertFormConfig" :drawerType="drawerType"
			:nodeFormData="nodeFormData" :linkFormData="linkFormData"></baseAlert>
			
		<lineStyleSet :alertData="alertData" :activeLineObj.sync="activeLineObj" :activeLineForm.sync="activeLineForm">
		</lineStyleSet>
	</table-page>
</template>

<script>
	//左边的循环列表
	// import left_startround from "@/assets/imgs/flow/startround.png";
	// import left_endround from "@/assets/imgs/flow/endround.png";
	// import left_TiaoJiannode from "@/assets/imgs/flow/conditionnode.png";
	// import ShenPiImg from "@/assets/imgs/flow/stepnode.png";
	// import HuiQianImg from "@/assets/imgs/flow/confluencenode.png";



	import baseAlert from "./compenents/alert.vue";
	import lineStyleSet from "./compenents/lineStyleSet.vue";

	import SuperFlow from 'vue-super-flow'
	import 'vue-super-flow/lib/index.css'
	export default {
		components: {
			baseAlert,
			lineStyleSet,
			SuperFlow
		},
		data() {
			return {
				left_startround: require("@/assets/imgs/flow/startround.png"),
				left_endround: require("@/assets/imgs/flow/endround.png"),
				TiaoJianImg: require("@/assets/imgs/flow/conditionnodediv.png"),
				ShenPiImg: require("@/assets/imgs/flow/stepnode.png"),
				HuiQianImg: require("@/assets/imgs/flow/confluencenode.png"),
				wallbgImg: require("@/assets/imgs/flow/wallbg.png"),


				//买时没有用到
				drawerType: "",
				//弹出框的配置(节点信息和线条信息   但是不包括先调样式配置)
				alertFormConfig: {
					title: "", //弹出框的标题
					field: false, //弹出框是否隐藏
					type: null, //弹出框类型
					/*某个node/link对象的所有信息对象, 有两次赋值
					  1 在打开弹窗的时候根据是node/link对象将node/link对象对象 赋值给this.alertFormConfig.info ; 包含内置属性 和自定义属性 meta
					  angleList: Array(4)
					  coordinate: Array(2) 坐标
					  graph: n           图盘对象
					  id: (...)       
					  key: (...)
					  meta: Object
					  _height: (...)
					  _width: (...)

					  2 在确认弹窗的时候根据是node/link对象将this.nodeFormData 或者 this.linkFormData
					  赋值给this.alertFormConfig.info.meta在组件内部就可以自动同步到对应节点
					 */
					info: null,
					open: (type, info) => {
						this.alertFormConfig.field = true; //显示弹窗
						this.alertFormConfig.type = type; //传递类型
						this.alertFormConfig.info = info; //node/link的数据对象
						if (this.alertFormConfig.type === "node") { //drawerType.node
							this.alertFormConfig.title = "节点";
							if (this.$refs.nodeFormData) this.$refs.nodeFormData.resetFields();
							Object.keys(info.meta).forEach((key) => {
								this.$set(
									this.nodeFormData,
									key,
									this.$fn.deepClone(info.meta[key])
								);
							});
						} else if (this.alertFormConfig.type === "line"){
							this.alertFormConfig.title = "连线";
							info.meta ? info.meta.desc : "";
							if (!info.meta) info.meta = {};
							if (this.$refs.linkFormData) this.$refs.linkFormData.resetFields();
							Object.keys(info.meta).forEach((key) => {
								this.$set(
									this.linkFormData,
									key,
									this.$fn.deepClone(info.meta[key])
								);
							});
						}
					},
					cancel: () => {
						this.alertFormConfig.field = false;
						if (this.alertFormConfig.type === "node") { //drawerType.node
							this.$refs.baseAlert.$refs.nodeFormData.clearValidate();
						} else {
							this.$refs.baseAlert.$refs.linkFormData.clearValidate();
						}
					},
					//弹窗的确定按钮
					settingSubmit: () => {
						//const conf = this.alertFormConfig;
						if (this.alertFormConfig.type === "node") { //drawerType.node
							if (!this.alertFormConfig.info.meta)
								this.alertFormConfig.info.meta = {};
							Object.keys(this.nodeFormData).forEach((key) => {
								this.$set(
									this.alertFormConfig.info.meta,
									key,
									this.$fn.deepClone(this.nodeFormData[key])
								);
							});
							this.$refs.baseAlert.$refs.nodeFormData.resetFields();
						} else if (this.alertFormConfig.type === "line"){
							if (!this.alertFormConfig.info.meta)
								this.alertFormConfig.info.meta = {};
							Object.keys(this.linkFormData).forEach((key) => {
								this.$set(
									this.alertFormConfig.info.meta,
									key,
									this.$fn.deepClone(this.linkFormData[key])
								);
							});
							this.$refs.baseAlert.$refs.linkFormData.resetFields();
						}
						this.alertFormConfig.field = false;
						console.log(this.alertFormConfig.info, "this.alertFormConfig.info");
					},
				},

				/* **********************************************************************************************************************
				node/link对象 在弹出框的表单内容数据
				在点击确定的时候会赋值给 this.alertFormConfig.info.meta
				*/
				linkFormData: {
					desc: "",
				},
				nodeFormData: {
					name: "",
					desc: "",
					obj: { //弹窗tabs表单,obj里面没写属性名 ,在弹窗表单里写属性名依然同步

					}
				},
				// 
				/* **********************************************************************************************************************
				从左边向右边拉的时候 的信息 在鼠标按下的时候会被赋值
				*/
				leftToRightConfig: {
					isDown: false, //在鼠标按下的时候是true  在松开 是false
					isMove: false, //在鼠标移动的时候是true  在松开 是false
					offsetTop: 0, //在点击的时候 就确定切在移动中不会变，含义就是 鼠标在元素按下的位置距离元素最左边的距离，保证move的时候不会抖动
					offsetLeft: 0,
					clientX: 0, //鼠标在窗口的位置
					clientY: 0,
					ele: null, //鼠标按下的当前元素
					info: null, //nodeItemList的某个对象的value
				},
				/* **********************************************************************************************************************
				  左边的列表数据
				  */
				nodeItemList: [{
						key: require("@/assets/imgs/flow/startround.png"),
						label: "开始节点",
						value: {
							// width: 50,
							// height: 50,
							meta: {
								prop: "start",
								name: "开始节点",
							},
						},
					},
					{
						key: require("@/assets/imgs/flow/conditionnode.png"),
						label: "条件节点",
						value: {
							// width: 160,
							// height: 90,
							meta: {
								prop: "TiaoJian",
								obj: { //弹窗tabs表单,obj里面没写属性名 ,在弹窗表单里写属性名依然同步
									name: '条件节点'
								}
							},
						},
					},
					{
						key: require("@/assets/imgs/flow/stepnode.png"),
						label: "审批节点",
						value: {
							// width: 150,
							// height: 65,
							meta: {
								prop: "ShenPi",
								obj: {
									name: '审批节点'
								}
							},
						},
					},
					{
						key: require("@/assets/imgs/flow/confluencenode.png"),
						label: "会签节点",
						value: {
							// width: 150,
							// height: 60,
							meta: {
								prop: "HuiQian",
								obj: {
									name: '会签节点'
								}
							},
						},
					},
					{
						key: require("@/assets/imgs/flow/endround.png"),
						label: "结束节点",
						value: {
							// width: 50,
							// height: 50,
							meta: {
								prop: "end",
								name: "结束节点",
							},
						},
					},
				],

				/* **********************************************************************************************************************
				图盘右键菜单数据
				*/
				graphMenuList: [
					// [
					//   {
					//     //图盘右键菜单的选项名称
					//     label: "开始节点",
					//     //是否禁用的函数
					//     disable(graph) {
					//       return !!graph.nodeList.find(
					//         (node) => node.meta.prop === "start"
					//       ); //如果节点列表中存在start就禁用
					//     },
					//     // 菜单项选中时回调函数,coordinate就是鼠标右键时候的坐标啦
					//     selected: (graph, coordinate) => {
					//       const start = graph.nodeList.find(
					//         (node) => node.meta.prop === "start"
					//       );
					//       if (!start) {
					//         //图盘增加节点 内置方法
					//         graph.addNode({
					//           width: 50, //宽
					//           height: 50, //高
					//           coordinate: coordinate, //坐标
					//           //此meta会暴露给节点信息
					//           meta: {
					//             //会被赋值给 node/link对象 的meta属性
					//             prop: "start",
					//             name: "开始节点",
					//           },
					//         });
					//       }
					//     },
					//   },
					//   {
					//     label: "条件节点",
					//     disable: false,
					//     selected: (graph, coordinate) => {
					//       graph.addNode({
					//         width: 160,
					//         height: 90,
					//         coordinate: coordinate,
					//         meta: {
					//           prop: "TiaoJian",
					//           name: "条件节点",
					//         },
					//       });
					//     },
					//   },
					//   {
					//     label: "审批节点",
					//     disable: false,
					//     selected: (graph, coordinate) => {
					//       graph.addNode({
					//         width: 150,
					//         height: 65,
					//         coordinate: coordinate,
					//         meta: {
					//           prop: "ShenPi",
					//           name: "审批节点",
					//         },
					//       });
					//     },
					//   },
					//   {
					//     label: "会签节点",
					//     disable: false,
					//     selected: (graph, coordinate) => {
					//       graph.addNode({
					//         width: 150,
					//         height: 65,
					//         coordinate: coordinate,
					//         meta: {
					//           prop: "HuiQian",
					//           name: "会签节点",
					//         },
					//       });
					//     },
					//   },
					//   {
					//     label: "结束节点",
					//     disable(graph) {
					//       return !!graph.nodeList.find(
					//         (point) => point.meta.prop === "end"
					//       );
					//     },
					//     selected: (graph, coordinate) => {
					//       graph.addNode({
					//         width: 80,
					//         height: 50,
					//         coordinate: coordinate,
					//         meta: {
					//           prop: "end",
					//           name: "结束节点",
					//         },
					//       });
					//     },
					//   },
					// ],
					[{
							label: "打印数据",
							selected: (graph, coordinate) => {
								console.log(JSON.stringify(graph.toJSON(), null, 2));
							},
						},
						{
							label: "全选",
							selected: (graph, coordinate) => {
								graph.selectAll();
							},
						},
					],
				],
				/* **********************************************************************************************************************
				节点右键菜单
				*/
				nodeMenu: [
					[{
							label: "删除",
							selected: (node) => {
								node.remove();
							},
						},
						{
							label: "编辑",
							selected: (node) => {
								this.alertFormConfig.open("node", node); //drawerType
							},
						},
					],
				],
				/* **********************************************************************************************************************
				连线右键菜单
				*/
				linkMenu: [
					[{
							label: "编辑",
							selected: (link) => {
								this.alertFormConfig.open("link", link); //drawerType
							},
						},
						{
							label: "删除",
							selected: (link) => {
								link.remove();
							},
						},
						{
							label: "线条样式",
							selected: (link) => {
								Object.assign(this.activeLineForm, this.$fn.deepClone(link
									.meta)); //将link.meta 合并到 this.activeLineForm
								this.alertData.field = true;
								this.activeLineObj = link;
							},
						},
					],
				],
				/* **********************************************************************************************************
				线条样式弹窗
				*/
				alertData: {
					width: "1000px",
					height: "800px",
					title: "标题",
					field: false, //弹窗绑定的name
				},
				//线条对象
				activeLineObj: {},
				//全局线条设置
				linkBaseStyle: {
					color: "#000000", // line 颜色
					hover: "#409EFF", // line hover 的颜色
					textColor: "#666666", // line 描述文字颜色
					textHover: "#FF0000", // line 描述文字 hover 颜色
					font: "14px Arial", // line 描述文字 字体设置 参考 canvas font
					dotted: false, // 是否是虚线
					lineDash: [4, 4], // 虚线时生效
					background: "rgba(255,255,255,0.6)", // 描述文字背景色
				},
				//当前线条的设置列表
				activeLineForm: {
					color: "#000000", // line 颜色
					hover: "#409EFF", // line hover 的颜色
					textColor: "#666666", // line 描述文字颜色
					textHover: "#FF0000", // line 描述文字 hover 颜色
					font: "14px Arial", // line 描述文字 字体设置 参考 canvas font
					dotted: false, // 是否是虚线
					lineDash: [4, 4], // 虚线时生效
					background: "rgba(255,255,255,0.6)", // 描述文字背景色
				},
			};
		},
		mounted() {
			document.addEventListener("mousemove", this.docMousemove);
			document.addEventListener("mouseup", this.docMouseup);
			this.$once("hook:beforeDestroy", () => {
				document.removeEventListener("mousemove", this.docMousemove);
				document.removeEventListener("mouseup", this.docMouseup);
			});
		},
		methods: {

			/* ********************************************************************************************************************
	直接传递给组件的props
	什么样的节点不能被什么节点链接  从from节点 进入 到 to节点时,判断to节点适合的from节点类型数组中有没有包括 当前的form节点
	*/
			enterIntercept(formNode, toNode, graph) {
				const formType = formNode.meta.prop; //节点类型
				switch (
					toNode.meta.prop //线将要连上的节点类型
				) {
					case "start": //开始节点类型返回false  表示不能被连
						return true;
					case "ShenPi": //如果是 ShenPi 的节点,可以被下面这些节点连接(就是 formType的类型)
						return ["start", "ShenPi", "TiaoJian", "cc"].includes(formType);
					case "TiaoJian":
						return ["start", "ShenPi", "TiaoJian", "cc"].includes(formType);
					case "end":
						return true; //结束节点可以被任何节点连线
					default:
						return true;
				}
			},
			/* ********************************************************************************************************************
			直接传递给组件的props
			节点生成连线限制  判断什么类型的节点不能发起连线
			*/
			outputIntercept(node, graph) {
				return !(node.meta.prop === "end");
			},
			/* ********************************************************************************************************************
			根据条件自定义配置匹配了某些情况的连线样式
			*/
			linkStyle(link) {
				return link.meta;
			},
			//
			/* ********************************************************************************************************************
			所有线条默认的配置
			*/
			linkDesc(link) {
				return link.meta ? link.meta.desc : "";
			},

			//貌似无效
			nodeMouseUp(evt) {
				evt.preventDefault();
			},
			//貌似无效
			nodeClick() {
				console.log(arguments);
			},

			/* ********************************************************************************************************************
	左侧选项 中的鼠标 按下 事件
	*/
			nodeItemMouseDown(evt, info) {
				// 开始和结束只能有一个
				var _graph = this.$refs.superFlow.graph;
				if (info.meta.prop == "start") {
					if (_graph.nodeList.find((node) => node.meta.prop === "start")) {
						return false;
					}
				} else if (info.meta.prop == "end") {
					if (_graph.nodeList.find((node) => node.meta.prop === "end")) {
						return false;
					}
				}

				//evt 是 鼠标事件，info nodeItemList的某个对象的value 和 图盘右键菜单数据 的graph.addNode()里面的对象一样
				const {
					clientX,
					clientY,
					currentTarget
				} = evt;

				const {
					top,
					left
				} = evt.currentTarget.getBoundingClientRect();

				// const conf = this.leftToRightConfig;
				const ele = currentTarget.cloneNode(true); //克隆事件的当前的节点

				Object.assign(this.leftToRightConfig, {
					//将一些信息集合到this.leftToRightConfig
					offsetLeft: clientX - left, //在点击的时候 就确定切在移动中不会变，含义就是 鼠标在元素按下的位置距离元素最左边的距离，保证move的时候不会抖动
					offsetTop: clientY - top, //在点击的时候 就确定切在移动中不会变
					clientX: clientX, //鼠标在显示器上的位置
					clientY: clientY,
					info, //nodeItemList的某个对象的value 和 图盘右键菜单数据 的graph.addNode()里面的对象一样
					ele, //元素
					isDown: true,
				});

				ele.style.position = "fixed";
				ele.style.margin = "0";
				ele.style.top = clientY - this.leftToRightConfig.offsetTop +
					"px"; //-this.leftToRightConfig.offsetTop 是获取元素左上角的坐标 是保证move的时候不会抖动
				ele.style.left = clientX - this.leftToRightConfig.offsetLeft + "px";

				this.$el.appendChild(this.leftToRightConfig.ele); //在当前vue实例挂载的节点追加 点击节点克隆节点
			},

			/* ********************************************************************************************************************
			mounted 文档监听鼠标 移动 事件
			*/
			docMousemove({
				clientX,
				clientY
			}) {
				//鼠标坐标
				// const conf = this.leftToRightConfig;

				if (this.leftToRightConfig.isMove) {
					//第二次移动会触发这里

					this.leftToRightConfig.ele.style.top =
						clientY - this.leftToRightConfig.offsetTop +
						"px"; //-this.leftToRightConfig.offsetTop 是获取元素左上角的坐标 是保证move的时候不会抖动
					this.leftToRightConfig.ele.style.left =
						clientX - this.leftToRightConfig.offsetLeft + "px";
				} else if (this.leftToRightConfig.isDown) {
					//第一次移动会触发这里

					// 鼠标移动量大于 5 时 移动状态生效
					this.leftToRightConfig.isMove =
						Math.abs(clientX - this.leftToRightConfig.clientX) > 5 ||
						Math.abs(clientY - this.leftToRightConfig.clientY) > 5;
				}
			},

			/* ********************************************************************************************************************
			mounted 文档监听鼠标 松起 事件
			*/
			docMouseup({
				clientX,
				clientY
			}) {
				// const conf = this.leftToRightConfig;

				// clientX, clientY 是鼠标位置

				this.leftToRightConfig.isDown = false;

				if (this.leftToRightConfig.isMove) {
					const {
						top,
						right,
						bottom,
						left
					} =
					this.$refs.flowContainer.getBoundingClientRect();
					let obj = this.setNodeWH(this.leftToRightConfig.info)
					// 判断鼠标是否进入 flow container
					if (
						clientX > left &&
						clientX < right &&
						clientY > top &&
						clientY < bottom
					) {
						// 获取拖动元素左上角相对 super flow 区域原点坐标
						const coordinate = this.$refs.superFlow.getMouseCoordinate(
							// clientX - this.leftToRightConfig.info.width / 2,
							// clientY - this.leftToRightConfig.info.height / 2
							clientX - obj.width / 2,
							clientY - obj.height / 2
						);


						// 添加节点
						// this.$refs.superFlow.addNode({
						// 	coordinate,
						// 	//nodeItemList的某个对象的value 和 图盘右键菜单数据 的graph.addNode()里面的对象一样
						// 	...this.$fn.deepClone(this.leftToRightConfig.info), 
						// });
						this.$refs.superFlow.addNode({
							coordinate,
							//nodeItemList的某个对象的value 和 图盘右键菜单数据 的graph.addNode()里面的对象一样
							...obj
						});
					}
					this.leftToRightConfig.isMove = false;
				}

				if (this.leftToRightConfig.ele) {
					this.leftToRightConfig.ele.remove(); //重置 conf的ele对应 document的元素
					this.leftToRightConfig.ele = null; //重置 conf的ele
				}
			},
			setNodeWH(info) {
				let obj = this.$fn.deepClone(info)
				let name = obj.meta.prop

				if (name == "start") {
					obj.width = 50
					obj.height = 50
				} else if (name == "TiaoJian") {
					obj.width = 160
					obj.height = 90
				} else if (name == "ShenPi") {
					obj.width = 150
					obj.height = 65
				} else if (name == "HuiQian") {
					obj.width = 150
					obj.height = 60
				} else if (name == "end") {
					obj.width = 50
					obj.height = 50
				}
				return obj
			}
		},
	};
</script>


<style lang="scss">
	.ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-wrap: break-word;
	}

	.link-base-style-form {
		.el-form-item {
			margin-bottom: 12px;
		}

		padding-bottom: 20px;
		border-bottom: 1px solid #dcdcdc;
	}

	.super-flow-demo1 {
		// margin-top       : 20px;
		width: 100%;
		height: 800px;
		height: 100%;
		background-color: #f5f5f5;
		$list-width: 50px;

		>.node-container {
			width: $list-width;
			float: left;
			height: 100%;
			text-align: center;
			background-color: #ffffff;
		}

		>.flow-container {
			width: calc(100% - #{$list-width});
			float: left;
			height: 100%;
			// overflow : hidden;
			overflow: auto;

			.superFlow-ins {
				width: 4000px;
				height: 8000px;

				margin: 0 auto;
				background-color: #f5f5f5;
			}
		}

		.super-flow__node {
			.flow-node {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				line-height: 40px;
				padding: 0 6px;
				font-size: 12px;
			}
		}
	}

	.node-item {
		$node-item-height: 50px;

		font-size: 14px;
		display: inline-block;
		height: $node-item-height;
		width: 50px;
		margin-top: 20px;
		background-color: #ffffff;
		line-height: $node-item-height;
		box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		user-select: none;
		text-align: center;
		z-index: 6;

		&:hover {
			box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
		}
	}

	// 自定义 开始节点
	.start {
		height: 100%;
		background-color: rgb(92, 203, 65);
		color: white;
		font-size: 12px;
		font-weight: 500;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	//结束节点
	.end {
		height: 100%;
		background-color: rgb(222, 41, 34);
		color: white;
		font-size: 12px;
		font-weight: 500;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	//审批节点
	.ShenPi,
	.HuiQian {
		height: 100%;
		background-color: white;
		font-size: 12px;
		font-weight: 500;

		display: flex;
		justify-content: space-around;
		align-items: center;

		.img {
			width: 48px;
			height: 48px;
		}

		.text {
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	//条件节点
	.TiaoJian {
		height: 100%;
		background-color: white;
		font-size: 12px;
		font-weight: 500;

		.text {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	//一个大的  第一个  和 后面4个
	.super-flow__node.can-move {
		border: 0px;
		border-radius: 10px;

		div:first-child {
			border-radius: 10px;
		}
	}
</style>
