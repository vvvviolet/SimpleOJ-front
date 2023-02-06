import { removeExperiment, experiment, submitExperiment } from '@/services/SimpleOJ/experiment';
import { TimestampToDate } from '@/utils/time';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProFormField } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { history, useModel, useParams } from 'umi';

const Experiment: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<Entity.Experiment[]>([]);
  const pageParams: API.PageParams = useParams();
  useEffect(() => {
    if (currentUser?.data.role === 0) {
      console.log('获取学生提交记录，用来填充首次提交和最后提交时间');
    }
  }, [currentUser?.data.role]);
  const columns: ProColumns<Entity.Experiment>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '名称',
      dataIndex: 'title',
      valueType: 'textarea',

      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              {
                history.push(`./detail/${entity.id}`);
              }
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      sorter: (a, b) => a.startTime - b.startTime,
      hideInSearch: true,
      render: (_, entity) => {
        return TimestampToDate(entity.startTime).substring(0, 10);
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      sorter: (a, b) => a.endTime - b.endTime,
      hideInSearch: true,
      render: (_, entity) => {
        return TimestampToDate(entity.endTime).substring(0, 10) + ' 23:59:59';
      },
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      sorter: (a, b) => a.publishTime - b.publishTime,
      hideInSearch: true,
      render: (_, entity) => {
        return TimestampToDate(entity.publishTime);
      },
    },
    {
      title: '首次提交时间',
      dataIndex: 'firstSubmitTime',
      request: async () => {
        return [];
      },
      hideInTable: currentUser?.data.role !== 0,
    },
    {
      title: '最后提交时间',
      dataIndex: 'lastSubmitTime',
      request: async () => {
        return [];
      },
      hideInTable: currentUser?.data.role !== 0,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
      render: (text, record, _, action) => [
        <Space key="config">
          <a
            onClick={() => {
              if (currentUser?.data.role === 0) {
                // alert('学生查看提交，此处应该为下载');
                history.push(`./submit/${record.id}`);
              } else {
                // alert('教师查看提交，此处跳转到实验提交表格页面');
                history.push(`./submit/${record.id}`);
              }
            }}
          >
            查看提交
          </a>
        </Space>,
        currentUser?.data.role === 1 && (
          <a
            key="delete"
            onClick={async () => {
              await removeExperiment(record.id);
              action?.reload();
            }}
          >
            删除
          </a>
        ),
        currentUser?.data.role === 0 && (
          <Upload
            key="submit"
            name="upload"
            maxCount={1}
            itemRender={() => {}}
            disabled={Date.now() >= record.endTime}
            beforeUpload={async (info) => {
              const formData = new FormData();
              formData.append('studentId', currentUser.data.id);
              formData.append('experimentId', record.id);
              formData.append('timeStamp', Date.now().toString());
              formData.append('file', info);
              try {
                const response = await submitExperiment(formData);
                if (response?.success === true) {
                  message.success('上传成功');
                  action?.reload();
                }
              } catch (error) {
                message.error('上传失败，请重试！');
              }
              return true;
            }}
          >
            {Date.now() >= record.endTime ? <a style={{ color: 'gray' }}>上传</a> : <a>上传</a>}
          </Upload>
        ),
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Entity.Experiment, API.PageParams>
        headerTitle="实验项目"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        params={pageParams}
        toolBarRender={() => [
          currentUser?.data.role === 0 && (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                history.push('./new');
              }}
            >
              <PlusOutlined />
              新增
            </Button>
          ),
        ]}
        form={{
          syncToUrl: (values, type) => {
            // console.log(values, type);
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        request={async (
          params: API.PageParams & { pageSize: number; current: number },
          sort,
          filter,
        ) => {
          const res = await experiment({ current: params.current, pageSize: params.pageSize });
          // console.log(res.data);
          setDataSource(res.data.list);
          return {
            data: res.data.list,
            success: res.success,
            total: res.data.total,
            page: res.data.current,
          };
        }}
        columns={columns}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Experiment;
