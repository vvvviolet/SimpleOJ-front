import { getExperimentSubmit } from '@/services/SimpleOJ/experiment';
import { TimestampToDate } from '@/utils/time';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { request, useParams } from 'umi';
import { Button } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<API.ExperimentSubmitItem[]>([]);
  const pageParams: { id: string } | undefined = useParams();
  const columns: ProColumns<API.ExperimentSubmitItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      hideInSearch: true,
      editable: false,
      width: 48,
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      hideInSearch: true,

      sorter: (a, b) => Number(a.studentId) - Number(b.studentId),
      editable: false,
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      hideInSearch: true,

      editable: false,
    },

    {
      title: '截止时间',
      dataIndex: 'deadline',
      hideInSearch: true,

      editable: false,
      sorter: (a, b) => Number(a.deadline) - Number(b.deadline),
      render: (record, entity) => {
        return TimestampToDate(Number(entity.deadline));
      },
    },

    {
      title: '最后提交时间',
      hideInSearch: true,

      dataIndex: 'lastSubmitTime',
      editable: false,
      sorter: (a, b) => Number(a.lastSubmitTime) - Number(b.lastSubmitTime),
      render: (record, entity) => {
        return TimestampToDate(Number(entity.lastSubmitTime));
      },
    },
    {
      title: '状态',
      valueType: 'select',
      editable: false,
      valueEnum: {
        true: { text: '已提交', status: 'Success' },
        false: { text: '未提交', status: 'Error' },
      },
      renderText(text, record, index, action) {
        return record.lastSubmitTime !== null;
      },
    },
    {
      title: '评分',
      dataIndex: 'score',
      hideInSearch: true,

      valueType: 'digit',
      sorter: (a, b) => Number(a.score) - Number(b.score),

      fieldProps: {
        mode: 'multiple',
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row, index, action) => [
        <a
          key="a"
          onClick={() => {
            action?.startEditable(row.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageContainer title={`实验${pageParams?.id}提交情况`}>
        <ProCard
          title=""
          style={{ paddingLeft: '20px' }}
          extra={
            <>
              <Button
                style={{
                  float: 'left',
                }}
                onClick={() => history.back()}
              >
                返回
              </Button>
            </>
          }
          split="horizontal"
          // bordered
          headerBordered
        >
          <EditableProTable<API.ExperimentSubmitItem, API.PageParams>
            rowKey="id"
            headerTitle=""
            search={{
              labelWidth: 'auto',
            }}
            maxLength={5}
            scroll={{
              x: 960,
            }}
            pagination={true}
            recordCreatorProps={false}
            loading={false}
            columns={columns}
            request={async (params: API.PageParams & { pageSize: number; current: number }) => {
              const res = await getExperimentSubmit(
                pageParams?.id !== undefined ? pageParams?.id : '1',
              );
              return {
                success: res.success,
                total: res.data.total,
                data: res.data.list,
              };
            }}
            onChange={setDataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
                await waitTime(1000);
              },
              onChange: setEditableRowKeys,
            }}
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
        </ProCard>
      </PageContainer>
    </>
  );
};
