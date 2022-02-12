



 
 <template>
   <div>
 	

 		<el-progress :percentage="percentage" :text-inside="true" :stroke-width="15" v-if="percentage"></el-progress>
 		
 		<el-upload :disabled="btnDisabled" class="i-upload" :action="uploaduUrl" :show-file-list="false" multiple :on-success="upLoadSuccess" :on-error="error"
 		:before-upload="(file)=>{return beforeUpload(file,uploadObj)}" 
		:on-change="handleChange" :headers="uploadHeaders" :on-progress="progress">
 		  <el-button :disabled="btnDisabled" size="mini" type="primary" v-on:click="setUploaduUrl">上传资料</el-button>
 		</el-upload>
 		
 		<!-- <file-List :arr="uploadObj.detail" :del="true"/> -->

 	
   </div>
 </template>
 
 <script>
 import * as fileApi from "@/axios/api/file";
 import * as Cookie from "@/tools/cookjs.js";
 export default {
   props: {
     projectId: {
       type: [String,Number],
       default: "",
     },
     uploadObj: {
       type: Object,
       default: () => {
         return {};
       },
     },
   },
   data() {
     return {
		 percentage: 0,
       uploaduUrl: process.env.VUE_APP_down_API + "/v1/base/file/upload", //上传地址
       btnDisabled: false,
       uploadHeaders: {
         //上传头
         // Authorization: Cookie.get("token")
 		"Authorization": process.env.VUE_APP_down_token_API
       },
     };
   },
   created() {
     this.getFiles(); //获取历史文件///////////////////切换
   },
   methods: {
 	 //获取文件
     getFiles() {///////////////////切换

         fileApi
           .getFileListByFolderId({
             folderId: this.projectId,
             taskName: this.uploadObj.taskName,
           })
           .then((result) => {
             if (result.code == 200) {
               this.uploadObj.detail = result.data;
             } else {
               this.$message.error(res.info);
             }
           });
  
     },
     // 0 设置路由
     setUploaduUrl() {
       this.uploaduUrl = process.env.VUE_APP_down_API +
         "/v1/base/file/upload" + "?folderId=" + this.projectId + "&taskName=" + this.uploadObj.taskName;
     },
     // 1 上传图片之前
     beforeUpload(file, item) {
       let activeFileType = file.name.split(".").pop();
       // return new Promise((resolve, reject) => {
       if (item.num && (item.detail.length >= item.num)) {
         this.btnDisabled = !this.btnDisabled;
         this.$message.error(`只能上传${item.num}个`);
         // reject();
 		return false;
       } else
       // if (item.type && item.type.length && !item.type.some(p => p == activeFileType)) {//!item.type.includes(activeFileType)
	   if (item.type && item.type.length && !item.type.includes(activeFileType)) {
         this.$message.error(`请上传正确的文件类型`);
         this.btnDisabled = !this.btnDisabled;
         // reject();
         return false;
       } else {
         // resolve();
         return true;
       }
       // });
     },
     //2 点击上传文件时的改变事件
     handleChange() {
       this.btnDisabled = !this.btnDisabled;
     },
	 //2.5 文件上传中
	 progress(event, file, fileList) {
	       this.percentage = 0;
	       // this.uploadPercentVisited = true;
	       this.$nextTick(() => {
	         this.percentage = Number(file.percentage.toFixed(0));
	         if (this.percentage >= 100) {
	           this.percentage = 0;
	         }
	       });
	 },
     //3 文件上传成功
     upLoadSuccess(res, file, fileList) {
       if (res.code == 200) {
         this.$message.success(res.data.fileName + "上传成功！");

             fileApi
               .getFileListByFolderId({
                 folderId: this.projectId,
                 taskName: this.uploadObj.taskName,
               })
               .then((result) => {
                 if (result.code == 200) {
                   this.uploadObj.detail = result.data;
				   this.$emit("success", {
				                   taskName: this.uploadObj.taskName,
				                   res,
				                   file,
				                   fileList,
				    });
                 } else {
                   this.$message.error(res.info);
                 }
               });
	   
      //      this.$emit("success", {///////////////////切换
			   // taskName: this.uploadObj.taskName,
			   // res,
			   // file,
			   // fileList,
      //       });
       } else {
         this.$message.error(res.info);
       }
     },
	 error() {
	 	this.btnDisabled = !this.btnDisabled;
	 },
   },
 };
 </script>
 
 <style style="scss" scoped>
 .downloadFile {
   cursor: pointer;
 }
 </style>
 