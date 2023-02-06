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
/** 新建用户 POST /api/user */
export async function addUser(userData: Entity.User, options?: { [key: string]: any }) {
  return request<API.PostResult>('/api/user', {
    method: 'POST',
    data: userData,
    ...(options || {}),
  });
}
/** 更新用户 PATCH /api/user */
export async function updateUser(userData: any, options?: { [key: string]: any }) {
  return request<API.PostResult>(`/api/user/${userData.id}`, {
    method: 'PATCH',
    data: userData,
    ...(options || {}),
  });
}
/** 新建规则 DELETE /api/user */
export async function removeUser(userId: string, options?: { [key: string]: any }) {
  console.log(userId);
  return request<API.PostResult>(`/api/user/${userId}`, {
    method: 'DELETE',
    // params: {
    //   id: userId,
    // },
    ...(options || {}),
  });
}
/* 注册 POST /api/register */
export async function register(data: any, options?: { [key: string]: any }) {
  return request<API.PostResult>('/api/register', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}
/* 注册 POST /api/register */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.PostResult>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
