# webpack-es6-seed
一个webpack+es6+director.js构建的单页面应用模板,喜欢的老板们可以给个star:-D  
## 项目特点
+ 可以使用全部es6+语法
+ 可以使用sass less 等css预处理器
+ 多环境配置（开发、生产）
## 使用
```
git clone https://github.com/LichiaMa/webpack-es6-seed.git
cd webpack-es6-seed
npm install
npm start // 打开localhost:3000/index.html#/home
```
## 目录结构说明
```
.
├── src                     // 开发目录
│   ├── assets              // 不能用npm管理的包目录
│   ├── images              // 项目图片资源
│   ├── javascripts         // js
│   ├── styles              // 样式文件
│   ├── views               // 模板视图
│   ├── common.scss         // 全局样式
│   ├── index.html          // 入口html
│   └── index.js            // webpack入口文件
├── README.md
├── package-lock.json
├── package.json
├── postcss.config.js       // prefix插件
├── webpack.common.js       // webpack 通用配置
├── webpack.config.js       
├── webpack.dev.js          // webpack 开发环境配置
└── webpack.prod.js         // webpack 生产环境配置
```
## 命令
```
npm start  // 启动开发服务器
npm run dev  // 构建测试环境资源
npm run build // 构建生产环境资源
```

## 说明
+ 由于项目较小，本项目没有做css作用域配置，所有样式均为全局样式，实际开发可以把views文件夹中的html模板文件都配一个唯一的id,所有样式前缀均加入#id,具体请参考demo中的写法
+ 如果用less开发，请把webpack.common.js中的sass-loader,改为less-loader,具体可以看官网文档(https://doc.webpack-china.org/loaders/less-loader/)
+ 为了方便，本项目引入了jquery,不需要的可以在webpack.common.js中去除这一行,同时记得删除package.json中的依赖。
```
new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })
```
## 传送门
+ [es6](http://es6.ruanyifeng.com)
+ [webpack中文](https://webpack-china.org)
+ [webpack官网](https://webpack.js.org)
+ [director.js](https://github.com/flatiron/director)
