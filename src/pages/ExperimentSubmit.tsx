import { getExperimentSubmit } from '@/services/SimpleOJ/experiment';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { request } from 'umi';
// export default () => {
//   return <>id 姓名 状态（已提交 未提交） 提交 首次提交时间  最终提交时间 得分</>;
// };
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
function download(params) {
  return request<Record<string, any>>('/api/experiment/submit/file', {
    params: params,
  });
}
export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<API.ExperimentSubmit[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<API.ExperimentSubmit>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      width: '15%',
    },
    {
      title: '实验名称',
      dataIndex: 'title',
      width: '15%',
    },

    {
      title: '提交时间',
      dataIndex: 'submitTime',
      // valueType: 'string',
    },

    {
      title: '操作',
      editable: false,
      // valueType: 'number',
      render: (text, record, _, action) => [
        // <a
        //   key="editable"
        //   onClick={() => {
        //     action?.startEditable?.(record.id);
        //   }}
        // >
        //   编辑{'  '}
        // </a>,
        // <a
        //   key="delete"
        //   onClick={() => {
        //     setDataSource(dataSource.filter((item) => item.id !== record.id));
        //   }}
        // >
        //   删除
        // </a>,
        <a
          key="get"
          onClick={() => {
            console.log(record);
            const res = download(record);
            console.log(res);

            // setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          下载
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<API.ExperimentSubmit>
        rowKey="id"
        headerTitle="提交情况"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        columns={columns}
        request={async () => {
          return await getExperimentSubmit();
        }}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
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
    </>
  );
};
