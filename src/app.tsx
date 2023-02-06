import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { RequestOptionsType, Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/SimpleOJ/user';

const isDev = process.env.NODE_ENV === 'development';
// const isDev = false;
const loginPath = '/login/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    console.log('fetchUserInfo', token);
    try {
      const response = await queryCurrentUser(token ? token : '');
      return response;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  // console.log(history.location.pathname);
  if (history.location.pathname !== loginPath) {
    const token = localStorage.getItem('token');
    const currentUser = await queryCurrentUser(token ? token : '');
    return {
      currentUser: currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: any) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

const errorHandler = (error: ResponseError) => {
  notification.error({
    description: '您的网络连接发生异常，无法连接至服务器',
    message: '网络异常',
  });
};

const authHeaderInterceptor = (url: string, options: RequestOptionsType) => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    const authHeader = { Authorization: '2052538' };
    return {
      url: url,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  }
  return {
    url: url,
    options: { ...options, interceptors: true },
  };
};
export const request: RequestConfig = {
  errorHandler,
  authHeaderInterceptor,
};
