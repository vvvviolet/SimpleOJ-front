import { request } from 'umi';

export async function getDiscussList(
  params: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<DiscussList>('/api/discuss', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function publishDiscuss(data) {
  return request<API.PostResult>('/api/discuss', {
    method: 'POST',
    data: data,
  });
}
export type DiscussList = {
  success: boolean;
  data: {
    list: DiscussItem[];
    current: number;
    pageSize: number;
    total: number;
  };
};
export type DiscussItem = {
  id: string;
  title: string;
  avatar?: string;
  description?: string;
  content: string;
};
