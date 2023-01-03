import {
  addExperiment,
  removeExperiment,
  experiment,
  submitExperiment,
  getExperimentDetail,
} from '@/services/SimpleOJ/experiment';
import { PlusOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import UpdateForm from './Experiment/components/Form';
type FormValueType = {
  name?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  frequency?: string;
} & Partial<API.ExperimentItem>;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ExperimentList) => {
  const hide = message.loading('正在添加');
  try {
    await addExperiment({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('更新中');
  try {
    await updateExperiment({
      name: fields.name,
    });
    hide();

    message.success('');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ExperimentItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeExperiment({
      id: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};

const handleDownload = async (e: any) => {};

const TeacherTable: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createAddModalVisible, handleAddModalVisible] = useState<boolean>(false);
  const [createDetailModalVisible, handleDetailModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ExperimentItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ExperimentItem[]>([]);

  const columns: ProColumns<API.ExperimentItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
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
                const response = getExperimentDetail(entity.title);
                console.log(response);
                // history.push('./detail');
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
      sorter: true,
      hideInSearch: true,

      hideInForm: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      sorter: true,
      hideInSearch: true,

      hideInForm: true,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: '未提交',
    //       status: 'Default',
    //     },
    //     1: {
    //       text: '已提交',
    //       status: 'Success',
    //     },
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,

      render: (text, record, _, action) => [
        <a
          key="config"
          onClick={() => {
            alert('查看提交');
          }}
        >
          查看
        </a>,

        <a
          key="actionGroup"
          onClick={async () => {
            // console.log(text, record, action);
            console.log(record.title);
            const formData = new FormData();
            formData.append('title', record.title);
            await removeExperiment(formData);
            action?.reload();
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ExperimentItem, API.PageParams>
        headerTitle="实验项目"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/detailEdit');
            }}
          >
            <PlusOutlined />
            新增
          </Button>,
        ]}
        request={() => experiment({ current: 1, pageSize: 10 })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
            </div>
          }
        >
          <Button
            danger
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.title && (
          <ProDescriptions<API.ExperimentItem>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.title,
            }}
            columns={columns as ProDescriptionsItemProps<API.ExperimentItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TeacherTable;
