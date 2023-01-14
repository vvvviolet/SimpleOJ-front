// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(token: string) {
  // console.log('currentuser', token);
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
    credentials: 'include', // 默认请求是否带上cookie
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
