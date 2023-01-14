import { request } from 'umi';

/** 发布公告 POST /api/notice */

export async function addNotice(notice: unknown) {
  return request<API.PostResult>('/api/notice', {
    method: 'POST',
    data: notice,
  });
}

/* 获取公告列表 */
export async function getNoticeList() {
  return request<API.NoticeList>('/api/notice', {
    method: 'GET',
  });
}
/** 获取公告详情 */
export async function getNotice() {
  return request<{
    data: API.Notice;
  }>('/api/notice', {
    method: 'GET',
    params: {
      title: '123',
    },
  });
}
/** 删除公告 */
export async function removeNotice(id: number) {
  return request('/api/notice/' + `${id}`, {
    method: 'DELETE',
  });
}
