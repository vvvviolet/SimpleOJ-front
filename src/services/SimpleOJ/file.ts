// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
export async function getfile(params = {}) {
  return request<{
    data: API.CurrentUser;
  }>('/api/file/', {
    method: 'GET',
    data: params,
  });
}
