import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';

type ProblemSubmit = {
  id: number;
  name: string;
  time: string;
  status: number;
};

const columns: ProColumns<ProblemSubmit>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    ellipsis: true,
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '提交时间',
    dataIndex: 'time',
    search: true,
  },
  {
    title: '状态',
    key: 'status',
    valueType: 'enum',
    valueEnum: {
      0: {
        text: '未通过',
        status: 'Error',
      },
      1: {
        text: '已通过',
        status: 'Success',
      },
      2: {
        text: '判定中',
        status: 'Processing',
      },
    },
  },
];

export default () => {
  return (
    <>
      <ProTable<ProblemSubmit>
        columns={columns}
        request={async () => ({
          success: true,
          data: [
            {
              id: 624748504,
              name: 'a',
              time: '1590486176000',
              status: 'ok',
            },
            {
              id: 624748501,
              name: 'b',
              time: '1590486176000',
              status: 'ok',
            },
          ],
        })}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          ignoreRules: false,
        }}
        dateFormatter="string"
        headerTitle="题目提交"
      />
      {/* <ProTable<ProblemSubmit>
        columns={columns}
        request={async () => ({
          success: true,
          data: [
            {
              id: 624748501,
              name: 'b',
              time: '1590486176000',
              status: 'ok',
            },
          ],
        })}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="高级表格"
      /> */}
    </>
  );
};
