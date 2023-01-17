// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查看实验项目 GET /api/experiment **/
export async function experiment(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ExperimentList>('/api/experiment', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建实验项目 POST /api/experiment **/
export async function addExperiment(formData: FormData, options?: { [key: string]: any }) {
  return request<API.PostResult>('/api/experiment/publish', {
    method: 'POST',
    data: formData,
    ...(options || {}),
  });
}

/** 提交实验项目 POST /api/experiment/submit **/
export async function submitExperiment(formData: FormData, options?: { [key: string]: any }) {
  return request<API.PostResult>('/api/experiment/submit', {
    method: 'POST',
    // data: formData,
    data: formData,
    ...(options || {}),
  });
}
/** 获取所有学生对于某个实验的提交情况 GET /api/experiment/submit/:id **/
export async function getExperimentSubmit(experimentId: string, options?: { [key: string]: any }) {
  return request<API.ExperimentSubmitList>(`/api/experiment/submit/${experimentId}`, {
    method: 'GET',
    // data: formData,
    ...(options || {}),
  });
}
/** 获取实验详情 GET /api/experiment/detail **/
export async function getExperimentDetail(id?: string, options?: { [key: string]: any }) {
  return request<{ data: API.ExperimentItem; success: boolean; total: number }>(
    `/api/experiment/${id}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 删除实验项目 DELETE /api/experiment **/
export async function removeExperiment(id: string, options?: { [key: string]: any }) {
  return request<API.PostResult>(`/api/experiment/${id}`, {
    method: 'DELETE',
    // ...(options || {}),
  });
}
