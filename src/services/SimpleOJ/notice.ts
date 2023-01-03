import { request } from 'umi';

/** 获取当前的公告 GET /api/currenNotice */
type Notice = {
  title: string;
  description: string;
  publisher: string;
  createTime: string;
};
export async function addNotice(notice: Notice) {
  return request<API.postResult>('/api/notice', {
    method: 'POST',
    data: notice,
  });
}
/** 发布公告 POST /api/currentNotice */
export async function currentUser(token: string) {
  return request<{
    data: Notice;
  }>('/api/noticer', {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + token,
    },
  });
}
