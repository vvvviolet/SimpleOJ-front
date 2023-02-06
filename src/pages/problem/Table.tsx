import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import { history, Link } from 'umi';

type Problem = {
  id: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
};

const columns: ProColumns<Problem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      open: {
        text: '未提交',
        status: 'default',
      },
      closed: {
        text: '未通过',
        status: 'Error',
      },
      processing: {
        text: '已通过',
        status: 'Success',
      },
    },
  },
  {
    disable: true,
    title: '最新提交时间',
    dataIndex: 'date',
    search: false,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      //携带题目id跳转到详情页面
      // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      <a
        onClick={() => {
          history.push('./detail/1');
        }}
        target="_blank"
        rel="noopener noreferrer"
        key="view"
      >
        详情
      </a>,
      //只有管理员才能删除
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<Problem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(params);
          return request<{
            data: Problem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'problem',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
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
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="题目列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '1',
                },
                {
                  label: '3rd item',
                  key: '1',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};
