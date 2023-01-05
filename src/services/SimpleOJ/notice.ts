import { request } from 'umi';

/** 发布公告 POST /api/notice */

export async function addNotice(notice) {
  return request<API.postResult>('/api/notice', {
    method: 'POST',
    // data: notice,
    data: {
      title: '公告1',
      content: '内容1',
      publishDate: Date(),
      publisher: 'cn',
    },
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
