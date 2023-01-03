// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
export async function getfile(params = {}) {
  return request<{
    data: API.CurrentUser;
    // }>('https://150.158.80.33:7191/api/download', {
  }>('/api/file/', {
    method: 'GET',
    data: params,
  });
}
