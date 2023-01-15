import { getExperimentSubmit } from '@/services/SimpleOJ/experiment';
import { TimestampToDate } from '@/utils/time';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { request, useParams } from 'umi';
import { Button, message, Space, Table } from 'antd';
import { inRange } from 'lodash';
const domain = 'roi69i2lx.hd-bkt.clouddn.com';
const query =
  'e=1673761958&token=zxj5KCNaw-RtgKgU6CO2xSzpaaBqOP-_6p7KIgOU:QRPuEajCeFRCgPXG9GMJplkQNAg=';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const download = async (url: string) => {
  console.log(url);
  const eleLink = document.createElement('a');
  eleLink.style.display = 'none';
  eleLink.href = url;
  eleLink.download = '';
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
};
export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<API.ExperimentSubmitItem[]>([]);
  const pageParams: { id: string } | undefined = useParams();
  const columns: ProColumns<API.ExperimentSubmitItem>[] = [
    {
      dataIndex: 'id',
      valueType: 'index',
      hideInSearch: true,
      editable: false,
      width: 40,
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
        return entity.lastSubmitTime ? TimestampToDate(Number(entity.lastSubmitTime)) : '-';
      },
    },
    {
      title: '状态',
      valueType: 'select',
      editable: false,
      onFilter: true,
      valueEnum: {
        true: { text: '已提交', status: 'Success' },
        false: { text: '未提交', status: 'Error' },
      },
      renderText(text, record, index, action) {
        return record.lastSubmitTime !== null;
      },
      filtered: true,
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
          key="edit"
          onClick={() => {
            action?.startEditable(row.id);
          }}
        >
          编辑
        </a>,
        row.lastSubmitTime !== null && (
          <a
            key="download"
            href="http://roi69i2lx.hd-bkt.clouddn.com/experiment/1/submit/2025635.zip?e=1673750518&token=zxj5KCNaw-RtgKgU6CO2xSzpaaBqOP-_6p7KIgOU:jRe_-pFOy0OVF4Lm4BKT0dL33gk="
          >
            下载
          </a>
        ),
      ],
    },
  ];

  return (
    <>
      <PageContainer title={`实验 ${pageParams?.id} 提交情况`}>
        <ProCard
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
          headerBordered
        >
          <EditableProTable<API.ExperimentSubmitItem, API.PageParams>
            rowSelection={{
              // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
              // 注释该行则默认不显示下拉选项
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
              defaultSelectedRowKeys: [],
            }}
            rowKey="id"
            tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
              console.log(selectedRowKeys);
              return (
                <Space size={24}>
                  <span>
                    已选 {selectedRowKeys.length} 项
                    <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                      取消选择
                    </a>
                  </span>
                </Space>
              );
            }}
            tableAlertOptionRender={(item) => {
              return (
                <Space size={16}>
                  <a
                    onClick={async () => {
                      let cnt = 0;
                      const idArray = new Array();
                      for (const i of item.selectedRows) {
                        if (i.lastSubmitTime !== null) {
                          cnt += 1;
                          idArray.push(i.studentId);
                        }
                      }
                      message.info(`批量下载 ${cnt} 项`);
                      for (const i of idArray) {
                        await download(
                          domain + `/experiment/${pageParams?.id}/submit/${i}.zip?` + query,
                        );
                      }
                    }}
                  >
                    批量下载
                  </a>
                </Space>
              );
            }}
            search={{
              labelWidth: 'auto',
            }}
            maxLength={5}
            scroll={{
              x: 960,
            }}
            columnsState={{
              persistenceKey: 'cn',
              persistenceType: 'localStorage',
              onChange(value) {
                console.log('value: ', value);
              },
            }}
            pagination={{
              pageSize: 10,
              onChange: (page) => console.log(page),
            }}
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
