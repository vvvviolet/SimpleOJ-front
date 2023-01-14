// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查看题目 GET /api/problem **/
export async function problem(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProblemList>('/api/problem', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 新建题目 POST /api/experiment **/
export async function addProblem(options?: { [key: string]: any }) {
  return request<API.ProblemItem>('/api/problem', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除题目 DELETE /api/experiment **/
export async function removeProblem(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/problem', {
    method: 'DELETE',
    ...(options || {}),
  });
}
