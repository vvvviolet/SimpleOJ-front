import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: Record<string, any>) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getProblemInfo() {
  return request<{ total: number }>('/api/problem/info', {
    method: 'GET',
  });
}
export async function getExperimentInfo() {
  return request<{ total: number }>('/api/experiment/info', {
    method: 'GET',
  });
}
