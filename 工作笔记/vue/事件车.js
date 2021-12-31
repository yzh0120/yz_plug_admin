main.js  

Vue.prototype.$bus = new Vue()



a页面

this.$bus.$emit("事件名",{})



b页面
this.$bus.$on("事件名",(e)=>{})