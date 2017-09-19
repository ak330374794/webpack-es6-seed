import './common.scss';

import { Router } from 'director/build/director';
import { home } from './javascripts/home';
import { pageA } from './javascripts/pageA';
import { pageB } from './javascripts/pageB';

// 路由配置项
const routes = {
  '/home': home,
  '/pageA': pageA,
  '/pageB': pageB,
};

// 路由配置项
const config = {
  strict: true, // 允许路由以'/'结尾

  notfound: () => {
    // 如果有404页面，可以重定向到404页面
    console.log('没有匹配任何路由');
  }
};

// 配置路由
const route = new Router(routes).configure(config)

// 初始化路由
route.init()
