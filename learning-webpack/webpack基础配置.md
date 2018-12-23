#### webpack配置文webpack.config.js   ---webpack核心内容

- 1.entry:	js的入口文件 ---存放源文件的js路径
- 2.externals:	外部依赖的声明 ---外部的内容用它来转换common.js可引用的模块
- 3.output:	目标文件 --- 定义目标文件的内容
- 4.resolve:	配置别名 --- 配置目录的别名
- 5.module:	各种文件,各种loader
- 6.plugins:		插件 --- 加载各种webpack插件的


#### webpack loader
- 加载html:	html-webpack-plugin/html-loader
- 加载js:	babel-loader + babel-preset-es2015
- 加载css:	style-loader + css-loader

#### webpack的常用命令
- webpack 		用于以不压缩的形式来打包,常用于调试代码
- webpack -p	线上发布时打包,会把文件做最小化压缩
- webpack --watch	是用于监听文件的改变的过程,自动编译,用于开发过程
- webpack --config webpack.config.js 改变默认配置文件的位置

#### webpack-dev-service
- 作用:	前端开发服务器
- 特色:	可以再文件修改时,自动刷新浏览器
- 安装:	npm install webpack-dev-service --save-dev
-  		npm install webpack -D  等于 npm install webpack -save-dev
- --save-dev : 是你开发时候依赖的.
- --save : 是你发布之后还要依赖的东西
- 配置:	webpack-dev-service/client?http://localhost:8080
- 使用:	webpack-dev-service --port 8080 --inline

#### webpack对脚本的处理   
- vscode对fileheader添加注释的快捷键 ctrl+alt+i
- Js用什么loader加载?
- 官网上给出两种法案
- 1.webpack本身支持js加载
- 2.通过babel- preset-es2015来加载js,用polyfill做兼容性适配(babel- preset-es2015和polyfill都不能保证IE8的兼容性问题)
- 官方文档中的entry只有一个js,有多个时该这么处理?
- webpack的entry做成对象,webpack时支持的
- output里面存放目标文件,这么设置?
- path -- 目标文件放置的位置
- filename:支持[name].js    (dist文件下面进行分类,filename:js/[name].js)

#### jquery引入方法?
- 1.通过webpack externals进行引入,想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但	是也可以在我们项目开发中充分使用。

```
//html文件中添加
<script src="https://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
// webpack.config.js中配置
externals: {
    'jquery': 'window.jQuery'
}
```
- 2.html文件引入jQuery cdn加速
#### 官方文档中的entry只有一个js,有多个时该这么处理?
- webpack对单个js文件的加载
```javascript
var config = {
  entry: './src/page/index/index.js',
  output: {
    filename: app.js',
    path: './dist'
    //我们使用Node的内置路径模块，并在其前面添加__dirname全局。这可以防止操作系统之间的文件路径问题，并允许相对路径按预期工作
    // path: path.resolve(__dirname, 'dist')
  }
};
module.exports = config;
```
- webpack对多个js文件的加载
```javascript
//webpack是支持多入口处理的,entry:{},花括号里面添加路径
//我们使用Node的内置路径模块，并在其前面添加__dirname全局。这可以防止操作系统之间的文件路径问题，并允许相对路径按预期工作
var config = {
  entry: {
    'index' : ['./src/page/index/index.js'],
    'login' : ['./src/page/login/index.js']
  },
  output: {
    filename: '[name].js',
    path: './dist'
    // path: path.resolve(__dirname, 'dist')
  }
};
module.exports = config;
```

#### 我想提取工共模块,该这么处理?
- 通过插件CommonsChunkPlugin
```javascript
// webpack.config.js中配置
var webpack = require('webpack');
plugins: [//接收一个数组
    //这里用到了webpack这个变量,文件中并没有webpack,此时需要再顶部进行引入
    new webpack.optimize.CommonsChunkPlugin({
        //公共得chunk commons 名称
        name: 'commons',
        //前面的output已经配置了dist根目录,这里的filename是基于output的dist根目录,最后输出的是dist/js/base.js
        filename: 'js/base.js'
    })
]
```


#### webpack对样式的处理

```javascript
//插件用的extract-text-webpack-plugin,之前安装的是最新的版本,执行webpack报错,后来选择的extract-text-webpack-plugin1.0.1的.执行OK
module: {
    loaders: [
        //test探测以css为结尾的文件
        //loader,!的意思是两个loader的串联,执行顺序从右往左,先执行css-loader,再把执行结果style-loader
        { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
},
```
- webapck对样式的单独打包使用(extract-text-webpack-plugin)模块
```
ExtractTextPlugin = require("extract-text-webpack-plugin");
plugins:[
    new ExtractTextPlugin("styles.css"),
]
//在loader中做一些改变
loaders: [
    { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }
]
```
#### webpack对html模板的处理

```javascript
//使用插件html-webpack-plugin
plugins:[
    new HtmlWebpackPlugin({
        //html模板原始文件路径
        template: './src/view/index.html',
        //dist文件输出地址
        filename:'view/index.html',
        hash: true,
        inject: true,
        //需要打包的模块
        chunks: ['common','index']

]
//对页面html文件的处理
var getHTmlConfig = function(){
    return{
    //html文件原始文件路径
    template: './src/view/'+ name +'.html',
    //html文件数去地,
    filename: 'view/'+ name +'.html',
    hash: true,
    inject: true,
    //需要打包得模块
    chunks: ['common',name]
  }
}

```
#### webpack对html页面中公共样式模板的处理

```
//使用html-loader加载公共的代码片段
// npm install html-loader --save-dev
//引入html代码片段的方式,在文件中引入
<%= require('html-loader!./layout/html-head.html') %>

```

#### webpack对image图片的加载

```javascript
//首先npm install url-loader --save-dev
//在loader下配置{ test: /\.(gif|png|jpg)\??.*$/, loader: 'url-loader' }
//执行webpack后,background:ur('../../image/\5FAE\4FE1\56FE\7247_20181024103201.jpg');变成base64的格式
//如果想用图片的话,就须在loader中做配置: 做个大小限制,然后放进resource文件夹下
{ test: /\.(gif|png|jpg)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
//对字体文件的处理也是用url-loader
{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
```

#### webpack-dev-server的安装(这里使用的1.16.5的版本)
- 首先安装npm install webpack-dev-server@1.16.5 --save-dev
- 如果想在命令行使用webpack-dev-server指令,就得全局安装webpack-dev-server,npm install webpack-dev-server@1.16.5 -g
- webpack加载页面使用的是默认的iframe模式,是将我们自己写的页面内容注入到这个iframe标签中去,每次修改完页面元素后,都是这个iframe进行了reload.==缺点是你访问的页面,iframe并不会真实的反馈到url上面,不适合代码调试!==
- ==如果想用依赖方式访问webpack-dev-server的话,需要在页面添加一个client,文件中的common模块是每个页面都会使用,打包client的方法就是加==
    ```javascript
    entry: {
        'common': ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
  },
 
    ```
- 以上配置好后,输入指令==webpack-dev-server --inline --port 8088==,http://localhost:8088/
- ==这里遇到个问题:当你在文件中修改了内容时,保存时也触发了webpack-dev-server,但是页面确没刷新显示,这是为什么?==
    > ==1.webpack-dev-server并不能直接读取你webpack.config.js中output的.output中的配置在webpack打包后才起作用,对webpack-dev-server不起作用,webpack-dev-server是在内存中完成的,其默认地址为根目录.==
    
