import { getExperimentSubmit } from '@/services/SimpleOJ/experiment';
import { TimestampToDate } from '@/utils/time';
import type { ProColumns } from '@ant-design/pro-components';
import { idIDIntl, PageContainer } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { request, useParams } from 'umi';
import RcResizeObserver from 'rc-resize-observer';
import { Button } from 'antd';

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
  const params: { id: string } | undefined = useParams();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getExperimentSubmit(params.id);
  //     if(res.success===true){

  //     }
  //   };
  // }, []);
  // "studentId": 1,
  // "studentName": "name1",
  // "deadline": null,
  // "firstSubmitTime": 1673713623261,
  // "lastSubmitTime": null
  const columns: ProColumns<API.ExperimentSubmit>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      editable: false,
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      editable: false,
    },

    {
      title: '截止时间',
      dataIndex: 'deadline',
      editable: false,
      render: (record, entity) => {
        return TimestampToDate(Number(entity.deadline));
      },
    },

    {
      title: '最后提交时间',
      dataIndex: 'lastSubmitTime',
      editable: false,
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
      valueType: 'digit',
      fieldProps: {
        mode: 'multiple',
      },
      request: async () =>
        ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
          label: item,
          value: index,
        })),
      // valueType: 'string',
    },
    {
      title: '操作',
      valueType: 'option',

      // valueType: 'number',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record);
            action?.startEditable?.(record.studentId);
          }}
        >
          编辑{' '}
        </a>,
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
      <PageContainer title={`实验${params?.id}提交情况`}>
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
          <EditableProTable<API.ExperimentSubmit>
            rowKey="id"
            headerTitle="提交情况"
            maxLength={5}
            scroll={{
              x: 960,
            }}
            recordCreatorProps={false}
            loading={false}
            columns={columns}
            request={async () => {
              const res = await getExperimentSubmit(params.id);
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
        </ProCard>
      </PageContainer>
    </>
  );
};
