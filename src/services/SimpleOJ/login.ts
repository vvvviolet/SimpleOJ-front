// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出接口 POST /api/login/outLogin */
export async function outLogin(token: string) {
  return request<Record<string, any>>('/api/login/outLogin', {
    headers: {
      authorization: token,
    },
  });
}
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(token: string) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    headers: {
      authorization: token,
    },
  });
}
