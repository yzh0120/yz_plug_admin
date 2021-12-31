<template>
  <div class="sidebar-logo-container" :class="{'collapse':isCollapse}">
    <!-- <transition name="sidebarLogoFade"> -->
      <router-link v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" src="@/assets/imgs/mxh1.png" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" src="@/assets/imgs/mxh1.png" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  computed:{
  	  isCollapse:{
  		  get(){
  			  return this.$store.state.setup.isCollapse
  		  },
  		  set(val){
  			  this.$store.commit("setup/isCollapseFn",val)
  		  }
  	  }
    },
  data() {
    return {
      title: 'Vueasx',//民 信 惠
      logo: "@/assets/imgs/mxh.png"
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
 flex-shrink: 0; //如果空间不足,该项目不缩小   没有侧边栏  返回就删
  position: relative;
  width: 100%;
  height: $sidebar-logo-container;
  line-height: $sidebar-logo-container;
  background: #2b2f3a;
  
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  overflow: hidden;
  padding-left: 12px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 42px;
      height: 42px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
