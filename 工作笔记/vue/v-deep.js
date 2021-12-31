::v-deep{
	.xxx .el-table__header th {                   不生效
    background-color: red !important;
  }
  
  .el-table__header th {                        生效
      background-color: red !important;
    }
}


1   ::v-deep  可以穿透到本页面的所有组件(以及组件里面的组件)

2 在 ::v-deep 中 直接写组件样式 (不加自定义前缀)   ,