const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
<<<<<<< HEAD
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	// assetsDir: 'static', //打包后指定你的css/js/img/fonts等静态资源文件夹的打包后生成路径 在outputDir目录下
	// outputDir: 'dist', //打包后  输出文件目录
	productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
	// 配置 webpack
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置... 压缩代码
					//多chunk文件,并行下载 
			      config.optimization = {
			            splitChunks: {
			              chunks: 'all',
			              cacheGroups: {
			                'element-ui': {
			                  name: 'element-ui',
			                  test: /[\\/]node_modules[\\/]element-ui[\\/]/,
			                  priority: 20
			                },
			                'vendors': {
			                  name: 'vendors', // 打包后的文件名
			                  test: /[\\/]node_modules[\\/]/, // 匹配规则
			                  priority: 10,//权重
							  chunks: 'initial' // 一般用initial打包规则，chunks可配置的参数有：all, async和initial三种。具体区别详见： https://juejin.im/post/5c08fe7d6fb9a04a0d56a702
			                },
							commons: {
								name: 'chunk-commons',
								test: self_resolve('src'), // can customize your rules
								minChunks: 2, //  重复2次才能打包到此模块   webpack4之splitChunks.minChunks https://blog.csdn.net/YaoDeBiAn/article/details/104149392
								priority: 5,
								reuseExistingChunk: true
							}
			              }
			            },
					}
=======
  //publicPath: '/', //打包后的静态资源请求路径    publicPath 为 /my-app/     vue-cli设置publicPath小记:https://www.jb51.net/article/184694.htm
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static', //打包后指定你的css/js/img/fonts等静态资源文件夹的打包后生成路径 在outputDir目录下
  outputDir: 'dist', //打包后  输出文件目录
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // 配置 webpack
  configureWebpack: config => { 
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
      // config.devtool = 'source-map'//sourceMap的值,webpack://下面的src里面有源码
    } else { // 为非生产环境修改配置...
>>>>>>> 05f3cb5b6d8af7f6718eed47934c8bb0591b7018

    }
    config.resolve = { //配置别名和默认后缀
      extensions: ['.js', '.json', '.vue'], //配置文件后缀 import demo from "index", 如果没有.js 就找.json ,然后.vue
      alias: { //配置解析别名,resolve遇到某一个参数是/开头就不会拼接绝对路径
        '@': path.resolve(__dirname, './src'),✘
        // '@components': path.resolve(__dirname, './src/components'),
      }
    }

<<<<<<< HEAD
		}
		config.resolve = { //配置别名和默认后缀
			extensions: ['.js', '.json', '.vue'], //配置文件后缀 import demo from "index", 如果没有.js 就找.json ,然后.vue
			alias: { //配置解析别名,resolve遇到某一个参数是/开头就不会拼接绝对路径
				'@': path.resolve(__dirname, './src'),
				// '@components': path.resolve(__dirname, './src/components'),
			}
		}
=======
  },
  css: { // css配置
    loaderOptions: {
      sass: {
        data: ` @import "@/scss/index.scss"; `
      }
    }
  },
  devServer: {
	  //open: process.env.VUE_APP_OPEN === 'false' ? false : true, // 自动打开浏览器
	  host: '0.0.0.0', // 真机模拟，使用
	  port: 8889, // 前台代理端口号
  }
}
>>>>>>> 05f3cb5b6d8af7f6718eed47934c8bb0591b7018


/* 
vue-cli3搭建项目之webpack配置
https://blog.csdn.net/u014440483/article/details/87267160 
 */