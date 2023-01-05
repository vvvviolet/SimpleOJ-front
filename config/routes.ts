export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login/login',
        component: './common/Login',
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
    component: './common/Index',
  },
  // {
  //   path: '/experiment',
  //   name: '实验',
  //   icon: 'table',
  //   component: './Experiment',
  //   routes: [],
  // },
  {
    path: '/studentTable',
    name: '学生视角',
    icon: 'table',
    component: './StudentTable',
  },
  {
    path: '/teacherTable',
    name: '教师视角',
    icon: 'table',
    component: './TeacherTable',
  },
  {
    path: '/problem',
    name: '题库',

    routes: [
      {
        name: '列表',
        path: '/problem',
        component: './problem/Problem',
      },
      {
        name: '详情',
        path: '/problem/detail',
        component: './Detail',
      },
    ],
  },
  // {
  //   name: '题目列表',
  //   path: '/problem',
  //   component: './problem/Problem',
  // },
  {
    name: '详情',
    path: '/detail',
    component: './Detail',
  },
  {
    name: '题目详情',
    path: '/problemdetail',
    component: './problem/Detail',
  },
  {
    name: '实验提交',
    path: '/experimentSubmit',
    component: './ExperimentSubmit',
  },
  // {
  //   name: '题目提交',
  //   path: '/problemSubmit',
  //   component: './ProblemSubmit',
  // },
  {
    name: '详情编辑',
    path: '/detailEdit',
    component: '../components/DetailEdit',
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
        component: './UserManage',
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
