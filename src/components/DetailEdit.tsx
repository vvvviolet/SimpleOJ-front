import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import React, { useState } from 'react';
import { Button, Divider, message } from 'antd';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { ProFormText } from '@ant-design/pro-components';
import type { UploadProps } from 'antd/es/upload/interface';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { addExperiment } from '@/services/SimpleOJ/experiment';
import type { RcFile } from 'antd/lib/upload';

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
  // 上传
  const uploadProps: UploadProps = {
    maxCount: 1,
    beforeUpload(fileInfo) {
      setFile(fileInfo);
      console.log('beforeUpload', file);

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
    // onDrop(e) {
    //   setFile(undefined);
    //   console.log('Dropped files', e.dataTransfer.files);
    //   console.log('Dropped files', file);
    // },
    onRemove() {
      setFile(undefined);
      console.log('Dropped files', file);
    },
  };
  // 拦截文件上传

  const handleSubmit = async (formData: FormData) => {
    // console.log('发布实验', formData.getAll);
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
            // bordered
            headerBordered
          >
            <ProCard>
              <ProForm
                initialValues={{
                  title: '',
                  dateTimeRange: [Date.now(), Date.now() + 1000 * 60 * 60 * 24 * 7],
                }}
                onFinish={async (values) => {
                  // await waitTime(1000);
                  console.log('file', file === undefined ? '' : file);
                  const nullFile = new Blob();
                  const formData = new FormData();
                  formData.append('title', values.title);
                  formData.append('description', values.description.toHTML());
                  formData.append('publishDate', Date.now().toString());
                  formData.append('startTime', values.dateTimeRange[0]);
                  formData.append('endTime', values.dateTimeRange[1]);
                  formData.append('file', file === undefined ? nullFile : file);
                  await handleSubmit(formData);
                  return false;
                }}
                submitter={{
                  render: (_, dom) => <div>{dom}</div>,
                }}
              >
                <ProFormText label="标题" name="title" />
                <ProFormDateTimeRangePicker
                  name="dateTimeRange"
                  label="起止日期"
                  fieldProps={{
                    format: (value) => value.format('YYYY-MM-DD HH:MM:SS'),
                  }}
                />
                <ProForm.Item name="description">
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
