import React, { useState } from 'react';
// import styles from './Welcome.less';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, PageContainer } from '@ant-design/pro-components';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  name?: string;
  experiment?: string;
  commom?: string;
  test?: string;
  total?: string;
};

const defaultData: DataSourceType[] = [
  {
    id: 2036589,
    name: 'cn',
    experiment: '50',
    commom: '10',
    test: '30',
    total: '90',
  },
  {
    id: 2036589,
    name: 'bjh',
    experiment: '50',
    commom: '10',
    test: '30',
    total: '90',
  },
  {
    id: 2036589,
    name: 'lbj',
    experiment: '50',
    commom: '10',
    test: '30',
    total: '90',
  },
];

const ScoreList: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      width: '15%',
      editable: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '15%',
      editable: false,
    },
    {
      title: '实验',
      dataIndex: 'experiment',
      sorter: true,
    },
    {
      title: '平时',
      dataIndex: 'commom',
      sorter: true,

      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '...') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '测验',
      dataIndex: 'test',
      sorter: true,
    },
    {
      title: '总分',
      dataIndex: 'total',
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="学生成绩"
        // maxLength={20}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={false}
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 5,
          success: true,
        })}
        value={dataSource}
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
    </>
  );
};
const Score: React.FC = () => {
  return (
    <PageContainer>
      <ScoreList />
    </PageContainer>
  );
};

export default Score;
