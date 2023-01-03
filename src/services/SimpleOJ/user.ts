// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/user */
export async function user(options?: { [key: string]: any }) {
  return request<API.UserList>('/api/user', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/user */
export async function addUser(userData, options?: { [key: string]: any }) {
  console.log(userData);
  return request<API.RuleListItem>('/api/user', {
    method: 'POST',
    data: userData,
    ...(options || {}),
  });
}
/** 新建规则 DELETE /api/user */
export async function removeUser(userId: string, options?: { [key: string]: any }) {
  console.log(userId);
  return request<API.postResult>('/api/user', {
    method: 'DELETE',
    params: {
      id: userId,
    },
    ...(options || {}),
  });
}
/* 注册 POST /api/register */
export async function register(data, options?: { [key: string]: any }) {
  return request<API.postResult>('/api/register', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
