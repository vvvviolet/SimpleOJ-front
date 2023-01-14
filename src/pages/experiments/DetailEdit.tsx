import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import React, { useState } from 'react';
import { Button, Divider, message } from 'antd';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { ProFormText } from '@ant-design/pro-components';
import type { UploadProps } from 'antd/es/upload/interface';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { addExperiment } from '@/services/SimpleOJ/experiment';
import type { RcFile } from 'antd/lib/upload';
import { useModel } from 'umi';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const DetailEdit: React.FC = () => {
  const [content, setContent] = useState(BraftEditor.createEditorState(null));
  const [file, setFile] = useState<RcFile>();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  // 上传
  const uploadProps: UploadProps = {
    maxCount: 1,
    beforeUpload(fileInfo) {
      setFile(fileInfo);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log('uploading： ', info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove() {
      setFile(undefined);
    },
  };
  // 拦截文件上传
  const handleSubmit = async (formData: FormData) => {
    const hide = message.loading('正在发布');
    try {
      const response = await addExperiment(formData);
      if (response?.success === true) {
        hide();
        message.success('发布成功');
        history.back();
      }
    } catch (error) {
      // hide();
      message.error('发布失败，请重试！');
    }
  };

  return (
    <>
      <PageContainer>
        <RcResizeObserver key="resize-observer">
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
            <ProCard>
              <ProForm
                initialValues={{
                  title: '',
                  content: '',
                  dateTimeRange: [Date.now(), Date.now() + 1000 * 60 * 60 * 24 * 7],
                }}
                onFinish={async (values) => {
                  // await waitTime(1000);
                  const nullFile = new Blob();
                  const formData = new FormData();
                  // console.log(TimestampToDate(values.dateTimeRange[0]));
                  formData.append('title', values.title);
                  formData.append('content', values.content.toHTML());
                  formData.append('publishTime', Date.now().toString());
                  formData.append('startTime', values.dateTimeRange[0]);
                  formData.append('endTime', values.dateTimeRange[1]);
                  formData.append(
                    'publisher',
                    currentUser?.data.name === undefined ? '' : currentUser?.data.name,
                  );
                  formData.append('file', file === undefined ? nullFile : file);
                  await handleSubmit(formData);
                  return false;
                }}
                onChange={(e) => {
                  // console.log(e.tsarget);
                }}
                submitter={{
                  render: (_, dom) => <div>{dom}</div>,
                }}
              >
                <ProFormText
                  label="标题"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: '标题为必填项',
                    },
                  ]}
                />

                <ProFormDateRangePicker
                  name="dateTimeRange"
                  label="起止日期"
                  fieldProps={{
                    onChange: (e) => {
                      console.log(e);
                    },
                  }}
                />
                <ProForm.Item name="content">
                  <BraftEditor
                    value={content}
                    onChange={async (val) => {
                      // console.log(val.toHTML());
                      setContent(val);
                    }}
                  />
                </ProForm.Item>
                <Divider />
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或者拖拽上传</p>
                  <p className="ant-upload-hint">上传文件不能超过100M</p>
                </Dragger>
                <Divider />
              </ProForm>
            </ProCard>
          </ProCard>
        </RcResizeObserver>
      </PageContainer>
    </>
  );
};
export default DetailEdit;
