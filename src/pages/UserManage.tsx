import React, { useRef, useState } from 'react';
// import styles from './Welcome.less';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ActionType,
  EditableFormInstance,
  EditableProTable,
  PageContainer,
  ProCard,
  ProFormField,
  ProFormInstance,
  ProFormRadio,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import { user, addUser, removeUser } from '@/services/SimpleOJ/user';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const UserList: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<API.User[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  const columns: ProColumns<API.User>[] = [
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
      title: '姓名',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '邮箱',
      // key: 'state',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
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
      title: '角色',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        0: { text: '管理员' },
        1: { text: '学生' },
        2: { text: '教师' },
        3: { text: '助教' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '已激活', status: 'Success' },
        0: { text: '未激活', status: 'Default' },
      },
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
        <a
          key="delete"
          onClick={async () => {
            console.log('record', record);
            console.log('text', text);
            console.log('action', action);
            const res = await removeUser(record.id);
            action?.reload();

            // console.log(res);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<API.UserList>
        rowKey="id"
        headerTitle="用户"
        // maxLength={20}
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
        toolBarRender={(action) => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
          <Button
            type="primary"
            key="primary"
            onClick={async () => {
              const res = addUser({
                id: '2052538',
                name: 'cn',
                email: 'chennuo812@qq.com',
                phone: '19821378920',
                //0 管理员 1学生 2教师 3助教
                role: 0,
                status: 1,
              });
              console.log({});
              // console.log(res);
              action?.reload();
              // history.push('./');
            }}
          >
            <PlusOutlined />
            新增
          </Button>,
        ]}
        columns={columns}
        // request={async () => ({
        //   data: defaultData,
        //   total: 5,
        //   success: true,
        // })}
        request={async () => {
          const res = await user();
          console.log('res', res);
          setDataSource(res.data);
          return res;
        }}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log('rowKey', rowKey);
            console.log('data', data);
            console.log('row', row);
            await addUser(data);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
const UserManage: React.FC = () => {
  return (
    <PageContainer>
      <UserList />
    </PageContainer>
  );
};

export default UserManage;
