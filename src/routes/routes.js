/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-06 10:18:32
 * @LastEditTime: 2019-08-11 15:19:41
 * @LastEditors: Please set LastEditors
 */

/**
 *
 * 路由配置
 * routes 目前不使用
 */
import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../pages/Home/Loadable';
import Loading from '../components/Loading/index';

/**
 * 翼知讯
 */
import MHome from '../pages/M010101/M01010101/Loadable'; // 翼知讯首页
import TopMessageDetail from '../pages/M010101/M01010102/Loadable'; // 每日行情消息详情

import Information from '../pages/M010102/M01010201/Loadable'; // 翼知(资讯)
import InformationDetail from '../pages/M010102/M01010202/Loadable'; // 翼知(资讯)详情页面

import Market from '../pages/M010103/M01010301/Loadable'; // 翼知(行情)
import MarketDetails from '../pages/M010103/M01010302/Loadable'; // 翼知讯行情（详情页）

import PersonalMessage from '../pages/M010201/M01020101/Loadable'; // 翼知讯我的
import DetailMessage from '../pages/M010201/M01020102/Loadable'; // 个人资料
import Like from '../pages/M010201/M01020103/Loadable'; // 点赞
import Video from '../pages/M010201/M01020104/Loadable'; // 我的视频
import Comment from '../pages/M010201/M01020105/Loadable'; // 评论
import Collect from '../pages/M010201/M01020106/Loadable'; // 收藏
import Setting from '../pages/M010201/M01020107/Loadable'; // 设置
import Protocol from '../pages/M010201/M01020108/Loadable'; // 协议
import ChangeMessage from '../pages/M010201/M01020109/Loadable'; // 修改信息

/**
 * 翼交易
 */
import PayHome from '../pages/M020101/M02010101/Loadable'; // 易交易首页
import GasReport from '../pages/M020101/M02010102/Loadable'; // 气质报告
import PayMessage from '../pages/M020102/M02010201/Loadable';
import Evaluate from '../pages/M020102/M02010202/Loadable'; // 评价
import RunToPurchase from '../pages/M020102/M02010205/Loadable'; // 抢购
import RunToSupply from '../pages/M020102/M02010206/Loadable'; // 报价
import CustomerChoose from '../pages/M020102/M02010203/Loadable'; // 报价
import Supply from '../pages/M020103/M02010301/Loadable'; // 发布供应
import Purchase from '../pages/M020103/M02010302/Loadable'; // 发布采购
// 我的
import PayPersonal from '../pages/M020104/M02010401/Loadable';
import MyOrder from '../pages/M020104/M02010402/Loadable'; // 我的订单
import OrderRate from '../pages/M020104/M02010403/Loadable'; // 我的评价
import Contract from '../pages/M020104/M02010404/Loadable'; // 签约合同
import Service from '../pages/M020104/M02010405/Loadable'; // 待签约客服
import Account from '../pages/M020104/M02010406/Loadable'; // 待结算
import TransportStatus from '../pages/M020104/M02010407/Loadable'; // 运输状态
import WeightNote from '../pages/M020104/M02010408/Loadable'; // 查看磅单

// 认证
import Identification from '../pages/M020105/M02010501/Loadable'; // 运输状态
import IdentifyTips from '../pages/M020105/M02010502/Loadable'; // 认证提醒
const routes = [
  {
    title: '首页',
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    title: '-----loading-----',
    path: '/loading',
    component: Loading,
  },
  {
    title: '翼知讯首页',
    path: '/M010101/01',
    component: MHome,
  },
  {
    title: '翼知讯首页',
    path: '/M010101/02',
    component: TopMessageDetail,
  },
  {
    title: '翼知讯(资讯)',
    path: '/M010102/01',
    component: Information,
    exact: true,
  },
  {
    title: '翼知讯(资讯)详情页',
    path: '/M010102/02',
    component: InformationDetail,
    exact: true,
  },
  {
    title: '翼知讯(行情)',
    path: '/M010103/01',
    component: Market,
  },
  {
    title: '翼知讯(行情详情页)',
    path: '/M010103/02',
    component: MarketDetails,
  },
  // 我的
  {
    title: '翼知讯我的',
    path: '/M010201/01',
    component: PersonalMessage,
  },
  {
    title: '个人资料',
    path: '/M010201/02',
    component: DetailMessage,
  },
  {
    title: '点赞',
    path: '/M010201/03',
    component: Like,
  },
  {
    title: '我的视频',
    path: '/M010201/04',
    component: Video,
  },
  {
    title: '评论',
    path: '/M010201/05',
    component: Comment,
  },
  {
    title: '收藏',
    path: '/M010201/06',
    component: Collect,
  },
  {
    title: '设置',
    path: '/M010201/07',
    component: Setting,
  },
  {
    title: '协议',
    path: '/M010201/08',
    component: Protocol,
  },
  {
    title: '修改个人信息',
    path: '/M010201/09',
    component: ChangeMessage,
  },
  /**
   * 翼交易首页
   */
  {
    title: '翼交易（首页）',
    path: '/M020101/01',
    component: PayHome,
  },
  {
    title: '气质报告',
    path: '/M020101/02',
    component: GasReport,
  },
  {
    title: '翼交易信息页',
    path: '/M020102/01',
    component: PayMessage,
  },
  {
    title: '评价',
    path: '/M020102/02',
    component: Evaluate,
  },
  {
    title: '翼交易信息页抢购',
    path: '/M020102/05',
    component: RunToPurchase,
  },
  {
    title: '报价',
    path: '/M020102/06',
    component: RunToSupply,
  },
  {
    title: '订单生成',
    path: '/M020102/03',
    component: CustomerChoose,
  },
  {
    title: '发布供应',
    path: '/M020103/01',
    component: Supply,
  },
  {
    title: '发布采购',
    path: '/M020103/02',
    component: Purchase,
  },
  {
    title: '易交易我的',
    path: '/M020104/01',
    component: PayPersonal,
  },
  {
    title: '我的订单',
    path: '/M020104/02',
    component: MyOrder,
  },
  {
    title: '我的订单评价',
    path: '/M020104/03',
    component: OrderRate,
  },
  {
    title: '我的订单评价',
    path: '/M020104/04',
    component: Contract,
  },
  {
    title: '待签约订单客服',
    path: '/M020104/05',
    component: Service,
  },
  {
    title: '待结算',
    path: '/M020104/06',
    component: Account,
  },
  {
    title: '运输状态',
    path: '/M020104/07',
    component: TransportStatus,
  },
  {
    title: '查看磅单',
    path: '/M020104/08',
    component: WeightNote,
  },
  {
    title: '认证',
    path: '/M020105/01',
    component: Identification,
  },
  {
    title: '认证',
    path: '/M020105/02',
    component: IdentifyTips,
  },
];


// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    exact={route.exact || false}
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )
    }
  />
);

// // 需要登录组件
// const RouteWithAuth = route => (
//   <Route
//     exact={route.exact || false}
//     path={route.path}
//     render={props => (
//       // pass the sub-routes down to keep nesting
//       <route.component {...props} routes={route.routes} />
//     )
//     }
//   />
// );

export {
  RouteWithSubRoutes,
  // RouteWithAuth,
  routes,
};
