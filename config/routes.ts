export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login/login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/index',
    name: '主页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/experiment',
    name: '实验',
    icon: 'table',

    routes: [
      {
        name: '详情',
        path: '/experiment/detail/:id',
        component: './Experiments/Detail',
        hideInMenu: true,
      },
      {
        name: '列表',
        // 试试不加/？
        // path: '/experiment',
        path: '/experiment/',
        component: './Experiments',
      },

      {
        name: '实验提交情况',
        path: '/experiment/submit/:id',
        component: './Experiments/SubmitTable',
        hideInMenu: true,
      },
      {
        name: '新增',
        path: '/experiment/new',
        component: './Experiments/New',
      },
      {
        name: '提交日志(debug)',
        path: '/experiment/submit/test/history',
        component: './Experiments/SubmitLog',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/problem',
    name: '题目',
    icon: 'table',
    routes: [
      {
        name: '列表',
        path: '/problem/',
        component: './Problem',
      },
      {
        name: '详情',
        path: '/problem/detail',
        component: './Problem/Detail',
      },
    ],
  },

  {
    path: '/score',
    name: '成绩管理',
    icon: 'table',
    component: './Score',
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin/user',
        name: '用户管理',
        component: './Admin',
      },
      {
        path: '/admin/system',
        name: '系统监控',
        component: './System',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './404',
  },
];
