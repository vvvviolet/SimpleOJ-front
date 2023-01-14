import React, { useEffect, useRef, useState } from 'react';
// import styles from './Welcome.less';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ActionType, ProFormRadio, ProCard, ProFormField } from '@ant-design/pro-components';
import { EditableProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, InputRef, message, Space, Tag } from 'antd';
import { user, addUser, removeUser, updateUser } from '@/services/SimpleOJ/user';
import { TimestampToDate } from '@/utils/time';
import _default from 'antd/lib/notification';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const UserList: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<API.UserItem[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('top');
  const [isEdit, setEdit] = useState(false);
  const formRef = useRef<ProFormInstance<API.UserItem>>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await user();
      setDataSource(res.data.list);
    };
    fetchData();
  }, []);
  const columns: ProColumns<API.UserItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',

      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      width: '15%',
      editable: () => {
        return !isEdit;
      },
      sorter: (a, b) => Number(a.id) - Number(b.id),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '15%',
      initialValue: '王小二',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      initialValue: 'test@qq.com',
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
      initialValue: '0136-14135772',
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
      initialValue: 1,
      renderText(text, record, index, action) {
        console.log(text, '*', record);
        return text;
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
      initialValue: 0,
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      editable: false,
      render(dom, entity, index, action, schema) {
        const create_time = dom?.toString();
        return `${create_time?.substring(0, 10)} ${create_time?.substring(11, 19)}`;
        // return TimestampToDate(new Date(create_time).getTime());
      },
      sorter: (a, b) => {
        return new Date(a.create_time).getTime() - new Date(b.create_time).getTime();
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
            setEdit(true);
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            try {
              const res = await removeUser(record.id);
              if (res.success === true) {
                message.success('删除成功');
                const tableDataSource = formRef.current?.getFieldValue('table') as API.UserItem[];
                console.log(tableDataSource);
                formRef.current?.setFieldsValue({
                  table: tableDataSource.filter((item) => item.id !== record?.id),
                });
              } else {
                console.log(res);
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<API.UserItem>
        // params={{ t: Date.now() }}
        //每秒刷新一次
        rowKey="id"
        headerTitle="用户"
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({
                  id: '0000000',
                  create_time: TimestampToDate(new Date().getTime()),
                }),
                creatorButtonText: '新增用户',
              }
            : false
        }
        formRef={formRef}
        value={dataSource}
        onChange={setDataSource}
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
        ]}
        columns={columns}
        request={async (params = {}, sort, filter) => {
          const res = await user();
          return Promise.resolve({
            data: res.data.list,
            success: res.success,
            total: res.data.total,
          });
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onSave: async (key, record) => {
            if (isEdit === true) {
              console.log(record);
              // const res = await updateUser(record);
              const res = await updateUser({
                id: record.id,
                name: record.name,
                email: record.email,
                phone: record.phone,
                status: record.status,
                role: record.role,
                create_time: TimestampToDate(new Date().getTime()),
                update_time: TimestampToDate(new Date().getTime()),
                last_login_time: TimestampToDate(new Date().getTime()),
                ip: '0.0.0.0',
              });
              setEdit(false);

              if (res.success === true) {
                message.success('修改成功');
              }
              return Promise.resolve(true);
            } else {
              const res = await addUser({
                ...record,
                password: '123456',
                create_time: new Date().toISOString(),
              });
              if (res.success === true) {
                message.success('添加成功');
              }
              return Promise.resolve(true);
            }
          },
          onChange: setEditableRowKeys,
          onCancel: async () => {
            setEdit(!isEdit);
            return Promise.resolve(true);
          },
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
