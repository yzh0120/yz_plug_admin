<template>
  <div class="box">
    <!-- <form1 :nodeObj="nodeObj" :alert="alert" :lineObj="lineObj" ID="workFlow"></form1> -->

    <div id="container">
      <div id="workFlow"></div>
    </div>
  </div>
</template>

<script >
import $ from "jquery";
import "@/assets/workFlow/index.js";

export default {
  name: "workFlow",
  props: ["data"],
  components: {
    // form1,
  },
  data() {
    return {
      alert: {
        alert_show1: false,
        alert_show2: false,
        activeName: "0",
        disabled: false,
      },

      nodeType: "", //点击节点时的类型
      nodeData: {}, //节点数据
      middleNodeData: {}, //中间的节点数据
      nodeObj: {},
      lineData: {}, //线条数据
      middleLineData: {}, //中间的线条数据
      lineObj: {},
    };
  },
  methods: {
    // 定义一个深拷贝函数  接收目标target参数
    deepClone(target) {
      // 定义一个变量
      let result;
      // 如果当前需要深拷贝的是一个对象的话
      if (typeof target === "object") {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
          result = []; // 将result赋值为一个数组，并且执行遍历
          for (let i in target) {
            // 递归克隆数组中的每一项
            result.push(this.deepClone(target[i]));
          }
          // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
          result = null;
          // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
          result = target;
        } else {
          // 否则是普通对象，直接for in循环，递归赋值对象的所有值
          result = {};
          for (let i in target) {
            result[i] = this.deepClone(target[i]);
          }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
      } else {
        result = target;
      }
      // 返回最终结果
      return result;
    },
  },
  mounted() {
    let that = this;
    //添加事件
    $("#workFlow").lrworkflow({
      openNode: function (node) {
        that.nodeType = node.type;
        that.nodeData = node;

        // console.log(node, "node");
        if (node.type != "endround") {
          if (node.type == "confluencenode") {
            that.nodeData.isConfluencenode = true;
          } else {
            that.nodeData.isConfluencenode = false;
          }

          that.alert.alert_show1 = !that.alert.alert_show1;
          that.alert.activeName = "1";
          that.middleNodeData = that.deepClone(that.nodeData);
          that.nodeObj = {
            nodeData: that.nodeData,
            middleNodeData: that.middleNodeData,
          };
        }
      },
      openLine: function (line) {
        // console.log(line, "line");
        that.lineData = line;
        that.middleLineData = that.deepClone(line);
        that.alert.alert_show2 = !that.alert.alert_show2;
        that.lineObj = {
          lineData: that.lineData,
          middleLineData: that.middleLineData,
        };
      },
    });

    this.$nextTick(() => {
      if (this.data) {
		  // console.log(this.data,"this.data")
        $("#workFlow").lrworkflowSet("set", { data: this.data });
      }
    });
  },
};
</script>

<style lang="scss"  >
@import "../../../assets/workFlow/index.css";

#container {
  // width: 1860px;
  // height: 750px;

  width: 100%;
  height: 100%;
}

#workFlow {
  padding-left: 60px;
  height: 100%;
  width: 100%;
}

.lr-workflow-work {
  overflow: scroll;
}

.box {
  width: 100%;
  height: 100%;
  .content {
    //弹窗内容
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    // position: relative;
  }
}
</style>
