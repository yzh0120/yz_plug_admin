import oarequest from "@/axios/downRequest";
import axios from 'axios';
import * as Cookie from "@/tools/cookjs.js";

/**
 * 封装download下载文件流
 * @param url
 * @param title
 * @returns {Promise}
 */

export function download(params = {},path ) {
  let baseURL = process.env.VUE_APP_down_API;
  let headers = {
    // 'Authorization': "Bearer " + Cookie.get("token")
	"Authorization": process.env.VUE_APP_down_token_API
  }

  let url = ""
  if (!path) {
    // return window.open(params.fileUrl)//后端抛出的下载链接
	if (/.xls|.xlsx|.doc|.docx|.ppt|.pptx/g.test(params.fileUrl)) {
	  var ele = `
				   <iframe src='https://view.officeapps.live.com/op/view.aspx?src=${params.fileUrl}' width='100%' height='100%' frameborder='1'>
				   </iframe>
			   `;
	  var newwindow = window.open(params.fileUrl, "_blank", '');
	  newwindow.document.write(ele);
	} else {
	  window.open(params.fileUrl)
	}
	return;
  }else{
	  url = path//文件流
  }

  return new Promise((resolve, reject) => {
    axios({
        method: 'get',
        url: url,
        baseURL: baseURL,
        params: params,
        responseType: 'blob',
        headers: headers
      })
      .then(response => {
        let blob = new Blob([response.data]);
        let objectUrl = URL.createObjectURL(blob);

        let link = document.createElement("a");
        link.style.display = "none";
        link.href = objectUrl;
        //console.log(, "xxxx") //["Content-Disposition"]
        link.setAttribute("download", decodeURIComponent(response.headers["content-disposition"].split("filename=")[1]));
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 删除文件
 * @param {*} data 
 * @returns 
 */
export function del(data) {
  return oarequest({
    url: "/v1/base/file/delete",
    method: "post",
    data: data
  })
}


/**
 * folderId获取文件列表
 * @param {*} data 
 * @returns 
 */
export function getFileListByFolderId(data = {}) {
  return oarequest({
    url: "/v1/base/file/getFileListByFolderId",
    method: "get",
    params: data
  })
}
