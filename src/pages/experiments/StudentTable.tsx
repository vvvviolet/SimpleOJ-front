import initialState from '@/.umi/plugin-initial-state/models/initialState';
import {
  addExperiment,
  removeExperiment,
  experiment,
  submitExperiment,
  getExperimentDetail,
} from '@/services/SimpleOJ/experiment';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { history, useModel } from 'umi';
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
function download(params) {
  return request<Record<string, any>>('/api/experiment/submit/file', {
    params: params,
  });
}
const handleDownload = async (e: any) => {};

const StudentTable: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const { currentUser } = useModel('@@initialState');
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
    {
      title: '首次提交时间',
      dataIndex: 'firstSubmitTime',
      sorter: true,
      hideInSearch: true,

      hideInForm: true,
    },
    {
      title: '最后提交时间',
      dataIndex: 'lastSubmitTime',
      sorter: true,
      hideInSearch: true,

      hideInForm: true,
    },
    {
      title: '状态',
      hideInForm: true,
      default: 0,
      valueEnum: {
        0: {
          text: '未提交',
          status: 'Default',
        },
        1: {
          text: '已提交',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,

      render: (text, record, _, action) => [
        true && (
          <a
            key="download"
            onClick={() => {
              console.log(record);
              const res = download(record);
              console.log(res);
            }}
          >
            查看提交
          </a>
        ),
        <Upload
          key="submit"
          name="upload"
          maxCount={1}
          itemRender={() => {}}
          // listType="picture"
          // 阻止文件的上传 待点击提交按钮的时候一次性上传
          beforeUpload={async (info) => {
            const formData = new FormData();
            formData.append('id', currentUser.id);
            formData.append('title', record.title);
            formData.append('timeStamp', Date.now().toString());
            formData.append('file', info);
            try {
              const response = await submitExperiment(formData);
              if (response?.success === true) {
                message.success('上传成功');
                // reload，重新拉取数据
              }
            } catch (error) {
              message.error('上传失败，请重试！');
            }
            return true;
          }}
        >
          <a>上传</a>
        </Upload>,
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

      <ProTable
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

export default StudentTable;
